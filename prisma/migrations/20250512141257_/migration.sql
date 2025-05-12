-- CreateTable
CREATE TABLE "Quota_Policy" (
    "QuotaPolicyID" TEXT NOT NULL,
    "StartDate" TIMESTAMP(3) NOT NULL,
    "EndDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quota_Policy_pkey" PRIMARY KEY ("QuotaPolicyID")
);

-- CreateTable
CREATE TABLE "Fixed" (
    "FQuotaPolicyID" TEXT NOT NULL,
    "Quota" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Fixed_pkey" PRIMARY KEY ("FQuotaPolicyID")
);

-- CreateTable
CREATE TABLE "Percentage" (
    "PQuotaPolicyID" TEXT NOT NULL,
    "Percentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Percentage_pkey" PRIMARY KEY ("PQuotaPolicyID")
);

-- CreateTable
CREATE TABLE "Stop" (
    "StopID" TEXT NOT NULL,
    "StopName" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "Stop_pkey" PRIMARY KEY ("StopID")
);

-- CreateTable
CREATE TABLE "Route" (
    "RouteID" TEXT NOT NULL,
    "StartStopID" TEXT NOT NULL,
    "EndStopID" TEXT NOT NULL,
    "RouteName" TEXT NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("RouteID")
);

-- CreateTable
CREATE TABLE "RouteStop" (
    "RouteStopID" TEXT NOT NULL,
    "RouteID" TEXT NOT NULL,
    "StopID" TEXT NOT NULL,
    "StopOrder" INTEGER NOT NULL,

    CONSTRAINT "RouteStop_pkey" PRIMARY KEY ("RouteStopID")
);

-- CreateTable
CREATE TABLE "BusAssignment" (
    "BusAssignmentID" TEXT NOT NULL,
    "BusID" TEXT NOT NULL,
    "RouteID" TEXT NOT NULL,
    "AssignmentDate" TIMESTAMP(3) NOT NULL,
    "Battery" BOOLEAN NOT NULL,
    "Lights" BOOLEAN NOT NULL,
    "Oil" BOOLEAN NOT NULL,
    "Water" BOOLEAN NOT NULL,
    "Break" BOOLEAN NOT NULL,
    "Air" BOOLEAN NOT NULL,
    "Gas" BOOLEAN NOT NULL,
    "Engine" BOOLEAN NOT NULL,
    "TireCondition" BOOLEAN NOT NULL,
    "Self" BOOLEAN NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "BusAssignment_pkey" PRIMARY KEY ("BusAssignmentID")
);

-- CreateTable
CREATE TABLE "RegularBusAssignment" (
    "RegularBusAssignmentID" TEXT NOT NULL,
    "DriverID" TEXT NOT NULL,
    "ConductorID" TEXT NOT NULL,
    "QuotaPolicyID" TEXT NOT NULL,
    "Change" DOUBLE PRECISION NOT NULL,
    "TripRevenue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RegularBusAssignment_pkey" PRIMARY KEY ("RegularBusAssignmentID")
);

-- CreateIndex
CREATE UNIQUE INDEX "RouteStop_RouteID_StopID_key" ON "RouteStop"("RouteID", "StopID");

-- CreateIndex
CREATE INDEX "BusAssignment_BusID_idx" ON "BusAssignment"("BusID");

-- CreateIndex
CREATE INDEX "RegularBusAssignment_DriverID_idx" ON "RegularBusAssignment"("DriverID");

-- CreateIndex
CREATE INDEX "RegularBusAssignment_ConductorID_idx" ON "RegularBusAssignment"("ConductorID");

-- AddForeignKey
ALTER TABLE "Fixed" ADD CONSTRAINT "Fixed_FQuotaPolicyID_fkey" FOREIGN KEY ("FQuotaPolicyID") REFERENCES "Quota_Policy"("QuotaPolicyID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Percentage" ADD CONSTRAINT "Percentage_PQuotaPolicyID_fkey" FOREIGN KEY ("PQuotaPolicyID") REFERENCES "Quota_Policy"("QuotaPolicyID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_StartStopID_fkey" FOREIGN KEY ("StartStopID") REFERENCES "Stop"("StopID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_EndStopID_fkey" FOREIGN KEY ("EndStopID") REFERENCES "Stop"("StopID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteStop" ADD CONSTRAINT "RouteStop_RouteID_fkey" FOREIGN KEY ("RouteID") REFERENCES "Route"("RouteID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteStop" ADD CONSTRAINT "RouteStop_StopID_fkey" FOREIGN KEY ("StopID") REFERENCES "Stop"("StopID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusAssignment" ADD CONSTRAINT "BusAssignment_RouteID_fkey" FOREIGN KEY ("RouteID") REFERENCES "Route"("RouteID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegularBusAssignment" ADD CONSTRAINT "RegularBusAssignment_QuotaPolicyID_fkey" FOREIGN KEY ("QuotaPolicyID") REFERENCES "Quota_Policy"("QuotaPolicyID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegularBusAssignment" ADD CONSTRAINT "RegularBusAssignment_RegularBusAssignmentID_fkey" FOREIGN KEY ("RegularBusAssignmentID") REFERENCES "BusAssignment"("BusAssignmentID") ON DELETE RESTRICT ON UPDATE CASCADE;
