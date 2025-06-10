'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './bus-operation.module.css';
import '../../../../styles/globals.css';
import BusReadinessModal from '@/components/modal/UpdateBusReadinessModal';
import { fetchDriverById, fetchConductorById, fetchBusById } from '@/lib/apiCalls/external';
import { fetchBusAssignmentsWithStatus, updateBusAssignmentData } from '@/lib/apiCalls/bus-operation';

// --- Shared imports ---
import { Loading, FilterDropdown, PaginationComponent, Swal, Image, LoadingModal } from '@/shared/imports';
import type { FilterSection } from '@/shared/imports';

// Import interfaces
import { BusAssignment } from '@/app/interface/bus-assignment';

const BusOperationPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [assignments, setAssignments] = useState<(BusAssignment & {
      driverName?: string;
      conductorName?: string;
      busLicensePlate?: string;
    })[]>([]);
  const [displayedAssignments, setDisplayedAssignments] = useState<(BusAssignment & {
      driverName?: string;
      conductorName?: string;
      busLicensePlate?: string;
    })[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  const [selectedReadiness, setSelectedReadiness] = useState<any>(null);

  const filterSections: FilterSection[] = [
  {
    id: "sortBy",
    title: "Sort By",
    type: "radio",
    options: [
      { id: "bus_az", label: "Bus A-Z" },
      { id: "bus_za", label: "Bus Z-A" },
      { id: "driver_az", label: "Driver A-Z" },
      { id: "driver_za", label: "Driver Z-A" },
      { id: "conductor_az", label: "Conductor A-Z" },
      { id: "conductor_za", label: "Conductor Z-A" },
      { id: "route_az", label: "Route A-Z" },
      { id: "route_za", label: "Route Z-A" },
    ],
    defaultValue: "bus_az"
  }
];

  // Bus Readiness Check Modal
  type BusInfo = {
    regularBusAssignmentID: string;
    busNumber: string;
    driver: string;
    conductor: string;
  };
  const [showBusReadinessModal, setShowBusReadinessModal] = useState(false);
  const [selectedBusAssignment, setSelectedBusAssignment] = useState<BusAssignment | null>(null);
  const [selectedBusInfo, setSelectedBusInfo] = useState<BusInfo | null>(null);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const data = await fetchBusAssignmentsWithStatus('NotReady');
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching stops:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);


  useEffect(() => {
    let filtered = [...assignments];

    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.busLicensePlate?.toLowerCase().includes(lower) ||
          a.driverName?.toLowerCase().includes(lower) ||
          a.conductorName?.toLowerCase().includes(lower) ||
          a.Route?.RouteName?.toLowerCase().includes(lower)
      );
    }

    switch (sortOrder) {
      case "bus_az":
        filtered.sort((a, b) => (a.busLicensePlate || '').localeCompare(b.busLicensePlate || ''));
        break;
      case "bus_za":
        filtered.sort((a, b) => (b.busLicensePlate || '').localeCompare(a.busLicensePlate || ''));
        break;
      case "driver_az":
        filtered.sort((a, b) => (a.driverName || '').localeCompare(b.driverName || ''));
        break;
      case "driver_za":
        filtered.sort((a, b) => (b.driverName || '').localeCompare(a.driverName || ''));
        break;
      case "conductor_az":
        filtered.sort((a, b) => (a.conductorName || '').localeCompare(b.conductorName || ''));
        break;
      case "conductor_za":
        filtered.sort((a, b) => (b.conductorName || '').localeCompare(a.conductorName || ''));
        break;
      case "route_az":
        filtered.sort((a, b) => (a.Route?.RouteName || '').localeCompare(b.Route?.RouteName || ''));
        break;
      case "route_za":
        filtered.sort((a, b) => (b.Route?.RouteName || '').localeCompare(a.Route?.RouteName || ''));
        break;
      default:
        break;
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

  const handleEdit = async (assignment: any) => {
    setSelectedBusInfo({
      regularBusAssignmentID: assignment.BusAssignmentID,
      busNumber: assignment.busLicensePlate,
      driver: assignment.driverName,
      conductor: assignment.conductorName,
    });

    // Prefill readiness info from assignment
    setSelectedReadiness({
      vehicleCondition: {
        Battery: assignment.Battery,
        Lights: assignment.Lights,
        Oil: assignment.Oil,
        Water: assignment.Water,
        Brake: assignment.Break,
        Air: assignment.Air,
        Engine: assignment.Engine,
        Tire: assignment.TireCondition,
        Gas: assignment.Gas,
      },
      personnelCondition: {
        driverReady: assignment.Self_Driver,
        conductorReady: assignment.Self_Conductor,
      },
      changeFunds: 0, // Fill if you have this info
      tickets: [],       // Fill if you have this info
    });

    setShowBusReadinessModal(true);
  };

  // Example: adjust the function to accept the expected data and return a Promise<boolean>
  const handleSaveReadiness = async (data: {
    regularBusAssignmentID: string;
    vehicleCondition: Record<string, boolean>;
    personnelCondition: { driverReady: boolean; conductorReady: boolean; };
    changeFunds: number;
    // tickets: Ticket[];
  }): Promise<boolean> => {
    try {
      setLoadingModal(true);

      // Convert modal data to API format
      const apiData = {
        Battery: data.vehicleCondition.Battery ?? false,
        Lights: data.vehicleCondition.Lights ?? false,
        Oil: data.vehicleCondition.Oil ?? false,
        Water: data.vehicleCondition.Water ?? false,
        Break: data.vehicleCondition.Brake ?? false,
        Air: data.vehicleCondition.Air ?? false,
        Gas: data.vehicleCondition.Gas ?? false,
        Engine: data.vehicleCondition.Engine ?? false,
        TireCondition: data.vehicleCondition.Tire ?? false,
        Self_Driver: data.personnelCondition.driverReady ?? false,
        Self_Conductor: data.personnelCondition.conductorReady ?? false,
        ResetCompleted: false,
        // The following fields are placeholders; replace with real values if available
        ChangeFund: data.changeFunds ?? 0,
        //INSERT TICKET, WLA PA TICKET
        DispatchedAt: null,
        Sales: null,
      };

      await updateBusAssignmentData(data.regularBusAssignmentID, apiData);
      setLoadingModal(false);
      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Bus readiness updated successfully!',
      });
      fetchAssignments();
      return true;
    } catch (error: any) {
      setLoadingModal(false);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.message || 'Failed to update bus readiness.',
      });
      return false;
    }
  };

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        {/* Page title */}
        <h2 className={styles.stopTitle}>Pre-Dispatch Bus Operation</h2>

        {/* Search and Sort inputs */}
        <div className={styles.toolbar}>
          {/* Search Input */}
          <div className={styles.searchWrapper}>
            <i className="ri-search-2-line"></i>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <FilterDropdown
            sections={filterSections}
            onApply={(values) => setSortOrder(values.sortBy)}
          />
        </div>

        {/* Description */}
        <p className={styles.description}>Check buses that are not ready for dispatch</p>

        {/* Loading centered in the card */}
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.styledTableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Bus</th>
                  <th>Driver</th>
                  <th>Conductor</th>
                  <th>Route</th>
                  <th className={styles.centeredColumn}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedAssignments.length > 0 ? (
                  displayedAssignments.map((assignment) => (
                    <tr key={assignment.BusAssignmentID}>
                      <td>{assignment.busLicensePlate}</td>
                      <td>{assignment.driverName}</td>
                      <td>{assignment.conductorName}</td>
                      <td>{assignment.Route.RouteName}</td>
                      <td className={styles.centeredColumn}>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleEdit(assignment)}
                        >
                          <img
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
                    <td colSpan={4} className={styles.noRecords}>
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination controls */}
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={(size: number) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />

        {/* Bus Readiness Modal (commented out) */}
        {selectedBusInfo && (
          <BusReadinessModal
            show={showBusReadinessModal}
            onClose={() => {
              setShowBusReadinessModal(false);
              setSelectedBusInfo(null);
              setSelectedReadiness(null);
            }}
            busInfo={selectedBusInfo}
            readiness={selectedReadiness}
            onSave={handleSaveReadiness}
          />
        )}

        {loadingModal && <LoadingModal/>}
      </div>
    </div>
  );
};

export default BusOperationPage;