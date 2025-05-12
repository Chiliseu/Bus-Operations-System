import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/client'; // Importing the Prisma client instance to interact with the database
import { generateFormattedID } from '../../../lib/idGenerator';

export async function GET() {
  try {
    // Fetching bus assignments where IsDeleted is false
    const assignments = await prisma.regularBusAssignment.findMany({
      where: {
        BusAssignment: {
          IsDeleted: false,  // Only fetch rows where IsDeleted is false
        },
      },
      include: {
        BusAssignment: {
          include: {
            Route: true,  // Include related Route information
          },
        },
        quotaPolicy: {
          select: {
            QuotaPolicyID : true,
            Fixed: true,  // Include Fixed quota
            Percentage: true,  // Include Percentage quota
          },
        },
      },
    });

    return NextResponse.json(assignments);  // Return fetched assignments
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

    const baseUrl = process.env.APPLICATION_URL;
    
    // Step 1: Call API to create QuotaPolicy
    console.log('Calling QuotaPolicy API...'); // Debugging
    const quotaPolicyResponse = await fetch(`${baseUrl}/api/quota-assignment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: data.QuotaPolicy.type,
        value: data.QuotaPolicy.value,
      }),
    });

    if (!quotaPolicyResponse.ok) {
      throw new Error('Failed to create QuotaPolicy from API');
    }

    const newQuotaPolicy = await quotaPolicyResponse.json();
    console.log('QuotaPolicy created via API:', newQuotaPolicy); // Debugging

    // Step 2: Generate BusAssignmentID
    console.log('Generating new BusAssignmentID...'); // Debugging
    const newBusAssignmentID = await generateFormattedID('BA');
    console.log('Generated new BusAssignmentID:', newBusAssignmentID); // Debugging

    // Step 3: Create the BusAssignment with RegularBusAssignment
    console.log('Creating new BusAssignment record...'); // Debugging
    const newAssignment = await prisma.busAssignment.create({
      data: {
        BusAssignmentID: newBusAssignmentID,
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
            QuotaPolicyID: newQuotaPolicy.QuotaPolicyID, // Use the QuotaPolicyID from the API
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

    console.log('New BusAssignment created in database:', newAssignment);
    return NextResponse.json(newAssignment, { status: 201 });

  } catch (error) {
    console.error('Error creating BusAssignment:', error);
    return NextResponse.json({ error: 'Failed to create BusAssignment' }, { status: 500 });
  }
}

interface QuotaPolicyData {
  QuotaPolicyID: string;
  type: 'Fixed' | 'Percentage';
  value: string;
  StartDate?: string;
  EndDate?: string;
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    // Step 1: Soft delete if IsDeleted is true
    if (data.IsDeleted === true) {
      const updatedBusAssignment = await prisma.busAssignment.update({
        where: { BusAssignmentID: data.BusAssignmentID },
        data: { IsDeleted: true },
      });

      return NextResponse.json(updatedBusAssignment, { status: 200 });
    }

    // Step 2: Fetch the existing BusAssignment with its related RegularBusAssignment
    const existingBusAssignment = await prisma.busAssignment.findUnique({
      where: { BusAssignmentID: data.BusAssignmentID },
      include: {
        RegularBusAssignment: {
          include: {
            quotaPolicy: true,
          },
        },
      },
    });

    if (!existingBusAssignment || !existingBusAssignment.RegularBusAssignment) {
      return NextResponse.json({ error: 'BusAssignment or RegularBusAssignment not found' }, { status: 404 });
    }

    const baseUrl = process.env.APPLICATION_URL;
    if (!baseUrl) {
      return NextResponse.json({ error: 'Base URL is not defined' }, { status: 500 });
    }

    // Step 3: Conditionally call QuotaPolicy API only if all required fields are present
    const quotaPolicyId = existingBusAssignment.RegularBusAssignment.quotaPolicy?.QuotaPolicyID;
    const shouldUpdateQuotaPolicy = data.type && data.value && quotaPolicyId;

    if (shouldUpdateQuotaPolicy) {
      const quotaPolicyData: QuotaPolicyData = {
        QuotaPolicyID: quotaPolicyId,
        type: data.type,
        value: data.value,
        StartDate: data.StartDate,
        EndDate: data.EndDate,
      };

      const quotaPolicyResponse = await fetch(`${baseUrl}/api/quota-assignment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quotaPolicyData),
      });

      const quotaPolicyResponseData = await quotaPolicyResponse.json();

      if (!quotaPolicyResponse.ok) {
        return NextResponse.json(
          { error: quotaPolicyResponseData.error || 'Failed to update QuotaPolicy' },
          { status: 500 }
        );
      }
    }

    // Step 4: Update the BusAssignment
    const updatedBusAssignment = await prisma.busAssignment.update({
      where: { BusAssignmentID: data.BusAssignmentID },
      data: {
        BusID: data.BusID,
        RouteID: data.RouteID,
        RegularBusAssignment: {
          update: {
            DriverID: data.DriverID,
            ConductorID: data.ConductorID,
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

    return NextResponse.json(updatedBusAssignment, { status: 200 });

  } catch (error) {
    console.error('Error updating bus assignment:', error);
    return NextResponse.json({ error: 'Failed to update bus assignment' }, { status: 500 });
  }
}
