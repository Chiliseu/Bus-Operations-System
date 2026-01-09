/* eslint-disable @next/next/no-img-element */
 
'use client';

//=====================================
//  IMPORTS START
// ====================================

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// Style Imports
import styles from './bus-assignment.module.css';

// Modal Imports
import AssignBusModal from '@/components/modal/Assign-Bus/AssignBusModal';
import AssignDriverModal from '@/components/modal/Assign-Driver/AssignDriverModal';
import AssignConductorModal from '@/components/modal/Assign-Conductor/AssignConductorModal';
import AssignRouteModal from '@/components/modal/Assign-Route/AssignRouteModal';
import AddRegularBusAssignmentModal from '@/components/modal/Add-Regular-Bus-Assignment/AddRegularBusAssignmentModal';
import EditRegularBusAssignmentModal from "@/components/modal/Edit-Regular-Bus-Assignment/EditRegularBusAssignmentModal";
import ViewAssignmentModal from '@/components/modal/View-Assignment-Modal/ViewAssignmentModal';
import DeleteConfirmationModal from '@/components/modal/Delete-Confirmation-Modal/DeleteConfirmationModal';

// API calls Imports
import { fetchAssignmentDetails, createBusAssignment, sofDeleteBusAssignment, updateBusAssignment } from '@/lib/apiCalls/bus-assignment';

// Interface Imports
import { Bus, Driver, Conductor, Route, RegularBusAssignment, Quota_Policy } from '@/app/interface';

// --- Shared imports ---
import { Loading, FilterDropdown, PaginationComponent, Swal, Image, LoadingModal } from '@/shared/imports';
import type { FilterSection } from '@/shared/imports';

//=====================================
//  IMPORTS END
// ====================================

const BusAssignmentPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Local helper: relative "time ago" label using Intl.RelativeTimeFormat
  const formatTimeAgo = (dateInput?: string | Date | null) => {
    if (!dateInput) return "-";
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "-";
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffSec = Math.round(diffMs / 1000);

    const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
    const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
      ['year', 60 * 60 * 24 * 365],
      ['month', 60 * 60 * 24 * 30],
      ['week', 60 * 60 * 24 * 7],
      ['day', 60 * 60 * 24],
      ['hour', 60 * 60],
      ['minute', 60],
      ['second', 1],
    ];

    const absSec = Math.abs(diffSec);
    for (const [unit, secInUnit] of units) {
      if (absSec >= secInUnit || unit === 'second') {
        const value = Math.round(diffSec / secInUnit);
        return rtf.format(value as number, unit);
      }
    }
    return "-";
  };

  // Flags for modal
  const [busAssignments, setAssignments] = useState<(RegularBusAssignment & {
    driverName?: string;
    conductorName?: string;
    busLicensePlate?: string;
    busType?: string; // changes by Y 6/17/2025
  })[]>([]);
  const [displayedBusAssignments, setDisplayedBusAssignments] = useState<(RegularBusAssignment & {
    driverName?: string;
    conductorName?: string;
    busLicensePlate?: string;
    busType?: string; // changes by Y 6/17/2025
  })[]>([]);
  const [showAssignBusModal, setShowAssignBusModal] = useState(false);
  const [showAssignDriverModal, setShowAssignDriverModal] = useState(false);
  const [showAssignConductorModal, setShowAssignConductorModal] = useState(false);
  const [showAssignRouteModal, setShowAssignRouteModal] = useState(false);
  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState('');

  // current record
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedConductor, setSelectedConductor] = useState<Conductor | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedQuotaPolicy, setSelectedQuotaPolicy] = useState<Quota_Policy[] | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const totalPages = Math.ceil(displayedBusAssignments.length / pageSize);

  // Filter States
  const [searchQuery, setSearchQuery] = useState(''); // State for Search Query
  const [sortOrder, setSortOrder] = useState('A-Z'); // State for sorting order
  const [activeFilters, setActiveFilters] = useState<{ sortBy: string; busTypeFilter?: string }>({
    sortBy: ""
    //(Newly added and Updated Assignments should always be at the top, not sorted by default)
  });

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewAssignment, setViewAssignment] = useState<any>(null); // Replace 'any' with your assignment type if you have one
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAssignmentId, setDeleteAssignmentId] = useState<string>('');
  const [deleteAssignmentName, setDeleteAssignmentName] = useState<string>('');

  // changes by Y 6/17/2025
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
        { id: "created_newest", label: "Newest First" },
        { id: "created_oldest", label: "Oldest First" },
      ],
      //defaultValue: "bus_az"
      //(Newly added and Updated Assignments should always be at the top, not sorted by default)
    },
    {
      id: "busTypeFilter",
      title: "Bus Type",
      type: "radio",
      options: [
        { id: "Aircon", label: "Aircon" },
        { id: "Non-Aircon", label: "Non-Aircon" }
      ]
    }
  ];

  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const sortedAssignments = [...busAssignments];

    // SWITCH 1: LOGIC SWITCH (SORTING)  // changes by Y 6/17/2025
    switch (activeFilters.sortBy) {
      case "bus_az":
        sortedAssignments.sort((a, b) =>
          (a.busLicensePlate || "").localeCompare(b.busLicensePlate || "")
        );
        break;
      case "bus_za":
        sortedAssignments.sort((a, b) =>
          (b.busLicensePlate || "").localeCompare(a.busLicensePlate || "")
        );
        break;
      case "driver_az":
        sortedAssignments.sort((a, b) =>
          (a.driverName || "").localeCompare(b.driverName || "")
        );
        break;
      case "driver_za":
        sortedAssignments.sort((a, b) =>
          (b.driverName || "").localeCompare(a.driverName || "")
        );
        break;
      case "conductor_az":
        sortedAssignments.sort((a, b) =>
          (a.conductorName || "").localeCompare(b.conductorName || "")
        );
        break;
      case "conductor_za":
        sortedAssignments.sort((a, b) =>
          (b.conductorName || "").localeCompare(a.conductorName || "")
        );
        break;
      case "route_az":
        sortedAssignments.sort((a, b) =>
          (a.BusAssignment?.Route?.RouteName || "").localeCompare(b.BusAssignment?.Route?.RouteName || "")
        );
        break;
      case "route_za":
        sortedAssignments.sort((a, b) =>
          (b.BusAssignment?.Route?.RouteName || "").localeCompare(a.BusAssignment?.Route?.RouteName || "")
        );
        break;
      case "created_newest":
        sortedAssignments.sort((a, b) =>
          new Date(b.BusAssignment?.CreatedAt || 0).getTime() -
          new Date(a.BusAssignment?.CreatedAt || 0).getTime()
        );
        break;
      case "created_oldest":
        sortedAssignments.sort((a, b) =>
          new Date(a.BusAssignment?.CreatedAt || 0).getTime() -
          new Date(b.BusAssignment?.CreatedAt || 0).getTime()
        );
        break;
      default:
        break;
    }

      let filteredBusAssignments = sortedAssignments.filter((busAssignment) => {
        const busTypeLabel = renderBusTypeLabel(busAssignment.busType).toLowerCase();
        return (
          busAssignment.driverName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          busAssignment.conductorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          busAssignment.busLicensePlate?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          busAssignment.busType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          busAssignment.BusAssignment.Route.RouteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          busTypeLabel.includes(searchQuery.toLowerCase())
        );
      });

    if (activeFilters.busTypeFilter) {
      filteredBusAssignments = filteredBusAssignments.filter(
        (a) => a.busType === activeFilters.busTypeFilter
      );
    }

    setDisplayedBusAssignments(filteredBusAssignments);

    const totalPages = Math.ceil(filteredBusAssignments.length / pageSize);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [busAssignments, searchQuery, activeFilters, pageSize]);

  // SWITCH 2: DISPLAY TEXT SWITCH  // changes by Y 6/17/2025
  const renderBusTypeLabel = (busType?: string) => {
    switch (busType) {
      case "Aircon":
        return "Air-conditioned Bus";
      case "Non-Aircon":
        return "Ordinary Bus";
      default:
        return "-";
    }
  };
  // changes by Y 6/17/2025
  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const assignments = await fetchAssignmentDetails();

      // Sort by UpdatedAt (newest first), fallback to CreatedAt
      assignments.sort((a, b) => {
        const dateA = new Date(a.BusAssignment?.UpdatedAt || a.BusAssignment?.CreatedAt || 0).getTime();
        const dateB = new Date(b.BusAssignment?.UpdatedAt || b.BusAssignment?.CreatedAt || 0).getTime();
        return dateB - dateA; // Newest first
      });

      setAssignments(assignments);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Fetch Failed',
        text: 'Error loading assignments',
      });
    } finally {
      setLoading(false);
    }
  };

  // **Initial data fetch on component mount**
  useEffect(() => {
    fetchAssignments();
  }, []);

  // **Handle edit query parameter from URL**
  useEffect(() => {
    const editId = searchParams.get('edit');
    if (editId && busAssignments.length > 0) {
      // Find the assignment with matching BusAssignmentID
      const assignmentToEdit = busAssignments.find(
        (a) => a.BusAssignment?.BusAssignmentID === editId
      );
      
      if (assignmentToEdit) {
        // Trigger edit modal for this assignment
        handleEdit(assignmentToEdit);
        // Clear the query parameter from URL
        router.replace('/bus-assignment', { scroll: false });
      }
    }
  }, [searchParams, busAssignments]);

  // Filter
  const handleApplyFilters = (filterValues: Record<string, any>) => {
  if (!filterValues.sortBy) {
    // Provide a fallback if sortBy not set
    filterValues.sortBy = activeFilters.sortBy || "bus_az";
  }

  // Now TypeScript is happy because sortBy will always exist
  setActiveFilters({
    sortBy: filterValues.sortBy,
    busTypeFilter: filterValues.busTypeFilter
  });
};


  const handleEdit = (assignment: typeof displayedBusAssignments[number]) => {
    setSelectedAssignment(assignment.RegularBusAssignmentID);
    setSelectedBus({
      busId: assignment.BusAssignment.BusID,
      //route: '',
      type: '',
      capacity: 0,
      image: null,
      license_plate: assignment.busLicensePlate,
    });
    setSelectedDriver({
      driver_id: assignment.DriverID,
      name: assignment.driverName??'',
      job: '',
      contactNo: '',
      address: '',
      image: null, 
    });
    setSelectedConductor({
      conductor_id: assignment.ConductorID,
      name: assignment.conductorName ?? '',
      job: '',
      contactNo: '',
      address: '',
      image: null,
    });
    setSelectedRoute(assignment.BusAssignment.Route);

    // Multiply percentage value by 100 before passing to modal
    const quotaPoliciesForModal = assignment.QuotaPolicies.map((policy) => {
      if (policy.Percentage && typeof policy.Percentage.Percentage === "number") {
        return {
          ...policy,
          Percentage: {
            ...policy.Percentage,
            Percentage: policy.Percentage.Percentage * 100,
          },
        };
      }
      return policy;
    });

    setSelectedQuotaPolicy(quotaPoliciesForModal);
    setShowEditModal(true);
  };

  const handleCreateBusAssignment = async (assignment: {
    BusID: string;
    RouteID: string;
    AssignmentDate?: string;
    DriverID: string;
    ConductorID: string;
    QuotaPolicy: {
      type: 'Fixed' | 'Percentage';
      value: number;
      startDate: string;
      endDate: string;
    }[];
  }) => {
    // Basic validation
    if (
      !assignment.BusID ||
      !assignment.RouteID ||
      !assignment.DriverID ||
      !assignment.ConductorID ||
      !assignment.QuotaPolicy.length ||
      assignment.QuotaPolicy.some(
        (q) =>
          !q.type ||
          isNaN(q.value) ||
          !q.startDate ||
          !q.endDate
      )
    ) {
      await Swal.fire({
      icon: 'warning',
      title: 'Validation Error',
      text: 'Please fill in all required fields and valid quota policies.',
    });
      return false;
    }

    try {
      setModalLoading(true);
      // Transform QuotaPolicy values
      const transformedAssignment = {
        ...assignment,
        QuotaPolicy: assignment.QuotaPolicy.map(q => ({
          ...q,
          value: q.type === "Percentage" ? q.value / 100 : q.value,
        })),
      };

      await createBusAssignment(transformedAssignment);
      setModalLoading(false);

      await Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Bus assignment created successfully!',
    });
      // Optional: Refresh list or reset form/modal
      // setShowAddAssignmentModal(false);
      fetchAssignments();
      return true;
    } catch (error) {
      setModalLoading(false);
      console.error('Error creating bus assignment:', error);
      await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error instanceof Error ? error.message : 'Failed to create bus assignment. Please try again.',
    });
      return false;
    }
  };

  const handleDelete = (BusAssignmentID: string, assignmentName: string) => {
    setDeleteAssignmentId(BusAssignmentID);
    setDeleteAssignmentName(assignmentName);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setModalLoading(true);
      await sofDeleteBusAssignment(deleteAssignmentId, true);
      setModalLoading(false);
      setShowDeleteModal(false);
      
      fetchAssignments();
    } catch (error) {
      setModalLoading(false);
      console.error('Error deleting assignment:', error);
      await Swal.fire('Error', 'Failed to delete assignment. Please try again.', 'error');
    }
  };

  async function handleSave({
    bus,
    driver,
    conductor,
    route,
    quotaPolicies,
  }: {
    bus: Bus;
    driver: Driver;
    conductor: Conductor;
    route: Route;
    quotaPolicies: Quota_Policy[];
  }) {
    try {
      if (!bus || !driver || !conductor || !route) {
        throw new Error("Missing required fields");
      }

      // Transform quotaPolicies into minimal DTO format expected by API
      const transformedQuotaPolicies = quotaPolicies.map((policy) => {
        if (policy.Fixed) {
          return {
            QuotaPolicyID: policy.QuotaPolicyID,
            type: "Fixed",
            value: policy.Fixed.Quota,
            StartDate: policy.StartDate.toISOString().split("T")[0],
            EndDate: policy.EndDate.toISOString().split("T")[0],
          };
        } else if (policy.Percentage) {
          return {
            QuotaPolicyID: policy.QuotaPolicyID,
            type: "Percentage",
            value: policy.Percentage.Percentage / 100, // Divide by 100 before saving
            StartDate: policy.StartDate.toISOString().split("T")[0],
            EndDate: policy.EndDate.toISOString().split("T")[0],
          };
        } else {
          // Optionally handle cases with neither Fixed nor Percentage
          throw new Error(`Quota policy ${policy.QuotaPolicyID} missing Fixed or Percentage data`);
        }
      });

      const data = {
        BusID: bus.busId, // or bus.id
        RouteID: route.RouteID,
        DriverID: driver.driver_id,
        ConductorID: conductor.conductor_id,
        quotaPolicies: transformedQuotaPolicies,
      };

      setModalLoading(true);
      const updated = await updateBusAssignment(selectedAssignment, data);
      setModalLoading(false);
      setShowEditModal(false);
      await Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Bus assignment successfully updated!',
    });
      fetchAssignments();
    } catch (error) {
      setModalLoading(false);
      await Swal.fire({
        icon: 'error',
        title: 'Save Failed',
        text: "Failed to save bus assignment: " + (error instanceof Error ? error.message : error),
      });
    }
  }

  const paginatedAssignments = displayedBusAssignments.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        <h2 className={styles.assignmentTitle}>Bus Assignments</h2>

        {/* Toolbar container */}
        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <i className="ri-search-2-line"></i>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className="filter">
            <FilterDropdown
              sections={filterSections}
              onApply={handleApplyFilters}
            />
          </div>

          {/* Add Button */}
          <button
            className={styles.addButton}
            onClick={() => setShowAddAssignmentModal(true)}
          >
            <Image src="/assets/images/add-line.png" alt="Add" width={20} height={20} />
            Add Assignment
          </button>
        </div>

        {/* Loading or Table */}
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.dataTable}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeadRow}>
                  <th>Bus Plate No.</th>
                  <th>Bus Type</th> {/* changes by Y 6/17/2025*/}
                  <th>Driver</th>
                  <th>Conductor</th>
                  <th>Route</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
                <tbody>
                  {paginatedAssignments.length > 0 ? (
                    paginatedAssignments.map((assignment) => (
                      <tr 
                        key={assignment.RegularBusAssignmentID} 
                        className={styles.tableRow}
                        onClick={() => {
                          console.log(assignment);
                          setViewAssignment(assignment);
                          setShowViewModal(true);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{assignment.busLicensePlate || "-"}</td>
                        <td>{renderBusTypeLabel(assignment.busType)}</td>
                        <td>{assignment.driverName || "-"}</td>
                        <td>{assignment.conductorName || "-"}</td>
                        <td>{assignment.BusAssignment?.Route?.RouteName || "No Route"}</td>
                        <td>
                          {(() => {
                            const lastUpdated = assignment.BusAssignment?.UpdatedAt || assignment.BusAssignment?.CreatedAt;
                            const title = lastUpdated ? new Date(lastUpdated).toLocaleString() : "N/A";
                            const label = formatTimeAgo(lastUpdated);
                            return (
                              <span className={styles.lastUpdatedBadge} title={title}>
                                {label}
                              </span>
                            );
                          })()}
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <button
                            className={styles.viewBtn}
                            onClick={() => {
                              console.log(assignment);
                              setViewAssignment(assignment);
                              setShowViewModal(true);
                            }}
                            title="View"
                          >
                            <Image src="/assets/images/eye-line.png" alt="View" width={25} height={25} />
                          </button>
                          <button className={styles.editBtn} onClick={() => handleEdit(assignment)}>
                            <Image src="/assets/images/edit-white.png" alt="Edit" width={25} height={25} />
                          </button>
                          <button className={styles.deleteBtn} onClick={() =>
                            handleDelete(
                              assignment.RegularBusAssignmentID,
                              `${assignment.busLicensePlate || 'Bus'} - ${assignment.driverName || 'Driver'} - ${assignment.BusAssignment?.Route?.RouteName || 'Route'}`
                            )
                          }>
                            <Image src="/assets/images/delete-white.png" alt="Delete" width={25} height={25} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className={styles.noRecords}>
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>

            </table>
          </div>
        )}
        {/* ✅ Pagination always visible */}
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Modals */}
      {showEditModal && selectedAssignment && (
        <EditRegularBusAssignmentModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          quotaPolicy={selectedQuotaPolicy}
          selectedBus={selectedBus}
          selectedDriver={selectedDriver}
          selectedConductor={selectedConductor}
          selectedRoute={selectedRoute}
          setSelectedBus={setSelectedBus}
          setSelectedDriver={setSelectedDriver}
          setSelectedConductor={setSelectedConductor}
          setSelectedRoute={setSelectedRoute}
          onBusClick={() => setShowAssignBusModal(true)}
          onDriverClick={() => setShowAssignDriverModal(true)}
          onConductorClick={() => setShowAssignConductorModal(true)}
          onRouteClick={() => setShowAssignRouteModal(true)}
          onSave={handleSave}
        />
      )}

      {showAddAssignmentModal && (
        <AddRegularBusAssignmentModal
          show={true}
          onClose={() => setShowAddAssignmentModal(false)}
          handleAdd={handleCreateBusAssignment}
          onBusClick={() => setShowAssignBusModal(true)}
          onDriverClick={() => setShowAssignDriverModal(true)}
          onConductorClick={() => setShowAssignConductorModal(true)}
          onRouteClick={() => setShowAssignRouteModal(true)}
          selectedBus={selectedBus}
          selectedDriver={selectedDriver}
          selectedConductor={selectedConductor}
          selectedRoute={selectedRoute}
          setSelectedBus={setSelectedBus}
          setSelectedDriver={setSelectedDriver}
          setSelectedConductor={setSelectedConductor}
          setSelectedRoute={setSelectedRoute}
        />
      )}

      {showAssignBusModal && (
        <AssignBusModal
          onClose={() => setShowAssignBusModal(false)}
          onAssign={(bus) => {
            setSelectedBus(bus);
            setShowAssignBusModal(false);
          }}
        />
      )}

      {showAssignDriverModal && (
        <AssignDriverModal
          onClose={() => setShowAssignDriverModal(false)}
          onAssign={(driver) => {
            setSelectedDriver(driver);
            setShowAssignDriverModal(false);
          }}
        />
      )}

      {showAssignConductorModal && (
        <AssignConductorModal
          onClose={() => setShowAssignConductorModal(false)}
          onAssign={(conductor) => {
            setSelectedConductor(conductor);
            setShowAssignConductorModal(false);
          }}
        />
      )}

      {showAssignRouteModal && (
        <AssignRouteModal
          onClose={() => setShowAssignRouteModal(false)}
          onAssign={(route) => {
            setSelectedRoute(route);
            setShowAssignRouteModal(false);
          }}
        />
      )}

      {showViewModal && viewAssignment && (
        <ViewAssignmentModal
          show={showViewModal}
          onClose={() => setShowViewModal(false)}
          assignment={viewAssignment}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this bus assignment?"
          itemName={deleteAssignmentName}
          isDeleting={modalLoading}
        />
      )}

      {modalLoading && !showDeleteModal && <LoadingModal/>}
    </div>
  );

};

export default BusAssignmentPage;
