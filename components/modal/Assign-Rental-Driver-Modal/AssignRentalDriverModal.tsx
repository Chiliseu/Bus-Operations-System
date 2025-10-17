'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from "@/components/ui/Button";
import styles from "./assign-rental-driver.module.css";
import Swal from 'sweetalert2';

interface Driver {
  id: string;
  name: string;
  job: string;
  contactNo: string;
  address: string;
  image?: string;
}

interface AssignRentalDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (drivers: { mainDriver: Driver; assistantDriver: Driver }) => void;
  busData?: {
    busName: string;
    status: string;
  };
}

const AssignRentalDriverModal: React.FC<AssignRentalDriverModalProps> = ({
  isOpen,
  onClose,
  onSave,
  busData,
}) => {
  const [mainDriver, setMainDriver] = useState<Driver | null>(null);
  const [assistantDriver, setAssistantDriver] = useState<Driver | null>(null);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleString('en-US', { hour12: true })
  );

  // Demo driver list
  const drivers: Driver[] = [
    { id: '1', name: 'Juan Dela Cruz', job: 'Main Driver', contactNo: '09171234567', address: 'Quezon City', image: '/assets/images/busdriver.png' },
    { id: '2', name: 'Pedro Santos', job: 'Backup Driver', contactNo: '09987654321', address: 'Makati City', image: '/assets/images/busdriver.png' },
    { id: '3', name: 'Mario Reyes', job: 'Senior Driver', contactNo: '09221234567', address: 'Pasig City', image: '/assets/images/busdriver.png' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('en-US', { hour12: true }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handleSelectDriver = (driver: Driver, role: 'main' | 'assistant') => {
    if (role === 'main') setMainDriver(driver);
    else setAssistantDriver(driver);
  };

  const handleSave = async () => {
    if (!mainDriver || !assistantDriver) {
      await Swal.fire({
        icon: 'warning',
        title: 'Incomplete Selection',
        text: 'Please select both a main driver and an assistant driver before saving.',
      });
      return;
    }
    onSave({ mainDriver, assistantDriver });
    await Swal.fire({
      icon: 'success',
      title: 'Drivers Assigned',
      text: `Main Driver: ${mainDriver.name}\nAssistant Driver: ${assistantDriver.name}`,
    });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Assign Drivers {busData ? `for ${busData.busName}` : ''}
          </h2>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className={styles.body}>
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Available Drivers</h4>
            <div className={styles.driverListContainer}>
              {drivers.map(driver => (
                <div key={driver.id} className={`${styles.driverCard} ${
                  mainDriver?.id === driver.id || assistantDriver?.id === driver.id ? styles.activeCard : ''
                }`}>
                  <div className={styles.driverInfo}>
                    <div className={styles.driverImageContainer}>
                      <Image src={driver.image || '/assets/images/busdriver.png'} alt="Driver" className={styles.driverImage} fill />
                    </div>
                    <div className={styles.driverDetails}>
                      <div className={styles.driverName}>
                        {driver.name}
                        <span className={styles.driverJob}>{driver.job}</span>
                      </div>
                      <div className={styles.driverContact}>{driver.contactNo}</div>
                      <div className={styles.driverAddress}>{driver.address}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button text={mainDriver?.id === driver.id ? 'Main Selected' : 'Set as Main'} onClick={() => handleSelectDriver(driver, 'main')} />
                    <Button text={assistantDriver?.id === driver.id ? 'Assistant Selected' : 'Set as Assistant'} onClick={() => handleSelectDriver(driver, 'assistant')} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <small className="text-muted">{currentTime}</small>
          <Button text="Assign Selected Drivers" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default AssignRentalDriverModal;
