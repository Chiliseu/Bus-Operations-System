
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/library.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}




  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Quota_PolicyScalarFieldEnum = {
  QuotaPolicyID: 'QuotaPolicyID',
  StartDate: 'StartDate',
  EndDate: 'EndDate'
};

exports.Prisma.FixedScalarFieldEnum = {
  FQuotaPolicyID: 'FQuotaPolicyID',
  Quota: 'Quota'
};

exports.Prisma.PercentageScalarFieldEnum = {
  PQuotaPolicyID: 'PQuotaPolicyID',
  Percentage: 'Percentage'
};

exports.Prisma.StopScalarFieldEnum = {
  StopID: 'StopID',
  StopName: 'StopName',
  latitude: 'latitude',
  longitude: 'longitude',
  IsDeleted: 'IsDeleted'
};

exports.Prisma.RouteScalarFieldEnum = {
  RouteID: 'RouteID',
  StartStopID: 'StartStopID',
  EndStopID: 'EndStopID',
  RouteName: 'RouteName',
  IsDeleted: 'IsDeleted'
};

exports.Prisma.RouteStopScalarFieldEnum = {
  RouteStopID: 'RouteStopID',
  RouteID: 'RouteID',
  StopID: 'StopID',
  StopOrder: 'StopOrder'
};

exports.Prisma.TicketTypeScalarFieldEnum = {
  TicketTypeID: 'TicketTypeID',
  Value: 'Value'
};

exports.Prisma.TicketBusAssignmentScalarFieldEnum = {
  TicketBusAssignmentID: 'TicketBusAssignmentID',
  BusAssignmentID: 'BusAssignmentID',
  TicketTypeID: 'TicketTypeID',
  StartingIDNumber: 'StartingIDNumber',
  EndingIDNumber: 'EndingIDNumber'
};

exports.Prisma.BusAssignmentScalarFieldEnum = {
  BusAssignmentID: 'BusAssignmentID',
  BusID: 'BusID',
  RouteID: 'RouteID',
  AssignmentDate: 'AssignmentDate',
  Battery: 'Battery',
  Lights: 'Lights',
  Oil: 'Oil',
  Water: 'Water',
  Break: 'Break',
  Air: 'Air',
  Gas: 'Gas',
  Engine: 'Engine',
  TireCondition: 'TireCondition',
  Self_Driver: 'Self_Driver',
  Self_Conductor: 'Self_Conductor',
  IsDeleted: 'IsDeleted',
  Status: 'Status'
};

exports.Prisma.RegularBusAssignmentScalarFieldEnum = {
  RegularBusAssignmentID: 'RegularBusAssignmentID',
  DriverID: 'DriverID',
  ConductorID: 'ConductorID',
  QuotaPolicyID: 'QuotaPolicyID',
  Change: 'Change',
  TripRevenue: 'TripRevenue'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};
exports.BusOperationStatus = exports.$Enums.BusOperationStatus = {
  NotStarted: 'NotStarted',
  InOperation: 'InOperation',
  Completed: 'Completed'
};

exports.Prisma.ModelName = {
  Quota_Policy: 'Quota_Policy',
  Fixed: 'Fixed',
  Percentage: 'Percentage',
  Stop: 'Stop',
  Route: 'Route',
  RouteStop: 'RouteStop',
  TicketType: 'TicketType',
  TicketBusAssignment: 'TicketBusAssignment',
  BusAssignment: 'BusAssignment',
  RegularBusAssignment: 'RegularBusAssignment'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\JM Garces\\Desktop\\CAPSTONE SHIT\\Capstone_Real\\Bus-Operations-System\\app\\generated\\prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "C:\\Users\\JM Garces\\Desktop\\CAPSTONE SHIT\\Capstone_Real\\Bus-Operations-System\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": "postgresql://postgres:admin@localhost:5432/busoperations"
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"../app/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel Quota_Policy {\n  QuotaPolicyID String   @id\n  StartDate     DateTime\n  EndDate       DateTime\n\n  Fixed                 Fixed?\n  Percentage            Percentage?\n  RegularBusAssignments RegularBusAssignment[]\n}\n\nmodel Fixed {\n  FQuotaPolicyID String @id\n  Quota          Float\n\n  quotaPolicy Quota_Policy @relation(fields: [FQuotaPolicyID], references: [QuotaPolicyID], onDelete: Cascade)\n}\n\nmodel Percentage {\n  PQuotaPolicyID String       @id\n  Percentage     Float\n  quotaPolicy    Quota_Policy @relation(fields: [PQuotaPolicyID], references: [QuotaPolicyID], onDelete: Cascade)\n}\n\nmodel Stop {\n  StopID    String  @id\n  StopName  String\n  latitude  String\n  longitude String\n  IsDeleted Boolean\n\n  routesAsStart Route[]     @relation(\"StartStop\")\n  routesAsEnd   Route[]     @relation(\"EndStop\")\n  RouteStops    RouteStop[]\n}\n\nmodel Route {\n  RouteID     String  @id\n  StartStopID String\n  EndStopID   String\n  RouteName   String\n  IsDeleted   Boolean\n\n  StartStop      Stop            @relation(\"StartStop\", fields: [StartStopID], references: [StopID])\n  EndStop        Stop            @relation(\"EndStop\", fields: [EndStopID], references: [StopID])\n  RouteStops     RouteStop[]\n  BusAssignments BusAssignment[]\n}\n\nmodel RouteStop {\n  RouteStopID String @id\n  RouteID     String\n  StopID      String\n  StopOrder   Int\n  Route       Route  @relation(fields: [RouteID], references: [RouteID])\n  Stop        Stop   @relation(fields: [StopID], references: [StopID])\n\n  @@unique([RouteID, StopID])\n}\n\nenum BusOperationStatus {\n  NotStarted\n  InOperation\n  Completed\n}\n\nmodel TicketType {\n  TicketTypeID         String                @id\n  Value                Float\n  TicketBusAssignments TicketBusAssignment[]\n\n  @@map(\"Ticket_Type\")\n}\n\nmodel TicketBusAssignment {\n  TicketBusAssignmentID String @id\n  BusAssignmentID       String\n  TicketTypeID          String\n  StartingIDNumber      Int\n  EndingIDNumber        Int\n\n  BusAssignment BusAssignment @relation(fields: [BusAssignmentID], references: [BusAssignmentID])\n  TicketType    TicketType    @relation(fields: [TicketTypeID], references: [TicketTypeID])\n\n  @@map(\"TicketBusAssignment\")\n}\n\nmodel BusAssignment {\n  BusAssignmentID String             @id\n  BusID           String\n  RouteID         String\n  AssignmentDate  DateTime\n  Battery         Boolean            @default(false)\n  Lights          Boolean            @default(false)\n  Oil             Boolean            @default(false)\n  Water           Boolean            @default(false)\n  Break           Boolean            @default(false)\n  Air             Boolean            @default(false)\n  Gas             Boolean            @default(false)\n  Engine          Boolean            @default(false)\n  TireCondition   Boolean            @default(false)\n  Self_Driver     Boolean            @default(false)\n  Self_Conductor  Boolean            @default(false)\n  IsDeleted       Boolean            @default(false)\n  Status          BusOperationStatus @default(NotStarted)\n\n  Route                Route                 @relation(fields: [RouteID], references: [RouteID])\n  RegularBusAssignment RegularBusAssignment?\n  TicketBusAssignments TicketBusAssignment[]\n\n  @@index([BusID])\n}\n\nmodel RegularBusAssignment {\n  RegularBusAssignmentID String        @id\n  DriverID               String\n  ConductorID            String\n  QuotaPolicyID          String\n  Change                 Float\n  TripRevenue            Float\n  quotaPolicy            Quota_Policy  @relation(fields: [QuotaPolicyID], references: [QuotaPolicyID])\n  BusAssignment          BusAssignment @relation(fields: [RegularBusAssignmentID], references: [BusAssignmentID])\n\n  @@index([DriverID])\n  @@index([ConductorID])\n}\n",
  "inlineSchemaHash": "984b510aaac0379cae520318879f694b310abf6f0b8536c97522f9ab7ac367f0",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "app/generated/prisma",
    "generated/prisma",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"Quota_Policy\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"QuotaPolicyID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"StartDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"EndDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Fixed\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Fixed\",\"nativeType\":null,\"relationName\":\"FixedToQuota_Policy\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Percentage\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Percentage\",\"nativeType\":null,\"relationName\":\"PercentageToQuota_Policy\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"RegularBusAssignments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RegularBusAssignment\",\"nativeType\":null,\"relationName\":\"Quota_PolicyToRegularBusAssignment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Fixed\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"FQuotaPolicyID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Quota\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quotaPolicy\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Quota_Policy\",\"nativeType\":null,\"relationName\":\"FixedToQuota_Policy\",\"relationFromFields\":[\"FQuotaPolicyID\"],\"relationToFields\":[\"QuotaPolicyID\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Percentage\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"PQuotaPolicyID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Percentage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quotaPolicy\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Quota_Policy\",\"nativeType\":null,\"relationName\":\"PercentageToQuota_Policy\",\"relationFromFields\":[\"PQuotaPolicyID\"],\"relationToFields\":[\"QuotaPolicyID\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Stop\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"StopID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"StopName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"latitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"longitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"IsDeleted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"routesAsStart\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Route\",\"nativeType\":null,\"relationName\":\"StartStop\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"routesAsEnd\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Route\",\"nativeType\":null,\"relationName\":\"EndStop\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"RouteStops\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RouteStop\",\"nativeType\":null,\"relationName\":\"RouteStopToStop\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Route\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"RouteID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"StartStopID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"EndStopID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"RouteName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"IsDeleted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"StartStop\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Stop\",\"nativeType\":null,\"relationName\":\"StartStop\",\"relationFromFields\":[\"StartStopID\"],\"relationToFields\":[\"StopID\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"EndStop\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Stop\",\"nativeType\":null,\"relationName\":\"EndStop\",\"relationFromFields\":[\"EndStopID\"],\"relationToFields\":[\"StopID\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"RouteStops\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RouteStop\",\"nativeType\":null,\"relationName\":\"RouteToRouteStop\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"BusAssignments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BusAssignment\",\"nativeType\":null,\"relationName\":\"BusAssignmentToRoute\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"RouteStop\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"RouteStopID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"RouteID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"StopID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"StopOrder\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Route\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Route\",\"nativeType\":null,\"relationName\":\"RouteToRouteStop\",\"relationFromFields\":[\"RouteID\"],\"relationToFields\":[\"RouteID\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Stop\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Stop\",\"nativeType\":null,\"relationName\":\"RouteStopToStop\",\"relationFromFields\":[\"StopID\"],\"relationToFields\":[\"StopID\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"RouteID\",\"StopID\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"RouteID\",\"StopID\"]}],\"isGenerated\":false},\"TicketType\":{\"dbName\":\"Ticket_Type\",\"schema\":null,\"fields\":[{\"name\":\"TicketTypeID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TicketBusAssignments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TicketBusAssignment\",\"nativeType\":null,\"relationName\":\"TicketBusAssignmentToTicketType\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TicketBusAssignment\":{\"dbName\":\"TicketBusAssignment\",\"schema\":null,\"fields\":[{\"name\":\"TicketBusAssignmentID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"BusAssignmentID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TicketTypeID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"StartingIDNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"EndingIDNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"BusAssignment\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BusAssignment\",\"nativeType\":null,\"relationName\":\"BusAssignmentToTicketBusAssignment\",\"relationFromFields\":[\"BusAssignmentID\"],\"relationToFields\":[\"BusAssignmentID\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TicketType\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TicketType\",\"nativeType\":null,\"relationName\":\"TicketBusAssignmentToTicketType\",\"relationFromFields\":[\"TicketTypeID\"],\"relationToFields\":[\"TicketTypeID\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BusAssignment\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"BusAssignmentID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"BusID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"RouteID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"AssignmentDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Battery\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Lights\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Oil\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Water\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Break\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Air\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Gas\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Engine\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TireCondition\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Self_Driver\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Self_Conductor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"IsDeleted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BusOperationStatus\",\"nativeType\":null,\"default\":\"NotStarted\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Route\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Route\",\"nativeType\":null,\"relationName\":\"BusAssignmentToRoute\",\"relationFromFields\":[\"RouteID\"],\"relationToFields\":[\"RouteID\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"RegularBusAssignment\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RegularBusAssignment\",\"nativeType\":null,\"relationName\":\"BusAssignmentToRegularBusAssignment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TicketBusAssignments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TicketBusAssignment\",\"nativeType\":null,\"relationName\":\"BusAssignmentToTicketBusAssignment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"RegularBusAssignment\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"RegularBusAssignmentID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"DriverID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ConductorID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"QuotaPolicyID\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Change\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TripRevenue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quotaPolicy\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Quota_Policy\",\"nativeType\":null,\"relationName\":\"Quota_PolicyToRegularBusAssignment\",\"relationFromFields\":[\"QuotaPolicyID\"],\"relationToFields\":[\"QuotaPolicyID\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"BusAssignment\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BusAssignment\",\"nativeType\":null,\"relationName\":\"BusAssignmentToRegularBusAssignment\",\"relationFromFields\":[\"RegularBusAssignmentID\"],\"relationToFields\":[\"BusAssignmentID\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"BusOperationStatus\":{\"values\":[{\"name\":\"NotStarted\",\"dbName\":null},{\"name\":\"InOperation\",\"dbName\":null},{\"name\":\"Completed\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "query_engine-windows.dll.node");
path.join(process.cwd(), "app/generated/prisma/query_engine-windows.dll.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "app/generated/prisma/schema.prisma")
