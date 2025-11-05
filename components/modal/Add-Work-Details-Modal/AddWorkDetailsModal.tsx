'use client';

import React, { useEffect, useState } from 'react';
import styles from './add-work-modal.module.css';

interface AddWorkDetailsModalProps {
  show: boolean;
  onClose: () => void;
  damageReport: {
    battery: boolean;
    lights: boolean;
    oil: boolean;
    water: boolean;
    brake: boolean;
    air: boolean;
    gas: boolean;
    engine: boolean;
    tireCondition: boolean;
    notes: string;
    reportedBy: string;
  };
  busNo: string;
  onSave: (data: {
    workNo: string;
    workTitle: string;
    workRemarks: string;
    priority: string;
    startDate: string;
    dueDate: string;
  }) => Promise<void>;
  isUpdateMode?: boolean;
  existingData?: {
    workNo: string;
    workTitle: string;
    workRemarks: string;
    priority: string;
    startDate: string;
    dueDate: string;
  };
}

const AddWorkDetailsModal: React.FC<AddWorkDetailsModalProps> = ({
  show,
  onClose,
  damageReport,
  busNo,
  onSave,
  isUpdateMode = false,
  existingData,
}) => {
  const [workNo, setWorkNo] = useState('');
  const [workTitle, setWorkTitle] = useState('');
  const [workRemarks, setWorkRemarks] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleString('en-US', { hour12: true })
  );

  useEffect(() => {
    if (show) {
      if (isUpdateMode && existingData) {
        // Update mode - populate with existing data
        setWorkNo(existingData.workNo);
        setWorkTitle(existingData.workTitle);
        setWorkRemarks(existingData.workRemarks);
        setPriority(existingData.priority);
        
        // Convert dates to YYYY-MM-DD format for date inputs
        const formattedStartDate = existingData.startDate 
          ? new Date(existingData.startDate).toISOString().split('T')[0]
          : '';
        const formattedDueDate = existingData.dueDate 
          ? new Date(existingData.dueDate).toISOString().split('T')[0]
          : '';
        
        setStartDate(formattedStartDate);
        setDueDate(formattedDueDate);
      } else {
        // Add mode - generate new work number
        const randomNum = Math.floor(Math.random() * 10000);
        setWorkNo(`WRK-${String(randomNum).padStart(4, '0')}`);
        
        const today = new Date().toISOString().split('T')[0];
        setStartDate(today);
        
        setWorkTitle('');
        setWorkRemarks('');
        setPriority('Medium');
        setDueDate('');
      }
    }
  }, [show, isUpdateMode, existingData]);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('en-US', { hour12: true }));
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

  const handleSave = async () => {
    if (!workTitle.trim()) {
      alert('Please enter a work title');
      return;
    }

    if (!startDate || !dueDate) {
      alert('Please select start and due dates');
      return;
    }

    if (new Date(dueDate) < new Date(startDate)) {
      alert('Due date cannot be earlier than start date');
      return;
    }

    setSaving(true);
    try {
      await onSave({
        workNo,
        workTitle,
        workRemarks,
        priority,
        startDate,
        dueDate,
      });
    } catch (err) {
      console.error('Failed to save work details', err);
    } finally {
      setSaving(false);
    }
  };

  if (!show) return null;

  const damageItems = [
    { label: 'Battery', value: damageReport.battery },
    { label: 'Lights', value: damageReport.lights },
    { label: 'Oil', value: damageReport.oil },
    { label: 'Water', value: damageReport.water },
    { label: 'Brake', value: damageReport.brake },
    { label: 'Air', value: damageReport.air },
    { label: 'Gas', value: damageReport.gas },
    { label: 'Engine', value: damageReport.engine },
    { label: 'Tire Condition', value: damageReport.tireCondition },
  ];

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Add Work Details Modal">
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isUpdateMode ? 'Update Work Details' : 'Add Work Details'}
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close" disabled={saving}>
            ×
          </button>
        </div>

        <div className={styles.body}>
          {/* Section 1: Damage Report Summary (Read-Only) */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Damage Report Summary</h3>
            <p className={styles.busInfo}><strong>Bus No:</strong> {busNo}</p>
            
            <div className={styles.damageGrid}>
              {damageItems.map((item) => (
                <div key={item.label} className={styles.damageItem}>
                  <span className={styles.damageLabel}>{item.label}:</span>
                  <span className={item.value ? styles.statusOk : styles.statusNotOk}>
                    {item.value ? '✓ OK' : '✗ Not OK'}
                  </span>
                </div>
              ))}
            </div>

            {damageReport.notes && (
              <div className={styles.notesSection}>
                <p className={styles.notesLabel}><strong>Notes:</strong></p>
                <p className={styles.notesText}>{damageReport.notes}</p>
              </div>
            )}
            
            <div className={styles.reportedBySection} style={{ marginTop: '12px', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>
                <strong>Reported By:</strong> {damageReport.reportedBy}
              </p>
            </div>
          </div>

          <hr className={styles.divider} />

          {/* Section 2: Work Order Details (Editable) */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Work Order Details</h3>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Work No. <span className={styles.required}>*</span></label>
                <input
                  type="text"
                  className={styles.input}
                  value={workNo}
                  disabled
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Priority <span className={styles.required}>*</span></label>
                <select
                  className={styles.select}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  disabled={saving}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Work Title <span className={styles.required}>*</span></label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g., Brake and Engine Maintenance"
                value={workTitle}
                onChange={(e) => setWorkTitle(e.target.value)}
                disabled={saving}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Work Remarks</label>
              <textarea
                className={styles.textarea}
                placeholder="e.g., Inspect brake system, replace tires, check engine noise..."
                value={workRemarks}
                onChange={(e) => setWorkRemarks(e.target.value)}
                rows={4}
                disabled={saving}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Start Date <span className={styles.required}>*</span></label>
                <input
                  type="date"
                  className={styles.input}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  disabled={saving}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Due Date <span className={styles.required}>*</span></label>
                <input
                  type="date"
                  className={styles.input}
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={startDate}
                  disabled={saving}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <small className={styles.currentTime}>{currentTime}</small>
          <div className={styles.footerButtons}>
            <button
              className={styles.createBtn}
              onClick={handleSave}
              type="button"
              disabled={saving}
            >
              {saving ? 'Saving...' : isUpdateMode ? 'Update Work Order' : 'Submit Work Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWorkDetailsModal;