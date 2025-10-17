'use client';

import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import styles from "./approve-bus-readiness.module.css";

interface ApprovedBusReadinessModalProps {
  show: boolean;
  onClose: () => void;
  busInfo: {
    regularBusAssignmentID: string;
    busNumber: string;
    driver: string;
  };
  onSave: (data: {
    regularBusAssignmentID: string;
    vehicleCondition: Record<string, boolean>;
    personnelCondition: { driverReady: boolean };
  }) => Promise<boolean>;
  readiness?: {
    regularBusAssignmentID: string;
    vehicleCondition: Record<string, boolean>;
    personnelCondition: { driverReady: boolean };
  };
}

const ApprovedBusReadinessModal: React.FC<ApprovedBusReadinessModalProps> = ({
  show,
  onClose,
  busInfo,
  onSave,
  readiness,
}) => {
  const conditionItems = [
    "Battery", "Air",
    "Lights", "Gas",
    "Oil", "Engine",
    "Water", "Tire",
    "Brake"
  ];

  const [vehicleCondition, setVehicleCondition] = useState<Record<string, boolean>>({});
  const [personnelCondition, setPersonnelCondition] = useState({ driverReady: false });
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleString('en-US', { hour12: true })
  );

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('en-US', { hour12: true }));
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

  useEffect(() => {
    if (show) {
      setVehicleCondition(
        readiness?.vehicleCondition ??
        conditionItems.reduce((acc, item) => ({ ...acc, [item]: false }), {})
      );
      setPersonnelCondition(readiness?.personnelCondition ?? { driverReady: false });
    }
  }, [show, readiness]);

  const toggleVehicleCondition = (item: string) => {
    setVehicleCondition((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handlePersonnelChange = () => {
    setPersonnelCondition((prev) => ({ ...prev, driverReady: !prev.driverReady }));
  };

  const handleSave = async () => {
    // ✅ Validation: all vehicle checks must be true and driver must be ready
    const allVehicleChecked = Object.values(vehicleCondition).every((v) => v === true);

    if (!allVehicleChecked || !personnelCondition.driverReady) {
      await Swal.fire(
        'Incomplete',
        'Please ensure all vehicle items are checked and the driver is ready before saving.',
        'warning'
      );
      return; // Prevent saving
    }

    const success = await onSave({
      regularBusAssignmentID: busInfo.regularBusAssignmentID,
      vehicleCondition,
      personnelCondition,
    });

    if (success) onClose();
  };

  if (!show) return null;

  const gridRows = [];
  for (let i = 0; i < conditionItems.length; i += 2) {
    gridRows.push(conditionItems.slice(i, i + 2));
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Approved Bus Readiness</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.leftCol}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Bus Information</h4>
              <p><strong>Bus:</strong> {busInfo.busNumber}</p>
              <p><strong>Driver:</strong> {busInfo.driver}</p>
            </div>

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Personnel Condition</h4>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="driverReady"
                  checked={personnelCondition.driverReady}
                  onChange={handlePersonnelChange}
                />
                <label className="form-check-label" htmlFor="driverReady">
                  Driver Ready
                </label>
              </div>
            </div>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Vehicle Condition</h4>
              <div className={styles.vehicleGrid}>
                {gridRows.map((row, rowIdx) => (
                  <React.Fragment key={rowIdx}>
                    {row.map((item) => (
                      <div className={styles.vehicleCheck} key={item}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={item}
                          checked={vehicleCondition[item] || false}
                          onChange={() => toggleVehicleCondition(item)}
                        />
                        <label className="form-check-label" htmlFor={item}>
                          {item}
                        </label>
                      </div>
                    ))}
                    {row.length === 1 && <div></div>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.footer} d-flex justify-content-between align-items-center`}>
          <small className="text-muted">{currentTime}</small>
          <button type="button" className={styles.createBtn} onClick={handleSave}>
            Save Readiness
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovedBusReadinessModal;
