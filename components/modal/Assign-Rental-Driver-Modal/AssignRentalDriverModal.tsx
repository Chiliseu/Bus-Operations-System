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
  const [showConfirmation, setShowConfirmation] = useState(false);
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

  const handleSelectDriver = async (driver: Driver, role: 'main' | 'assistant') => {
    // Check if trying to assign same driver to both roles
    if (role === 'main' && assistantDriver?.id === driver.id) {
      await Swal.fire({
        icon: 'warning',
        title: 'Invalid Selection',
        text: 'This driver is already assigned as Assistant Driver. Please choose a different driver.',
        confirmButtonColor: '#961c1e',
        customClass: {
          container: 'swal-high-z-index'
        }
      });
      return;
    }
    
    if (role === 'assistant' && mainDriver?.id === driver.id) {
      await Swal.fire({
        icon: 'warning',
        title: 'Invalid Selection',
        text: 'This driver is already assigned as Main Driver. Please choose a different driver.',
        confirmButtonColor: '#961c1e',
        customClass: {
          container: 'swal-high-z-index'
        }
      });
      return;
    }
    
    if (role === 'main') setMainDriver(driver);
    else setAssistantDriver(driver);
  };

  const handleSave = async () => {
    if (!mainDriver || !assistantDriver) {
      await Swal.fire({
        icon: 'warning',
        title: 'Incomplete Selection',
        text: 'Please select both a main driver and an assistant driver before saving.',
        confirmButtonColor: '#961c1e',
        customClass: {
          container: 'swal-high-z-index'
        }
      });
      return;
    }

    // Show custom confirmation modal
    setShowConfirmation(true);
  };

  const handleConfirmAssignment = async () => {
    setShowConfirmation(false);
    
    // Proceed with assignment
    onSave({ mainDriver: mainDriver!, assistantDriver: assistantDriver! });
    
    await Swal.fire({
      icon: 'success',
      title: 'Drivers Assigned Successfully!',
      text: `Main Driver: ${mainDriver!.name}\nAssistant Driver: ${assistantDriver!.name}`,
      confirmButtonColor: '#961c1e',
    });
    onClose();
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
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
              {drivers.map(driver => {
                const isMainDriver = mainDriver?.id === driver.id;
                const isAssistantDriver = assistantDriver?.id === driver.id;
                const cardClassName = `${styles.driverCard} ${
                  isMainDriver ? styles.selectedMainDriver : 
                  isAssistantDriver ? styles.selectedAssistantDriver : ''
                }`;
                
                return (
                  <div key={driver.id} className={cardClassName}>
                    <div className={styles.driverInfo}>
                      <div className={styles.driverImageContainer}>
                        <Image src={driver.image || '/assets/images/busdriver.png'} alt="Driver" className={styles.driverImage} fill />
                      </div>
                      <div className={styles.driverDetails}>
                        <div className={styles.driverName}>
                          {driver.name}
                          <span className={styles.driverJob}>{driver.job}</span>
                          {isMainDriver && <span style={{ color: '#961c1e', fontWeight: 700, fontSize: '0.85rem' }}>• Main</span>}
                          {isAssistantDriver && <span style={{ color: '#6c757d', fontWeight: 700, fontSize: '0.85rem' }}>• Assistant</span>}
                        </div>
                        <div className={styles.driverContact}>{driver.contactNo}</div>
                        <div className={styles.driverAddress}>{driver.address}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      <button 
                        className={isMainDriver ? styles.selectedDriverButton : ''}
                        onClick={() => handleSelectDriver(driver, 'main')}
                        style={{
                          backgroundColor: isMainDriver ? '#10b981' : '#961C1E',
                          borderColor: isMainDriver ? '#10b981' : '#961C1E',
                          color: 'white',
                          padding: '8px 14px',
                          borderRadius: '6px',
                          fontWeight: 500,
                          fontSize: '0.875rem',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap',
                          minWidth: '140px',
                          cursor: 'pointer',
                          border: 'none',
                        }}
                      >
                        {isMainDriver ? '✓ Main Selected' : 'Set as Main'}
                      </button>
                      <button 
                        className={isAssistantDriver ? styles.selectedDriverButton : ''}
                        onClick={() => handleSelectDriver(driver, 'assistant')}
                        style={{
                          backgroundColor: isAssistantDriver ? '#10b981' : '#961C1E',
                          borderColor: isAssistantDriver ? '#10b981' : '#961C1E',
                          color: 'white',
                          padding: '8px 14px',
                          borderRadius: '6px',
                          fontWeight: 500,
                          fontSize: '0.875rem',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap',
                          minWidth: '140px',
                          cursor: 'pointer',
                          border: 'none',
                        }}
                      >
                        {isAssistantDriver ? '✓ Assistant Selected' : 'Set as Assistant'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <small className="text-muted">{currentTime}</small>
          <Button text="Assign Selected Drivers" onClick={handleSave} />
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className={styles.confirmationOverlay}>
          <div className={styles.confirmationModal}>
            <div className={styles.confirmationHeader}>
              <h2 className={styles.confirmationTitle}>Confirm Driver Assignment</h2>
            </div>

            <div className={styles.confirmationBody}>
              <p className={styles.confirmationQuestion}>
                Are you sure you want to assign the following drivers{busData ? ` to ${busData.busName}` : ''}?
              </p>

              <div className={styles.confirmationSection}>
                <div className={styles.driverConfirmCard + ' ' + styles.mainDriverCard}>
                  <div className={styles.confirmCardHeader}>Main Driver</div>
                  <div className={styles.driverInfo}>
                    <div className={styles.driverImageContainer}>
                      <Image 
                        src={mainDriver!.image || '/assets/images/busdriver.png'} 
                        alt="Main Driver" 
                        className={styles.driverImage} 
                        fill 
                      />
                    </div>
                    <div className={styles.driverDetails}>
                      <div className={styles.driverName}>{mainDriver!.name}</div>
                      <div className={styles.driverContact}>{mainDriver!.contactNo}</div>
                      <div className={styles.driverAddress}>{mainDriver!.address}</div>
                    </div>
                  </div>
                </div>

                <div className={styles.driverConfirmCard + ' ' + styles.assistantDriverCard}>
                  <div className={styles.confirmCardHeader}>Assistant Driver</div>
                  <div className={styles.driverInfo}>
                    <div className={styles.driverImageContainer}>
                      <Image 
                        src={assistantDriver!.image || '/assets/images/busdriver.png'} 
                        alt="Assistant Driver" 
                        className={styles.driverImage} 
                        fill 
                      />
                    </div>
                    <div className={styles.driverDetails}>
                      <div className={styles.driverName}>{assistantDriver!.name}</div>
                      <div className={styles.driverContact}>{assistantDriver!.contactNo}</div>
                      <div className={styles.driverAddress}>{assistantDriver!.address}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.confirmationFooter}>
              <Button text="Cancel" onClick={handleCancelConfirmation} />
              <Button text="Yes, Assign Drivers" onClick={handleConfirmAssignment} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRentalDriverModal;
