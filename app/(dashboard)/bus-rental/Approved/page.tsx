'use client';

import React, { useEffect, useState } from 'react';
import styles from './approved.module.css';
import '../../../../styles/globals.css';
import { Loading, Swal } from '@/shared/imports';
import ApprovedBusReadinessModal from '@/components/modal/Approved-Bus-Readiness-Modal/ApprovedBusReadinessModal';
import AssignRentalDriverModal from '@/components/modal/Assign-Rental-Driver-Modal/AssignRentalDriverModal';
import DamageCheckModal from '@/components/modal/Damage-Check-Modal/DamageCheckModal';

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
  status: 'Not Ready' | 'Not Started' | 'Ongoing';
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

  // --- Fetch and validate data ---
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data: Partial<BusRental>[] = [
          {
            id: '1',
            customerName: 'Maria Santos',
            contactNo: '09987654321',
            busType: 'Deluxe',
            bus: 'Bus-202',
            rentalDate: '2025-10-20',
            duration: '1 day',
            distance: '80 km',
            destination: 'Taguig',
            pickupLocation: 'SM North Terminal',
            passengers: 35,
            price: 12000,
            note: 'Corporate outing',
            status: 'Not Ready',
          },
          {
            id: '2',
            customerName: 'Carlos Reyes',
            contactNo: '09171234567',
            busType: 'Luxury',
            bus: 'Bus-108',
            rentalDate: '2025-10-22',
            duration: '2 days',
            distance: '150 km',
            destination: 'Batangas',
            pickupLocation: 'Ayala Terminal',
            passengers: 40,
            price: 20000,
            note: 'Company team building',
            status: 'Not Started',
          },
          {
            id: '3',
            customerName: 'Ana Dizon',
            contactNo: '09219876543',
            busType: 'Regular',
            bus: 'Bus-305',
            rentalDate: '2025-10-23',
            duration: '3 days',
            distance: '250 km',
            destination: 'Baguio',
            pickupLocation: 'Cubao Terminal',
            passengers: 50,
            price: 30000,
            note: 'School field trip',
            status: 'Ongoing',
          },
        ];

        const validRentals: BusRental[] = data.filter(
          (r) =>
            r.id &&
            r.customerName &&
            r.bus &&
            r.status &&
            typeof r.passengers === 'number' &&
            typeof r.price === 'number'
        ) as BusRental[];

        if (validRentals.length === 0) {
          throw new Error('No valid rental data found.');
        }

        setRentals(validRentals);
      } catch (err: any) {
        console.error('Error fetching rentals:', err);
        Swal.fire('Error', err.message || 'Failed to load rentals.', 'error');
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
    if (!rental.assignedDrivers || !rental.readinessDone) {
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
      case 'Not Started':
        badgeColor = styles.statusNotStarted;
        break;
      case 'Ongoing':
        badgeColor = styles.statusOngoing;
        break;
    }
    return <span className={`${styles.statusBadge} ${badgeColor}`}>{status}</span>;
  };

  const handleStatusUpdate = (rental: BusRental, newStatus: BusRental['status']) => {
    if (!rental) return;
    setRentals((prev) =>
      prev.map((r) => (r.id === rental.id ? { ...r, status: newStatus } : r))
    );
    Swal.fire('Success', `Rental status updated to ${newStatus}.`, 'success');
  };

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        <h2 className={styles.stopTitle}>Approved Bus Rentals</h2>
        <p className={styles.description}>
          Manage rentals that are approved but in different readiness stages.
        </p>

        {loading ? (
          <Loading />
        ) : (
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
                {rentals.length > 0 ? (
                  rentals
                    .slice()
                    .sort((a, b) => {
                      const order = ['Not Ready', 'Not Started', 'Ongoing'];
                      return order.indexOf(a.status) - order.indexOf(b.status);
                    })
                    .map((rental) => (
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
                              <button
                                className={styles.checkBtn}
                                disabled={!rental.assignedDrivers || !rental.readinessDone}
                                onClick={() => handleStatusUpdate(rental, 'Not Started')}
                              >
                                Check
                              </button>
                            </div>
                          )}
                          {rental.status === 'Not Started' && (
                            <div className={styles.actionWrapper}>
                              <button
                                className={styles.confirmBtn}
                                onClick={() => handleStatusUpdate(rental, 'Ongoing')}
                              >
                                Confirm
                              </button>
                            </div>
                          )}
                          {rental.status === 'Ongoing' && (
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
                      No approved rentals found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

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
              setRentals((prev) =>
                prev.map((r) =>
                  r.id === selectedRental.id
                    ? { ...r, readinessDone: true }
                    : r
                )
              );
              await Swal.fire(
                'Success',
                'Bus readiness has been updated.',
                'success'
              );
              setShowReadinessModal(false);
              return true;
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
            onSave={(assignedDrivers) => {
              setRentals((prev) =>
                prev.map((r) =>
                  r.id === selectedRental.id
                    ? { ...r, assignedDrivers }
                    : r
                )
              );
              setShowAssignDriversModal(false);
              Swal.fire('Success', 'Drivers have been assigned.', 'success');
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
              setRentals((prev) =>
                prev.map((r) =>
                  r.id === selectedRental.id
                    ? {
                        ...r,
                        damageData: { vehicleCondition: data.vehicleCondition, note: data.note },
                        damageCheckDone: true,
                      }
                    : r
                )
              );
              await Swal.fire('Success', 'Damage check has been saved.', 'success');
              setShowDamageCheckModal(false);
              return true;
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ApprovedNotReadyPage;
