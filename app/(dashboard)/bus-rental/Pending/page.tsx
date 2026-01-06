'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './pending.module.css';
import '../../../../styles/globals.css';
import { Loading, FilterDropdown, PaginationComponent, Swal } from '@/shared/imports';
import { FilterSection } from '@/components/ui/FilterDropDown/FilterDropdown'; // ✅ Proper import
import { fetchRentalRequestsByStatus, updateRentalRequest } from '@/lib/apiCalls/rental-request';
import { fetchBackendToken } from '@/lib/backend';
import RouteMapModal from '@/components/modal/Route-Map-Modal/RouteMapModal';
import CustomerInfoModal from '@/components/modal/Customer-Info-Modal/CustomerInfoModal';
import PaymentEmailModal from '@/components/modal/Payment-Email-Modal/PaymentEmailModal';

// Geocoding cache for performance optimization
const GEOCODING_CACHE_KEY = 'geocoding_cache_v1';
const CACHE_EXPIRY_DAYS = 30;

interface GeocodeCache {
  [coordinates: string]: {
    name: string;
    timestamp: number;
  };
}

const loadGeocodeCache = (): GeocodeCache => {
  try {
    const cached = localStorage.getItem(GEOCODING_CACHE_KEY);
    if (cached) {
      const cache: GeocodeCache = JSON.parse(cached);
      const now = Date.now();
      const expiryTime = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      
      // Filter out expired entries
      const validCache: GeocodeCache = {};
      Object.entries(cache).forEach(([coords, data]) => {
        if (now - data.timestamp < expiryTime) {
          validCache[coords] = data;
        }
      });
      
      return validCache;
    }
  } catch (error) {
    console.error('Failed to load geocode cache:', error);
  }
  return {};
};

const saveGeocodeCache = (cache: GeocodeCache) => {
  try {
    localStorage.setItem(GEOCODING_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Failed to save geocode cache:', error);
  }
};

const geocodeCache: GeocodeCache = loadGeocodeCache();

// --- BusRental Interface ---
interface BusRental {
  id: string;
  customerName: string;
  contactNo: string;
  email: string;
  homeAddress: string;
  validIdType: string;
  validIdNumber: string;
  validIdImage: string | null;
  busType: string;
  bus: string;
  rentalDate: string;
  duration: string;
  distance: string;
  destination: string;
  pickupLocation: string;
  pickupLat?: number;
  pickupLng?: number;
  dropoffLat?: number;
  dropoffLng?: number;
  passengers: number;
  price: number;
  note: string;
  status: string;
}

const PendingRentalPage: React.FC = () => {
  const [rentals, setRentals] = useState<BusRental[]>([]);
  const [displayedRentals, setDisplayedRentals] = useState<BusRental[]>([]);
  const [selectedRental, setSelectedRental] = useState<BusRental | null>(null);
  const [showRouteMapModal, setShowRouteMapModal] = useState(false);
  const [showCustomerInfoModal, setShowCustomerInfoModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<BusRental | null>(null);
  const [showPaymentEmailModal, setShowPaymentEmailModal] = useState(false);
  const [rentalForEmail, setRentalForEmail] = useState<BusRental | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [activeFilters, setActiveFilters] = useState<{ sortBy: string }>({
    sortBy: 'created_newest',
  });

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {

      const data = await fetchRentalRequestsByStatus('Pending');

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format from server.');
      }

      // Parse coordinates and fetch city name using reverse geocoding with caching
      const parseLocation = async (locationStr: string) => {
        if (!locationStr) return { name: 'N/A', lat: undefined, lng: undefined };
        
        const coordPattern = /^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/;
        const match = locationStr.trim().match(coordPattern);
        
        if (match) {
          const lat = parseFloat(match[1]);
          const lng = parseFloat(match[2]);
          const cacheKey = `${lat.toFixed(6)},${lng.toFixed(6)}`;
          
          // Check cache first
          if (geocodeCache[cacheKey]) {
            return { name: geocodeCache[cacheKey].name, lat, lng };
          }
          
          try {
            // Use Nominatim reverse geocoding API to get city/municipality name
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
              { headers: { 'User-Agent': 'BOMS-App' } }
            );
            
            if (response.ok) {
              const data = await response.json();
              const address = data.address;
              // Get city, municipality, or town name
              const locationName = address.city || address.municipality || address.town || address.village || address.county || 'Unknown Location';
              
              // Save to cache
              geocodeCache[cacheKey] = {
                name: locationName,
                timestamp: Date.now()
              };
              saveGeocodeCache(geocodeCache);
              
              return { name: locationName, lat, lng };
            }
          } catch (error) {
            console.error('Reverse geocoding error:', error);
          }
          
          // Fallback if geocoding fails
          return { name: 'Custom Location', lat, lng };
        }
        
        return { name: locationStr, lat: undefined, lng: undefined };
      };

      const mappedData: BusRental[] = await Promise.all(data.map(async (r: any) => {
        const pickupData = await parseLocation(r.PickupLocation ?? '');
        const dropoffData = await parseLocation(r.DropoffLocation ?? '');

        return {
          id: r.RentalRequestID ?? '',
          customerName: r.CustomerName ?? 'N/A',
          contactNo: r.CustomerContact ?? 'N/A',
          email: r.CustomerEmail ?? 'N/A',
          homeAddress: r.CustomerAddress ?? 'N/A',
          validIdType: r.ValidIDType ?? 'N/A',
          validIdNumber: r.ValidIDNumber ?? 'N/A',
          validIdImage: r.ValidIDImage ?? null,
          busType: r.BusType ?? 'N/A',
          bus: r.PlateNumber ?? 'N/A',
          rentalDate: r.RentalDate ? new Date(r.RentalDate).toISOString().split('T')[0] : '',
          duration: r.Duration ? `${r.Duration} day${r.Duration > 1 ? 's' : ''}` : '',
          distance: r.DistanceKM ? `${r.DistanceKM} km` : '',
          destination: dropoffData.name,
          pickupLocation: pickupData.name,
          pickupLat: pickupData.lat,
          pickupLng: pickupData.lng,
          dropoffLat: dropoffData.lat,
          dropoffLng: dropoffData.lng,
          passengers: Number(r.NumberOfPassengers ?? 0),
          price: Number(r.RentalPrice ?? 0),
          note: r.SpecialRequirements ?? '',
          status: r.Status ?? 'Pending',
        };
      }));

      setRentals(mappedData);
    } catch (err: any) {
      console.error('Error fetching rentals:', err);
      Swal.fire('Error', err.message || 'Failed to load rentals.', 'error');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  // --- FilterDropdown configuration ---
  const filterSections: FilterSection[] = [
    {
      id: 'sortBy',
      title: 'Sort By',
      type: 'radio',
      options: [
        { id: 'name_az', label: 'Customer Name A-Z' },
        { id: 'name_za', label: 'Customer Name Z-A' },
        { id: 'created_newest', label: 'Created (Newest)' },
        { id: 'created_oldest', label: 'Created (Oldest)' },
      ],
      defaultValue: 'created_newest',
    },
  ];

  const handleApplyFilters = (filterValues: Record<string, any>) => {
    setActiveFilters({
      sortBy: filterValues.sortBy || 'created_newest',
    });
    setCurrentPage(1);
  };

  // --- Handle search & filtering logic ---
  useEffect(() => {
    try {
      let filtered = [...rentals];

      if (searchQuery) {
        const lower = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (r) => r.customerName?.toLowerCase().includes(lower)
        );
      }

      switch (activeFilters.sortBy) {
        case 'name_az':
          filtered.sort((a, b) => a.customerName.localeCompare(b.customerName));
          break;
        case 'name_za':
          filtered.sort((a, b) => b.customerName.localeCompare(a.customerName));
          break;
        default:
          break;
      }

      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      setDisplayedRentals(filtered.slice(start, end));
      setTotalPages(Math.max(Math.ceil(filtered.length / pageSize), 1));
    } catch (err: any) {
      console.error('Error filtering rentals:', err);
      Swal.fire('Error', 'Failed to filter rentals.', 'error');
    }
  }, [rentals, searchQuery, activeFilters, currentPage, pageSize]);

  // --- Approve Handler ---
  const handleApprove = async (id: string) => {
    const rental = rentals.find((r) => r.id === id);
    if (!rental) return Swal.fire('Error', 'Rental not found.', 'error');

    if (rental.status !== 'Pending') {
      return Swal.fire('Error', 'Rental is not pending.', 'warning');
    }

    // Open payment email modal instead of immediately approving
    setRentalForEmail(rental);
    setShowPaymentEmailModal(true);
  };

  // --- Send Payment Email Handler ---
  const handleSendPaymentEmail = async (emailContent: string) => {
    if (!rentalForEmail) return;

    try {
      setLoading(true);
      
      // Get authentication token
      const token = await fetchBackendToken();
      if (!token) {
        throw new Error('Authentication failed');
      }

      // TODO: Implement actual email sending API call
      // For now, we'll just approve the rental
      // const emailResponse = await fetch('/api/send-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     to: rentalForEmail.email,
      //     subject: 'Bus Rental Request Approved - Booking Confirmation',
      //     content: emailContent
      //   })
      // });

      // Call the API to approve the rental request
      await updateRentalRequest(token, rentalForEmail.id, { command: 'approve' });

      // Remove from local state since it's no longer pending
      setRentals((prev) => prev.filter((r) => r.id !== rentalForEmail.id));
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'The rental has been approved and payment instructions have been sent to the customer.',
        confirmButtonColor: '#10b981'
      });

      setShowPaymentEmailModal(false);
      setRentalForEmail(null);
    } catch (error: any) {
      console.error('Error approving rental:', error);
      Swal.fire('Error', error.message || 'Failed to approve rental request.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // --- View Note Handler ---
  const handleViewNote = (note?: string) => {
    Swal.fire({
      title: 'Rental Note',
      text: note || 'No note provided.',
      icon: 'info',
    });
  };

  // --- View Route Handler ---
  const handleViewRoute = (rental: BusRental) => {
    if (!rental.pickupLat || !rental.pickupLng || !rental.dropoffLat || !rental.dropoffLng) {
      Swal.fire({
        title: 'No Route Data',
        text: 'Coordinate information is not available for this rental.',
        icon: 'warning',
      });
      return;
    }
    setSelectedRental(rental);
    setShowRouteMapModal(true);
  };

  // --- View Customer Info Handler ---
  const handleViewCustomerInfo = (rental: BusRental) => {
    setSelectedCustomer(rental);
    setShowCustomerInfoModal(true);
  };

  // --- Render UI ---
  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        <h2 className={styles.stopTitle}>Pending Bus Rental Requests</h2>

        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <i className="ri-search-2-line"></i>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <FilterDropdown sections={filterSections} onApply={handleApplyFilters} />
        </div>

        <p className={styles.description}>
          Review and approve valid rental requests that have passed automatic vicinity validation. Rejected requests (outside service area) are automatically filtered out.
        </p>

        {loading ? (
          <Loading />
        ) : (
          <div className={styles.styledTableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Contact No.</th>
                  <th>Bus Type</th>
                  <th>Bus</th>
                  <th>Rental Date</th>
                  <th>Duration</th>
                  <th>Distance</th>
                  <th>Destination</th>
                  <th>Pickup Location</th>
                  <th>Passengers</th>
                  <th>Price</th>
                  <th className={styles.centeredColumn}>Customer Info</th>
                  <th className={styles.centeredColumn}>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedRentals.length > 0 ? (
                  displayedRentals.map((rental) => (
                    <tr key={rental.id}>
                      <td>{rental.customerName || 'N/A'}</td>
                      <td>{rental.contactNo || 'N/A'}</td>
                      <td>{rental.busType || 'N/A'}</td>
                      <td>{rental.bus || 'N/A'}</td>
                      <td>{rental.rentalDate || 'N/A'}</td>
                      <td>{rental.duration || 'N/A'}</td>
                      <td>{rental.distance || 'N/A'}</td>
                      <td>
                        <div 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '4px',
                            cursor: rental.pickupLat && rental.dropoffLat ? 'pointer' : 'default',
                            color: rental.pickupLat && rental.dropoffLat ? '#3b82f6' : 'inherit'
                          }}
                          onClick={() => rental.pickupLat && rental.dropoffLat && handleViewRoute(rental)}
                          title={rental.pickupLat && rental.dropoffLat ? 'Click to view route on map' : ''}
                        >
                          {rental.destination || 'N/A'}
                          {rental.pickupLat && rental.dropoffLat && ' '}
                        </div>
                      </td>
                      <td>
                        <div 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '4px',
                            cursor: rental.pickupLat && rental.dropoffLat ? 'pointer' : 'default',
                            color: rental.pickupLat && rental.dropoffLat ? '#3b82f6' : 'inherit'
                          }}
                          onClick={() => rental.pickupLat && rental.dropoffLat && handleViewRoute(rental)}
                          title={rental.pickupLat && rental.dropoffLat ? 'Click to view route on map' : ''}
                        >
                          {rental.pickupLocation || 'N/A'}
                          {rental.pickupLat && rental.dropoffLat && ' '}
                        </div>
                      </td>
                      <td>{rental.passengers ?? 'N/A'}</td>
                      <td>₱{rental.price?.toLocaleString() ?? '0'}</td>
                      <td className={styles.centeredColumn}>
                        <button
                          className={styles.noteBtn}
                          onClick={() => handleViewCustomerInfo(rental)}
                        >
                          View Details
                        </button>
                      </td>
                      <td className={styles.centeredColumn}>
                        <button
                          className={styles.approveBtn}
                          onClick={() => handleApprove(rental.id)}
                        >
                          Approve & Send Payment Info
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={13} className={styles.noRecords}>
                      No pending rentals found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size: number) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Route Map Modal */}
      {showRouteMapModal && selectedRental && selectedRental.pickupLat && selectedRental.pickupLng && selectedRental.dropoffLat && selectedRental.dropoffLng && (
        <RouteMapModal
          show={showRouteMapModal}
          onClose={() => setShowRouteMapModal(false)}
          routeData={{
            pickupLocation: selectedRental.pickupLocation,
            pickupLat: selectedRental.pickupLat,
            pickupLng: selectedRental.pickupLng,
            dropoffLocation: selectedRental.destination,
            dropoffLat: selectedRental.dropoffLat,
            dropoffLng: selectedRental.dropoffLng,
            distance: selectedRental.distance
          }}
        />
      )}

      {/* Customer Info Modal */}
      {showCustomerInfoModal && selectedCustomer && (
        <CustomerInfoModal
          show={showCustomerInfoModal}
          onClose={() => setShowCustomerInfoModal(false)}
          customerInfo={{
            customerName: selectedCustomer.customerName,
            email: selectedCustomer.email,
            contact: selectedCustomer.contactNo,
            homeAddress: selectedCustomer.homeAddress,
            validIdType: selectedCustomer.validIdType,
            validIdNumber: selectedCustomer.validIdNumber,
            validIdImage: selectedCustomer.validIdImage,
            note: selectedCustomer.note
          }}
        />
      )}

      {/* Payment Email Modal */}
      {showPaymentEmailModal && rentalForEmail && (
        <PaymentEmailModal
          show={showPaymentEmailModal}
          onClose={() => {
            setShowPaymentEmailModal(false);
            setRentalForEmail(null);
          }}
          onSendEmail={handleSendPaymentEmail}
          customerEmail={rentalForEmail.email}
          rentalDetails={{
            customerName: rentalForEmail.customerName,
            busType: rentalForEmail.busType,
            busName: rentalForEmail.bus,
            rentalDate: new Date(rentalForEmail.rentalDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            duration: rentalForEmail.duration,
            distance: rentalForEmail.distance,
            pickupLocation: rentalForEmail.pickupLocation,
            destination: rentalForEmail.destination,
            passengers: rentalForEmail.passengers,
            totalPrice: rentalForEmail.price
          }}
        />
      )}
    </div>
  );
};

export default PendingRentalPage;
