import { PrismaClient } from '../app/generated/prisma';
import { generateFormattedID } from '../lib/idGenerator'

const prisma = new PrismaClient();

const stopData1 = [
  { StopName: "Sapang Palay Terminal", Location: "14.8139,121.0452" },
  { StopName: "San Jose City Hall", Location: "14.813,121.045" },
  { StopName: "Muzon", Location: "14.8135,121.0455" },
  { StopName: "Gaya-Gaya", Location: "14.8137,121.0457" },
  { StopName: "Grotto", Location: "14.814,121.046" },
  { StopName: "SM City San Jose del Monte", Location: "14.8142,121.0462" },
  { StopName: "SM City Fairview", Location: "14.815,121.0465" },
  { StopName: "Commonwealth Ave", Location: "14.6583,121.0733" },
  { StopName: "Tandang Sora", Location: "14.6751,121.0591" },
  { StopName: "Quezon City Hall", Location: "14.6505,121.0499" },
  { StopName: "Welcome Rotonda", Location: "14.6171,121.0045" },
  { StopName: "España Blvd / UST", Location: "14.6096,120.9919" },
  { StopName: "Morayta", Location: "14.6077,120.9862" },
  { StopName: "Quiapo Church", Location: "14.5995,120.9835" },
  { StopName: "Carriedo", Location: "14.5998,120.9818" },
  { StopName: "Recto Avenue", Location: "14.6003,120.9789" },
  { StopName: "Tutuban Center", Location: "14.6061,120.9729" },
  { StopName: "Divisoria", Location: "14.6011,120.9743" },
];

const stopData2 = [
  { StopName: "Sapang Palay Terminal", Location: "14.8139,121.0452" },
  { StopName: "San Jose City Hall", Location: "14.813,121.045" },
  { StopName: "Muzon", Location: "14.8135,121.0455" },
  { StopName: "Gaya-Gaya", Location: "14.8137,121.0457" },
  { StopName: "Grotto", Location: "14.814,121.046" },
  { StopName: "SM City San Jose del Monte", Location: "14.8142,121.0462" },
  { StopName: "SM City Fairview", Location: "14.815,121.0465" },
  { StopName: "Commonwealth/Regalado Avenue", Location: "14.8155,121.0467" },
  { StopName: "Tandang Sora", Location: "14.816,121.047" },
  { StopName: "Central Avenue", Location: "14.8165,121.0472" },
  { StopName: "UP Ayala Techno Hub", Location: "14.817,121.0475" },
  { StopName: "Philcoa", Location: "14.8175,121.0477" },
  { StopName: "PCMC", Location: "14.818,121.048" },
  { StopName: "Lung Center of the Philippines", Location: "14.8185,121.0482" },
  { StopName: "Quezon City Hall Interchange", Location: "14.819,121.0485" },
  { StopName: "EDSA-Quezon Avenue", Location: "14.8195,121.0487" },
  { StopName: "Quezon-Timog Avenue", Location: "14.82,121.049" },
  { StopName: "Fisher Mall/Pantranco", Location: "14.8205,121.0492" },
  { StopName: "Fisher Mall", Location: "14.821,121.0495" },
  { StopName: "Morayta", Location: "14.8215,121.0497" },
  { StopName: "Quiapo", Location: "14.822,121.05" },
  { StopName: "UN Avenue", Location: "14.8225,121.0502" },
  { StopName: "Leveriza", Location: "14.823,121.0505" },
  { StopName: "Gil Puyat/Harrison", Location: "14.8235,121.0507" },
  { StopName: "Shell Residences", Location: "14.824,121.051" },
  { StopName: "Mall of Asia", Location: "14.8245,121.0512" },
  { StopName: "DFA", Location: "14.825,121.0515" },
  { StopName: "Ayala Malls Manila Bay", Location: "14.8255,121.0517" },
  { StopName: "PITX Arrivals/Transfers", Location: "14.826,121.052" },
];

async function seedQuotaPolicy() {
  const quotaPolicyData = [
    {
      StartDate: new Date('2025-01-04T08:00:00'), // 8:00 AM
      EndDate: new Date('2025-01-04T18:00:00'),   // 6:00 PM
    },
    {
      StartDate: new Date('2025-07-04T09:00:00'), // 9:00 AM
      EndDate: new Date('2025-07-04T17:00:00'),   // 5:00 PM
    },
    {
      StartDate: new Date('2025-10-04T08:00:00'), // 8:00 AM
      EndDate: new Date('2025-10-04T18:00:00'),   // 6:00 PM
    },
    {
      StartDate: new Date('2025-12-04T09:00:00'), // 9:00 AM
      EndDate: new Date('2025-12-04T17:00:00'),   // 5:00 PM
    },
  ];

  // Generate formatted IDs and seed data
  for (let i = 0; i < quotaPolicyData.length; i++) {
    const quotaPolicyID = await generateFormattedID('QTA')
    await prisma.quota_Policy.create({
      data: {
        QuotaPolicyID: quotaPolicyID,
        StartDate: quotaPolicyData[i].StartDate,
        EndDate: quotaPolicyData[i].EndDate,
      }
    });
  }

  console.log('Quota_Policy seeded');
}

async function seedFixed() {
  const quotaPolicies = await prisma.quota_Policy.findMany(); // Fetch all QuotaPolicy records

  const fixedData = [
    { FQuotaPolicyID: quotaPolicies[0].QuotaPolicyID, Quota: 1000 },
    { FQuotaPolicyID: quotaPolicies[2].QuotaPolicyID, Quota: 2000 },
  ];

  // Generate formatted IDs and seed data for Fixed
  for (let i = 0; i < fixedData.length; i++) {
    await prisma.fixed.create({
      data: {
        FQuotaPolicyID: fixedData[i].FQuotaPolicyID,
        Quota: fixedData[i].Quota,
      }
    });
  }

  console.log('Fixed seeded');
}

async function seedPercentage() {
  const quotaPolicies = await prisma.quota_Policy.findMany(); // Fetch all QuotaPolicy records

  const percentageData = [
    { PQuotaPolicyID: quotaPolicies[1].QuotaPolicyID, Percentage: 0.1 },
    { PQuotaPolicyID: quotaPolicies[3].QuotaPolicyID, Percentage: 0.2 },
  ];

  // Generate formatted IDs and seed data for Percentage
  for (let i = 0; i < percentageData.length; i++) {
    await prisma.percentage.create({
      data: {
        PQuotaPolicyID: percentageData[i].PQuotaPolicyID,
        Percentage: percentageData[i].Percentage,
      }
    });
  }

  console.log('Percentage seeded');
}

async function seedStops() {

  
  // Combine and remove duplicates by StopName (first occurrence kept)
  const combinedUniqueStops = Array.from(
    new Map([...stopData1, ...stopData2].map(stop => [stop.StopName, stop])).values()
  );
  
  for (const stop of combinedUniqueStops) {
    const stopID = await generateFormattedID('STP');
    await prisma.stop.create({
      data: {
        StopID: stopID,
        StopName: stop.StopName,
        Location: stop.Location,
      }
    });
  }

  console.log('Stops seeded');
}

async function seedRoutes() {
  // Fetch all stops
  const stops = await prisma.stop.findMany();

  // Helper function to find stop by name
  const getStopIDByName = (name: string) => {
    const stop = stops.find(s => s.StopName.toLowerCase() === name.toLowerCase());
    if (!stop) throw new Error(`Stop with name "${name}" not found.`);
    return stop.StopID;
  };

  // Get StopIDs for specific locations
  const sapangPalayID = getStopIDByName('Sapang Palay Terminal');
  const pitxID = getStopIDByName('PITX Arrivals/Transfers');
  const divisoriaID = getStopIDByName('Divisoria');

  // Route: Sapang Palay to PITX
  const routeID1 = await generateFormattedID('RT');
  await prisma.route.create({
    data: {
      RouteID: routeID1,
      StartStopID: sapangPalayID,
      EndStopID: pitxID,
      RouteName: 'Sapang Palay to PITX',
    },
  });

  // Route: PITX to Sapang Palay
  const routeID2 = await generateFormattedID('RT');
  await prisma.route.create({
    data: {
      RouteID: routeID2,
      StartStopID: pitxID,
      EndStopID: sapangPalayID,
      RouteName: 'PITX to Sapang Palay',
    },
  });

  // Route: Sapang Palay to Divisoria
  const routeID3 = await generateFormattedID('RT');
  await prisma.route.create({
    data: {
      RouteID: routeID3,
      StartStopID: sapangPalayID,
      EndStopID: divisoriaID,
      RouteName: 'Sapang Palay to Divisoria',
    },
  });

  // Route: Divisoria to Sapang Palay
  const routeID4 = await generateFormattedID('RT');
  await prisma.route.create({
    data: {
      RouteID: routeID4,
      StartStopID: divisoriaID,
      EndStopID: sapangPalayID,
      RouteName: 'Divisoria to Sapang Palay',
    },
  });

  console.log('Routes seeded successfully');
}

async function seedRouteStops() {
  const routes = await prisma.route.findMany();
  const stops = await prisma.stop.findMany();

  if (routes.length < 4 || stops.length === 0) {
    throw new Error('Insufficient routes or stops found.');
  }

  // Helper to map StopName to StopID
  const stopMap = new Map();
  for (const stop of stops) {
    stopMap.set(stop.StopName, stop.StopID);
  }

  const routeStopDataSets = [
    { routeIndex: 0, stopData: stopData1 }, // Sapang Palay to PITX
    { routeIndex: 1, stopData: [...stopData1].reverse() }, // PITX to Sapang Palay
    { routeIndex: 2, stopData: stopData2 }, // Sapang Palay to Divisoria
    { routeIndex: 3, stopData: [...stopData2].reverse() }, // Divisoria to Sapang Palay
  ];

  for (const { routeIndex, stopData } of routeStopDataSets) {
    const route = routes[routeIndex];
    let stopOrder = 1;

    for (const stopInfo of stopData) {
      const stopID = stopMap.get(stopInfo.StopName);
      if (!stopID) {
        console.warn(`⚠️ Stop "${stopInfo.StopName}" not found in database. Skipping.`);
        continue;
      }

      const routeStopID = await generateFormattedID('RTS');
      await prisma.routeStop.create({
        data: {
          RouteStopID: routeStopID,
          RouteID: route.RouteID,
          StopID: stopID,
          StopOrder: stopOrder,
        },
      });

      stopOrder++;
    }
  }

  console.log('RouteStops seeded successfully');
}

async function seedBusAssignments() {
  // Generate bus assignment IDs
  const busAssignmentID1 = await generateFormattedID('BA');
  
   // Retrieve all routes sorted by RouteID
  const allRoutes = await prisma.route.findMany({
    orderBy: { RouteID: "asc" },
  });

  const routeID1 = allRoutes[0]?.RouteID;
  const routeID3 = allRoutes[2]?.RouteID;

  // Create each bus assignment one by one to avoid duplicate IDs
  await prisma.busAssignment.create({
    data: {
      BusAssignmentID: busAssignmentID1,
      BusID: "BUS-0001",
      RouteID: routeID1,
      AssignmentDate: new Date('2025-04-15'),
      Battery: true,
      Lights: true,
      Oil: true,
      Water: true,
      Break: true,
      Air: true,
      Gas: true,
      Engine: true,
      TireCondition: true,
      Self: true,
      IsDeleted: false,
    },
  });

  const busAssignmentID2 = await generateFormattedID('BA');
  await prisma.busAssignment.create({
    data: {
      BusAssignmentID: busAssignmentID2,
      BusID: "BUS-0002",
      RouteID: routeID3,
      AssignmentDate: new Date('2025-04-16'),
      Battery: false,
      Lights: true,
      Oil: true,
      Water: false,
      Break: true,
      Air: true,
      Gas: true,
      Engine: true,
      TireCondition: false,
      Self: true,
      IsDeleted: false,
    },
  });

  console.log('Bus assignments seeded');
}

async function seedRegularBusAssignments() {

  const [busAssignments, quotaPolicies] = await Promise.all([
    prisma.busAssignment.findMany({
      orderBy: { AssignmentDate: 'asc' },  // Order by AssignmentDate or another field
      take: 2,  // Assuming you need the first two BusAssignments
    }),
    prisma.quota_Policy.findMany({
      orderBy: { StartDate: 'asc' },  // Order by StartDate or another field
      take: 2,  // Assuming you need the first two QuotaPolicies
    }),
  ]);

  if (busAssignments.length < 2 || quotaPolicies.length < 2) {
    throw new Error('Not enough BusAssignments or QuotaPolicies to create RegularBusAssignments.');
  }

  await prisma.regularBusAssignment.createMany({
    data: [
      {
        RegularBusAssignmentID: busAssignments[0].BusAssignmentID,  // Foreign key from BusAssignments
        DriverID: "DRV-0001",             // Assuming DriverID is from API
        ConductorID: "CDT-0001",          // Assuming ConductorID is from API
        QuotaPolicyID: quotaPolicies[0].QuotaPolicyID,          
        Change: 0.05,
        TripRevenue: 1200.50,
      },
      {
        RegularBusAssignmentID: busAssignments[1].BusAssignmentID,  // Foreign key from BusAssignments
        DriverID: "DRV-0002",             // Assuming DriverID is from API
        ConductorID: "CDT-0001",          // Assuming ConductorID is from API
        QuotaPolicyID: quotaPolicies[1].QuotaPolicyID,          
        Change: 0.07,
        TripRevenue: 1300.75,
      },
    ],
  });

  console.log('Regular bus assignments seeded');
}

async function main() {
  await seedQuotaPolicy();
  await seedFixed();
  await seedPercentage();
  await seedStops();
  await seedRoutes();
  await seedRouteStops();
  await seedBusAssignments();
  await seedRegularBusAssignments();
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
