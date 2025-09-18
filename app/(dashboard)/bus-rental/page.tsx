"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle, Calculator, Bus, User, Info } from "lucide-react";
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

  // submit (simulate saving and mark bus unavailable locally)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setPriceBreakdown({ baseRate: 0, durationFee: 0, distanceFee: 0, extraFees: 0, total: 0 });
    } catch (err) {
      setNotification({ type: "error", message: "Failed to save rental request." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
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

            <div className={styles.submitContainer}>
              <button
                type="submit"
                disabled={loading || !price || price <= 0}
                className={`${styles.submitButton} ${loading || !price ? styles.submitButtonDisabled : styles.submitButtonActive}`}
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
              {errors.price && (
                <p className={styles.errorMessage}>
                  <AlertCircle className={styles.errorIcon} /> {errors.price}
                </p>
              )}
            </div>
          </form>

          {/* ===== Right: Price Calculator ===== */}
          <div className={styles.priceCalculator}>
            <div className={styles.calculatorHeader}>
              <Calculator />
              <span className={styles.calculatorTitle}>Rental Price Calculator</span>

              {/* Tooltip moved INSIDE the header */}
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
          </div>
        </div>

        {/* Notifications */}
        {notification.type && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              borderRadius: 8,
              background: notification.type === "success" ? "#ecfdf5" : "#fee2e2",
              color: notification.type === "success" ? "#065f46" : "#991b1b",
            }}
          >
            {notification.message}
          </div>
        )}

        
      </div>
    </div>
  );
}
