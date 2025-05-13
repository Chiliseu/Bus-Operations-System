import { NextResponse } from 'next/server';
import prisma from '@/client';
import cuid from 'cuid';
import { generateFormattedID } from '../../../lib/idGenerator';

export async function GET() {
  try {
    const stops = await prisma.stop.findMany({
      where: {
        IsDeleted: false, // Only fetch stops that are not soft-deleted
      },
      include: {
        routesAsStart: true,
        routesAsEnd: true,
        RouteStops: true,
      },
    });

    console.log('Non-deleted stops from database:', stops);

    return NextResponse.json(stops);
  } catch (error) {
    console.error('Error fetching stops:', error);
    return NextResponse.json({ error: 'Failed to fetch stops' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { StopName, latitude, longitude  } = await req.json();
    console.log(StopName, latitude, longitude); // Debugging

    // Validate input
    if (!StopName || !latitude || !longitude) {
      return NextResponse.json(
        { error: 'Invalid input. StopName and Location with latitude and longitude are required.' },
        { status: 400 }
      );
    }

    // Generate a unique StopID
    const StopID = await generateFormattedID('STP');

    // Create a new stop in the database
    const newStop = await prisma.stop.create({
      data: {
        StopID,
        StopName,
        latitude: latitude,
        longitude: longitude,
        IsDeleted: false, // Default to false when creating
      },
    });

    console.log('New stop created:', newStop);

    return NextResponse.json(newStop, { status: 201 });
  } catch (error) {
    console.error('Error creating stop:', error);
    return NextResponse.json({ error: 'Failed to create stop' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { StopID, StopName, latitude, longitude, IsDeleted } = data;

    if (!StopID) {
      return NextResponse.json({ error: 'StopID is required.' }, { status: 400 });
    }

    // Step 1: Soft delete if IsDeleted is true
    if (IsDeleted === true) {
      const softDeletedStop = await prisma.stop.update({
        where: { StopID },
        data: { IsDeleted: true },
      });

      return NextResponse.json(softDeletedStop, { status: 200 });
    }

    // Step 2: Ensure stop exists
    const existingStop = await prisma.stop.findUnique({
      where: { StopID },
    });

    if (!existingStop) {
      return NextResponse.json({ error: 'Stop not found.' }, { status: 404 });
    }

    // Step 3: Perform the update
    const updatedStop = await prisma.stop.update({
      where: { StopID },
      data: {
        StopName,
        latitude,
        longitude,
      },
    });

    return NextResponse.json(updatedStop, { status: 200 });

  } catch (error) {
    console.error('Error updating stop:', error);
    return NextResponse.json({ error: 'Failed to update stop' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { stopID, isDeleted } = await req.json(); // Extract stopID and isDeleted from the request body

    if (!stopID) {
      return NextResponse.json({ error: 'stopID is required' }, { status: 400 });
    }

    // Update the isDeleted column for the specified stop
    const updatedStop = await prisma.stop.update({
      where: { StopID: stopID },
      data: { IsDeleted: isDeleted },
    });

    return NextResponse.json(updatedStop, { status: 200 });
  } catch (error) {
    console.error('Error updating stop:', error);
    return NextResponse.json({ error: 'Failed to update stop' }, { status: 500 });
  }
}
