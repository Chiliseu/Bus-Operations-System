'use client';

import React, { useState, useEffect } from "react";
import styles from "./post-dispatch-modal.module.css";
import { TicketType } from "@/app/interface";
import { TicketBusTrip } from "@/app/interface";
import type { BusAssignment } from "@/app/interface/bus-assignment";
import Swal from "sweetalert2";

interface BusAssignmentModalProps {
  show: boolean;
  onClose: () => void;
  busInfo: BusAssignment & {
    driverName?: string;
    conductorName?: string;
    busLicensePlate?: string;
    busType?: string;
  };
  onSave: (formData: {
    sales: number;
    tripExpense: number;
    paymentMethod: 'reimbursement' | 'companycash';
    latestTicketIds: number[];
    remarks: string;
    busAssignmentID: string;
  }) => Promise<void>;
}

const PostDispatchModal: React.FC<BusAssignmentModalProps> = ({
  show,
  onClose,
  busInfo,
  onSave,
}) => {
  // Define a variable for Quota Status
  const [isQuotaMet, setIsQuotaMet] = useState(true);
  const [quotaType, setQuotaType] = useState<'fixed' | 'percentage'>('percentage');
  const [activeQuota, setActiveQuota] = useState<any>(null);
  const ticketBusTrips = busInfo.RegularBusAssignment?.LatestBusTrip?.TicketBusTrips ?? [];
  const [tripExpense, setTripExpense] = useState<number>(0);
  const [sales, setSales] = useState<number | undefined>(undefined);
  const [latestTicketIds, setLatestTicketIds] = useState<number[]>(
    ticketBusTrips.map(() => 0)
  );

  // Radio button trip expense type  
  const [paymentMethod, setPaymentMethod] = useState<'reimbursement' | 'companycash'>('reimbursement');
  const [remarks, setRemarks] = useState<string>("");

  useEffect(() => {
    if (!busInfo?.RegularBusAssignment?.QuotaPolicies) return;

    const today = new Date();
    const todayISO = today.toISOString();

    // Find the quota policy for today
    const found = busInfo.RegularBusAssignment.QuotaPolicies.find(qp => {
      const start = new Date(qp.StartDate);
      const end = new Date(qp.EndDate);
      return today >= start && today <= end;
    });

    setActiveQuota(found || null);

    if (found) {
      if (found.Fixed) {
        setQuotaType('fixed');
      } else if (found.Percentage) {
        setQuotaType('percentage');
      }
    }
  }, [busInfo]);

  // Reset when ticketBusTrips changes
  useEffect(() => {
    setLatestTicketIds(ticketBusTrips.map(() => 0));
  }, [ticketBusTrips]);

  const totalExpectedMoney = ticketBusTrips.reduce((sum, tbt, idx) => {
    const start = tbt.StartingIDNumber ?? 0;
    const latest = latestTicketIds[idx] ?? 0;
    const sold = Math.max(0, latest - start);
    const value = tbt.TicketType?.Value ?? 0;
    return sum + sold * value;
  }, 0);

  const companySharePercent = activeQuota?.Percentage?.Percentage ?? 0;
  const companyShareDecimal = companySharePercent / 100;
  const totalSales = sales ?? 0;
  const changeFund = busInfo.RegularBusAssignment?.LatestBusTrip?.ChangeFund ?? 0;
  const tripExpenseValue = paymentMethod === 'reimbursement' ? (tripExpense ?? 0) : 0;

  // Company gets a percentage of sales, plus change fund, minus trip expense if reimbursement
  const companyMoney = (totalSales * companyShareDecimal) + changeFund - tripExpenseValue;
  const remainingMoney = totalSales - (totalSales * companyShareDecimal);

  const validateInputs = () => {
    // Check Latest Ticket IDs
    if (ticketBusTrips.some((_, idx) => latestTicketIds[idx] === undefined || latestTicketIds[idx] === 0)) {
      return "All Latest Ticket ID fields are required.";
    }
    // Check Trip Expense
    if (tripExpense === undefined) {
      return "Trip Expense is required.";
    }
    // Check Sales
    if (sales === undefined || sales === 0) {
      return "Sales is required.";
    }
    return null;
  };

  const handleSave = async () => {
    const error = validateInputs();
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Missing Input",
        text: error,
      });
      return;
    }
    await onSave({
      sales: sales!,
      tripExpense: tripExpense!,
      paymentMethod,
      latestTicketIds,
      remarks,
      busAssignmentID: busInfo.BusAssignmentID,
    });
  };

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Bus Sales Entry</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        
        <div className={styles.body}>
          <div className={styles.section}>
            {/* Bus Information */}
            <h4 className={styles.sectionTitle}>
              Bus Assignment Information
            </h4>
            
            <div className={`${styles.grid} ${styles['md:grid-cols-3']} ${styles['gap-4']} ${styles['mb-6']}`}>
              <div className={styles['modern-info-card']} style={{borderLeft: '4px solid #961c1e'}}>
                <div className={styles['modern-info-icon']}>
                  Bus License
                </div>
                <p className={styles['modern-info-value']}>{busInfo.busLicensePlate}</p>
              </div>
              
              <div className={styles['modern-info-card']} style={{borderLeft: '4px solid #961c1e'}}>
                <div className={styles['modern-info-icon']}>
                  Driver
                </div>
                <p className={styles['modern-info-value']}>{busInfo.driverName}</p>
              </div>
              
              <div className={styles['modern-info-card']} style={{borderLeft: '4px solid #961c1e'}}>
                <div className={styles['modern-info-icon']}>
                  Conductor
                </div>
                <p className={styles['modern-info-value']}>{busInfo.conductorName}</p>
              </div>
            </div>
            
            {/* Quota Information */}
            <div className={styles['modern-quota-container']}>
              <div className={styles['modern-quota-header']}>
                Quota to be Met
              </div>

              {activeQuota?.Fixed ? (
                <div className={styles['modern-quota-content']}>
                  <div className={styles['modern-quota-total']}>
                    ₱ {(
                      (activeQuota.Fixed.Quota ?? 0) +
                      (busInfo.RegularBusAssignment?.LatestBusTrip?.ChangeFund ?? 0) -
                      (paymentMethod === 'reimbursement' ? tripExpense : 0)
                    ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  
                  <div className={styles['modern-quota-breakdown']}>
                    <div className={styles['modern-quota-item']}>
                      <div className={styles['modern-quota-label']}>Base Quota</div>
                      <div className={styles['modern-quota-value']}>
                        ₱ {activeQuota.Fixed.Quota.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    
                    <div className={styles['modern-quota-operator']}>+</div>
                    
                    <div className={styles['modern-quota-item']}>
                      <div className={styles['modern-quota-label']}>Change Fund</div>
                      <div className={styles['modern-quota-value']}>
                        ₱ {busInfo.RegularBusAssignment?.LatestBusTrip?.ChangeFund?.toLocaleString(undefined, { minimumFractionDigits: 2 }) ?? "0.00"}
                      </div>
                    </div>
                    
                    <div className={styles['modern-quota-operator']}>-</div>
                    
                    <div className={styles['modern-quota-item']}>
                      <div className={styles['modern-quota-label']}>Trip Expense</div>
                      <div className={styles['modern-quota-value']}>
                        ₱ {(paymentMethod === 'reimbursement' ? tripExpense : 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeQuota?.Percentage ? (
                <div className={styles['modern-quota-content']}>
                  <div className={styles['modern-percentage-header']}>
                    <div className={styles['modern-percentage-value']}>{companySharePercent}%</div>
                    <div className={styles['modern-percentage-label']}>Company Share</div>
                  </div>
                  
                  <div className={styles['modern-share-grid']}>
                    <div className={`${styles['modern-share-card']} ${styles['modern-share-company']}`}>
                      <div className={styles['modern-share-amount']}>
                        ₱ {companyMoney.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className={styles['modern-share-title']}>Company Gets</div>
                      <div className={styles['modern-share-subtitle']}>
                        {companySharePercent}% of Sales + Change Fund{paymentMethod === 'reimbursement' ? ' - Trip Expense' : ''}
                      </div>
                    </div>
                    
                    <div className={`${styles['modern-share-card']} ${styles['modern-share-remaining']}`}>
                      <div className={styles['modern-share-amount']}>
                        ₱ {remainingMoney.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className={styles['modern-share-title']}>Remaining Share</div>
                      <div className={styles['modern-share-subtitle']}>
                        {100 - companySharePercent}% of Sales
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles['modern-no-quota']}>
                  No active quota policy for today.
                </div>
              )}
            </div>

            {/* Form Section */}
            <div className={styles['modern-form-section']}>
              {/* Latest Ticket ID Inputs */}
              {ticketBusTrips.length > 0 && (
                <div className={styles['modern-input-group']}>
                  <div className={styles['modern-section-label']}>
                    Latest Ticket IDs
                  </div>
                  <div className={styles['modern-input-grid']}>
                    {ticketBusTrips.map((tbt, idx) => (
                      <div key={tbt.TicketBusTripID || idx} className={styles['modern-input-container']}>
                        <label className={styles['modern-input-label']}>
                          ₱{tbt.TicketType?.Value} Latest Ticket ID
                        </label>
                        <input
                          type="number"
                          className={styles['modern-input']}
                          min={0}
                          max={tbt.EndingIDNumber ?? 9999}
                          value={latestTicketIds[idx] === 0 ? "" : latestTicketIds[idx]}
                          onChange={e => {
                            const val = e.target.value;
                            setLatestTicketIds(ids => {
                              const newIds = [...ids];
                              let num = val === "" ? 0 : Math.max(0, Number(val));
                              const maxVal = tbt.EndingIDNumber ?? 9999;
                              if (num > maxVal) num = maxVal;
                              newIds[idx] = num;
                              return newIds;
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Financial Information */}
              <div className={styles['modern-input-group']}>
                <div className={styles['modern-section-label']}>
                  Financial Information
                </div>
                <div className={styles['modern-financial-grid']}>
                  <div className={styles['modern-input-container']}>
                    <label className={styles['modern-input-label']}>Trip Expense</label>
                    <input
                      type="number"
                      className={styles['modern-input']}
                      placeholder="₱ 0.00"
                      min={0}
                      max={99999}
                      value={tripExpense === 0 ? "" : tripExpense}
                      onChange={e => {
                        const val = e.target.value;
                        if (val === "") {
                          setTripExpense(0);
                        } else {
                          const num = Math.max(0, Number(val));
                          setTripExpense(num > 99999 ? 99999 : num);
                        }
                      }}
                    />
                  </div>

                  <div className={styles['modern-radio-container']}>
                    <label className={styles['modern-input-label']}>Payment Method</label>
                    <div className={styles['modern-radio-group']}>
                      <label className={styles['modern-radio-option']}>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          className={styles['modern-radio-input']}
                          value="reimbursement" 
                          checked={paymentMethod === 'reimbursement'}
                          onChange={() => setPaymentMethod('reimbursement')}
                        />
                        <span className={styles['modern-radio-label']}>Reimbursement</span>
                      </label>
                      <label className={styles['modern-radio-option']}>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          className={styles['modern-radio-input']}
                          value="companycash"
                          checked={paymentMethod === 'companycash'}
                          onChange={() => setPaymentMethod('companycash')}
                        />
                        <span className={styles['modern-radio-label']}>Company Cash</span>
                      </label>
                    </div>
                  </div>

                  <div className={styles['modern-input-container']}>
                    <label className={styles['modern-input-label']}>Sales</label>
                    <input
                      type="number"
                      className={styles['modern-input']}
                      placeholder="₱ 0.00"
                      min={0}
                      max={99999}
                      value={sales === undefined ? "" : sales}
                      onChange={e => {
                        const val = e.target.value;
                        if (val === "") {
                          setSales(undefined);
                        } else {
                          const num = Math.max(0, Math.min(99999, Number(val)));
                          setSales(num);
                        }
                      }}
                    />
                  </div>

                  <div className={styles['modern-display-container']}>
                    <label className={styles['modern-input-label']}>Total Expected Money</label>
                    <div className={styles['modern-display-value']}>
                      ₱ {totalExpectedMoney.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Inspector Remarks */}
              <div className={styles['modern-input-group']}>
                <div className={styles['modern-section-label']}>
                  Inspector Remarks
                </div>
                <textarea
                  className={styles['modern-textarea']}
                  rows={3}
                  placeholder="Enter remarks"
                  value={remarks}
                  onChange={e => setRemarks(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles['modern-footer']}>
          <div className={styles['modern-status-container']}>
            <div className={styles['modern-validation-badge']}>
              <span>✓</span>
              Form Ready
            </div>
          </div>

          <button type="button" className={styles.createBtn} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDispatchModal;