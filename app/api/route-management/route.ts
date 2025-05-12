import { NextResponse } from 'next/server';
import prisma from '@/client'; // Adjust the import path based on your setup
import { RouteStop } from '@/app/interface'; // Importing the RouteStop interface
import { generateFormattedID } from '../../../lib/idGenerator';

export async function GET() {
  try {
    const routes = await prisma.route.findMany({
      where: {
        IsDeleted: false, // Only include non-deleted routes
      },
      include: {
        StartStop: true,
        EndStop: true,
        RouteStops: true,
      },
    });

    return NextResponse.json(routes);
  } catch (error) {
    console.error('Error fetching routes:', error);
    return NextResponse.json({ error: 'Failed to fetch routes' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    console.log('POST request received for creating a new route');

    const data = await req.json();
    console.log('Data received in API:', data);

    // Step 1: Query the latest RouteID
    const latestRoute = await prisma.route.findFirst({
      orderBy: { RouteID: 'desc' },
    });

    let newRouteIdNumber = 1;
    if (latestRoute) {
      const numericPart = parseInt(latestRoute.RouteID.split('-')[1], 10);
      newRouteIdNumber = numericPart + 1;
    }
    const newRouteID = await generateFormattedID('RT');
    console.log('Generated new RouteID:', newRouteID);

    // Step 2: Create the Route with StartStopID and EndStopID directly
    const newRoute = await prisma.route.create({
      data: {
        RouteID: newRouteID,
        RouteName: data.RouteName,
        StartStopID: data.StartStopID,
        EndStopID: data.EndStopID,
        IsDeleted: false, // Default to false on creation
      },
    });
    console.log('New Route created:', newRoute);

    // Step 3: Create RouteStops if provided
    if (Array.isArray(data.RouteStops) && data.RouteStops.length > 0) {
      const createdRouteStops = await Promise.all(
        data.RouteStops.map(async (routeStop: { StopID: string; StopOrder: number }) => {
          // Generate a unique RouteStopID for each route stop
          const RouteStopID = await generateFormattedID('RTS');
          return prisma.routeStop.create({
            data: {
              RouteStopID: RouteStopID,
              RouteID: newRouteID,
              StopID: routeStop.StopID,
              StopOrder: routeStop.StopOrder,
            },
          });
        })
      );
      console.log('Created RouteStops:', createdRouteStops);
    } else {
      console.log('No RouteStops provided, skipping creation.');
    }

    return NextResponse.json(newRoute, { status: 201 });
  } catch (error) {
    console.error('Error creating route:', error);
    return NextResponse.json({ error: 'Failed to create route' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    console.log('PUT request received for updating a route');
    
    const data = await req.json();
    const { RouteID, RouteName, StartStopID, EndStopID, RouteStops, IsDeleted } = data;
    console.log('Data received in API:', data);

    if (!RouteID) {
      return NextResponse.json({ error: 'RouteID is required.' }, { status: 400 });
    }

    // Step 1: Soft delete if IsDeleted is true
    if (IsDeleted === true) {
      const softDeletedRoute = await prisma.route.update({
        where: { RouteID },
        data: { IsDeleted: true },
      });

      console.log('Route soft-deleted:', softDeletedRoute);
      return NextResponse.json(softDeletedRoute, { status: 200 });
    }

    // Step 2: Find the existing Route
    const existingRoute = await prisma.route.findUnique({
      where: { RouteID },
    });

    if (!existingRoute) {
      return NextResponse.json({ error: 'Route not found.' }, { status: 404 });
    }

    // Step 3: Update the Route with the new data (if provided)
    const updatedRoute = await prisma.route.update({
      where: { RouteID },
      data: {
        RouteName: RouteName || existingRoute.RouteName,
        StartStopID: StartStopID || existingRoute.StartStopID,
        EndStopID: EndStopID || existingRoute.EndStopID,
        IsDeleted: existingRoute.IsDeleted, // Keep the current IsDeleted status if not updating
      },
    });
    console.log('Updated Route:', updatedRoute);

    // Step 4: Handle RouteStops if provided (delete old and add new ones)
    if (Array.isArray(RouteStops) && RouteStops.length > 0) {
      const createdRouteStops = await prisma.$transaction(async (prisma) => {
        // Step 4.1: Delete existing RouteStops
        await prisma.routeStop.deleteMany({
          where: { RouteID },
        });
        console.log('Deleted existing RouteStops for RouteID:', RouteID);

        // Step 4.2: Create new RouteStops
        return await Promise.all(
          RouteStops.map(async (routeStop: { StopID: string; StopOrder: number }) => {
            const RouteStopID = await generateFormattedID('RTS');
            return prisma.routeStop.create({
              data: {
                RouteStopID: RouteStopID,
                RouteID,
                StopID: routeStop.StopID,
                StopOrder: routeStop.StopOrder,
              },
            });
          })
        );
      });
      console.log('Created new RouteStops:', createdRouteStops);
    } else {
      console.log('No RouteStops provided, skipping update.');
    }

    // Return the updated route
    return NextResponse.json(updatedRoute, { status: 200 });
  } catch (error) {
    console.error('Error updating route:', error);
    return NextResponse.json({ error: 'Failed to update route' }, { status: 500 });
  }
}
