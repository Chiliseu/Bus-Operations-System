'use client';

import React, { useEffect, useState } from "react";
import styles from "./view-damage.module.css"; // reuse your existing styles

interface ViewDamageModalProps {
  show: boolean;
  onClose: () => void;
  busInfo: {
    rentalId: string;
    busNumber: string;
    driver: string;
  };
  damageData?: {
    vehicleCondition: Record<string, boolean>;
    note: string;
  };
}

const ViewDamageModal: React.FC<ViewDamageModalProps> = ({ show, onClose, busInfo, damageData }) => {
  const conditionItems = [
    "Battery",
    "Lights",
    "Oil",
    "Water",
    "Brake",
    "Air",
    "Gas",
    "Engine",
    "Tire Condition"
  ];

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

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Damage Check</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className={styles.body}>
          <div className={styles.leftCol}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Bus Information</h4>
              <p><strong>Bus:</strong> {busInfo.busNumber}</p>
              <p><strong>Driver:</strong> {busInfo.driver}</p>
            </div>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Vehicle Damage Check</h4>
              <div className={styles.vehicleGrid}>
                {conditionItems.map((item) => (
                  <div className={styles.vehicleCheck} key={item}>
                    <input type="checkbox" checked={damageData?.vehicleCondition[item] ?? false} readOnly />
                    <label>{item}</label>
                  </div>
                ))}
              </div>

              <div className={styles.section} style={{ marginTop: '16px' }}>
                <label className={styles.formLabel}>Notes</label>
                <textarea
                  className={styles.input}
                  value={damageData?.note || ""}
                  readOnly
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <small className="text-muted" style={{ marginRight: 'auto' }}>
            {currentTime}
          </small>
          <button type="button" className={styles.createBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDamageModal;
