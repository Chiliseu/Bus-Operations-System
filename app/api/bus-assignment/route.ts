import { NextResponse } from 'next/server';
import prisma from '@/client'; // Importing the Prisma client instance to interact with the database
import { generateFormattedID } from '../../../lib/idGenerator';

export async function GET() {
  try {
    const assignments = await prisma.regularBusAssignment.findMany({
        where: {
          BusAssignment: {
            IsDeleted: false,  // Only fetch rows where IsDeleted is false
          },
        },
        include: {
            BusAssignment: {
                include: {
                  Route: true,
                }
            },
            quotaPolicy: {
              include: {
                Fixed: true,
                Percentage: true,
              },
            },
        }
    });
    // console.log('Assignments from database:', assignments); // Debugging

    return NextResponse.json(assignments);
  } catch (error) {
    console.error('Error fetching bus route assignments:', error);
    return NextResponse.json({ error: 'Failed to fetch assignments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log('POST request received'); // Debugging

    const data = await request.json();
    console.log('Data received in API:', data); // Debugging

    // Step 1: Generate a formatted QuotaPolicyID using the generateFormattedID function
    console.log('Generating new QuotaPolicyID...'); // Debugging
    const newQuotaPolicyID = await generateFormattedID('QP');
    console.log('Generated new QuotaPolicyID:', newQuotaPolicyID); // Debugging

    // Step 2: Create the new QuotaPolicy
    console.log('Creating new QuotaPolicy...'); // Debugging
    const newQuotaPolicy = await prisma.quota_Policy.create({
      data: {
        QuotaPolicyID: newQuotaPolicyID, // Use the generated QuotaPolicyID
        StartDate: new Date(),
        EndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Example: 1 year validity
        ...(data.QuotaPolicy.type === 'Fixed'
          ? { Fixed: { create: { Quota: parseFloat(data.QuotaPolicy.value) } } }
          : { Percentage: { create: { Percentage: parseFloat(data.QuotaPolicy.value) / 100 } } }),
      },
    });

    console.log('New QuotaPolicy created:', newQuotaPolicy); // Debugging

    // Step 3: Generate a formatted BusAssignmentID using the generateFormattedID function
    console.log('Generating new BusAssignmentID...'); // Debugging
    const newBusAssignmentID = await generateFormattedID('BA');
    console.log('Generated new BusAssignmentID:', newBusAssignmentID); // Debugging

    // Step 4: Create the new BusAssignment record along with RegularBusAssignment
    console.log('Creating new BusAssignment record...'); // Debugging
    const newAssignment = await prisma.busAssignment.create({
      data: {
        BusAssignmentID: newBusAssignmentID, // Use the generated BusAssignmentID
        BusID: data.BusID,
        RouteID: data.RouteID,
        AssignmentDate: new Date(data.AssignmentDate),
        Battery: data.Battery,
        Lights: data.Lights,
        Oil: data.Oil,
        Water: data.Water,
        Break: data.Break,
        Air: data.Air,
        Gas: data.Gas,
        Engine: data.Engine,
        TireCondition: data.TireCondition,
        Self: data.Self,
        IsDeleted: false,
        RegularBusAssignment: {
          create: {
            DriverID: data.DriverID,
            ConductorID: data.ConductorID,
            QuotaPolicyID: newQuotaPolicy.QuotaPolicyID, // Link the newly created QuotaPolicy
            Change: data.Change,
            TripRevenue: data.TripRevenue,
          },
        },
      },
      include: {
        RegularBusAssignment: {
          include: {
            quotaPolicy: {
              include: {
                Fixed: true,
                Percentage: true,
              },
            },
          },
        },
      },
    });

    // console.log('New BusAssignment created in database:', newAssignment); // Debugging
    return NextResponse.json(newAssignment);
  } catch (error) {
    console.error('Error creating BusAssignment:', error); // Debugging
    return NextResponse.json({ error: 'Failed to create BusAssignment' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const data = await request.json();
  const { BusAssignmentID } = data;

  if (data.IsDeleted !== undefined) {
    // Handle IsDeleted update
    await prisma.busAssignment.update({
      where: { BusAssignmentID },
      data: { IsDeleted: data.IsDeleted },
    });
    return NextResponse.json({ message: 'IsDeleted status updated' });
  }

  // Handle other field updates
  await prisma.busAssignment.update({
    where: { BusAssignmentID },
    data: {
      BusID: data.BusID,
      RouteID: data.RouteID,
      RegularBusAssignment: {
        update: {
          DriverID: data.DriverID,
          ConductorID: data.ConductorID,
          QuotaPolicyID: data.QuotaPolicyID,
        },
      },
    },
  });

  return NextResponse.json({ message: 'BusAssignment updated' });
}
