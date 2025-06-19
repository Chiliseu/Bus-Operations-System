'use client';

import React, { useState, useEffect } from "react";
import styles from "./post-dispatch-modal.module.css";
import { TicketType } from "@/app/interface";
import { TicketBusTrip } from "@/app/interface";
import type { BusAssignment } from "@/app/interface/bus-assignment";


interface BusAssignmentModalProps {
  show: boolean;
  onClose: () => void;
  busInfo: BusAssignment & {
    driverName?: string;
    conductorName?: string;
    busLicensePlate?: string;
    busType?: string;
  };
}

const PostDispatchModal: React.FC<BusAssignmentModalProps> = ({
  show,
  onClose,
  busInfo,
}) => {
  // Define a variable for Quota Status
  const [isQuotaMet, setIsQuotaMet] = useState(true); // Default to false (Not Met)
  const [quotaType, setQuotaType] = useState<'fixed' | 'percentage'>('percentage');
  const [activeQuota, setActiveQuota] = useState<any>(null);
  const ticketBusTrips = busInfo.RegularBusAssignment?.LatestBusTrip?.TicketBusTrips ?? [];
  const [tripExpense, setTripExpense] = useState<number>(0);
  const [tripExpenseType, setTripExpenseType] = useState<'Reimbursement' | 'Company Cash'>('Company Cash');

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
                    Company Share: {activeQuota.Percentage.Percentage}%
                  </div>
                  <div className="border-b border-gray-300 mb-4"></div>
                  <div className="flex justify-between text-center text-lg text-gray-700">
                    <div>
                      <div className="font-semibold">Company Gets</div>
                      <div className="font-bold">{activeQuota.Percentage.Percentage}%</div>
                    </div>
                    <div>
                      <div className="font-semibold">Remaining Share</div>
                      <div className="font-bold">{100 - activeQuota.Percentage.Percentage}%</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-red-500">No active quota policy for today.</div>
              )}
          </div>

            <hr />

            {/* Ticket and Expense Info */}
            <div className="grid grid-cols-3 gap-4 text-base">
              {/* Latest Ticket ID Inputs */}
              {ticketBusTrips.length > 0 && (
                <div className="grid grid-cols-3 gap-4 text-base">
                  {ticketBusTrips.map((tbt, idx) => (
                    <div key={tbt.TicketBusTripID || idx}>
                      <label className="block font-semibold text-gray-700 mb-1">
                        ₱{tbt.TicketType?.Value} Latest Ticket ID
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        // value={...} // You can manage state for each input if needed
                        // onChange={...}
                      />
                    </div>
                  ))}
                </div>
              )}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Trip Expense:</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="₱ 0.00"
                  value={tripExpense}
                  onChange={e => setTripExpense(Number(e.target.value) || 0)}
                />              
              </div>
              {/* Radio Button: Imbursement/Company Cash */}
              <div className="flex flex-col items-start">
                <label className="block font-semibold text-gray-700">Payment Method:</label>
                <label>
                  <div className="flex flex-row gap-1">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="reimbursement" 
                      checked={paymentMethod === 'reimbursement'}
                      onChange={() => setPaymentMethod('reimbursement')}
                    />
                    <span>Reimbursement</span>
                  </div>
                </label>
                <label>
                  <div className="flex flex-row gap-1">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="companycash"
                      checked={paymentMethod === 'companycash'}
                      onChange={() => setPaymentMethod('companycash')}
                    />
                    <span>Company Cash</span>
                  </div>
                </label>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Sales:</label>
                <input type="number" className="w-full border border-gray-300 rounded-md p-2" placeholder="₱ 0.00" />
              </div>
              <div className="flex flex-col">
                <label className="block font-semibold text-gray-700 mb-1">Total Expected Money:</label>
                <label>₱ 100.00</label>
              </div>
            </div>

            {/* Inspector Remarks */}
            <div className="mt-4">
              <label className="block font-semibold text-gray-700 mb-1">Inspector Remarks:</label>
              <textarea className="w-full border border-gray-300 rounded-md p-2" rows={3} placeholder="Enter remarks"></textarea>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 py-3 px-4 bg-gray-100 rounded-b-lg">
          {/* Conditional Quota Status Rendering */}
          <div className="flex flex-col items-center">
            <label className="block font-semibold text-gray-700 mb-2">Quota Status</label>
            <div className="flex gap-4">
              {isQuotaMet ? (
                <label className="bg-green-500 text-white font-bold py-1 px-3 rounded-md">
                  Met
                </label>
              ) : (
                <label className="bg-red-500 text-white font-bold py-1 px-3 rounded-md">
                  Not Met
                </label>
              )}
            </div>
          </div>

          {/* Save Button */}
          <button type="button" className={styles.createBtn}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDispatchModal;