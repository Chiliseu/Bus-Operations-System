'use client';

import React, { useEffect, useState } from 'react';
import styles from './completed.module.css';
import '../../../../styles/globals.css';
import { Loading, Swal } from '@/shared/imports';
import ViewDamageModal from '@/components/modal/View-Damage-Modal/ViewDamageModal'; // import new modal
import { RiEyeLine } from 'react-icons/ri'; // eye icon

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
    setLoading(true);
    setTimeout(() => {
      const data: BusRental[] = [
        {
          id: '1',
          customerName: 'Juan Dela Cruz',
          contactNo: '09123456789',
          busType: 'Aircon',
          bus: 'Bus-101',
          rentalDate: '2025-10-10',
          duration: '2 days',
          distance: '120 km',
          destination: 'Tagaytay',
          pickupLocation: 'Cubao Terminal',
          passengers: 40,
          price: 15000,
          note: 'Wedding event',
          status: 'Completed',
          driver: 'Juan Dela Cruz',
          damageData: {
            vehicleCondition: { Battery: true, Lights: false, Oil: false, Water: true, Brake: false, Air: true, Gas: false, Engine: false, "Tire Condition": true },
            note: 'Minor scratches on rear bumper.'
          }
        },
      ];
      setRentals(data);
      setLoading(false);
    }, 800);
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
