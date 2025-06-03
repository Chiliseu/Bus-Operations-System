/* eslint-disable @next/next/no-img-element */
 
'use client';

import React, { useEffect, useState } from 'react';
import AssignBusModal from '@/components/modal/Assign-Bus/AssignBusModal';
import AssignDriverModal from '@/components/modal/Assign-Driver/AssignDriverModal';
import AssignConductorModal from '@/components/modal/Assign-Conductor/AssignConductorModal';
import AssignRouteModal from '@/components/modal/Assign-Route/AssignRouteModal';
import AddRegularBusAssignmentModal from '@/components/modal/Add-Regular-Bus-Assignment/AddRegularBusAssignmentModal';
import styles from './bus-assignment.module.css';
import { fetchAssignmentDetails, createBusAssignment, sofDeleteBusAssignment, updateBusAssignment } from '@/lib/apiCalls/bus-assignment';
import { fetchDriverById, fetchConductorById, fetchBusById } from '@/lib/apiCalls/external';
import Image from 'next/image';
import PaginationComponent from '@/components/ui/PaginationV2';
import { Bus, Driver, Conductor, Route, RegularBusAssignment, Quota_Policy } from '@/app/interface';
import EditRegularBusAssignmentModal from "@/components/modal/Edit-Regular-Bus-Assignment/EditRegularBusAssignmentModal";


const BusAssignmentPage: React.FC = () => {
  interface QuotaPolicy {
    startDate: string;
    endDate: string;
    quotaType: "Fixed" | "Percentage";
    quotaValue: number;
  }

  interface BusAssignment {
    BusAssignmentID: string;
    BusID: string;
    RouteID: string;
    DriverID: string;
    ConductorID: string;
    QuotaPolicy: QuotaPolicy[];
  }

  // Flags for modal
  const [busAssignments, setAssignments] = useState<(RegularBusAssignment & {
    driverName?: string;
    conductorName?: string;
    busLicensePlate?: string;
  })[]>([]);
  const [displayedBusAssignments, setDisplayedBusAssignments] = useState<(RegularBusAssignment & {
    driverName?: string;
    conductorName?: string;
    busLicensePlate?: string;
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
  const currentStops = busAssignments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Filter States
  const [searchQuery, setSearchQuery] = useState(''); // State for Search Query
  const [sortOrder, setSortOrder] = useState('A-Z'); // State for sorting order

  // Loading State
  const [loading, setLoading] = useState(false);

  const [quotaType, setQuotaType] = useState('Fixed'); // Default to 'Fixed'
  const [quotaValue, setQuotaValue] = useState<number>(0); // Default to 0 or any sensible default

  const [assignmentDate, setAssignmentDate] = useState<string | null>(null);

  useEffect(() => {
    if (showAddAssignmentModal) {
      setAssignmentDate(new Date().toISOString());
    }
  }, [showAddAssignmentModal]);

  const fetchAssignments = async () => {
    setLoading(true); // Start loading
    try {
        const assignments = await fetchAssignmentDetails();
        setAssignments(assignments);
      } catch (error) {
        alert('Error loading assignments');
      } finally{
        setLoading(false); // Start loading
      }
  };

  // **Initial data fetch on component mount**
  useEffect(() => {
    fetchAssignments();
  }, []);

  useEffect(() => {
      const sortedAssignments = [...busAssignments];
  
      const filteredBusAssignments = sortedAssignments.filter((busAssignment) =>
        busAssignment.driverName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        busAssignment.conductorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        busAssignment.busLicensePlate?.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      setDisplayedBusAssignments(filteredBusAssignments);
  
      // Reset currentPage if out of range
      const totalPages = Math.ceil(filteredBusAssignments.length / pageSize);
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(1);
      }
    }, [busAssignments, searchQuery, sortOrder, pageSize]);

  const handleClear = () => {
    // Clear logic for resetting form values or handling state
    setSelectedBus(null);
    setSelectedDriver(null);
    setSelectedConductor(null);
    setSelectedRoute(null);
    setQuotaValue(0);
  };

  const handleEdit = (assignment: typeof displayedBusAssignments[number]) => {
    setSelectedAssignment(assignment.RegularBusAssignmentID);
    setSelectedBus({
      busId: assignment.BusAssignment.BusID,
      route: '',
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
    setSelectedQuotaPolicy(assignment.quota_Policy);
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
      alert('Please fill in all required fields and valid quota policies.');
      return false;
    }

    try {
      await createBusAssignment(assignment);

      alert('Bus assignment created successfully!');
      // Optional: Refresh list or reset form/modal
      setShowAddAssignmentModal(false);
      return true;
    } catch (error) {
      console.error('Error creating bus assignment:', error);
      alert(error instanceof Error ? error.message : 'Failed to create bus assignment. Please try again.');
      setShowAddAssignmentModal(false);
      return false;
    }
  };

  const handleDelete = async (BusAssignmentID: string, IsDeleted: boolean) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this assignment?');
    if (!confirmDelete) return;
    try {
      await sofDeleteBusAssignment(BusAssignmentID, IsDeleted);
      alert('Assignment deleted successfully!');
      fetchAssignments();
    } catch (error) {
      console.error('Error deleting assignment:', error);
      alert('Failed to delete assignment. Please try again.');
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

      alert(JSON.stringify(data));

      const updated = await updateBusAssignment(selectedAssignment, data);
      setShowEditModal(false);
      alert("Bus assignment successfully updated!");
      fetchAssignments();
    } catch (error) {
      alert("Failed to save bus assignment: " + (error instanceof Error ? error.message : error));
    }
  }

  const paginatedAssignments = displayedBusAssignments.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );

  return (
    <div className={`card mx-auto ${styles.wideCard}`}>
      <div className="card mx-auto w-100" style={{ maxWidth: '1700px' }}>
        <div className="card-body">
          {/* Header and Filters */}
          <h2 className={styles.assignmentTitle}>BUS ASSIGNMENTS</h2>

          <div className="row g-2 align-items-center mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option value="A-Z">Name: A-Z</option>
                <option value="Z-A">Name: Z-A</option>
              </select>
            </div>
            <div className="col-md-5 text-end">
              <button
                className="btn btn-success me-2"
                onClick={() => setShowAddAssignmentModal(true)}
              >
                <Image
                  src="/assets/images/add-line.png"
                  alt="Add"
                  width={20}
                  height={20}
                />
                Add
              </button>
            </div>
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {/* Data Table */}
              <div className={styles.dataTable}>
                <table className={styles.table}>
                  <thead>
                    <tr className={styles.tableHeadRow}>
                      <th>Bus</th>
                      <th>Driver</th>
                      <th>Conductor</th>
                      <th>Route</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAssignments.length > 0 ? (
                      paginatedAssignments.map((assignment) => (
                        <tr
                          key={assignment.RegularBusAssignmentID}
                          className={styles.tableRow}
                        >
                          <td>{assignment.busLicensePlate}</td>
                          <td>{assignment.driverName || assignment.DriverID}</td>
                          <td>{assignment.conductorName || assignment.ConductorID}</td>
                          <td>{assignment.BusAssignment?.Route?.RouteName}</td>
                          <td>
                            <button
                              className={styles.editBtn}
                              onClick={() => {
                                handleEdit(assignment);}}
                            >
                              <img src="/assets/images/edit-white.png" alt="Edit" />
                            </button>
                            <button className={styles.deleteBtn}
                              onClick={() => {
                                handleDelete(assignment.RegularBusAssignmentID, assignment.BusAssignment?.IsDeleted);
                              }}
                            >
                              <img src="/assets/images/delete-white.png" alt="Delete" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className={styles.noRecords}>
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
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
            </>
          )}
        </div>
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
    </div>
  );

};

export default BusAssignmentPage;
