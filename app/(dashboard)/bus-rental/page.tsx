"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle, Calculator, Bus, User, Info, Receipt, Calendar, MapPin, Clock } from "lucide-react";
import styles from "./bus-rental.module.css";
import { getBackendBaseURL, fetchBackendToken } from "@/lib/backend";
import { fetchAllRentalRequests } from "@/lib/apiCalls/rental-request";
import LocationPickerModal from "@/components/modal/Location-Picker/LocationPickerModal";
import SuccessPageModal from "@/components/modal/Success-Page-Modal/SuccessPageModal";
import ValidIdModal from "@/components/modal/Valid-ID-Modal/ValidIdModal";
import { validateRequestLocations } from "@/lib/apiCalls/vicinity-validator";

/* ---- Types ---- */
type BusType = "Aircon" | "Non-Aircon";

interface Bus {
  id: string;
  name: string;
  type: BusType;
  capacity: number;
  available: boolean;
}

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

export default function BusRentalPage() {
  // form state
  const [customerName, setCustomerName] = useState("");
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [contact, setContact] = useState(""); // numeric-only
  const [email, setEmail] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [validIdType, setValidIdType] = useState("");
  const [validIdNumber, setValidIdNumber] = useState("");
  const [validIdImage, setValidIdImage] = useState<string | null>(null);
  const [showValidIdModal, setShowValidIdModal] = useState(false);
  const [busType, setBusType] = useState<BusType | "">("");
  const [selectedBusId, setSelectedBusId] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [endDate, setEndDate] = useState(""); // end date for date range
  const [duration, setDuration] = useState(""); // days (calculated from date range)
  const [distance, setDistance] = useState(""); // km (auto-calculated)
  const [passengers, setPassengers] = useState(""); // optional for extra fees
  const [destination, setDestination] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [note, setNote] = useState(""); // new note field

  // coordinates for selected locations (optional)
  const [pickupLat, setPickupLat] = useState("");
  const [pickupLng, setPickupLng] = useState("");
  const [destLat, setDestLat] = useState("");
  const [destLng, setDestLng] = useState("");

  // AddStopModal toggles
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);

  // Success Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [rentalSummary, setRentalSummary] = useState<RentalSummary | null>(null);

  // local buses - starts empty, will be populated from API
  const [buses, setBuses] = useState<Bus[]>([]);

  // Booked dates state for routing checker
  const [bookedDates, setBookedDates] = useState<Array<{ startDate: string; endDate: string }>>([]);
  const [loadingBookedDates, setLoadingBookedDates] = useState(false);

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error" | null; message?: string }>({ type: null });
  const [showTooltip, setShowTooltip] = useState(false);

  // min date (today) to prevent picking the past
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  // Haversine formula to calculate distance between two coordinates
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance); // Round to nearest km
  };

  // Check if a date range conflicts with booked dates (Routing Checker)
  const isDateRangeBooked = (checkStartDate: string, checkEndDate: string): boolean => {
    if (!checkStartDate || !checkEndDate) return false;
    
    console.log('Checking date range:', checkStartDate, 'to', checkEndDate);
    console.log('Against booked dates:', bookedDates);
    
    // Normalize dates to midnight UTC to avoid timezone issues
    const start = new Date(checkStartDate + 'T00:00:00');
    const end = new Date(checkEndDate + 'T00:00:00');
    
    const hasConflict = bookedDates.some(booking => {
      const bookedStart = new Date(booking.startDate + 'T00:00:00');
      const bookedEnd = new Date(booking.endDate + 'T00:00:00');
      
      // Check if date ranges overlap
      const overlaps = (start <= bookedEnd && end >= bookedStart);
      
      if (overlaps) {
        console.log('CONFLICT DETECTED!');
        console.log('Selected:', start.toISOString(), 'to', end.toISOString());
        console.log('Booked:', bookedStart.toISOString(), 'to', bookedEnd.toISOString());
      }
      
      return overlaps;
    });
    
    console.log('Has conflict:', hasConflict);
    return hasConflict;
  };

  // Check if a single date is booked
  const isDateBooked = (checkDate: string): boolean => {
    if (!checkDate) return false;
    
    const date = new Date(checkDate);
    
    return bookedDates.some(booking => {
      const bookedStart = new Date(booking.startDate);
      const bookedEnd = new Date(booking.endDate);
      
      return (date >= bookedStart && date <= bookedEnd);
    });
  };

  // Handle start date change with validation
  const handleStartDateChange = (newDate: string) => {
    if (selectedBusId && isDateBooked(newDate)) {
      setNotification({
        type: 'error',
        message: `The date ${new Date(newDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} is already booked for this bus. Please select a different date.`
      });
      setRentalDate('');
      setEndDate('');
      setDuration('');
      return;
    }
    setRentalDate(newDate);
    // Clear end date if it would create a conflict
    if (endDate && isDateRangeBooked(newDate, endDate)) {
      setEndDate('');
      setDuration('');
    }
  };

  // Handle end date change with validation
  const handleEndDateChange = (newDate: string) => {
    if (selectedBusId && rentalDate && isDateRangeBooked(rentalDate, newDate)) {
      setNotification({
        type: 'error',
        message: 'The selected date range conflicts with an existing booking. Please choose different dates.'
      });
      setEndDate('');
      setDuration('');
      return;
    }
    setEndDate(newDate);
  };

  // Auto-calculate distance when pickup and destination coordinates are available
  useEffect(() => {
    if (pickupLat && pickupLng && destLat && destLng) {
      const lat1 = parseFloat(pickupLat);
      const lon1 = parseFloat(pickupLng);
      const lat2 = parseFloat(destLat);
      const lon2 = parseFloat(destLng);
      
      if (!isNaN(lat1) && !isNaN(lon1) && !isNaN(lat2) && !isNaN(lon2)) {
        const calculatedDistance = calculateDistance(lat1, lon1, lat2, lon2);
        setDistance(calculatedDistance.toString());
      }
    }
  }, [pickupLat, pickupLng, destLat, destLng]);

  // Auto-calculate duration when date range is selected
  useEffect(() => {
    if (rentalDate && endDate) {
      const start = new Date(rentalDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays >= 1) {
        setDuration(diffDays.toString());
      } else {
        setDuration("");
      }
    } else if (rentalDate && !endDate) {
      setDuration("");
    }
  }, [rentalDate, endDate]);

  // Fetch real buses from backend API
  useEffect(() => {
    const fetchBusesFromAPI = async () => {
      try {
        const baseURL = getBackendBaseURL();
        const response = await fetch(`${baseURL}/api/external/buses/full`, {
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch buses');
        }
        
        const result = await response.json();
        
        // Map API response to Bus interface
        const mappedBuses: Bus[] = (result.data || []).map((bus: any) => ({
          id: bus.busId || bus.id,
          name: bus.license_plate || `Bus ${bus.busId}`,
          type: bus.type as BusType,
          capacity: bus.capacity,
          available: true // All fetched buses are considered available for rental
        }));
        
        if (mappedBuses.length > 0) {
          setBuses(mappedBuses);
        }
      } catch (error) {
        console.error('Error fetching buses:', error);
        console.log('Using initial buses as fallback');
      }
    };

    fetchBusesFromAPI();
  }, []);

  // Fetch booked dates for selected bus (Routing Checker)
  useEffect(() => {
    const fetchBookedDates = async () => {
      if (!selectedBusId) {
        setBookedDates([]);
        return;
      }

      setLoadingBookedDates(true);
      try {
        // Fetch all rental requests
        const result = await fetchAllRentalRequests();
        
        console.log('All rental requests:', result);
        
        // Filter by selected bus and get APPROVED bookings only (Pending requests don't block availability)
        const busRentals = (result.data || result || []).filter((rental: any) => {
          const status = rental.Status || rental.status;
          // Extract BusID from nested structure: RentalRequest → RentalBusAssignment → BusAssignment → BusID
          const busId = rental.RentalBusAssignment?.BusAssignment?.BusID;
          const isMatch = busId === selectedBusId && status === 'Approved';
          if (busId === selectedBusId) {
            console.log('Checking rental:', rental, 'Status:', status, 'Match:', isMatch);
          }
          return isMatch;
        });
        
        console.log('Filtered rentals for bus:', selectedBusId, busRentals);
        
        // Extract date ranges from rental requests
        const dateRanges = busRentals.map((rental: any) => {
          const rentalDate = rental.RentalDate || rental.rentalDate;
          const duration = rental.Duration || rental.duration || 1;
          
          const startDate = new Date(rentalDate);
          const endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + duration - 1); // Include the last day
          
          return {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            requestId: rental.RentalRequestID || rental.rentalRequestId || 'N/A'
          };
        });
        
        console.log('Booked date ranges:', dateRanges);
        setBookedDates(dateRanges);
      } catch (error) {
        console.error('Error fetching booked dates:', error);
        setBookedDates([]);
      } finally {
        setLoadingBookedDates(false);
      }
    };

    fetchBookedDates();
  }, [selectedBusId]);

  // sanitize numeric-only inputs (contact, duration, distance, passengers)
  const handleNumericChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setter(digits);
  };

  // generic setters for text
  const handleTextChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setter(e.target.value);
  };

  // Filter buses by selected type only - keep all buses visible
  // Date validation will prevent double-booking
  const filteredBuses = useMemo(() => {
    return buses.filter((b) => (!busType || b.type === busType));
  }, [buses, busType]);

  // Get selected bus details
  const selectedBus = useMemo(() => {
    return buses.find((b) => b.id === selectedBusId) || null;
  }, [buses, selectedBusId]);

  // Check capacity in real-time and show warning
  const capacityWarning = useMemo(() => {
    if (!selectedBus || !passengers) return null;
    const passengerCount = parseInt(passengers, 10);
    if (isNaN(passengerCount) || passengerCount <= 0) return null;
    
    if (passengerCount > selectedBus.capacity) {
      return {
        type: 'error' as const,
        message: `⚠️ Exceeds capacity by ${passengerCount - selectedBus.capacity} passenger${passengerCount - selectedBus.capacity > 1 ? 's' : ''}!`
      };
    } else if (passengerCount === selectedBus.capacity) {
      return {
        type: 'warning' as const,
        message: '✓ At maximum capacity'
      };
    } else if (passengerCount >= selectedBus.capacity * 0.9) {
      return {
        type: 'info' as const,
        message: `✓ ${selectedBus.capacity - passengerCount} seat${selectedBus.capacity - passengerCount > 1 ? 's' : ''} remaining`
      };
    }
    return null;
  }, [selectedBus, passengers]);

  // Price calculation (breakdown)
  const [priceBreakdown, setPriceBreakdown] = useState({
    baseRate: 0,
    durationFee: 0,
    distanceFee: 0,
    extraFees: 0,
    total: 0,
  });
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState<string | null>(null);

  // Function to call the price calculation API
  const calculatePrice = async (busType: BusType, duration: string, distance: string, passengers: string) => {
    const d = parseInt(duration || "0", 10);
    const dist = parseInt(distance || "0", 10);
    const pax = parseInt(passengers || "0", 10);

    // Reset if invalid inputs
    if (!busType || d <= 0 || dist <= 0 || pax <= 0) {
      setPriceBreakdown({ baseRate: 0, durationFee: 0, distanceFee: 0, extraFees: 0, total: 0 });
      setPriceError(null);
      return;
    }

    setPriceLoading(true);
    setPriceError(null);

    try {
      const baseURL = getBackendBaseURL();
      const response = await fetch(`${baseURL}/api/rental-calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          busType,
          duration: d,
          distance: dist,
          passengers: pax,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to calculate price');
      }

      const result = await response.json();
      setPriceBreakdown(result.priceBreakdown);
    } catch (err) {
      console.error('Price calculation error:', err);
      setPriceError(err instanceof Error ? err.message : 'Failed to calculate price');
      // Fallback to local calculation
      const baseRate = busType === "Aircon" ? 5000 : 3000;
      const durationFee = d * 1000;
      const distanceFee = dist * 10;
      const extraFees = pax > 40 ? 500 : 0;
      const total = baseRate + durationFee + distanceFee + extraFees;
      setPriceBreakdown({ baseRate, durationFee, distanceFee, extraFees, total });
    } finally {
      setPriceLoading(false);
    }
  };

  // Effect to trigger price calculation when inputs change (with debouncing)
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (busType && duration && distance && passengers) {
        calculatePrice(busType as BusType, duration, distance, passengers);
      } else {
        setPriceBreakdown({ baseRate: 0, durationFee: 0, distanceFee: 0, extraFees: 0, total: 0 });
        setPriceError(null);
      }
    }, 300); // 300ms debounce delay

    return () => clearTimeout(debounceTimer);
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
    // Check if there's a date conflict
    const hasDateConflict = rentalDate && endDate && selectedBusId && isDateRangeBooked(rentalDate, endDate);
    
    return (
      customerName.trim() &&
      contact.trim() &&
      /^\d{7,15}$/.test(contact) &&
      busType &&
      selectedBusId &&
      rentalDate &&
      endDate &&
      rentalDate >= today &&
      parseInt(duration || "0", 10) >= 1 &&
      destination.trim() &&
      pickupLocation.trim() &&
      parseInt(distance || "0", 10) > 0 &&
      parseInt(passengers || "0", 10) > 0 &&
      price > 0 &&
      !hasDateConflict  // IMPORTANT: Block if dates conflict
    );
  }, [
    customerName, contact, busType, selectedBusId, rentalDate, endDate,
    duration, destination, pickupLocation, distance, passengers, today, price, bookedDates
  ]);

  // validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) newErrors.customerName = "Customer name is required.";
    if (!contact.trim()) newErrors.contact = "Contact number is required.";
    else if (!/^\d{7,15}$/.test(contact)) newErrors.contact = "Contact must be digits (7–15).";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email address.";
    if (!homeAddress.trim()) newErrors.homeAddress = "Home address is required.";
    if (!validIdType.trim()) newErrors.validIdType = "Valid ID type is required.";
    if (!validIdNumber.trim()) newErrors.validIdNumber = "Valid ID number is required.";
    if (!validIdImage) newErrors.validIdImage = "Valid ID image is required.";
    if (!busType) newErrors.busType = "Please select a bus type.";
    if (!selectedBusId) newErrors.selectedBusId = "Please select an available bus.";
    if (!rentalDate) newErrors.rentalDate = "Rental date is required.";
    if (rentalDate && rentalDate < today) newErrors.rentalDate = "Rental date cannot be in the past.";
    
    // Check for date conflicts (Routing Checker) - CRITICAL VALIDATION
    if (rentalDate && endDate && selectedBusId) {
      console.log('Validating dates in form submission...');
      if (isDateRangeBooked(rentalDate, endDate)) {
        console.log('FORM VALIDATION BLOCKED: Date conflict detected!');
        newErrors.rentalDate = "❌ BOOKING CONFLICT: This bus is already booked for the selected dates. Please choose different dates.";
        newErrors.endDate = "The selected date range overlaps with an existing booking.";
      }
    } else if (!endDate) {
      newErrors.endDate = "End date is required.";
    }
    
    if (!duration || parseInt(duration || "0", 10) < 1) newErrors.duration = "Duration must be at least 1 day.";
    if (!destination.trim()) newErrors.destination = "Destination is required.";
    if (!pickupLocation.trim()) newErrors.pickupLocation = "Pickup location is required.";
    if (!price || price <= 0) newErrors.price = "Price must be calculated before submitting.";
    if (!distance) {
      newErrors.distance = "Distance is Required.";
    } else if (parseInt(distance, 10) <= 0) {
      newErrors.distance = "Distance must be greater than 0.";
    }

    if (!passengers) {
      newErrors.passengers = "Passengers is Required.";
    } else if (parseInt(passengers, 10) <= 0) {
      newErrors.passengers = "Passengers must be greater than 0.";
    } else if (selectedBusId) {
      // Check if passengers exceed bus capacity
      const selectedBus = buses.find((b) => b.id === selectedBusId);
      if (selectedBus && parseInt(passengers, 10) > selectedBus.capacity) {
        newErrors.passengers = `Number of passengers (${passengers}) exceeds bus capacity (${selectedBus.capacity} seats).`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getMissingFields = () => {
    const missing: string[] = [];

    if (!customerName.trim()) missing.push("Customer Name is required.");
    if (!contact.trim()) missing.push("Contact Number is required.");
    else if (!/^\d{7,15}$/.test(contact)) missing.push("Contact Number must be 7–15 digits.");
    if (!email.trim()) missing.push("Email is required.");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) missing.push("Email must be valid.");
    if (!homeAddress.trim()) missing.push("Home Address is required.");
    if (!validIdType.trim()) missing.push("Valid ID Type is required.");
    if (!validIdNumber.trim()) missing.push("Valid ID Number is required.");
    if (!validIdImage) missing.push("Valid ID Image is required.");
    if (!busType) missing.push("Bus Type must be selected.");
    if (!selectedBusId) missing.push("Available Bus must be selected.");
    if (!rentalDate) missing.push("Rental Date is required.");
    else if (rentalDate < today) missing.push("Rental Date must be today or in the future.");
    if (!duration || parseInt(duration || "0", 10) < 1) missing.push("Duration must be at least 1 day.");
    if (!distance || parseInt(distance || "0", 10) <= 0) missing.push("Distance must be greater than 0 km.");
    if (!passengers || parseInt(passengers || "0", 10) <= 0) {
      missing.push("Passengers must be greater than 0.");
    } else if (selectedBusId) {
      const selectedBus = buses.find((b) => b.id === selectedBusId);
      if (selectedBus && parseInt(passengers || "0", 10) > selectedBus.capacity) {
        missing.push(`Number of passengers (${passengers}) exceeds bus capacity (${selectedBus.capacity} seats).`);
      }
    }
    if (!destination.trim()) missing.push("Destination is required.");
    if (!pickupLocation.trim()) missing.push("Pickup Location is required.");
    if (!price || price <= 0) missing.push("Price must be calculated. Fill all fields and wait for calculation.");

    return missing;
  };

  // Handlers to use AddStopModal as a location picker
  const handlePickupCreate = async (stop: { name: string; latitude: string; longitude: string }) => {
    setPickupLocation(stop.name || `${stop.latitude}, ${stop.longitude}`);
    setPickupLat(stop.latitude || "");
    setPickupLng(stop.longitude || "");
    return true;
  };

  const handleDestinationCreate = async (stop: { name: string; latitude: string; longitude: string }) => {
    setDestination(stop.name || `${stop.latitude}, ${stop.longitude}`);
    setDestLat(stop.latitude || "");
    setDestLng(stop.longitude || "");
    return true;
  };

  // Reset form function
  const resetForm = () => {
    setCustomerName("");
    setContact("");
    setEmail("");
    setHomeAddress("");
    setValidIdType("");
    setValidIdNumber("");
    setValidIdImage(null);
    setBusType("");
    setSelectedBusId("");
    setRentalDate("");
    setEndDate("");
    setDuration("");
    setDistance("");
    setPassengers("");
    setDestination("");
    setPickupLocation("");
    setPickupLat("");
    setPickupLng("");
    setDestLat("");
    setDestLng("");
    setNote("");
    setPriceBreakdown({ baseRate: 0, durationFee: 0, distanceFee: 0, extraFees: 0, total: 0 });
    setErrors({});
  };

  // submit (make API call to backend)
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setNotification({ type: null });
    setErrors({});

    console.log('=== FORM SUBMISSION ATTEMPT ===');
    console.log('Selected Bus ID:', selectedBusId);
    console.log('Date Range:', rentalDate, 'to', endDate);
    console.log('Booked Dates:', bookedDates);

    if (!validateForm()) {
      console.log('Form validation FAILED');
      console.log('Errors:', errors);
      setNotification({
        type: 'error',
        message: 'Please fix the errors before submitting. Check for date conflicts.'
      });
      return;
    }

    // Validate vicinity if coordinates are available
    if (pickupLat && pickupLng && destLat && destLng) {
      const lat1 = parseFloat(pickupLat);
      const lon1 = parseFloat(pickupLng);
      const lat2 = parseFloat(destLat);
      const lon2 = parseFloat(destLng);
      
      if (!isNaN(lat1) && !isNaN(lon1) && !isNaN(lat2) && !isNaN(lon2)) {
        setLoading(true);
        setNotification({
          type: 'error',
          message: 'Validating service area...'
        });
        
        try {
          const vicinityValidation = await validateRequestLocations(lat1, lon1, lat2, lon2);
          
          if (!vicinityValidation.isValid) {
            setLoading(false);
            
            // Show rejection reason to user
            await Swal.fire({
              icon: 'error',
              title: 'Request Cannot Be Processed',
              html: `
                <p style="text-align: left; margin-bottom: 1rem;">Your rental request has been <strong>automatically rejected</strong> because:</p>
                <ul style="text-align: left; color: #dc2626; padding-left: 1.5rem;">
                  ${vicinityValidation.reasons.map(reason => `<li>${reason}</li>`).join('')}
                </ul>
                <p style="text-align: left; margin-top: 1rem; font-size: 0.875rem; color: #6b7280;">
                  Please select locations from our predefined service areas or contact support for assistance.
                </p>
              `,
              confirmButtonText: 'Understood',
              confirmButtonColor: '#dc2626'
            });
            
            // Still save to database with auto-rejected status
            const token = await fetchBackendToken();
            if (token) {
              const rentalData = {
                CustomerName: customerName.trim(),
                CustomerContact: contact.trim(),
                CustomerEmail: email.trim(),
                CustomerAddress: homeAddress.trim(),
                ValidIDType: validIdType.trim(),
                ValidIDNumber: validIdNumber.trim(),
                ValidIDImage: validIdImage,
                PickupLocation: pickupLocation.trim(),
                DropoffLocation: destination.trim(),
                NumberOfPassengers: parseInt(passengers, 10),
                RentalDate: new Date(rentalDate).toISOString(),
                Duration: parseInt(duration, 10),
                DistanceKM: parseInt(distance, 10),
                RentalPrice: price,
                BusID: selectedBusId,
                SpecialRequirements: `Bus Type: ${busType}, Note: ${note}. AUTO-REJECTED: ${vicinityValidation.reasons.join('; ')}`,
                PickupLatitude: pickupLat || null,
                PickupLongitude: pickupLng || null,
                DropoffLatitude: destLat || null,
                DropoffLongitude: destLng || null,
                Status: 'Rejected',
                RejectionReason: `Auto-Rejected (Outside Vicinity): ${vicinityValidation.reasons.join('; ')}`
              };

              const baseURL = getBackendBaseURL();
              await fetch(`${baseURL}/api/rental-request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(rentalData)
              });
            }
            
            return;
          }
        } catch (error) {
          console.error('Vicinity validation error:', error);
          // Continue with submission if validation fails (allow manual review)
        } finally {
          setLoading(false);
        }
      }
    }

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
      // Authenticate and get token
      const token = await fetchBackendToken();
      if (!token) {
        throw new Error('Authentication failed');
      }

      // Prepare rental request data
      const rentalData = {
        CustomerName: customerName.trim(),
        CustomerContact: contact.trim(),
        CustomerEmail: email.trim(),
        CustomerAddress: homeAddress.trim(),
        ValidIDType: validIdType.trim(),
        ValidIDNumber: validIdNumber.trim(),
        ValidIDImage: validIdImage,
        PickupLocation: pickupLocation.trim(),
        DropoffLocation: destination.trim(),
        NumberOfPassengers: parseInt(passengers, 10),
        RentalDate: new Date(rentalDate).toISOString(),
        Duration: parseInt(duration, 10),
        DistanceKM: parseInt(distance, 10),
        RentalPrice: price,
        BusID: selectedBusId,
        SpecialRequirements: `Bus Type: ${busType}, Note: ${note}`,
        PickupLatitude: pickupLat || null,
        PickupLongitude: pickupLng || null,
        DropoffLatitude: destLat || null,
        DropoffLongitude: destLng || null,
      };

      // Make API call
      const baseURL = getBackendBaseURL();
      const response = await fetch(`${baseURL}/api/rental-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(rentalData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const createdRequest = await response.json();

      // Get selected bus details for summary
      const selectedBusData = buses.find((b) => b.id === selectedBusId);

      // Prepare summary data
      const summary: RentalSummary = {
        requestId: createdRequest.RentalRequestID || 'N/A',
        customerName,
        contact,
        email,
        homeAddress,
        validIdType,
        validIdNumber,
        validIdImage,
        busType,
        busName: selectedBusData?.name || 'N/A',
        rentalDate,
        duration,
        distance,
        passengers,
        destination,
        pickupLocation,
        totalPrice: price.toString(),
        note: note || undefined,
      };

      // Set summary and show success modal
      setRentalSummary(summary);
      setShowSuccessModal(true);

      // Reset form
      resetForm();
      
    } catch (err) {
      console.error('Rental request error:', err);
      setNotification({ 
        type: "error", 
        message: err instanceof Error ? err.message : "Failed to submit rental request. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (notification.type) {
      const timer = setTimeout(() => {
        setNotification({ type: null });
      }, 4000);

      return () => clearTimeout(timer);
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

        {/* Valid ID Modal */}
        <ValidIdModal
          show={showValidIdModal}
          onClose={() => setShowValidIdModal(false)}
          validIdType={validIdType}
          setValidIdType={setValidIdType}
        />

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

                {/* Email */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Email</label>
                  <input
                    type="email"
                    className={`${styles.inputField} ${errors.email ? styles.inputFieldError : ""}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                  />
                  {errors.email && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Valid ID */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Valid ID</label>
                  <div
                    className={`${styles.inputField} ${errors.validIdType ? styles.inputFieldError : ""}`}
                    onClick={() => setShowValidIdModal(true)}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#f9fafb'
                    }}
                  >
                    <span style={{ color: validIdType ? '#374151' : '#9ca3af' }}>
                      {validIdType || 'Click to select ID type'}
                    </span>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l3 3 3-3" />
                    </svg>
                  </div>
                  {errors.validIdType && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.validIdType}
                    </p>
                  )}
                </div>

                {/* Valid ID Number - shown only when ID type is selected */}
                {validIdType && (
                  <>
                    <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                      <label className={styles.inputLabel}>ID Number</label>
                      <input
                        className={`${styles.inputField} ${errors.validIdNumber ? styles.inputFieldError : ""}`}
                        value={validIdNumber}
                        onChange={(e) => setValidIdNumber(e.target.value)}
                        placeholder="Enter ID number"
                      />
                      {errors.validIdNumber && (
                        <p className={styles.errorMessage}>
                          <AlertCircle className={styles.errorIcon} /> {errors.validIdNumber}
                        </p>
                      )}
                    </div>

                    {/* Valid ID Image Upload */}
                    <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                      <label className={styles.inputLabel}>Upload ID Picture</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              // Validate file size (max 5MB)
                              if (file.size > 5 * 1024 * 1024) {
                                setErrors({ ...errors, validIdImage: 'Image size must be less than 5MB' });
                                return;
                              }
                              // Validate file type
                              if (!file.type.startsWith('image/')) {
                                setErrors({ ...errors, validIdImage: 'Please upload a valid image file' });
                                return;
                              }
                              // Convert to base64
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setValidIdImage(reader.result as string);
                                const newErrors = { ...errors };
                                delete newErrors.validIdImage;
                                setErrors(newErrors);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className={styles.inputField}
                          style={{ padding: '0.5rem', cursor: 'pointer' }}
                        />
                        {errors.validIdImage && (
                          <p className={styles.errorMessage}>
                            <AlertCircle className={styles.errorIcon} /> {errors.validIdImage}
                          </p>
                        )}
                        {validIdImage && (
                          <div style={{ 
                            position: 'relative', 
                            marginTop: '0.5rem',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '0.75rem',
                            backgroundColor: '#f9fafb'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#059669' }}>✓ Image Uploaded</span>
                              <button
                                type="button"
                                onClick={() => setValidIdImage(null)}
                                style={{
                                  padding: '0.25rem 0.75rem',
                                  fontSize: '0.75rem',
                                  backgroundColor: '#ef4444',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontWeight: 500
                                }}
                              >
                                Remove
                              </button>
                            </div>
                            <img
                              src={validIdImage}
                              alt="Valid ID Preview"
                              style={{
                                width: '100%',
                                maxHeight: '300px',
                                objectFit: 'contain',
                                borderRadius: '4px',
                                backgroundColor: 'white'
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Home Address */}
                <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.inputLabel}>Home Address</label>
                  <input
                    className={`${styles.inputField} ${errors.homeAddress ? styles.inputFieldError : ""}`}
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                    placeholder="Full home address"
                  />
                  {errors.homeAddress && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.homeAddress}
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

              {/* Date Conflict Warning */}
              {rentalDate && endDate && selectedBusId && isDateRangeBooked(rentalDate, endDate) && (
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#fee2e2',
                  border: '2px solid #dc2626',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  animation: 'pulse 2s infinite'
                }}>
                  <p style={{ margin: 0, color: '#991b1b', fontWeight: 700, fontSize: '1rem' }}>
                    ⛔ BOOKING BLOCKED: The selected dates conflict with an existing booking!
                  </p>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#7f1d1d', fontSize: '0.875rem' }}>
                    Please select different dates or choose another bus.
                  </p>
                </div>
              )}

              {/* Bus Type */}
              <div className={styles.fieldGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Bus Type</label>
                  <select
                    className={`${styles.selectField} ${errors.busType ? styles.selectFieldError : ""}`}
                    value={busType}
                    onChange={(e) => {
                      setBusType(e.target.value as BusType);
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
                    {filteredBuses.length === 0 && <option value="">No buses found for selected type</option>}
                    {filteredBuses.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} — {b.capacity} seats
                      </option>
                    ))}
                  </select>
                  {selectedBusId && bookedDates.length > 0 && !loadingBookedDates && (
                    <p style={{ fontSize: '0.875rem', color: '#f59e0b', marginTop: '0.5rem', fontWeight: 500 }}>
                      ⚠️ This bus has existing bookings. Check available dates below.
                    </p>
                  )}
                  {selectedBusId && bookedDates.length === 0 && !loadingBookedDates && (
                    <p style={{ fontSize: '0.875rem', color: '#10b981', marginTop: '0.5rem', fontWeight: 500 }}>
                      ✓ This bus is available for all dates
                    </p>
                  )}
                  {errors.selectedBusId && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.selectedBusId}
                    </p>
                  )}
                </div>

                {/* Rental Date Range */}
                <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.inputLabel}>
                    <Calendar size={16} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
                    Rental Period (Start Date - End Date)
                  </label>
                  {selectedBusId && loadingBookedDates && (
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                      Loading booked dates for this bus...
                    </p>
                  )}
                  {selectedBusId && bookedDates.length > 0 && !loadingBookedDates && (
                    <div style={{ 
                      fontSize: '0.875rem', 
                      color: '#dc2626', 
                      marginBottom: '0.5rem', 
                      padding: '0.5rem', 
                      backgroundColor: '#fee2e2', 
                      borderRadius: '4px',
                      border: '1px solid #fca5a5'
                    }}>
                      <AlertCircle size={14} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} />
                      <strong>Booked dates:</strong> This bus has existing bookings. Some dates may be unavailable.
                    </div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem', alignItems: 'center' }}>
                    <div>
                      <input
                        type="date"
                        min={today}
                        max={endDate || undefined}
                        className={`${styles.inputField} ${errors.rentalDate ? styles.inputFieldError : ""}`}
                        value={rentalDate}
                        onChange={(e) => handleStartDateChange(e.target.value)}
                        placeholder="Start Date"
                        disabled={loadingBookedDates || !selectedBusId}
                        title={!selectedBusId ? "Please select a bus first" : "Select start date"}
                      />
                    </div>
                    <span style={{ color: '#6b7280', fontWeight: 600 }}>to</span>
                    <div>
                      <input
                        type="date"
                        min={rentalDate || today}
                        className={`${styles.inputField} ${errors.duration ? styles.inputFieldError : ""}`}
                        value={endDate}
                        onChange={(e) => handleEndDateChange(e.target.value)}
                        placeholder="End Date"
                        disabled={!rentalDate || loadingBookedDates}
                      />
                    </div>
                  </div>
                  {duration && (
                    <p style={{ fontSize: '0.875rem', color: '#059669', marginTop: '0.5rem', fontWeight: 500 }}>
                      <Clock size={14} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} />
                      Duration: {duration} day{parseInt(duration) > 1 ? 's' : ''}
                    </p>
                  )}
                  {/* Show booked date ranges */}
                  {selectedBusId && bookedDates.length > 0 && !loadingBookedDates && (
                    <div style={{ 
                      marginTop: '0.75rem', 
                      padding: '0.75rem', 
                      backgroundColor: '#fff7ed', 
                      borderRadius: '6px',
                      border: '1px solid #fed7aa'
                    }}>
                      <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#9a3412', marginBottom: '0.5rem' }}>
                        � Unavailable Dates (Already Booked):
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {bookedDates.map((booking, idx) => (
                          <p key={idx} style={{ fontSize: '0.75rem', color: '#9a3412', margin: 0 }}>
                            • {new Date(booking.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} 
                            {' '}-{' '}
                            {new Date(booking.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        ))}
                      </div>
                      <p style={{ fontSize: '0.7rem', color: '#78350f', marginTop: '0.5rem', marginBottom: 0, fontStyle: 'italic' }}>
                        💡 Tip: If you select a booked date, it will be automatically cleared.
                      </p>
                    </div>
                  )}
                  {selectedBusId && bookedDates.length === 0 && !loadingBookedDates && (
                    <p style={{ fontSize: '0.875rem', color: '#059669', marginTop: '0.5rem', fontWeight: 500 }}>
                      ✓ This bus has no existing bookings - all dates are available!
                    </p>
                  )}
                  {/* Check if selected dates conflict with booked dates */}
                  {rentalDate && endDate && selectedBusId && isDateRangeBooked(rentalDate, endDate) && (
                    <div style={{ 
                      marginTop: '0.5rem', 
                      padding: '0.5rem', 
                      backgroundColor: '#fee2e2', 
                      borderRadius: '4px',
                      border: '1px solid #fca5a5'
                    }}>
                      <p style={{ fontSize: '0.875rem', color: '#dc2626', margin: 0, fontWeight: 600 }}>
                        ⚠️ Date Conflict: This bus is already booked for the selected dates!
                      </p>
                    </div>
                  )}
                  {(errors.rentalDate || errors.duration) && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.rentalDate || errors.duration}
                    </p>
                  )}
                </div>

                {/* Distance (km) - Auto-calculated */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>
                    <MapPin size={16} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
                    Distance (km) <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 400 }}>(Auto-calculated)</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    className={`${styles.inputField} ${errors.distance ? styles.inputFieldError : ""}`}
                    value={distance ? `${distance} km` : ''}
                    placeholder={pickupLocation && destination ? "Calculating..." : "Select pickup and destination first"}
                    style={{ 
                      backgroundColor: distance && pickupLat && destLat ? '#f0fdf4' : '#f9fafb',
                      cursor: 'not-allowed',
                      color: distance ? '#059669' : '#6b7280'
                    }}
                    title="Distance is automatically calculated when you select pickup and destination locations"
                  />
                  {distance && pickupLat && destLat && (
                    <p style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.25rem', fontWeight: 500 }}>
                      ✓ Calculated using coordinates from selected locations
                    </p>
                  )}
                  {!distance && pickupLocation && destination && (
                    <p style={{ fontSize: '0.75rem', color: '#f59e0b', marginTop: '0.25rem', fontStyle: 'italic' }}>
                      ℹ️ Select locations with map coordinates for auto-calculation
                    </p>
                  )}
                  {errors.distance && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.distance}
                    </p>
                  )}
                </div>

                {/* Destination */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Destination</label>
                  <input
                    className={`${styles.inputField} ${errors.destination ? styles.inputFieldError : ""}`}
                    value={destination}
                    readOnly
                    onClick={() => setShowDestinationModal(true)}
                    placeholder="Click to pick destination"
                  />
                  {errors.destination && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.destination}
                    </p>
                  )}
                </div>

                {/* Pickup Location */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Pickup Location</label>
                  <input
                    className={`${styles.inputField} ${errors.pickupLocation ? styles.inputFieldError : ""}`}
                    value={pickupLocation}
                    readOnly
                    onClick={() => setShowPickupModal(true)}
                    placeholder="Click to pick pickup location"
                  />
                  {errors.pickupLocation && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.pickupLocation}
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
                  {capacityWarning && (
                    <p style={{ 
                      fontSize: '0.875rem', 
                      marginTop: '0.5rem',
                      color: capacityWarning.type === 'error' ? '#dc2626' : 
                             capacityWarning.type === 'warning' ? '#ea580c' : '#2563eb',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {capacityWarning.message}
                    </p>
                  )}
                  {errors.passengers && (
                    <p className={styles.errorMessage}>
                      <AlertCircle className={styles.errorIcon} /> {errors.passengers}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ===== Note Section ===== */}
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>
                <Info className={styles.sectionIcon} />
                Note
              </h3>

              <div className={styles.fieldGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Additional Notes</label>
                  <textarea
                    className={styles.inputField}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Any special instructions or comments..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </form>

          {/* ===== Right: Live Preview & Price Calculator ===== */}
          <div className={styles.priceCalculator}>
            {/* Price Calculator Header */}
            <div className={styles.calculatorHeader}>
              <Calculator />
              <span className={styles.calculatorTitle}>
                Rental Price Calculator
                {priceLoading && <span style={{ marginLeft: '8px', fontSize: '12px', opacity: 0.7 }}>Calculating...</span>}
              </span>

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

            {/* Price Error Display */}
            {priceError && (
              <div style={{ 
                padding: '8px 12px', 
                margin: '8px 0',
                backgroundColor: '#fee2e2', 
                color: '#991b1b', 
                borderRadius: '4px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <AlertCircle size={16} />
                <span>Price calculation failed, using fallback. {priceError}</span>
              </div>
            )}

            {/* Price Breakdown */}
            {price > 0 ? (
              <div className={styles.priceBreakdown} style={{ opacity: priceLoading ? 0.6 : 1 }}>
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
                  {priceLoading 
                    ? "Calculating price..." 
                    : "Select bus type & enter details to calculate price"
                  }
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
                  <span className={styles.previewLabel}>Email</span>
                  <span className={styles.previewValue}>
                    {email || "Not specified"}
                  </span>
                </div>

                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Home Address</span>
                  <span className={styles.previewValue}>
                    {homeAddress || "Not specified"}
                  </span>
                </div>

                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Valid ID</span>
                  <span className={styles.previewValue}>
                    {validIdType ? `${validIdType}${validIdNumber ? ` - ${validIdNumber}` : ''}` : "Not specified"}
                  </span>
                </div>

                {validIdImage && (
                  <div className={styles.previewRow} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span className={styles.previewLabel} style={{ marginBottom: '0.5rem' }}>ID Image</span>
                    <img
                      src={validIdImage}
                      alt="Valid ID"
                      style={{
                        width: '100%',
                        maxHeight: '200px',
                        objectFit: 'contain',
                        borderRadius: '4px',
                        border: '1px solid #e5e7eb',
                        backgroundColor: 'white',
                        padding: '0.5rem'
                      }}
                    />
                  </div>
                )}

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

                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Destination</span>
                  <span className={styles.previewValue}>
                    {destination || "Not specified"}
                  </span>
                </div>

                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Pickup Location</span>
                  <span className={styles.previewValue}>
                    {pickupLocation || "Not specified"}
                  </span>
                </div>
                
                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Note</span>
                  <span className={styles.previewValue}>
                    {note || "Not specified"}
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
                    <div className={`${styles.previewStatusContent} ${styles.previewStatusIncomplete}`}>
                      <AlertCircle size={16} style={{ marginRight: 6 }} />
                      Form Incomplete
                    </div>

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

        {/* LocationPickerModal for Pickup Location */}
        <LocationPickerModal
          show={showPickupModal}
          onClose={() => setShowPickupModal(false)}
          onCreate={handlePickupCreate}
          title="Add Pickup Location"
          selectButtonText="Set Pickup Location"
          initialName={pickupLocation}
          initialLat={pickupLat}
          initialLng={pickupLng}
          locationType="pickup"
        />

        {/* LocationPickerModal for Destination */}
        <LocationPickerModal
          show={showDestinationModal}
          onClose={() => setShowDestinationModal(false)}
          onCreate={handleDestinationCreate}
          title="Add Destination"
          selectButtonText="Set Destination"
          initialName={destination}
          initialLat={destLat}
          initialLng={destLng}
          locationType="destination"
        />

        {/* Success Modal */}
        {rentalSummary && (
          <SuccessPageModal
            show={showSuccessModal}
            onClose={() => {
              setShowSuccessModal(false);
              setRentalSummary(null);
            }}
            summary={rentalSummary}
          />
        )}
      </div>
    </div>
  );
}