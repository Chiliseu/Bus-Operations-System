/* eslint-disable @next/next/no-img-element */
 
'use client';

//=====================================
//  IMPORTS START
// ====================================

import React, { useEffect, useState } from 'react';

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
        { id: "created_newest", label: "Created At (Newest First)" },
        { id: "created_oldest", label: "Created At (Oldest First)" },
        { id: "updated_newest", label: "Updated At (Newest First)" },
        { id: "updated_oldest", label: "Updated At (Oldest First)" },
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
      case "updated_newest":
        sortedAssignments.sort((a, b) =>
          new Date(b.BusAssignment?.UpdatedAt || 0).getTime() -
          new Date(a.BusAssignment?.UpdatedAt || 0).getTime()
        );
        break;
      case "updated_oldest":
        sortedAssignments.sort((a, b) =>
          new Date(a.BusAssignment?.UpdatedAt || 0).getTime() -
          new Date(b.BusAssignment?.UpdatedAt || 0).getTime()
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
        return "Unknown Type";
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
    setSelectedQuotaPolicy(assignment.QuotaPolicies);
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
      await createBusAssignment(assignment);
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

  const handleDelete = async (BusAssignmentID: string, IsDeleted: boolean) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    try {
      setModalLoading(true);
      await sofDeleteBusAssignment(BusAssignmentID, true);
      setModalLoading(false);
      
      await Swal.fire('Deleted!', 'Assignment deleted successfully!', 'success'); // ✅ Await this
      
      fetchAssignments();
    } catch (error) {
      setModalLoading(false);
      console.error('Error deleting assignment:', error);
      await Swal.fire('Error', 'Failed to delete assignment. Please try again.', 'error'); // ✅ Replace alert with Swal
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
            value: policy.Percentage.Percentage,
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
                  <th>Bus</th>
                  <th>Bus Type</th> {/* changes by Y 6/17/2025*/}
                  <th>Driver</th>
                  <th>Conductor</th>
                  <th>Route</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Actions</th>
                </tr>
              </thead>
                <tbody>
                  {paginatedAssignments.length > 0 ? (
                    paginatedAssignments.map((assignment) => (
                      <tr key={assignment.RegularBusAssignmentID} className={styles.tableRow}>
                        <td>{assignment.busLicensePlate}</td>
                        <td>{renderBusTypeLabel(assignment.busType)}</td>
                        <td>{assignment.driverName || assignment.DriverID}</td>
                        <td>{assignment.conductorName || assignment.ConductorID}</td>
                        <td>{assignment.BusAssignment?.Route?.RouteName}</td>
                        <td>
                          {assignment.BusAssignment?.CreatedAt
                            ? new Date(assignment.BusAssignment.CreatedAt).toLocaleString()
                            : "N/A"}
                        </td>
                        <td>
                          {assignment.BusAssignment?.UpdatedAt
                            ? new Date(assignment.BusAssignment.UpdatedAt).toLocaleString()
                            : "No updates"}
                        </td>
                        <td>
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
                              assignment.BusAssignment?.IsDeleted
                            )
                          }>
                            <Image src="/assets/images/delete-white.png" alt="Delete" width={25} height={25} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className={styles.noRecords}>
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

      {modalLoading && <LoadingModal/>}
    </div>
  );

};

export default BusAssignmentPage;
