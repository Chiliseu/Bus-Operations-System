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
import { fetchConductorById } from '../../../lib/fetchConductors';
import { fetchDriverById } from '../../../lib/fetchDrivers';
import { Bus, Driver, Conductor, RegularBusAssignment} from '@/app/interface';

// interface RegularBusAssignment {
//   RegularBusAssignmentID: string;
//   DriverID: string;
//   ConductorID: string;
//   BusAssignment?: {
//     BusID: string;
//     Route? : {
//       RouteName: string;
//     } | null;
//   } | null;
//   quotaPolicy?: {
//     QuotaPolicyID : string;
//     Fixed?: {
//       Quota: string;
//     } | null;
//     Percentage?: {
//       Percentage: string;
//     } | null;
//   } | null;
// }

const BusAssignmentPage: React.FC = () => {

  // Flags for modal
  const [busAssignments, setAssignments] = useState<(RegularBusAssignment & {
  driverName?: string;
  conductorName?: string;
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

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editAssignment, setEditAssignment] = useState<RegularBusAssignment | null>(null);

  const [quotaType, setQuotaType] = useState('Fixed'); // Default to 'Fixed'
  const [quotaValue, setQuotaValue] = useState<number>(0); // Default to 0 or any sensible default

  const [assignmentDate, setAssignmentDate] = useState<string | null>(null);

  useEffect(() => {
    if (showAddAssignmentModal) {
      setAssignmentDate(new Date().toISOString());
    }
  }, [showAddAssignmentModal]);

  const fetchAssignments = async () => {
    try {
      const response = await fetch('/api/bus-assignment');
      if (!response.ok) {
        throw new Error(`Failed to fetch assignments: ${response.statusText}`);
      }
      const data: RegularBusAssignment[] = await response.json();

      // Fetch driver and conductor names for each assignment
      const assignmentsWithNames = await Promise.all(
        data.map(async (assignment) => {
          let driverName = '';
          let conductorName = '';

          // Fetch driver name
          if (assignment.DriverID) {
            try {
              const res = await fetch(`/api/external/drivers/${assignment.DriverID}`);
              if (res.ok) {
                const { data } = await res.json();
                driverName = data?.name ?? '';
              }
            } catch {}
          }

          // Fetch conductor name
          if (assignment.ConductorID) {
            try {
              const res = await fetch(`/api/external/conductors/${assignment.ConductorID}`);
              if (res.ok) {
                const { data } = await res.json();
                conductorName = data?.name ?? '';
              }
            } catch {}
          }

          return {
            ...assignment,
            driverName,
            conductorName,
          };
        })
      );

      setAssignments(assignmentsWithNames); // Update the table data
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  // **Initial data fetch on component mount**
  useEffect(() => {
    fetchAssignments();
  }, []);

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
    // Gather the data to send to the API
    const data = {
      RouteID: assignment.route.RouteID,
      BusID: assignment.bus.busId,
      AssignmentDate: assignmentDate,
      DriverID: assignment.driver.driver_id,
      ConductorID: assignment.conductor.conductor_id,
      Change: 0.0,
      TripRevenue: 1000.0,
      QuotaPolicy: {
        type: assignment.quotaType,
        value: assignment.quotaValue,
      },
    };

    try {
      const response = await fetch('/api/bus-assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create BusAssignment');
      }

      handleClear();
      alert('BusAssignment created successfully!');
      fetchAssignments();
    } catch (error) {
      console.error('Error creating BusAssignment:', error);
      alert(error instanceof Error ? error.message : String(error));
    }
  };

  const handleEdit = async  (assignment: RegularBusAssignment) => {
    setIsEditMode(true);
    setEditAssignment(assignment);

    // Populate the form with the selected assignment's values
    setSelectedBus({ busId: assignment.BusAssignment?.BusID ?? '', route: '', type: '', capacity: 0, image: null }); 

    setSelectedRoute({ RouteName: assignment.BusAssignment?.Route?.RouteName ?? '', RouteID: '', StartStopID: '', EndStopID: '', IsDeleted: false});

    if (assignment.quotaPolicy?.Fixed) {
      setQuotaType('Fixed');
      setQuotaValue(assignment.quotaPolicy.Fixed.Quota);
    } else if (assignment.quotaPolicy?.Percentage) {
      setQuotaType('Percentage');
      setQuotaValue(assignment.quotaPolicy.Percentage.Percentage);
    } else {
      setQuotaType(''); // Reset if no quotaPolicy is present
      setQuotaValue(0); // Reset the value
    }

    const driverId = assignment.DriverID ?? '';

    if (driverId) {
      try {
        const res = await fetch(`/api/external/drivers/${driverId}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch driver: ${res.statusText}`);
        }

        const { data } = await res.json();

        setSelectedDriver({
          driver_id: data?.driver_id ?? '',
          name: data?.name ?? '',
          job: data?.job ?? '',
          contactNo: data?.contactNo ?? '',
          address: data?.address ?? '',
          image: data?.image ?? null,
        });
      } catch (error) {
        console.error('Failed to fetch driver:', error);
      }
    }

    const conductorId = assignment.ConductorID ?? '';

    if (conductorId) {
      try {
        const res = await fetch(`/api/external/conductors/${conductorId}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch conductor: ${res.statusText}`);
        }

        const { data } = await res.json();

        setSelectedConductor({
          conductor_id: data?.conductor_id ?? '',
          name: data?.name ?? '',
          job: data?.job ?? '',
          contactNo: data?.contactNo ?? '',
          address: data?.address ?? '',
          image: data?.image ?? null,
        });
      } catch (error) {
        console.error('Failed to fetch conductor:', error);
      }
    }

  };

  return (
    <div className="dashboard-content">
      <div className="center-box">
        <div className={styles.container}>

          {/* Title */}
          <h2 className={styles.assignmentTitle}>CREATE ASSIGNMENT</h2>

          {/* Assignment Boxes */}
          <div className={styles.topPart}>
            {/* Bus Box */}
            <div className={styles.topItem}>
              <div className={styles.assignmentBox}>
                <div className={styles.tab}>
                  <img src="/assets/images/assignedbus.png" alt="Bus Icon" className={styles.tabIcon} />
                  Bus
                </div>
                <button type="button" className={styles.saveButton} onClick={() => setShowAssignBusModal(true)}>
                  + Assign Bus
                </button>
                {/* <input type="text" value={selectedBus.busId} placeholder="Bus ID" /> */}
                <div className={styles.outputField}>
                  {selectedBus ? selectedBus.busId : 'None Selected'}
                </div>
              </div>
            </div>

            {/* Driver Box */}
            <div className={styles.topItem}>
              <div className={styles.assignmentBox}>
                <div className={styles.tab}>
                  <img src="/assets/images/bus-driver.png" alt="Driver Icon" className={styles.tabIcon} />
                  Driver
                </div>
                <button className={styles.saveButton} onClick={() => setShowAssignDriverModal(true)}>
                  + Assign Driver
                </button>
                {/* <input type="text" placeholder="Name" /> */}
                <div className={styles.outputField}>
                  {selectedDriver ? selectedDriver.name : 'None Selected'}
                </div>
              </div>
            </div>

            {/* Conductor Box */}
            <div className={styles.topItem}>
              <div className={styles.assignmentBox}>
                <div className={styles.tab}>
                  <img src="/assets/images/bus-conductor.png" alt="Conductor Icon" className={styles.tabIcon} />
                  Conductor
                </div>
                <button className={styles.saveButton} onClick={() => setShowAssignConductorModal(true)}>
                  + Assign Conductor
                </button>
                {/* <input type="text" placeholder="Name" /> */}
                <div className={styles.outputField}>
                  {selectedConductor ? selectedConductor.name : 'None Selected'}
                </div>
              </div>
            </div>
          </div>

            {/* Bottom Row: Route + Quota + Buttons */}
            <div className={styles.bottomRow}>
              {/* Route Box */}
              <div className={styles.topItem}>
                <div className={styles.assignmentBox}>
                  <div className={styles.tab}>
                    <img src="/assets/images/assignedroute.png" alt="Route Icon" className={styles.tabIcon} />
                    Route
                  </div>
                  <button className={styles.saveButton} onClick={() => setShowAssignRouteModal(true)}>
                    + Assign Route
                  </button>
                  {/* <input type="text" placeholder="Route Name" /> */}
                  <div className={styles.outputField}>
                    {selectedRoute ? selectedRoute.RouteName : 'None Selected'}
                  </div>
                </div>
              </div>

              {/* Quota Box */}
              <div className={styles.topItem}>
                <div className={styles.assignmentBox}>
                  <div className={styles.tab}>
                    <img src="/assets/images/philippine-peso.png" alt="Quota Icon" className={styles.tabIcon} />
                    Quota
                  </div>
                  <select
                    className={styles.selectInput}
                    value={quotaType}
                    onChange={(e) => {
                      setQuotaType(e.target.value);
                      setQuotaValue(0); // Reset quota value when type changes
                    }}
                  >
                    <option value="Fixed">Fixed</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                  <input
                    type="number"
                    placeholder={quotaType === 'Fixed' ? 'Enter Fixed Value' : 'Enter Percentage (1-99)'}
                    value={quotaValue}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only allow valid numbers
                      if (value === '') {
                        setQuotaValue(0);
                        return;
                      }
                      const num = Number(value);

                      // Validation for Fixed
                      if (quotaType === 'Fixed') {
                        if (isNaN(num) || num <= 0) {
                          alert('Fixed value must be greater than 0.');
                          return;
                        }
                      }

                      // Validation for Percentage
                      if (quotaType === 'Percentage') {
                        if (isNaN(num) || num < 1 || num > 99) {
                          alert('Percentage value must be between 1 and 99.');
                          return;
                        }
                      }

                      setQuotaValue(num);
                    }}
                    step={quotaType === 'Fixed' ? '0.01' : '1'}
                    min={quotaType === 'Fixed' ? '0.01' : '1'}
                    max={quotaType === 'Percentage' ? '99' : undefined}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className={styles.buttonColumn}>
                <button className={styles.clearButton} onClick={handleClear}>Clear</button>
                <button type="button" className={styles.addButton} onClick={() => setShowAddAssignmentModal(true)}>Add</button>
              </div>
            </div>


          {/* Table Part */}
          <div className={styles.dataTable}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeadRow}>
                  <th>Assignment</th>
                  <th>Bus ID</th>
                  <th>Driver</th>
                  <th>Conductor</th>
                  <th>Route</th>
                  <th>Quota</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {busAssignments.map((assignment) => (
                  <tr key={assignment.RegularBusAssignmentID} className={styles.tableRow}>
                    <td>{assignment.RegularBusAssignmentID}</td>
                    <td>{assignment.BusAssignment?.BusID}</td>
                    <td>{assignment.driverName || assignment.DriverID}</td>
                    <td>{assignment.conductorName || assignment.ConductorID}</td>
                    <td>{assignment.BusAssignment?.Route?.RouteName}</td>
                    <td>
                      {assignment.quotaPolicy?.Fixed
                        ? `Fixed: ${assignment.quotaPolicy.Fixed.Quota}`
                        : assignment.quotaPolicy?.Percentage
                        ? `Percentage: ${(assignment.quotaPolicy.Percentage.Percentage * 100)}%`
                        : 'No Quota'}
                    </td>
                    <td className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(assignment)}
                      >
                        <img src="/assets/images/edit.png" alt="Edit" />
                      </button>
                      <button className={styles.deleteBtn}>
                        <img src="/assets/images/delete.png" alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
