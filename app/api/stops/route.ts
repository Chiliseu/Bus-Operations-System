import { NextResponse } from 'next/server';
import prisma from '@/client';
import cuid from 'cuid'; // For generating unique IDs

export async function GET() {
  try {
    const stops = await prisma.stop.findMany({
      include: {
        routesAsStart: true,   // Gets all routes where this stop is the start
        routesAsEnd: true,     // Gets all routes where this stop is the end
        RouteStops: true       // Gets all route-stop associations
      }
    });

    console.log('Stops from database:', stops);

    return NextResponse.json(stops);
  } catch (error) {
    console.error('Error fetching stops:', error);
    return NextResponse.json({ error: 'Failed to fetch stops' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {

    const { StopName, Location } = await req.json();
    console.log(StopName, Location); // Debugging
    // Validate input
    if (!StopName || !Location) {
      return NextResponse.json(
        { error: 'Invalid input. StopName and Location are required.' },
        { status: 400 }
      );
    }

    // Generate a unique StopID
    const StopID = cuid();

    // Create a new stop in the database
    const newStop = await prisma.stop.create({
      data: {
        StopID,
        StopName,
        Location,
      },
    });

    console.log('New stop created:', newStop);

    return NextResponse.json(newStop, { status: 201 });
  } catch (error) {
    console.error('Error creating stop:', error);
    return NextResponse.json({ error: 'Failed to create stop' }, { status: 500 });
  }
}