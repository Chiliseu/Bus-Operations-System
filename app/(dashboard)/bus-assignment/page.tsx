/* eslint-disable @next/next/no-img-element */
 
'use client';

import React, { useEffect, useState } from 'react';
import AssignBusModal from '@/components/modal/AssignBusModal';
import AssignDriverModal from '@/components/modal/AssignDriverModal';
import AssignConductorModal from '@/components/modal/AssignConductorModal';
import AssignRouteModal from '@/components/modal/AssignRouteModal';
import AddRegularBusAssignmentModal from '@/components/modal/AddRegularBusAssignmentModal';
import styles from './bus-assignment.module.css';
import { Route } from '@/app/interface'; // Importing the Route interface
import { fetchAssignmentDetails, createBusAssignment } from '@/lib/apiCalls/bus-assignment';
import { fetchDriverById, fetchConductorById, fetchBusById } from '@/lib/apiCalls/external';
import Image from 'next/image';
import PaginationComponent from '@/components/ui/PaginationV2';
import { Bus, Driver, Conductor, RegularBusAssignment } from '@/app/interface';

const BusAssignmentPage: React.FC = () => {

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

  // current record
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedConductor, setSelectedConductor] = useState<Conductor | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

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
  const [sortOrder, setSortOrder] = useState(''); // State for sorting order

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
        console.error('Error loading assignments:', error);
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

  const handleAdd = async (assignment: {
    bus: Bus;
    driver: Driver;
    conductor: Conductor;
    route: Route;
    quotaType: "Fixed" | "Percentage";
    quotaValue: number;
  }) => {
    if (!assignment || !assignment.quotaValue || isNaN(assignment.quotaValue)) {
      alert("Invalid quota value.");
      return;
    }

    const data = {
      RouteID: assignment.route?.RouteID?.trim(),
      BusID: assignment.bus?.busId?.trim(),
      DriverID: assignment.driver?.driver_id?.trim(),
      ConductorID: assignment.conductor?.conductor_id?.trim(),
      QuotaPolicy: [{
        type: assignment.quotaType,
        value: assignment.quotaType === 'Percentage'
          ? parseFloat((assignment.quotaValue / 100).toFixed(4))
          : assignment.quotaValue,
      }],
    };

    try {
      const result = await createBusAssignment(data);
      handleClear();
      alert('BusAssignment created successfully!');
      fetchAssignments(); // refresh the table
    } catch (error) {
      console.error('Error creating BusAssignment:', error);
      alert(error instanceof Error ? error.message : String(error));
    }
  };

  const paginatedAssignments = displayedBusAssignments.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );


  return (
    <div className="dashboard-content">
      <div className="center-box">
        <div className={styles.container}>
          <h2 className="card-title mb-3">Create Assignment</h2>
          {/* Buttons */}
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
                <select
                  className="form-select"
                  // value={sortOrder}
                  // onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="A-Z">Name: A-Z</option>
                  <option value="Z-A">Name: Z-A</option>
                </select>
              </div>
            <div className="col text-end ms-auto">
              <button 
                className="btn btn-success"
                onClick = {() => setShowAddAssignmentModal(true)}
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


          {/* Table Part */}
          {loading ? (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ):(
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
                    <tr key={assignment.RegularBusAssignmentID} className={styles.tableRow}>
                      <td>{assignment.busLicensePlate}</td>
                      <td>{assignment.driverName || assignment.DriverID}</td>
                      <td>{assignment.conductorName || assignment.ConductorID}</td>
                      <td>{assignment.BusAssignment?.Route?.RouteName}</td>
                      <td>
                        <button
                          className={styles.editBtn}
                          // onClick={() => handleEdit(assignment)}
                        >
                          <img src="/assets/images/edit.png" alt="Edit" />
                        </button>
                        <button className={styles.deleteBtn}>
                          <img src="/assets/images/delete.png" alt="Delete" />
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
      </div>
      <div>
        {/* Modals */}
        {showAddAssignmentModal && (
          <AddRegularBusAssignmentModal
            show={showAddAssignmentModal}
            onClose={() => setShowAddAssignmentModal(false)}
            onCreate={handleAdd}
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
            onClose={() => setShowAssignBusModal(false) } 
            onAssign={(bus) => {
              setSelectedBus(bus); // store or use it as needed
              setShowAssignBusModal(false); // close modal
            }}
          />
        )}
        {showAssignDriverModal && (
          <AssignDriverModal 
            onClose={() => setShowAssignDriverModal(false)} 
            onAssign={(driver) => {
              setSelectedDriver(driver); // store or use it as needed
              setShowAssignDriverModal(false); // close modal
            }}
          />
        )}
        {showAssignConductorModal && (
          <AssignConductorModal 
            onClose={() => setShowAssignConductorModal(false)}
            onAssign={(conductor) => {
              setSelectedConductor(conductor); // store or use it as needed
              setShowAssignConductorModal(false); // close modal
            }} 
          />
        )}
        {showAssignRouteModal && (
          <AssignRouteModal 
            onClose={() => setShowAssignRouteModal(false)}
            onAssign={(route) => {
              setSelectedRoute(route); // store or use it as needed
              setShowAssignRouteModal(false); // close modal
            }} 
          />
        )}
      </div>
    </div>
  );
};

export default BusAssignmentPage;
