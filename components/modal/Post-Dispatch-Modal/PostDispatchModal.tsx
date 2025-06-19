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
  const [isQuotaMet, setIsQuotaMet] = useState(true); // Default to false (Not Met)
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

  useEffect(() => {
    if (!busInfo?.RegularBusAssignment?.QuotaPolicies) return;

    const today = new Date();
    const todayISO = today.toISOString();

    // Find the quota policy for today
    // const found = busInfo.RegularBusAssignment.QuotaPolicies.find(qp => {
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
  const [remarks, setRemarks] = useState<string>("");

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
    // Add more checks as needed (e.g., remarks, payment method)
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
            <h4 className={styles.sectionTitle}>Bus Assignment Information</h4>
            <div className="flex justify-center gap-20 h-5">
              <p><strong>Bus:</strong> {busInfo.busLicensePlate}</p>
              <p><strong>Driver:</strong> {busInfo.driverName}</p>
              <p><strong>Conductor:</strong> {busInfo.conductorName}</p>
            </div>
            <hr />
            
            <div className="bg-gray-100 border border-blue-500 rounded-lg p-4 w-full max-w-xl mx-auto">
            <div className="text-center font-semibold text-lg text-gray-800 mb-2">
              Quota to be Met
            </div>

            {/* Conditional Rendering Based on quotaType */}
            {activeQuota?.Fixed ? (
                <>
                  {/* Quota to be Met (now Total Required) */}
                  <div className="text-center font-bold text-2xl text-green-600 mb-4">
                    ₱ {(
                      (activeQuota.Fixed.Quota ?? 0) +
                      (busInfo.RegularBusAssignment?.LatestBusTrip?.ChangeFund ?? 0) -
                      (paymentMethod === 'reimbursement' ? tripExpense : 0)
                    ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="flex items-center justify-center text-lg text-gray-700 mb-2">
                    <div className="flex flex-col items-center mx-2">
                      <div className="font-semibold">Base Quota</div>
                      <div className="font-bold">
                        ₱ {activeQuota.Fixed.Quota.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="mx-2 text-2xl font-bold">+</div>
                    <div className="flex flex-col items-center mx-2">
                      <div className="font-semibold">Change Fund</div>
                      <div className="font-bold">
                        ₱ {busInfo.RegularBusAssignment?.LatestBusTrip?.ChangeFund?.toLocaleString(undefined, { minimumFractionDigits: 2 }) ?? "0.00"}
                      </div>
                    </div>
                    <div className="mx-2 text-2xl font-bold">-</div>
                    <div className="flex flex-col items-center mx-2">
                      <div className="font-semibold">Trip Expense</div>
                      <div className="font-bold">
                        ₱ {(paymentMethod === 'reimbursement'
                          ? tripExpense
                          : 0
                        ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-300 mb-4"></div>
                </>
              ) : activeQuota?.Percentage ? (
                <>
                <div className="text-center font-bold text-2xl text-blue-600 mb-4">
                  Company Share: {companySharePercent}%
                </div>
                <div className="border-b border-gray-300 mb-4"></div>
                <div className="flex justify-between text-center text-lg text-gray-700">
                  <div>
                    <div className="font-semibold">Company Gets</div>
                    <div className="font-bold">
                      ₱ {companyMoney.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-gray-500">
                      ({companySharePercent}% of Sales + Change Fund{paymentMethod === 'reimbursement' ? ' - Trip Expense' : ''})
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">Remaining Share</div>
                    <div className="font-bold">
                      ₱ {remainingMoney.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-gray-500">
                      ({100 - companySharePercent}% of Sales)
                    </div>
                  </div>
                </div>
              </>
              ) : (
                <div className="text-center text-red-500">No active quota policy for today.</div>
              )}
          </div>

            <hr />

            {/* Ticket and Expense Info */}
            <div className="mb-6">
              {/* Latest Ticket ID Inputs */}
              {ticketBusTrips.length > 0 && (
                <>
                  <label className="block font-semibold text-gray-700 mb-2">Latest Ticket IDs</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {ticketBusTrips.map((tbt, idx) => (
                      <div key={tbt.TicketBusTripID || idx} className="flex flex-col">
                        <label className="font-semibold text-gray-700 mb-1">
                          ₱{tbt.TicketType?.Value} Latest Ticket ID
                        </label>
                        <input
                          type="number"
                          className="border border-gray-300 rounded-md p-2"
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
                </>
              )}

              {/* Trip Expense and Payment Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Trip Expense:</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-2"
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
                {/* Radio Button: Reimbursement/Company Cash */}
                <div className="flex flex-col items-start">
                  <label className="block font-semibold text-gray-700 mb-1">Payment Method:</label>
                  <div className="flex flex-row gap-4">
                    <label className="flex items-center gap-1">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="reimbursement" 
                        checked={paymentMethod === 'reimbursement'}
                        onChange={() => setPaymentMethod('reimbursement')}
                      />
                      <span>Reimbursement</span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="companycash"
                        checked={paymentMethod === 'companycash'}
                        onChange={() => setPaymentMethod('companycash')}
                      />
                      <span>Company Cash</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Sales:</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-2"
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
                <div className="flex flex-col">
                  <label className="block font-semibold text-gray-700 mb-1">Total Expected Money:</label>
                  <label>
                    ₱ {totalExpectedMoney.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </label>
                </div>
              </div>
            </div>

            {/* Inspector Remarks */}
            <div className="mt-4">
              <label className="block font-semibold text-gray-700 mb-1">Inspector Remarks:</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2"
                rows={3}
                placeholder="Enter remarks"
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 py-3 px-4 bg-gray-100 rounded-b-lg">
          {/* Conditional Quota Status Rendering */}
          <div className="flex flex-col items-center">
            {/* <label className="block font-semibold text-gray-700 mb-2">Quota Status</label> */}
            {/* <div className="flex gap-4">
              {isQuotaMet ? (
                <label className="bg-green-500 text-white font-bold py-1 px-3 rounded-md">
                  Met
                </label>
              ) : (
                <label className="bg-red-500 text-white font-bold py-1 px-3 rounded-md">
                  Not Met
                </label>
              )}
            </div> */}
          </div>

          {/* Save Button */}
          <button type="button" className={styles.createBtn} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDispatchModal;

{/* <div>
  <label className="block font-semibold text-gray-700 mb-1">Trip Expense:</label>
  <input
    type="number"
    className="w-full border border-gray-300 rounded-md p-2"
    placeholder="₱ 0.00"
    value={tripExpense}
    onChange={e => setTripExpense(Number(e.target.value) || 0)}
  />              
</div> */}