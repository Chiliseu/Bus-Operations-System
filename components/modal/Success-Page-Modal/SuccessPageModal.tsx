"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Calendar, MapPin, Users, Clock, Bus, User, Phone, FileText } from "lucide-react";
import styles from "./success.module.css";

interface RentalSummary {
  requestId: string;
  customerName: string;
  contact: string;
  email: string;
  homeAddress: string;
  validIdType: string;
  validIdNumber: string;
  validIdImage: string | null;
  busType: string;
  busName: string;
  rentalDate: string;
  duration: string;
  distance: string;
  passengers: string;
  destination: string;
  pickupLocation: string;
  totalPrice: string;
  note?: string;
}

interface SuccessPageModalProps {
  show: boolean;
  onClose: () => void;
  summary: RentalSummary;
}

export default function SuccessPageModal({ show, onClose, summary }: SuccessPageModalProps) {
  const router = useRouter();

  if (!show) return null;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (value: string) => {
    const num = parseFloat(value);
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(num);
  };

  const handleCreateAnother = () => {
    onClose();
    // Stay on current page (already on bus-rental)
  };

  const handleViewPending = () => {
    onClose();
    router.push("/bus-rental/Pending");
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.successContainer}>
          <div className={styles.successCard}>
            {/* Success Header */}
            <div className={styles.successHeader}>
              <div className={styles.successIconWrapper}>
                <CheckCircle className={styles.successIcon} />
              </div>
              <h1 className={styles.successTitle}>Rental Request Submitted!</h1>
              <p className={styles.successSubtitle}>
                Your rental request has been successfully created and is now pending approval.
              </p>
              <div className={styles.requestIdBadge}>
                <span className={styles.requestIdLabel}>Request ID:</span>
                <span className={styles.requestIdValue}>{summary.requestId}</span>
              </div>
            </div>

            {/* Summary Sections */}
            <div className={styles.summaryContainer}>
              {/* Customer Information */}
              <div className={styles.summarySection}>
                <h2 className={styles.sectionTitle}>
                  <User className={styles.sectionIcon} />
                  Customer Information
                </h2>
                <div className={styles.summaryGrid}>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Name</span>
                    <span className={styles.summaryValue}>{summary.customerName}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>
                      <Phone size={16} /> Contact
                    </span>
                    <span className={styles.summaryValue}>{summary.contact}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Email</span>
                    <span className={styles.summaryValue}>{summary.email}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Home Address</span>
                    <span className={styles.summaryValue}>{summary.homeAddress}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Valid ID Type</span>
                    <span className={styles.summaryValue}>{summary.validIdType}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>ID Number</span>
                    <span className={styles.summaryValue}>{summary.validIdNumber}</span>
                  </div>
                </div>
                {summary.validIdImage && (
                  <div style={{ marginTop: '1rem' }}>
                    <span className={styles.summaryLabel} style={{ marginBottom: '0.5rem', display: 'block' }}>Valid ID Image</span>
                    <img
                      src={summary.validIdImage}
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

              {/* Rental Details */}
              <div className={styles.summarySection}>
                <h2 className={styles.sectionTitle}>
                  <Bus className={styles.sectionIcon} />
                  Rental Details
                </h2>
                <div className={styles.summaryGrid}>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Bus Type</span>
                    <span className={styles.summaryValue}>{summary.busType}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Selected Bus</span>
                    <span className={styles.summaryValue}>{summary.busName}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>
                      <Calendar size={16} /> Rental Date
                    </span>
                    <span className={styles.summaryValue}>{formatDate(summary.rentalDate)}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>
                      <Clock size={16} /> Duration
                    </span>
                    <span className={styles.summaryValue}>
                      {summary.duration} day{summary.duration !== "1" ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trip Information */}
              <div className={styles.summarySection}>
                <h2 className={styles.sectionTitle}>
                  <MapPin className={styles.sectionIcon} />
                  Trip Information
                </h2>
                <div className={styles.summaryGrid}>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Pickup Location</span>
                    <span className={styles.summaryValue}>{summary.pickupLocation}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Destination</span>
                    <span className={styles.summaryValue}>{summary.destination}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>Distance</span>
                    <span className={styles.summaryValue}>{summary.distance} km</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>
                      <Users size={16} /> Passengers
                    </span>
                    <span className={styles.summaryValue}>{summary.passengers}</span>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              {summary.note && (
                <div className={styles.summarySection}>
                  <h2 className={styles.sectionTitle}>
                    <FileText className={styles.sectionIcon} />
                    Additional Notes
                  </h2>
                  <div className={styles.noteContent}>
                    <p>{summary.note}</p>
                  </div>
                </div>
              )}

              {/* Price Summary */}
              <div className={styles.priceSection}>
                <div className={styles.priceSummary}>
                  <div className={styles.priceContent}>
                    <span className={styles.priceLabel}>Total Rental Price</span>
                    <span className={styles.priceValue}>{formatCurrency(summary.totalPrice)}</span>
                  </div>
                </div>
              </div>

              {/* Next Steps Info */}
              <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>What happens next?</h3>
                <ol className={styles.infoList}>
                  <li>The rental request will be reviewed by our team</li>
                  <li>Customer will be notified once the request is approved or requires changes</li>
                  <li>Check the &quot;Pending Requests&quot; page to track the status of your request</li>
                  <li>Once approved, you&apos;ll receive confirmation and payment instructions</li>
                </ol>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button
                className={`${styles.actionButton} ${styles.secondaryButton}`}
                onClick={handleCreateAnother}
              >
                Create Another Request
              </button>
              <button
                className={`${styles.actionButton} ${styles.primaryButton}`}
                onClick={handleViewPending}
              >
                View Pending Requests
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}