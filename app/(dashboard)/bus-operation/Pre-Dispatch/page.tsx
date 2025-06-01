'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './bus-operation.module.css';
import '../../../../styles/globals.css';
import Image from 'next/image';
import PaginationComponent from '@/components/ui/PaginationV2';
import BusReadinessModal from '@/components/modal/UpdateBusReadinessModal';
import { fetchDriverById, fetchConductorById, fetchBusById } from '@/lib/apiCalls/external';

// Import interfaces
import { RegularBusAssignment } from '@/app/interface/regular-bus-assignment';

// Sample data of regular bus assignments
const sampleRegularAssignments: RegularBusAssignment[] = [
  {
    RegularBusAssignmentID: 'RBA-1',
    DriverID: 'D1',
    ConductorID: 'C1',
    Change: 0,
    TripRevenue: 0,
    quota_Policy: [{
      QuotaPolicyID: 'Q1',
      StartDate: new Date(),
      EndDate: new Date(),
      Fixed: undefined,
      Percentage: undefined,
      RegularBusAssignmentID: "asdasd",
    }],
    BusAssignment: {
      BusAssignmentID: '1',
      BusID: 'Bus 101',
      RouteID: 'Route 1',
      AssignmentDate: new Date(),
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
      Route: {
        RouteID: 'Route 1',
        StartStopID: '',
        EndStopID: '',
        RouteName: 'Route 1',
        IsDeleted: false,
        StartStop: undefined,
        EndStop: undefined,
        RouteStops: [],
        BusAssignments: [],
      },
      IsDeleted: false,
      RegularBusAssignment: undefined, // Avoid circular reference in sample
    },
  },
  {
    RegularBusAssignmentID: 'RBA-2',
    DriverID: 'D2',
    ConductorID: 'C2',
    Change: 0,
    TripRevenue: 0,
    quota_Policy: [{
      QuotaPolicyID: 'Q2',
      StartDate: new Date(),
      EndDate: new Date(),
      Fixed: undefined,
      Percentage: undefined,
      RegularBusAssignmentID: 'sddfsdf',
    }],
    BusAssignment: {
      BusAssignmentID: '2',
      BusID: 'Bus 102',
      RouteID: 'Route 2',
      AssignmentDate: new Date(),
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
      Route: {
        RouteID: 'Route 2',
        StartStopID: '',
        EndStopID: '',
        RouteName: 'Route 2',
        IsDeleted: false,
        StartStop: undefined,
        EndStop: undefined,
        RouteStops: [],
        BusAssignments: [],
      },
      IsDeleted: false,
      RegularBusAssignment: undefined,
    },
  },
  // ...add more as needed
];

const BusOperationPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [assignments, setAssignments] = useState<RegularBusAssignment[]>([]);
  const [displayedAssignments, setDisplayedAssignments] = useState<RegularBusAssignment[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [pageSize, setPageSize] = useState(10);

  // Bus Readiness Check Modal
  type BusInfo = {
    regularBusAssignmentID: string;
    busNumber: string;
    driver: string;
    conductor: string;
  };
  const [showBusReadinessModal, setShowBusReadinessModal] = useState(false);
  const [selectedRegularBusAssignment, setSelectedRegularBusAssignment] = useState<RegularBusAssignment | null>(null);
  const [selectedBusInfo, setSelectedBusInfo] = useState<BusInfo | null>(null);
  

  // Replace this with your real fetch call
  useEffect(() => {
    setAssignments(sampleRegularAssignments);
  }, []);

  useEffect(() => {
    let filtered = [...assignments];

    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.BusAssignment.BusID.toLowerCase().includes(lower) ||
          a.DriverID.toLowerCase().includes(lower) ||
          a.ConductorID.toLowerCase().includes(lower)
      );
    }

    if (sortOrder === 'Bus A-Z') {
      filtered.sort((a, b) => a.BusAssignment.BusID.localeCompare(b.BusAssignment.BusID));
    } else if (sortOrder === 'Bus Z-A') {
      filtered.sort((a, b) => b.BusAssignment.BusID.localeCompare(a.BusAssignment.BusID));
    } else if (sortOrder === 'Driver A-Z') {
      filtered.sort((a, b) => a.DriverID.localeCompare(b.DriverID));
    } else if (sortOrder === 'Driver Z-A') {
      filtered.sort((a, b) => b.DriverID.localeCompare(a.DriverID));
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedAssignments(filtered.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filtered.length / pageSize));
  }, [currentPage, assignments, searchQuery, sortOrder, pageSize]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSaveReadiness = () => {
    return;
  };

  const handleOpenBusReadinessModal = async (assignment: RegularBusAssignment) => {
    const bus = await fetchBusById(assignment.BusAssignment.BusID);
    const driver = await fetchDriverById(assignment.DriverID);
    const conductor = await fetchConductorById(assignment.ConductorID);

    setSelectedBusInfo({
      regularBusAssignmentID: assignment.RegularBusAssignmentID,
      busNumber: bus?.license_plate || 'Unknown',
      driver: driver?.name || 'Unknown',
      conductor: conductor?.name || 'Unknown',
    });

    setShowBusReadinessModal(true);
  };

  return (
    <div className={`card mx-auto ${styles.wideCard}`}>
      <div className="card mx-auto w-100" style={{ maxWidth: '1700px' }}>
        <div className="card-body">
          {/* Page title */}
          <h2 className={styles.stopTitle}>PRE-DISPATCH BUS OPERATION</h2>
          <h2 className="card-title mb-3">Bus Assignments</h2>

          {/* Search and Sort inputs */}
          <div className="row g-2 mb-3">
            <div className="col-md-4">
              {/* Search input */}
              <input
                type="text"
                className="form-control"
                placeholder="Search by bus, driver, or conductor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              {/* Sort dropdown */}
              <select
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Sort by...</option>
                <option value="Bus A-Z">Bus A-Z</option>
                <option value="Bus Z-A">Bus Z-A</option>
                <option value="Driver A-Z">Driver A-Z</option>
                <option value="Driver Z-A">Driver Z-A</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted ms-1">Check buses that are not ready for dispatch</p>

          {/* Table wrapper with custom styles */}
          <div className={styles.styledTableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Bus</th>
                  <th>Driver</th>
                  <th>Conductor</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedAssignments.length > 0 ? (
                  displayedAssignments.map((assignment) => (
                    <tr key={assignment.RegularBusAssignmentID}>
                      <td>{assignment.BusAssignment.BusID}</td>
                      <td>{assignment.DriverID}</td>
                      <td>{assignment.ConductorID}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-primary p-1"
                          onClick={() => {
                            setShowBusReadinessModal(true);
                            setSelectedRegularBusAssignment(assignment);
                          }}
                          
                        >
                          <Image
                            src="/assets/images/edit-white.png"
                            alt="Edit"
                            width={25}
                            height={25}
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination controls */}
          {displayedAssignments.length > 0 && (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={(size: number) => {
                setPageSize(size);
                setCurrentPage(1); // Reset to first page when page size changes
              }}
            />
          )}

          {/* Bus Readiness Modal */}
          {selectedBusInfo && (
            <BusReadinessModal
              show={showBusReadinessModal}
              onClose={() => {
                setShowBusReadinessModal(false);
                setSelectedBusInfo(null);
              }}
              busInfo={selectedBusInfo}
              onSave={handleSaveReadiness}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BusOperationPage;