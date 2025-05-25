import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/client'; // Importing the Prisma client instance to interact with the database

enum BusOperationStatus {
  NotStarted = 'NotStarted',
  InOperation = 'InOperation',
  Completed = 'Completed',
}

type BusAssignmentWhereInput = {
  IsDeleted?: boolean;
  Status?: BusOperationStatus;
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');

    const whereClause: BusAssignmentWhereInput = { IsDeleted: false };

    if (status !== null) {
      if (
        status === BusOperationStatus.NotStarted ||
        status === BusOperationStatus.InOperation ||
        status === BusOperationStatus.Completed
      ) {
        whereClause.Status = status;
      } else {
        return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
      }
    }

    const busAssignments = await prisma.busAssignment.findMany({
      where: whereClause,
      include: {
        RegularBusAssignment: true,
      },
    });

    return NextResponse.json(busAssignments);
  } catch (error) {
    console.error('Failed to fetch bus assignments:', error);
    return NextResponse.json({ error: 'Failed to fetch bus assignments' }, { status: 500 });
  }
}

type BusAssignmentUpdateData = Partial<{
  Status: BusOperationStatus;
  Battery: boolean;
  Lights: boolean;
  Oil: boolean;
  Water: boolean;
  Break: boolean;
  Air: boolean;
  Gas: boolean;
  Engine: boolean;
  TireCondition: boolean;
  Self_Driver: boolean;
  Self_Conductor: boolean;
}>;

type RegularBusAssignmentUpdateData = Partial<{
  Change: number;
  TripRevenue: number;
}>;

export async function PUT(request: Request, { params }: { params: { BusAssignmentID: string } }) {
    const { BusAssignmentID } = await params;

  if (!BusAssignmentID) {
    return NextResponse.json({ error: 'BusAssignmentID is required in URL' }, { status: 400 });
  }

  try {
    const body = await request.json();

    // Validate status if present
    if (body.Status && !Object.values(BusOperationStatus).includes(body.Status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    // Extract BusAssignment fields from body
    const busAssignmentFields: BusAssignmentUpdateData = {};
    const booleanFields: (keyof BusAssignmentUpdateData)[] = [
      'Battery',
      'Lights',
      'Oil',
      'Water',
      'Break',
      'Air',
      'Gas',
      'Engine',
      'TireCondition',
      'Self_Driver',
      'Self_Conductor',
    ];

    if (body.Status) busAssignmentFields.Status = body.Status;

    for (const field of booleanFields) {
      if (field in body) {
        busAssignmentFields[field] = body[field];
      }
    }

    // Update BusAssignment
    const updatedBusAssignment = await prisma.busAssignment.update({
      where: { BusAssignmentID },
      data: busAssignmentFields,
      include: { RegularBusAssignment: true },
    });

    // Update RegularBusAssignment if exists and if Change or TripRevenue are present
    const regularFields: (keyof RegularBusAssignmentUpdateData)[] = ['Change', 'TripRevenue'];
    const regularBusAssignmentFields: RegularBusAssignmentUpdateData = {};

    for (const field of regularFields) {
      if (field in body) {
        regularBusAssignmentFields[field] = body[field];
      }
    }

    if (updatedBusAssignment.RegularBusAssignment) {
      if (Object.keys(regularBusAssignmentFields).length > 0) {
        await prisma.regularBusAssignment.update({
          where: { RegularBusAssignmentID: updatedBusAssignment.RegularBusAssignment.RegularBusAssignmentID },
          data: regularBusAssignmentFields,
        });
      }
    } else if (Object.keys(regularBusAssignmentFields).length > 0) {
      return NextResponse.json(
        { error: 'No RegularBusAssignment related to this BusAssignment to update Change or TripRevenue' },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: 'Update successful' });
  } catch (error) {
    console.error('Failed to update bus assignment:', error);
    return NextResponse.json({ error: 'Failed to update bus assignment' }, { status: 500 });
  }
}