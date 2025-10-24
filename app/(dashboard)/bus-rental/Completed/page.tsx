'use client';

import React, { useEffect, useState } from 'react';
import styles from './completed.module.css';
import '../../../../styles/globals.css';
import { Loading, Swal } from '@/shared/imports';
import ViewDamageModal from '@/components/modal/View-Damage-Modal/ViewDamageModal'; // import new modal
import { RiEyeLine } from 'react-icons/ri'; // eye icon
import { fetchRentalRequestsByStatus } from '@/lib/apiCalls/rental-request';

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
  status: string;
  driver: string;
  damageData?: {
    vehicleCondition: Record<string, boolean>;
    note: string;
  };
}

const CompletedRentalPage: React.FC = () => {
  const [rentals, setRentals] = useState<BusRental[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRental, setSelectedRental] = useState<BusRental | null>(null);
  const [showDamageModal, setShowDamageModal] = useState(false);


useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchRentalRequestsByStatus('Completed'); // cookie-based auth handled

      if (!Array.isArray(res)) throw new Error('Invalid response from server');

      const mappedData: BusRental[] = res.map((r: any) => {
        // Get the most recent damage report if it exists
        const latestDamageReport = r.DamageReports && r.DamageReports.length > 0
          ? r.DamageReports[r.DamageReports.length - 1] // Get the last (most recent) damage report
          : null;

        return {
          id: r.RentalRequestID ?? '',
          customerName: r.CustomerName ?? 'N/A',
          contactNo: r.CustomerContact ?? 'N/A',
          busType: r.BusType ?? 'N/A',
          bus: r.PlateNumber ?? 'N/A',
          rentalDate: r.RentalDate
            ? new Date(r.RentalDate).toISOString().split('T')[0]
            : '',
          duration: r.Duration ? `${r.Duration} day${r.Duration > 1 ? 's' : ''}` : '',
          distance: r.DistanceKM ? `${r.DistanceKM} km` : '',
          destination: r.DropoffLocation ?? '',
          pickupLocation: r.PickupLocation ?? '',
          passengers: Number(r.NumberOfPassengers ?? 0),
          price: Number(r.RentalPrice ?? 0),
          note: r.SpecialRequirements ?? '',
          status: r.Status ?? 'Completed',
          driver: r.RentalBusAssignment?.RentalDrivers
            ?.map((d: any) => d.DriverID)
            .join(', ') ?? '',
          damageData: latestDamageReport
            ? {
                vehicleCondition: {
                  Battery: latestDamageReport.Battery ?? false,
                  Lights: latestDamageReport.Lights ?? false,
                  Oil: latestDamageReport.Oil ?? false,
                  Water: latestDamageReport.Water ?? false,
                  Brake: latestDamageReport.Brake ?? false,
                  Air: latestDamageReport.Air ?? false,
                  Gas: latestDamageReport.Gas ?? false,
                  Engine: latestDamageReport.Engine ?? false,
                  "Tire Condition": latestDamageReport.TireCondition ?? false,
                },
                note: latestDamageReport.Note ?? '',
              }
            : undefined,
        };
      });

      setRentals(mappedData);
    } catch (err: any) {
      console.error('Error fetching completed rentals:', err);
      Swal.fire('Error', err.message || 'Failed to load completed rentals.', 'error');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  const handleViewNote = (note: string) => {
    Swal.fire({ title: 'Rental Note', text: note || 'No note provided.', icon: 'info' });
  };

  const handleViewDamage = (rental: BusRental) => {
    setSelectedRental(rental);
    setShowDamageModal(true);
  };

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        <h2 className={styles.stopTitle}>Completed Bus Rentals</h2>
        <p className={styles.description}>
          View all completed bus rentals and damage reports.
        </p>

        {loading ? (
          <Loading />
        ) : (
          <div className={styles.styledTableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Bus</th>
                  <th>Rental Date</th>
                  <th>Passengers</th>
                  <th>Price</th>
                  <th>Note</th>
                  <th>Damage</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rentals.length > 0 ? (
                  rentals.map((rental) => (
                    <tr key={rental.id}>
                      <td>{rental.customerName}</td>
                      <td>{rental.bus}</td>
                      <td>{rental.rentalDate}</td>
                      <td>{rental.passengers}</td>
                      <td>₱{rental.price.toLocaleString()}</td>
                      <td>
                        <button className={styles.noteBtn} onClick={() => handleViewNote(rental.note)}>
                          View Note
                        </button>
                      </td>
                      <td>
                        <button className={styles.noteBtn} onClick={() => handleViewDamage(rental)}>
                          <RiEyeLine size={18} />
                        </button>
                      </td>
                      <td>{rental.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className={styles.noRecords}>No completed rentals found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {showDamageModal && selectedRental && (
          <ViewDamageModal
            show={showDamageModal}
            onClose={() => setShowDamageModal(false)}
            busInfo={{ rentalId: selectedRental.id, busNumber: selectedRental.bus, driver: selectedRental.driver }}
            damageData={selectedRental.damageData}
          />
        )}
      </div>
    </div>
  );
};

export default CompletedRentalPage;
