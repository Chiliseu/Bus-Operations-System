'use client';

import React, { useEffect, useState } from 'react';
import styles from './approved.module.css';
import '../../../../styles/globals.css';
import Swal from 'sweetalert2';
import ApprovedBusReadinessModal from '@/components/modal/Approved-Bus-Readiness-Modal/ApprovedBusReadinessModal';
import AssignRentalDriverModal from '@/components/modal/Assign-Rental-Driver-Modal/AssignRentalDriverModal';
import DamageCheckModal from '@/components/modal/Damage-Check-Modal/DamageCheckModal';
import LoadingModal from "@/components/modal/LoadingModal";

import { fetchRentalRequestsByStatus, updateRentalRequest } from '@/lib/apiCalls/rental-request';
import { fetchBackendToken } from '@/lib/backend';

interface Driver {
  id: string;
  name: string;
  job: string;
  contactNo: string;
  address: string;
  image?: string;
}

interface BusRental {
  id: string;
  rentalBusAssignmentId?: string;
  customerName: string;
  contactNo: string;
  busType: string;
  bus: string;
  rentalDate: string;
  duration: string;
  distance: string;
  destination: string;
  pickupLocation: string;
  passengers: number;
  price: number;
  note: string;
  status: 'Not Ready' | 'Ready' | 'Not Started' | 'Ongoing' | 'Completed';
  assignedDrivers?: { mainDriver: Driver; assistantDriver: Driver };
  readinessDone?: boolean;
  damageCheckDone?: boolean;
  damageData?: { vehicleCondition: Record<string, boolean>; note: string };
}

const ApprovedNotReadyPage: React.FC = () => {
  const [rentals, setRentals] = useState<BusRental[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRental, setSelectedRental] = useState<BusRental | null>(null);
  const [showReadinessModal, setShowReadinessModal] = useState(false);
  const [showAssignDriversModal, setShowAssignDriversModal] = useState(false);
  const [showDamageCheckModal, setShowDamageCheckModal] = useState(false);
  const [activeTab, setActiveTab] = useState<BusRental['status']>('Not Ready');
  const tabs: BusRental['status'][] = ['Not Ready', 'Ready', 'Not Started', 'Ongoing', 'Completed'];
  const activeTabIndex = tabs.indexOf(activeTab);

  // --- Fetch and validate data ---
  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchRentalRequestsByStatus('Approved'); // API call

      if (!Array.isArray(res)) throw new Error('Invalid API response');

      const mappedData: BusRental[] = res.map((r: any) => {
        // Map first two drivers as mainDriver & assistantDriver
        const drivers = r.RentalBusAssignment?.RentalDrivers ?? [];
        const mainDriver = drivers[0]
          ? { 
              id: drivers[0].DriverID, 
              name: drivers[0].Driver?.DriverName || drivers[0].DriverID, 
              job: '', 
              contactNo: '', 
              address: '' 
            }
          : null;
        const assistantDriver = drivers[1]
          ? { 
              id: drivers[1].DriverID, 
              name: drivers[1].Driver?.DriverName || drivers[1].DriverID, 
              job: '', 
              contactNo: '', 
              address: '' 
            }
          : null;

        return {
          id: r.RentalRequestID ?? '',
          rentalBusAssignmentId: r.RentalBusAssignmentID ?? undefined,
          customerName: r.CustomerName ?? 'N/A',
          contactNo: r.CustomerContact ?? 'N/A',
          busType: r.BusType ?? 'N/A',
          bus: r.PlateNumber ?? 'N/A',
          rentalDate: r.RentalDate ? new Date(r.RentalDate).toISOString().split('T')[0] : '',
          duration: r.Duration ? `${r.Duration} day${r.Duration > 1 ? 's' : ''}` : '',
          distance: r.DistanceKM ? `${r.DistanceKM} km` : '',
          destination: r.DropoffLocation ?? '',
          pickupLocation: r.PickupLocation ?? '',
          passengers: Number(r.NumberOfPassengers ?? 0),
          price: Number(r.RentalPrice ?? 0),
          note: r.SpecialRequirements ?? '',
          // Determine status based on backend data
          status: (() => {
            const busStatus = r.RentalBusAssignment?.BusAssignment?.Status;
            const hasReadinessChecks = r.RentalBusAssignment && (
              r.RentalBusAssignment.Battery || r.RentalBusAssignment.Lights ||
              r.RentalBusAssignment.Oil || r.RentalBusAssignment.Water ||
              r.RentalBusAssignment.Break || r.RentalBusAssignment.Air ||
              r.RentalBusAssignment.Gas || r.RentalBusAssignment.Engine ||
              r.RentalBusAssignment.TireCondition
            );
            
            if (busStatus === 'Completed') return 'Completed';
            if (busStatus === 'InOperation') return 'Ongoing';
            if (busStatus === 'NotStarted') return 'Not Started';
            // If status is NotReady but has readiness checks completed, consider it Ready
            if (busStatus === 'NotReady' && hasReadinessChecks) return 'Ready';
            return 'Not Ready';
          })() as 'Not Ready' | 'Ready' | 'Not Started' | 'Ongoing' | 'Completed',
          assignedDrivers:
            mainDriver && assistantDriver
              ? { mainDriver, assistantDriver }
              : drivers.length >= 2 
              ? { 
                  mainDriver: { 
                    id: drivers[0].DriverID, 
                    name: drivers[0].Driver?.DriverName || drivers[0].DriverID, 
                    job: '', 
                    contactNo: '', 
                    address: '' 
                  },
                  assistantDriver: { 
                    id: drivers[1].DriverID, 
                    name: drivers[1].Driver?.DriverName || drivers[1].DriverID, 
                    job: '', 
                    contactNo: '', 
                    address: '' 
                  }
                }
              : undefined,
          readinessDone: r.RentalBusAssignment && (
                        r.RentalBusAssignment.Battery || r.RentalBusAssignment.Lights ||
                        r.RentalBusAssignment.Oil || r.RentalBusAssignment.Water ||
                        r.RentalBusAssignment.Break || r.RentalBusAssignment.Air ||
                        r.RentalBusAssignment.Gas || r.RentalBusAssignment.Engine ||
                        r.RentalBusAssignment.TireCondition
                      ) || false,
          damageCheckDone: false,
          damageData: r.RentalBusAssignment
            ? {
                vehicleCondition: {
                  Battery: r.RentalBusAssignment.Battery ?? false,
                  Lights: r.RentalBusAssignment.Lights ?? false,
                  Oil: r.RentalBusAssignment.Oil ?? false,
                  Water: r.RentalBusAssignment.Water ?? false,
                  Brake: r.RentalBusAssignment.Break ?? false,
                  Air: r.RentalBusAssignment.Air ?? false,
                  Gas: r.RentalBusAssignment.Gas ?? false,
                  Engine: r.RentalBusAssignment.Engine ?? false,
                  'Tire Condition': r.RentalBusAssignment.TireCondition ?? false,
                },
                note: r.RentalBusAssignment.Note ?? '',
              }
            : undefined,
        };
      });

      setRentals(mappedData);
    } catch (err: any) {
      console.error('Error fetching approved rentals:', err);
      Swal.fire('Error', err.message || 'Failed to load approved rentals.', 'error');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  const handleViewNote = (note?: string) => {
    Swal.fire({
      title: 'Rental Note',
      text: note || 'No note provided.',
      icon: 'info',
    });
  };

  const handleReadinessCheck = (rental?: BusRental) => {
    if (!rental) return Swal.fire('Error', 'Rental not found.', 'error');
    setSelectedRental(rental);
    setShowReadinessModal(true);
  };

  const handleAssignDrivers = (rental?: BusRental) => {
    if (!rental) return Swal.fire('Error', 'Rental not found.', 'error');
    setSelectedRental(rental);
    setShowAssignDriversModal(true);
  };

  const handleDamageCheck = (rental?: BusRental) => {
    if (!rental) return Swal.fire('Error', 'Rental not found.', 'error');
    
    // For Ongoing status, we allow damage check regardless of readiness flags
    // since the rental is already in operation
    if (rental.status !== 'Ongoing' && (!rental.assignedDrivers || !rental.readinessDone)) {
      return Swal.fire(
        'Error',
        'Cannot perform damage check before readiness and driver assignment.',
        'warning'
      );
    }
    
    setSelectedRental(rental);
    setShowDamageCheckModal(true);
  };

  const renderStatusBadge = (status: BusRental['status']) => {
    let badgeColor = '';
    switch (status) {
      case 'Not Ready':
        badgeColor = styles.statusNotReady;
        break;
      case 'Ready':
        badgeColor = styles.statusReady || styles.statusNotStarted; // fallback if no Ready style
        break;
      case 'Not Started':
        badgeColor = styles.statusNotStarted;
        break;
      case 'Ongoing':
        badgeColor = styles.statusOngoing;
        break;
      case 'Completed':
        badgeColor = styles.statusCompleted || styles.statusOngoing; // fallback to ongoing style
        break;
    }
    return <span className={`${styles.statusBadge} ${badgeColor}`}>{status}</span>;
  };

  const handleStatusUpdate = async (rental: BusRental, newStatus: BusRental['status']) => {
    if (!rental) return;

    try {
      setLoading(true);
      
      // Get authentication token
      const token = await fetchBackendToken();
      if (!token) {
        throw new Error('Authentication failed');
      }

      // Handle special case for completing ongoing operations
      if (rental.status === 'Ongoing' && newStatus === 'Completed') {
        // Use the 'complete' command for ongoing operations
        await updateRentalRequest(token, rental.id, {
          command: 'complete'
        });
      } else {
        // Map frontend status to backend BusOperationStatus for other transitions
        let backendStatus = '';
        switch (newStatus) {
          case 'Not Started':
            backendStatus = 'NotStarted';
            break;
          case 'Ongoing':
            backendStatus = 'InOperation';
            break;
          case 'Completed':
            backendStatus = 'Completed';
            break;
          default:
            throw new Error('Invalid status transition');
        }

        // Update the bus assignment status in the backend
        await updateRentalRequest(token, rental.id, {
          busAssignmentUpdates: {
            Status: backendStatus
          }
        });
      }

      // Update local state
      setRentals((prev) =>
        prev.map((r) => (r.id === rental.id ? { ...r, status: newStatus } : r))
      );

      Swal.fire('Success', `Rental status updated to ${newStatus}.`, 'success');
    } catch (error: any) {
      console.error('Error updating status:', error);
      Swal.fire('Error', error.message || 'Failed to update rental status.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Group rentals by status
  const groupedRentals = {
    'Not Ready': rentals.filter(r => r.status === 'Not Ready'),
    'Ready': rentals.filter(r => r.status === 'Ready'),
    'Not Started': rentals.filter(r => r.status === 'Not Started'),
    'Ongoing': rentals.filter(r => r.status === 'Ongoing'),
    'Completed': rentals.filter(r => r.status === 'Completed')
  };

  // Get status counts for tab badges
  const statusCounts = {
    'Not Ready': groupedRentals['Not Ready'].length,
    'Ready': groupedRentals['Ready'].length,
    'Not Started': groupedRentals['Not Started'].length,
    'Ongoing': groupedRentals['Ongoing'].length,
    'Completed': groupedRentals['Completed'].length
  };

  const renderRentalTable = (rentalsToShow: BusRental[]) => (
    <div className={styles.styledTableWrapper}>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Contact No.</th>
            <th>Bus Type</th>
            <th>Bus</th>
            <th>Rental Date</th>
            <th>Duration</th>
            <th>Distance</th>
            <th>Destination</th>
            <th>Pickup Location</th>
            <th>Passengers</th>
            <th>Price</th>
            <th>Status</th>
            <th>Drivers</th>
            <th>Note</th>
            <th className={styles.centeredColumn}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rentalsToShow.length > 0 ? (
            rentalsToShow.map((rental) => (
              <tr key={rental.id}>
                <td>{rental.customerName || 'N/A'}</td>
                <td>{rental.contactNo || 'N/A'}</td>
                <td>{rental.busType || 'N/A'}</td>
                <td>{rental.bus || 'N/A'}</td>
                <td>{rental.rentalDate || 'N/A'}</td>
                <td>{rental.duration || 'N/A'}</td>
                <td>{rental.distance || 'N/A'}</td>
                <td>{rental.destination || 'N/A'}</td>
                <td>{rental.pickupLocation || 'N/A'}</td>
                <td>{rental.passengers ?? 'N/A'}</td>
                <td>₱{rental.price?.toLocaleString() ?? '0'}</td>
                <td>{renderStatusBadge(rental.status)}</td>
                <td>
                  {rental.assignedDrivers
                    ? `${rental.assignedDrivers.mainDriver.name} / ${rental.assignedDrivers.assistantDriver.name}`
                    : '—'}
                </td>
                <td>
                  <button
                    className={styles.noteBtn}
                    onClick={() => handleViewNote(rental.note)}
                  >
                    View Notes
                  </button>
                </td>
                <td className={styles.centeredColumn}>
                  {rental.status === 'Not Ready' && (
                    <div className={styles.actionWrapper}>
                      <button
                        className={styles.approveBtn}
                        onClick={() => handleReadinessCheck(rental)}
                      >
                        Readiness Check
                      </button>
                      <button
                        className={styles.rejectBtn}
                        onClick={() => handleAssignDrivers(rental)}
                      >
                        Assign Drivers
                      </button>
                    </div>
                  )}
                  {rental.status === 'Ready' && (
                    <div className={styles.actionWrapper}>
                      <button
                        className={styles.rejectBtn}
                        onClick={() => handleAssignDrivers(rental)}
                      >
                        Assign Drivers
                      </button>
                      <button
                        className={styles.checkBtn}
                        disabled={!rental.assignedDrivers || !rental.assignedDrivers.mainDriver || !rental.assignedDrivers.assistantDriver}
                        onClick={() => handleStatusUpdate(rental, 'Not Started')}
                      >
                        Mark as Not Started
                      </button>
                      <button
                        className={styles.confirmBtn}
                        disabled={!rental.assignedDrivers || !rental.assignedDrivers.mainDriver || !rental.assignedDrivers.assistantDriver}
                        onClick={() => handleStatusUpdate(rental, 'Ongoing')}
                      >
                        Start Operation
                      </button>
                    </div>
                  )}
                  {rental.status === 'Not Started' && (
                    <div className={styles.actionWrapper}>
                      <button
                        className={styles.confirmBtn}
                        onClick={() => handleStatusUpdate(rental, 'Ongoing')}
                      >
                        Start Operation
                      </button>
                    </div>
                  )}
                  {rental.status === 'Ongoing' && (
                    <div className={styles.actionWrapper}>
                      <button
                        className={styles.confirmBtn}
                        onClick={() => handleStatusUpdate(rental, 'Completed')}
                      >
                        Complete
                      </button>
                    </div>
                  )}
                  {rental.status === 'Completed' && (
                    <div className={styles.actionWrapper}>
                      <button
                        className={styles.approveBtn}
                        onClick={() => handleDamageCheck(rental)}
                      >
                        Damage Check
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={15} className={styles.noRecords}>
                No {activeTab.toLowerCase()} rentals found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        <h2 className={styles.stopTitle}>Approved Bus Rentals</h2>
        <p className={styles.description}>
          Manage rentals that are approved but in different readiness stages.
        </p>

        {/* Status Tabs - Segmented Control with Sliding Indicator */}
        <div className={styles.tabContainer}>
          {/* Sliding indicator background */}
          <div 
            className={styles.tabIndicator}
            style={{
              transform: `translateX(calc(${activeTabIndex * 100}% + ${activeTabIndex * 4}px))`,
              width: `calc(${100 / tabs.length}% - ${4 * (tabs.length - 1) / tabs.length}px)`
            }}
          />
          
          {tabs.map((status) => (
            <button
              key={status}
              className={`${styles.tabButton} ${activeTab === status ? styles.tabButtonActive : ''}`}
              onClick={() => setActiveTab(status)}
            >
              {status}
              {statusCounts[status] > 0 && (
                <span className={styles.tabBadge}>
                  {statusCounts[status]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className={styles.tabContentWrapper}>
          {loading ? (
            <div className={styles.tableLoadingContainer}>
              <LoadingModal />
            </div>
          ) : (
            <div className={styles.tabContent} key={activeTab}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {activeTab} Rentals ({statusCounts[activeTab]})
                </h3>
              </div>
              
              {renderRentalTable(groupedRentals[activeTab])}
            </div>
          )}
        </div>

        {/* Readiness Modal */}
        {showReadinessModal && selectedRental && (
          <ApprovedBusReadinessModal
            show={showReadinessModal}
            onClose={() => setShowReadinessModal(false)}
            busInfo={{
              regularBusAssignmentID: selectedRental.id,
              busNumber: selectedRental.bus,
              driver:
                selectedRental.assignedDrivers?.mainDriver.name || 'Juan Dela Cruz',
            }}
            onSave={async (data) => {
              try {
                setLoading(true);
                
                // Get authentication token
                const token = await fetchBackendToken();
                if (!token) {
                  throw new Error('Authentication failed');
                }

                // Update the bus assignment with readiness check data
                await updateRentalRequest(token, selectedRental.id, {
                  busAssignmentUpdates: {
                    Battery: data.vehicleCondition.Battery || false,
                    Lights: data.vehicleCondition.Lights || false,
                    Oil: data.vehicleCondition.Oil || false,
                    Water: data.vehicleCondition.Water || false,
                    Break: data.vehicleCondition.Brake || false,
                    Air: data.vehicleCondition.Air || false,
                    Gas: data.vehicleCondition.Gas || false,
                    Engine: data.vehicleCondition.Engine || false,
                    TireCondition: data.vehicleCondition.Tire || false,
                    Self_Driver: data.personnelCondition.driverReady || false,
                    // Don't update Status here - let the readiness checks indicate readiness
                  }
                });

                // Update local state
                setRentals((prev) =>
                  prev.map((r) =>
                    r.id === selectedRental.id
                      ? { 
                          ...r, 
                          readinessDone: true, 
                          // Only change to Ready if BOTH readiness AND drivers are complete
                          status: r.assignedDrivers && r.assignedDrivers.mainDriver && r.assignedDrivers.assistantDriver 
                            ? 'Ready' 
                            : 'Not Ready'
                        }
                      : r
                  )
                );

                setLoading(false);
                setShowReadinessModal(false);
                const hasDrivers = selectedRental.assignedDrivers && 
                                 selectedRental.assignedDrivers.mainDriver && 
                                 selectedRental.assignedDrivers.assistantDriver;
                
                await Swal.fire(
                  'Success',
                  hasDrivers 
                    ? 'Bus readiness completed! Status changed to Ready.' 
                    : 'Bus readiness completed! Assign drivers to change status to Ready.',
                  'success'
                );
                return true;
              } catch (error: any) {
                console.error('Error updating readiness:', error);
                setLoading(false);
                await Swal.fire('Error', error.message || 'Failed to update readiness.', 'error');
                return false;
              }
            }}
          />
        )}

        {/* Assign Drivers Modal */}
        {showAssignDriversModal && selectedRental && (
            <AssignRentalDriverModal
            isOpen={showAssignDriversModal}
            onClose={() => setShowAssignDriversModal(false)}
            busData={{
                busName: selectedRental.bus,
                status: selectedRental.status,
            }}
            onSave={async (assignedDrivers) => {
                try {
                    setLoading(true);
                    
                    // Get authentication token
                    const token = await fetchBackendToken();
                    if (!token) {
                        throw new Error('Authentication failed');
                    }

                    // Update the rental request with assigned drivers
                    await updateRentalRequest(token, selectedRental.id, {
                        drivers: [assignedDrivers.mainDriver.id, assignedDrivers.assistantDriver.id]
                    });

                    // Update local state
                    setRentals((prev) =>
                        prev.map((r) =>
                            r.id === selectedRental.id
                            ? { 
                                ...r, 
                                assignedDrivers,
                                // Only change to Ready if BOTH readiness AND drivers are complete
                                status: r.readinessDone ? 'Ready' : 'Not Ready'
                              }
                            : r
                        )
                    );
                    
                    setLoading(false);
                    setShowAssignDriversModal(false);
                    const isReady = selectedRental.readinessDone;
                    await Swal.fire(
                      'Success', 
                      isReady 
                        ? 'Drivers assigned! Status changed to Ready.' 
                        : 'Drivers assigned! Complete readiness check to change status to Ready.', 
                      'success'
                    );
                } catch (error: any) {
                    console.error('Error assigning drivers:', error);
                    setLoading(false);
                    await Swal.fire('Error', error.message || 'Failed to assign drivers.', 'error');
                }
            }}
            />
        )}

        {/* Damage Check Modal */}
        {showDamageCheckModal && selectedRental && (
          <DamageCheckModal
            show={showDamageCheckModal}
            onClose={() => setShowDamageCheckModal(false)}
            busInfo={{
              rentalId: selectedRental.id,
              busNumber: selectedRental.bus,
              driver:
                selectedRental.assignedDrivers?.mainDriver.name || 'Juan Dela Cruz',
            }}
            damageData={selectedRental.damageData}
            onSave={async (data) => {
              try {
                setLoading(true);
                
                // Get authentication token
                const token = await fetchBackendToken();
                if (!token) {
                  throw new Error('Authentication failed');
                }

                // Validate that we have the required RentalBusAssignmentID
                if (!selectedRental.rentalBusAssignmentId) {
                  throw new Error('RentalBusAssignmentID is missing. Cannot save damage report.');
                }

                // Save the damage report for completed rental
                await updateRentalRequest(token, selectedRental.id, {
                  rentalRequestUpdates: {
                    damageReport: {
                      vehicleCondition: data.vehicleCondition,
                      note: data.note,
                      checkDate: new Date().toISOString()
                    }
                  }
                });

                // Update local state - mark damage check as done
                setRentals((prev) =>
                  prev.map((r) =>
                    r.id === selectedRental.id
                      ? { ...r, damageCheckDone: true }
                      : r
                  )
                );
                
                setLoading(false);
                setShowDamageCheckModal(false);
                await Swal.fire('Success', 'Damage check saved successfully!', 'success');
                return true;
              } catch (error: any) {
                console.error('Error saving damage check:', error);
                setLoading(false);
                await Swal.fire('Error', error.message || 'Failed to save damage check.', 'error');
                return false;
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ApprovedNotReadyPage;