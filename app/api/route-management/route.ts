import { NextResponse } from 'next/server';
import prisma from '@/client'; // Adjust the import path based on your setup
import { RouteStop } from '@/app/interface'; // Importing the RouteStop interface
import cuid from 'cuid';

export async function GET() {
  try {
    const routes = await prisma.route.findMany({
      include: {
        StartStop: true, // Include details of the start stop
        EndStop: true,   // Include details of the end stop
        RouteStops: true, // Include details of the route stops
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
    console.log('POST request received for creating a new route'); // Debugging

    const data = await req.json();
    console.log('Data received in API:', data); // Debugging

    // Step 1: Query the latest RouteID
    const latestRoute = await prisma.route.findFirst({
      orderBy: { RouteID: 'desc' },
    });

    let newRouteIdNumber = 1;
    if (latestRoute) {
      const numericPart = parseInt(latestRoute.RouteID.split('-')[1], 10);
      newRouteIdNumber = numericPart + 1;
    }
    const newRouteID = `RT-${newRouteIdNumber.toString().padStart(4, '0')}`;
    console.log('Generated new RouteID:', newRouteID); // Debugging

    // Step 2: Create the Route first
    console.log('Creating new route in the database...'); // Debugging
    const newRoute = await prisma.route.create({
      data: {
        RouteID: newRouteID,
        RouteName: data.RouteName,
        StartStop: { connect: { StopID: data.StartStopID } },
        EndStop: { connect: { StopID: data.EndStopID } },
      },
    });
    console.log('New Route created:', newRoute); // Debugging

    // Step 3: Create RouteStops if provided
    if (data.RouteStops && data.RouteStops.length > 0) {
      console.log('Creating RouteStops in the database...'); // Debugging
      const createdRouteStops = await Promise.all(
        data.RouteStops.map((routeStop: { StopID: string; StopOrder: number }) =>
          prisma.routeStop.create({
            data: {
              RouteStopID: cuid(), // Generate a unique ID for each RouteStop
              RouteID: newRouteID, // Associate with the newly created RouteID
              StopID: routeStop.StopID,
              StopOrder: routeStop.StopOrder,
            },
          })
        )
      );
      console.log('Created RouteStops:', createdRouteStops); // Debugging
    } else {
      console.log('No RouteStops provided, skipping creation.'); // Debugging
    }

    return NextResponse.json(newRoute, { status: 201 });
  } catch (error) {
    console.error('Error creating route:', error); // Debugging
    return NextResponse.json({ error: 'Failed to create route' }, { status: 500 });
  }
}