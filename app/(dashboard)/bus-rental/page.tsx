"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle, Calculator, Bus, User, Info, Receipt, Calendar, MapPin, Clock } from "lucide-react";
import styles from "./bus-rental.module.css";

/* ---- Types ---- */
type BusType = "Aircon" | "Non-Aircon";

interface Bus {
  id: string;
  name: string;
  type: BusType;
  capacity: number;
  available: boolean;
}

/* ---- Initial (mock) bus list ---- */
const INITIAL_BUSES: Bus[] = [
  { id: "B101", name: "Bus 101", type: "Aircon", capacity: 45, available: true },
  { id: "B202", name: "Bus 202", type: "Non-Aircon", capacity: 40, available: true },
  { id: "B303", name: "Bus 303", type: "Aircon", capacity: 50, available: false }, // unavailable example
];

export default function BusRentalPage() {
  // form state
  const [customerName, setCustomerName] = useState("");
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [contact, setContact] = useState(""); // numeric-only
  const [busType, setBusType] = useState<BusType | "">("");
  const [selectedBusId, setSelectedBusId] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [duration, setDuration] = useState(""); // days
  const [distance, setDistance] = useState(""); // km
  const [passengers, setPassengers] = useState(""); // optional for extra fees
  const [destination, setDestination] = useState("");

  // local buses (simulate backend)
  const [buses, setBuses] = useState<Bus[]>(INITIAL_BUSES);

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error" | null; message?: string }>({ type: null });
  const [showTooltip, setShowTooltip] = useState(false);

  // min date (today) to prevent picking the past
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  // sanitize numeric-only inputs (contact, duration, distance, passengers)
  const handleNumericChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setter(digits);
  };

  // generic setters for text
  const handleTextChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setter(e.target.value);
  };

  // available buses filtered by selected type and availability
  const filteredBuses = useMemo(() => {
    return buses.filter((b) => b.available && (!busType || b.type === busType));
  }, [buses, busType]);

  // Get selected bus details
  const selectedBus = useMemo(() => {
    return buses.find((b) => b.id === selectedBusId) || null;
  }, [buses, selectedBusId]);

  // Price calculation (breakdown)
  const [priceBreakdown, setPriceBreakdown] = useState({
    baseRate: 0,
    durationFee: 0,
    distanceFee: 0,
    extraFees: 0,
    total: 0,
  });

  useEffect(() => {
    const d = parseInt(duration || "0", 10) || 0;
    const dist = parseInt(distance || "0", 10) || 0;
    const pax = parseInt(passengers || "0", 10) || 0;

    if (!busType || d <= 0) {
      setPriceBreakdown({ baseRate: 0, durationFee: 0, distanceFee: 0, extraFees: 0, total: 0 });
      return;
    }

    const baseRate = busType === "Aircon" ? 5000 : 3000;
    const durationFee = d * 1000; // ₱1,000 per day
    const distanceFee = dist * 10; // ₱10 per km (example)
    const extraFees = pax > 40 ? 500 : 0; // extra fee if >40 passengers
    const total = baseRate + durationFee + distanceFee + extraFees;

    setPriceBreakdown({ baseRate, durationFee, distanceFee, extraFees, total });
  }, [busType, duration, distance, passengers]);

  const price = priceBreakdown.total;

  // format currency
  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(n);

  // Format date for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isFormReady = useMemo(() => {
  return (
    customerName.trim() &&
    contact.trim() &&
    /^\d{7,15}$/.test(contact) &&
    busType &&
    selectedBusId &&
    rentalDate &&
    rentalDate >= today &&
    parseInt(duration || "0", 10) >= 1 &&
    destination.trim() &&
    parseInt(distance || "0", 10) > 0 &&
    parseInt(passengers || "0", 10) > 0
  );
}, [
  customerName, contact, busType, selectedBusId, rentalDate,
  duration, destination, distance, passengers, today
]);


  // validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) newErrors.customerName = "Customer name is required.";
    if (!contact.trim()) newErrors.contact = "Contact number is required.";
    else if (!/^\d{7,15}$/.test(contact)) newErrors.contact = "Contact must be digits (7–15).";
    if (!busType) newErrors.busType = "Please select a bus type.";
    if (!selectedBusId) newErrors.selectedBusId = "Please select an available bus.";
    else {
      const b = buses.find((x) => x.id === selectedBusId);
      if (!b || !b.available) newErrors.selectedBusId = "Selected bus is not available.";
    }
    if (!rentalDate) newErrors.rentalDate = "Rental date is required.";
    if (rentalDate && rentalDate < today) newErrors.rentalDate = "Rental date cannot be in the past.";
    if (!duration || parseInt(duration || "0", 10) < 1) newErrors.duration = "Duration must be at least 1 day.";
    if (!destination.trim()) newErrors.destination = "Destination is required.";
    if (!price || price <= 0) newErrors.price = "Price must be calculated before submitting.";
    if (!distance) {
      newErrors.distance = "Distance is Required.";
    } else if (parseInt(distance, 10) <= 0) {
      newErrors.distance = "Distance must be greater than 0.";
    }

    if (!passengers) {
      newErrors.passengers = "Passengers is Required.";
    } else if (parseInt(passengers, 10) <= 0) {
      newErrors.passengers = "Passengers must be greated than 0.";
    }
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getMissingFields = () => {
  const missing: string[] = [];

  if (!customerName.trim()) missing.push("Customer Name is required.");
  if (!contact.trim()) missing.push("Contact Number is required.");
  else if (!/^\d{7,15}$/.test(contact)) missing.push("Contact Number must be 7–15 digits.");
  if (!busType) missing.push("Bus Type must be selected.");
  if (!selectedBusId) missing.push("Available Bus must be selected.");
  else {
    const bus = buses.find((b) => b.id === selectedBusId);
    if (!bus || !bus.available) missing.push("Selected Bus is not available.");
  }
  if (!rentalDate) missing.push("Rental Date is required.");
  else if (rentalDate < today) missing.push("Rental Date must be today or in the future.");
  if (!duration || parseInt(duration || "0", 10) < 1) missing.push("Duration must be at least 1 day.");
  if (!distance || parseInt(distance || "0", 10) <= 0) missing.push("Distance must be greater than 0 km.");
  if (!passengers || parseInt(passengers || "0", 10) <= 0) missing.push("Passengers must be greater than 0.");
  if (!destination.trim()) missing.push("Destination is required.");

  return missing;
};


  // submit (simulate saving and mark bus unavailable locally)
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setNotification({ type: null });
    setErrors({});

    if (!validateForm()) return;
    setShowSummaryModal(true);

    // recompute price server-side-style to prevent tampered price submission
    const recomputedPrice =
      (busType === "Aircon" ? 5000 : 3000) +
      (parseInt(duration || "0", 10) || 0) * 1000 +
      (parseInt(distance || "0", 10) || 0) * 10 +
      ((parseInt(passengers || "0", 10) || 0) > 40 ? 500 : 0);

    if (recomputedPrice !== price) {
      setErrors({ price: "Price mismatch. Please recalculate." });
      return;
    }

    setLoading(true);

    try {
      // Simulated API delay
      await new Promise((r) => setTimeout(r, 900));

      // mark bus unavailable locally (simulate backend update)
      setBuses((prev) => prev.map((b) => (b.id === selectedBusId ? { ...b, available: false } : b)));

      // success
      setNotification({ type: "success", message: "Rental request submitted and bus reserved." });

      // reset form
      setCustomerName("");
      setContact("");
      setBusType("");
      setSelectedBusId("");
      setRentalDate("");
      setDuration("");
      setDistance("");
      setPassengers("");
      setDestination("");
      setPriceBreakdown({ baseRate: 0, durationFee: 0, distanceFee: 0, extraFees: 0, total: 0 });
    } catch (err) {
      setNotification({ type: "error", message: "Failed to save rental request." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (notification.type) {
      const timer = setTimeout(() => {
        setNotification({ type: null });
      }, 4000); // disappears after 4 seconds

      return () => clearTimeout(timer); // cleanup if notification changes
    }
  }, [notification.type]);

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>

          {/* Notification Top-Right */}
          {notification.type && (
            <div
              style={{
                position: "fixed",
                top: 20,
                right: 20,
                minWidth: 250,
                padding: "12px 16px",
                borderRadius: 8,
                background: notification.type === "success" ? "#ecfdf5" : "#fee2e2",
                color: notification.type === "success" ? "#065f46" : "#991b1b",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                zIndex: 9999,
                transition: "opacity 0.3s ease",
              }}
            >
              {notification.message}
            </div>
          )}

        <h2 className={styles.stopTitle}>Bus Rental Request</h2>
        <p className={styles.description}>Fill out the form below to create a rental request.</p>

        <div className={styles.mainGrid}>
          {/* ===== Left: Form ===== */}
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>
                <User className={styles.sectionIcon} />
                Customer Information
              </h3>

              {/* Customer Name */}
              <div className={styles.fieldGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Customer Name</label>
                  <input
                    className={`${styles.inputField} ${errors.customerName ? styles.inputFieldError : ""}`}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full name"
                  />
                  {errors.customerName && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.customerName}
                    </p>
                  )}
                </div>

                {/* Contact Number */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Contact Number</label>
                  <input
                    className={`${styles.inputField} ${errors.contact ? styles.inputFieldError : ""}`}
                    value={contact}
                    onChange={handleNumericChange(setContact)}
                    inputMode="numeric"
                    placeholder="09XXXXXXXXX"
                    maxLength={15}
                  />
                  {errors.contact && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.contact}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>
                <Bus className={styles.sectionIcon} />
                Rental Details
              </h3>

              {/* Bus Type */}
              <div className={styles.fieldGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Bus Type</label>
                  <select
                    className={`${styles.selectField} ${errors.busType ? styles.selectFieldError : ""}`}
                    value={busType}
                    onChange={(e) => {
                      setBusType(e.target.value as BusType);
                      // clear selected bus when type changes
                      setSelectedBusId("");
                    }}
                  >
                    <option value="">Select Bus Type</option>
                    <option value="Aircon">Aircon</option>
                    <option value="Non-Aircon">Non-Aircon</option>
                  </select>
                  {errors.busType && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.busType}
                    </p>
                  )}
                </div>

                {/* Available Bus */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Available Bus</label>
                  <select
                    className={`${styles.selectField} ${errors.selectedBusId ? styles.selectFieldError : ""}`}
                    value={selectedBusId}
                    onChange={(e) => setSelectedBusId(e.target.value)}
                  >
                    <option value="">-- Select Bus --</option>
                    {filteredBuses.length === 0 && <option value="">No available buses</option>}
                    {filteredBuses.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} — {b.capacity} seats
                      </option>
                    ))}
                  </select>
                  {errors.selectedBusId && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.selectedBusId}
                    </p>
                  )}
                </div>

                {/* Rental Date */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Rental Date</label>
                  <input
                    type="date"
                    min={today}
                    className={`${styles.inputField} ${errors.rentalDate ? styles.inputFieldError : ""}`}
                    value={rentalDate}
                    onChange={(e) => setRentalDate(e.target.value)}
                  />
                  {errors.rentalDate && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.rentalDate}
                    </p>
                  )}
                </div>

                {/* Duration (days) */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Duration (days)</label>
                  <input
                    type="number"
                    min={1}
                    className={`${styles.inputField} ${errors.duration ? styles.inputFieldError : ""}`}
                    value={duration}
                    onChange={handleNumericChange(setDuration)}
                  />
                  {errors.duration && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.duration}
                    </p>
                  )}
                </div>

                {/* Distance (km) */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Distance (km)</label>
                  <input
                    type="number"
                    min="1"
                    className={`${styles.inputField} ${errors.distance ? styles.inputFieldError : ""}`}
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                  {errors.distance && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.distance}
                    </p>
                  )}
                </div>

                {/* Destination */}
                <div className={`${styles.inputGroup} ${styles.fieldGridFull}`}>
                  <label className={styles.inputLabel}>Destination</label>
                  <input
                    className={`${styles.inputField} ${errors.destination ? styles.inputFieldError : ""}`}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  {errors.destination && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.destination}
                    </p>
                  )}
                </div>

                {/* Passengers */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Passengers</label>
                  <input
                    type="number"
                    min="1"
                    className={`${styles.inputField} ${errors.passengers ? styles.inputFieldError : ""}`}
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                  />
                  {errors.passengers && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.passengers}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>

          {/* ===== Right: Live Preview & Price Calculator ===== */}
          <div className={styles.priceCalculator}>
            {/* Price Calculator Header */}
            <div className={styles.calculatorHeader}>
              <Calculator />
              <span className={styles.calculatorTitle}>Rental Price Calculator</span>

              {/* Tooltip */}
              <div
                className={styles.tooltipContainer}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <Info size={18} className={styles.infoIcon} />
                <div className={`${styles.tooltip} ${showTooltip ? styles.tooltipVisible : ""}`}>
                  Price = Base Rate (₱{busType === "Aircon" ? "5,000" : "3,000"}) + Duration Fee (₱1,000/day) + Distance Fee (₱10/km). Extra fees apply for &gt;40 passengers.
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            {price > 0 ? (
              <div className={styles.priceBreakdown}>
                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>Base Rate</span>
                  <span className={styles.priceValue}>{formatCurrency(priceBreakdown.baseRate)}</span>
                </div>

                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>Duration Fee</span>
                  <span className={styles.priceValue}>{formatCurrency(priceBreakdown.durationFee)}</span>
                </div>

                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>Distance Fee</span>
                  <span className={styles.priceValue}>{formatCurrency(priceBreakdown.distanceFee)}</span>
                </div>

                {priceBreakdown.extraFees > 0 && (
                  <div className={styles.priceRow}>
                    <span className={styles.priceLabel}>Extra Fees</span>
                    <span className={styles.priceValue}>{formatCurrency(priceBreakdown.extraFees)}</span>
                  </div>
                )}

                <div className={styles.priceTotalRow}>
                  <span className={styles.priceTotalLabel}>Total</span>
                  <span className={styles.priceTotalValue}>{formatCurrency(price)}</span>
                </div>
              </div>
            ) : (
              <div className={styles.calculatorEmpty}>
                <Bus className={styles.calculatorEmptyIcon} />
                <p className={styles.calculatorEmptyText}>
                  Select bus type & duration to calculate price
                </p>
              </div>
            )}

            {/* Live Preview Section */}
            <div className={styles.previewSection}>
              <div className={styles.previewHeader}>
                <Receipt size={18} />
                <span className={styles.previewTitle}>Rental Request Preview</span>
              </div>

              <div className={styles.previewContent}>
                {/* Customer Information */}
                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Customer Name</span>
                  <span className={styles.previewValue}>
                    {customerName || "Not specified"}
                  </span>
                </div>

                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Contact Number</span>
                  <span className={styles.previewValue}>
                    {contact || "Not specified"}
                  </span>
                </div>

                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Bus Type</span>
                  <span className={styles.previewValue}>
                    {busType || "Not selected"}
                  </span>
                </div>

                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Selected Bus</span>
                  <span className={styles.previewValue}>
                    {selectedBus ? `${selectedBus.name} (${selectedBus.capacity} seats)` : "Not selected"}
                  </span>
                </div>

                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Rental Date</span>
                  <span className={styles.previewValue}>
                    {rentalDate ? formatDate(rentalDate) : "Not specified"}
                  </span>
                </div>

                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Duration</span>
                  <span className={styles.previewValue}>
                    {duration ? `${duration} day${duration !== "1" ? "s" : ""}` : "Not specified"}
                  </span>
                </div>

                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Distance</span>
                  <span className={styles.previewValue}>
                    {distance ? `${distance} km` : "Not specified"}
                  </span>
                </div>

                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Passengers</span>
                  <span className={styles.previewValue}>
                    {passengers ? `${passengers} passenger${passengers !== "1" ? "s" : ""}` : "Not specified"}
                  </span>
                </div>

                <div className={styles.previewRowLast}>
                  <span className={styles.previewLabel}>Destination</span>
                  <span className={styles.previewValue}>
                    {destination || "Not specified"}
                  </span>
                </div>
              </div>

              {/* Status indicator - now as button when ready */}
              <div className={styles.previewStatus}>
                {isFormReady ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`${styles.previewStatusContent} ${styles.previewStatusReady} ${styles.previewStatusButton}`}
                  >
                    <Calendar size={16} />
                    {loading ? "Submitting..." : "Submit Rental Request"}
                  </button>
                ) : (
                  <>
                    {/* Compact incomplete indicator */}
                    <div className={`${styles.previewStatusContent} ${styles.previewStatusIncomplete}`}>
                      <AlertCircle size={16} style={{ marginRight: 6 }} />
                      Form Incomplete
                    </div>

                    {/* Missing fields list below */}
                    <ul className={styles.incompleteList}>
                      {getMissingFields().map((msg, idx) => (
                        <li key={idx}>{msg}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}