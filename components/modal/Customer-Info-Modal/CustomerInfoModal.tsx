"use client";

import React from "react";
import { X, User, Mail, Phone, MapPin, CreditCard, FileText } from "lucide-react";
import styles from "./customer-info.module.css";

interface CustomerInfoModalProps {
  show: boolean;
  onClose: () => void;
  customerInfo: {
    customerName: string;
    email: string;
    contact: string;
    homeAddress: string;
    validIdType: string;
    validIdNumber: string;
    validIdImage: string | null;
    note: string;
  };
}

export default function CustomerInfoModal({ show, onClose, customerInfo }: CustomerInfoModalProps) {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.customerContainer}>
          <div className={styles.customerCard}>
            {/* Header */}
            <div className={styles.customerHeader}>
              <div className={styles.headerContent}>
                <User className={styles.headerIcon} />
                <h2 className={styles.customerTitle}>Customer Information</h2>
              </div>
              <button className={styles.closeButton} onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className={styles.summaryContainer}>
              {/* Customer Details Section */}
              <div className={styles.summarySection}>
                <h3 className={styles.sectionTitle}>
                  <User className={styles.sectionIcon} />
                  Personal Details
                </h3>
                <div className={styles.summaryGrid}>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Customer Name</span>
                    <span className={styles.summaryValue}>{customerInfo.customerName || "N/A"}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>
                      <Phone size={16} /> Contact Number
                    </span>
                    <span className={styles.summaryValue}>{customerInfo.contact || "N/A"}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>
                      <Mail size={16} /> Email Address
                    </span>
                    <span className={styles.summaryValue}>{customerInfo.email || "N/A"}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>
                      <MapPin size={16} /> Home Address
                    </span>
                    <span className={styles.summaryValue}>{customerInfo.homeAddress || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Valid ID Section */}
              <div className={styles.summarySection}>
                <h3 className={styles.sectionTitle}>
                  <CreditCard className={styles.sectionIcon} />
                  Valid ID Information
                </h3>
                <div className={styles.summaryGrid}>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>ID Type</span>
                    <span className={styles.summaryValue}>{customerInfo.validIdType || "N/A"}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>ID Number</span>
                    <span className={styles.summaryValue}>{customerInfo.validIdNumber || "N/A"}</span>
                  </div>
                </div>
                {customerInfo.validIdImage && (
                  <div style={{ marginTop: '1rem' }}>
                    <span className={styles.summaryLabel} style={{ marginBottom: '0.5rem', display: 'block' }}>
                      ID Image
                    </span>
                    <img
                      src={customerInfo.validIdImage}
                      alt="Valid ID"
                      style={{
                        width: '100%',
                        maxHeight: '300px',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        border: '2px solid #e5e7eb',
                        backgroundColor: 'white',
                        padding: '0.5rem'
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Additional Notes Section */}
              {customerInfo.note && (
                <div className={styles.summarySection}>
                  <h3 className={styles.sectionTitle}>
                    <FileText className={styles.sectionIcon} />
                    Additional Notes
                  </h3>
                  <div className={styles.noteContent}>
                    <p>{customerInfo.note}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={styles.actionButtons}>
              <button className={styles.closeFooterButton} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
