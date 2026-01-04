'use client';

import React, { useEffect, useState } from 'react';
import styles from './approved.module.css';
import '../../../../styles/globals.css';
import Swal from 'sweetalert2';
import ApprovedBusReadinessModal from '@/components/modal/Approved-Bus-Readiness-Modal/ApprovedBusReadinessModal';
import AssignRentalDriverModal from '@/components/modal/Assign-Rental-Driver-Modal/AssignRentalDriverModal';
import DamageCheckModal from '@/components/modal/Damage-Check-Modal/DamageCheckModal';
import RouteMapModal from '@/components/modal/Route-Map-Modal/RouteMapModal';
import CustomerInfoModal from '@/components/modal/Customer-Info-Modal/CustomerInfoModal';
import { Loading, FilterDropdown, PaginationComponent } from '@/shared/imports';
import { FilterSection } from '@/components/ui/FilterDropDown/FilterDropdown';

import { fetchRentalRequestsByStatus, updateRentalRequest } from '@/lib/apiCalls/rental-request';
import { fetchBackendToken } from '@/lib/backend';

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

interface Driver {
  id: string;
  name: string;
  job: string;
  contactNo: string;
  address: string;
  image?: string;
}

interface BusRental {
  id: string;
  rentalBusAssignmentId?: string;
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
  status: 'Not Ready' | 'Ready' | 'Not Started' | 'Ongoing' | 'Completed';
  assignedDrivers?: { mainDriver: Driver; assistantDriver: Driver };
  readinessDone?: boolean;
  damageCheckDone?: boolean;
  damageData?: { vehicleCondition: Record<string, boolean>; note: string };
}

const ApprovedNotReadyPage: React.FC = () => {
  const [rentals, setRentals] = useState<BusRental[]>([]);
  const [displayedRentals, setDisplayedRentals] = useState<BusRental[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRental, setSelectedRental] = useState<BusRental | null>(null);
  const [showReadinessModal, setShowReadinessModal] = useState(false);
  const [showAssignDriversModal, setShowAssignDriversModal] = useState(false);
  const [showDamageCheckModal, setShowDamageCheckModal] = useState(false);
  const [showRouteMapModal, setShowRouteMapModal] = useState(false);
  const [showCustomerInfoModal, setShowCustomerInfoModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<BusRental | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [activeFilters, setActiveFilters] = useState<{ sortBy: string }>({
    sortBy: 'created_newest',
  });
  const [activeTab, setActiveTab] = useState<BusRental['status']>('Not Ready');
  const tabs: BusRental['status'][] = ['Not Ready', 'Ready', 'Not Started', 'Ongoing', 'Completed'];
  const activeTabIndex = tabs.indexOf(activeTab);

  // --- Fetch and validate data ---
  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchRentalRequestsByStatus('Approved'); // API call

      if (!Array.isArray(res)) throw new Error('Invalid API response');

      const mappedData: BusRental[] = await Promise.all(res.map(async (r: any) => {
        // Map first two drivers as mainDriver & assistantDriver
        const drivers = r.RentalBusAssignment?.RentalDrivers ?? [];
        const mainDriver = drivers[0]
          ? { 
              id: drivers[0].DriverID, 
              name: drivers[0].Driver?.DriverName || drivers[0].DriverID, 
              job: '', 
              contactNo: '', 
              address: '' 
            }
          : null;
        const assistantDriver = drivers[1]
          ? { 
              id: drivers[1].DriverID, 
              name: drivers[1].Driver?.DriverName || drivers[1].DriverID, 
              job: '', 
              contactNo: '', 
              address: '' 
            }
          : null;

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

        const pickupData = await parseLocation(r.PickupLocation ?? '');
        const dropoffData = await parseLocation(r.DropoffLocation ?? '');

        return {
          id: r.RentalRequestID ?? '',
          rentalBusAssignmentId: r.RentalBusAssignmentID ?? undefined,
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
          // Determine status based on backend data
          status: (() => {
            const busStatus = r.RentalBusAssignment?.BusAssignment?.Status;
            const hasReadinessChecks = r.RentalBusAssignment && (
              r.RentalBusAssignment.Battery || r.RentalBusAssignment.Lights ||
              r.RentalBusAssignment.Oil || r.RentalBusAssignment.Water ||
              r.RentalBusAssignment.Break || r.RentalBusAssignment.Air ||
              r.RentalBusAssignment.Gas || r.RentalBusAssignment.Engine ||
              r.RentalBusAssignment.TireCondition
            );
            
            if (busStatus === 'Completed') return 'Completed';
            if (busStatus === 'InOperation') return 'Ongoing';
            if (busStatus === 'NotStarted') return 'Not Started';
            // If status is NotReady but has readiness checks completed, consider it Ready
            if (busStatus === 'NotReady' && hasReadinessChecks) return 'Ready';
            return 'Not Ready';
          })() as 'Not Ready' | 'Ready' | 'Not Started' | 'Ongoing' | 'Completed',
          assignedDrivers:
            mainDriver && assistantDriver
              ? { mainDriver, assistantDriver }
              : drivers.length >= 2 
              ? { 
                  mainDriver: { 
                    id: drivers[0].DriverID, 
                    name: drivers[0].Driver?.DriverName || drivers[0].DriverID, 
                    job: '', 
                    contactNo: '', 
                    address: '' 
                  },
                  assistantDriver: { 
                    id: drivers[1].DriverID, 
                    name: drivers[1].Driver?.DriverName || drivers[1].DriverID, 
                    job: '', 
                    contactNo: '', 
                    address: '' 
                  }
                }
              : undefined,
          readinessDone: r.RentalBusAssignment && (
                        r.RentalBusAssignment.Battery || r.RentalBusAssignment.Lights ||
                        r.RentalBusAssignment.Oil || r.RentalBusAssignment.Water ||
                        r.RentalBusAssignment.Break || r.RentalBusAssignment.Air ||
                        r.RentalBusAssignment.Gas || r.RentalBusAssignment.Engine ||
                        r.RentalBusAssignment.TireCondition
                      ) || false,
          damageCheckDone: false,
          damageData: r.RentalBusAssignment
            ? {
                vehicleCondition: {
                  Battery: r.RentalBusAssignment.Battery ?? false,
                  Lights: r.RentalBusAssignment.Lights ?? false,
                  Oil: r.RentalBusAssignment.Oil ?? false,
                  Water: r.RentalBusAssignment.Water ?? false,
                  Brake: r.RentalBusAssignment.Break ?? false,
                  Air: r.RentalBusAssignment.Air ?? false,
                  Gas: r.RentalBusAssignment.Gas ?? false,
                  Engine: r.RentalBusAssignment.Engine ?? false,
                  'Tire Condition': r.RentalBusAssignment.TireCondition ?? false,
                },
                note: r.RentalBusAssignment.Note ?? '',
              }
            : undefined,
        };
      }));

      setRentals(mappedData);
    } catch (err: any) {
      console.error('Error fetching approved rentals:', err);
      Swal.fire('Error', err.message || 'Failed to load approved rentals.', 'error');
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
      // Filter by current active tab first
      let filtered = rentals.filter(r => r.status === activeTab);

      // Apply search query
      if (searchQuery) {
        const lower = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (r) => r.customerName?.toLowerCase().includes(lower)
        );
      }

      // Apply sorting
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

      // Apply pagination
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      setDisplayedRentals(filtered.slice(start, end));
      setTotalPages(Math.max(Math.ceil(filtered.length / pageSize), 1));
    } catch (err: any) {
      console.error('Error filtering rentals:', err);
      Swal.fire('Error', 'Failed to filter rentals.', 'error');
    }
  }, [rentals, searchQuery, activeFilters, currentPage, pageSize, activeTab]);

  const handleViewNote = (note?: string) => {
    Swal.fire({
      title: 'Rental Note',
      text: note || 'No note provided.',
      icon: 'info',
    });
  };

  const handleViewCustomerInfo = (rental: BusRental) => {
    setSelectedCustomer(rental);
    setShowCustomerInfoModal(true);
  };

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

  const handleReadinessCheck = (rental?: BusRental) => {
    if (!rental) return Swal.fire('Error', 'Rental not found.', 'error');
    setSelectedRental(rental);
    setShowReadinessModal(true);
  };

  const handleAssignDrivers = (rental?: BusRental) => {
    if (!rental) return Swal.fire('Error', 'Rental not found.', 'error');
    setSelectedRental(rental);
    setShowAssignDriversModal(true);
  };

  const handleDamageCheck = (rental?: BusRental) => {
    if (!rental) return Swal.fire('Error', 'Rental not found.', 'error');
    
    // For Ongoing status, we allow damage check regardless of readiness flags
    // since the rental is already in operation
    if (rental.status !== 'Ongoing' && (!rental.assignedDrivers || !rental.readinessDone)) {
      return Swal.fire(
        'Error',
        'Cannot perform damage check before readiness and driver assignment.',
        'warning'
      );
    }
    
    setSelectedRental(rental);
    setShowDamageCheckModal(true);
  };

  const renderStatusBadge = (status: BusRental['status']) => {
    let badgeColor = '';
    switch (status) {
      case 'Not Ready':
        badgeColor = styles.statusNotReady;
        break;
      case 'Ready':
        badgeColor = styles.statusReady || styles.statusNotStarted; // fallback if no Ready style
        break;
      case 'Not Started':
        badgeColor = styles.statusNotStarted;
        break;
      case 'Ongoing':
        badgeColor = styles.statusOngoing;
        break;
      case 'Completed':
        badgeColor = styles.statusCompleted || styles.statusOngoing; // fallback to ongoing style
        break;
    }
    return <span className={`${styles.statusBadge} ${badgeColor}`}>{status}</span>;
  };

  const handleStatusUpdate = async (rental: BusRental, newStatus: BusRental['status']) => {
    if (!rental) return;

    try {
      setLoading(true);
      
      // Get authentication token
      const token = await fetchBackendToken();
      if (!token) {
        throw new Error('Authentication failed');
      }

      // Handle special case for completing ongoing operations
      if (rental.status === 'Ongoing' && newStatus === 'Completed') {
        // Use the 'complete' command for ongoing operations
        await updateRentalRequest(token, rental.id, {
          command: 'complete'
        });
      } else {
        // Map frontend status to backend BusOperationStatus for other transitions
        let backendStatus = '';
        switch (newStatus) {
          case 'Not Started':
            backendStatus = 'NotStarted';
            break;
          case 'Ongoing':
            backendStatus = 'InOperation';
            break;
          case 'Completed':
            backendStatus = 'Completed';
            break;
          default:
            throw new Error('Invalid status transition');
        }

        // Update the bus assignment status in the backend
        await updateRentalRequest(token, rental.id, {
          busAssignmentUpdates: {
            Status: backendStatus
          }
        });
      }

      // Update local state
      setRentals((prev) =>
        prev.map((r) => (r.id === rental.id ? { ...r, status: newStatus } : r))
      );

      Swal.fire('Success', `Rental status updated to ${newStatus}.`, 'success');
    } catch (error: any) {
      console.error('Error updating status:', error);
      Swal.fire('Error', error.message || 'Failed to update rental status.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Group rentals by status
  const groupedRentals = {
    'Not Ready': rentals.filter(r => r.status === 'Not Ready'),
    'Ready': rentals.filter(r => r.status === 'Ready'),
    'Not Started': rentals.filter(r => r.status === 'Not Started'),
    'Ongoing': rentals.filter(r => r.status === 'Ongoing'),
    'Completed': rentals.filter(r => r.status === 'Completed')
  };

  // Get status counts for tab badges
  const statusCounts = {
    'Not Ready': groupedRentals['Not Ready'].length,
    'Ready': groupedRentals['Ready'].length,
    'Not Started': groupedRentals['Not Started'].length,
    'Ongoing': groupedRentals['Ongoing'].length,
    'Completed': groupedRentals['Completed'].length
  };

  const renderRentalTable = (rentalsToShow: BusRental[]) => (
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
            <th>Status</th>
            <th>Drivers</th>
            <th>Customer Info</th>
            <th className={styles.centeredColumn}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rentalsToShow.length > 0 ? (
            rentalsToShow.map((rental) => (
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
                    {rental.pickupLat && rental.dropoffLat && ' 🗺️'}
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
                    {rental.pickupLat && rental.dropoffLat && ' 🗺️'}
                  </div>
                </td>
                <td>{rental.passengers ?? 'N/A'}</td>
                <td>₱{rental.price?.toLocaleString() ?? '0'}</td>
                <td>{renderStatusBadge(rental.status)}</td>
                <td>
                  {rental.assignedDrivers
                    ? `${rental.assignedDrivers.mainDriver.name} / ${rental.assignedDrivers.assistantDriver.name}`
                    : '—'}
                </td>
                <td>
                  <button
                    className={styles.noteBtn}
                    onClick={() => handleViewCustomerInfo(rental)}
                  >
                    View Details
                  </button>
                </td>
                <td className={styles.centeredColumn}>
                  {rental.status === 'Not Ready' && (
                    <div className={styles.actionWrapper}>
                      <button
                        className={styles.approveBtn}
                        onClick={() => handleReadinessCheck(rental)}
                      >
                        Readiness Check
                      </button>
                      <button
                        className={styles.rejectBtn}
                        onClick={() => handleAssignDrivers(rental)}
                      >
                        Assign Drivers
                      </button>
                    </div>
                  )}
                  {rental.status === 'Ready' && (
                    <div className={styles.actionWrapper}>
                      <button
                        className={styles.rejectBtn}
                        onClick={() => handleAssignDrivers(rental)}
                      >
                        Assign Drivers
                      </button>
                      <button
                        className={styles.checkBtn}
                        disabled={!rental.assignedDrivers || !rental.assignedDrivers.mainDriver || !rental.assignedDrivers.assistantDriver}
                        onClick={() => handleStatusUpdate(rental, 'Not Started')}
                      >
                        Mark as Not Started
                      </button>
                      <button
                        className={styles.confirmBtn}
                        disabled={!rental.assignedDrivers || !rental.assignedDrivers.mainDriver || !rental.assignedDrivers.assistantDriver}
                        onClick={() => handleStatusUpdate(rental, 'Ongoing')}
                      >
                        Start Operation
                      </button>
                    </div>
                  )}
                  {rental.status === 'Not Started' && (
                    <div className={styles.actionWrapper}>
                      <button
                        className={styles.confirmBtn}
                        onClick={() => handleStatusUpdate(rental, 'Ongoing')}
                      >
                        Start Operation
                      </button>
                    </div>
                  )}
                  {rental.status === 'Ongoing' && (
                    <div className={styles.actionWrapper}>
                      <button
                        className={styles.confirmBtn}
                        onClick={() => handleStatusUpdate(rental, 'Completed')}
                      >
                        Complete
                      </button>
                    </div>
                  )}
                  {rental.status === 'Completed' && (
                    <div className={styles.actionWrapper}>
                      <button
                        className={styles.approveBtn}
                        onClick={() => handleDamageCheck(rental)}
                      >
                        Damage Check
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={15} className={styles.noRecords}>
                No {activeTab.toLowerCase()} rentals found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        <h2 className={styles.stopTitle}>Approved Bus Rentals</h2>
        
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
          Manage rentals that are approved but in different readiness stages.
        </p>

        {/* Status Tabs - Segmented Control with Sliding Indicator */}
        <div className={styles.tabContainer}>
          {/* Sliding indicator background */}
          <div 
            className={styles.tabIndicator}
            style={{
              transform: `translateX(calc(${activeTabIndex * 100}% + ${activeTabIndex * 4}px))`,
              width: `calc(${100 / tabs.length}% - ${4 * (tabs.length - 1) / tabs.length}px)`
            }}
          />
          
          {tabs.map((status) => (
            <button
              key={status}
              className={`${styles.tabButton} ${activeTab === status ? styles.tabButtonActive : ''}`}
              onClick={() => setActiveTab(status)}
            >
              {status}
              {statusCounts[status] > 0 && (
                <span className={styles.tabBadge}>
                  {statusCounts[status]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className={styles.tabContentWrapper}>
          {loading ? (
            <Loading />
          ) : (
            <div className={styles.tabContent} key={activeTab}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {activeTab} Rentals ({displayedRentals.length})
                </h3>
              </div>
              
              {renderRentalTable(displayedRentals)}

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
          )}
        </div>

        {/* Readiness Modal */}
        {showReadinessModal && selectedRental && (
          <ApprovedBusReadinessModal
            show={showReadinessModal}
            onClose={() => setShowReadinessModal(false)}
            busInfo={{
              regularBusAssignmentID: selectedRental.id,
              busNumber: selectedRental.bus,
              driver:
                selectedRental.assignedDrivers?.mainDriver.name || 'Juan Dela Cruz',
            }}
            onSave={async (data) => {
              try {
                setLoading(true);
                
                // Get authentication token
                const token = await fetchBackendToken();
                if (!token) {
                  throw new Error('Authentication failed');
                }

                // Update the bus assignment with readiness check data
                await updateRentalRequest(token, selectedRental.id, {
                  busAssignmentUpdates: {
                    Battery: data.vehicleCondition.Battery || false,
                    Lights: data.vehicleCondition.Lights || false,
                    Oil: data.vehicleCondition.Oil || false,
                    Water: data.vehicleCondition.Water || false,
                    Break: data.vehicleCondition.Brake || false,
                    Air: data.vehicleCondition.Air || false,
                    Gas: data.vehicleCondition.Gas || false,
                    Engine: data.vehicleCondition.Engine || false,
                    TireCondition: data.vehicleCondition.Tire || false,
                    Self_Driver: data.personnelCondition.driverReady || false,
                    // Don't update Status here - let the readiness checks indicate readiness
                  }
                });

                // Update local state
                setRentals((prev) =>
                  prev.map((r) =>
                    r.id === selectedRental.id
                      ? { 
                          ...r, 
                          readinessDone: true, 
                          // Only change to Ready if BOTH readiness AND drivers are complete
                          status: r.assignedDrivers && r.assignedDrivers.mainDriver && r.assignedDrivers.assistantDriver 
                            ? 'Ready' 
                            : 'Not Ready'
                        }
                      : r
                  )
                );

                setLoading(false);
                setShowReadinessModal(false);
                const hasDrivers = selectedRental.assignedDrivers && 
                                 selectedRental.assignedDrivers.mainDriver && 
                                 selectedRental.assignedDrivers.assistantDriver;
                
                await Swal.fire(
                  'Success',
                  hasDrivers 
                    ? 'Bus readiness completed! Status changed to Ready.' 
                    : 'Bus readiness completed! Assign drivers to change status to Ready.',
                  'success'
                );
                return true;
              } catch (error: any) {
                console.error('Error updating readiness:', error);
                setLoading(false);
                await Swal.fire('Error', error.message || 'Failed to update readiness.', 'error');
                return false;
              }
            }}
          />
        )}

        {/* Assign Drivers Modal */}
        {showAssignDriversModal && selectedRental && (
            <AssignRentalDriverModal
            isOpen={showAssignDriversModal}
            onClose={() => setShowAssignDriversModal(false)}
            busData={{
                busName: selectedRental.bus,
                status: selectedRental.status,
            }}
            onSave={async (assignedDrivers) => {
                try {
                    setLoading(true);
                    
                    // Get authentication token
                    const token = await fetchBackendToken();
                    if (!token) {
                        throw new Error('Authentication failed');
                    }

                    // Update the rental request with assigned drivers
                    await updateRentalRequest(token, selectedRental.id, {
                        drivers: [assignedDrivers.mainDriver.id, assignedDrivers.assistantDriver.id]
                    });

                    // Update local state
                    setRentals((prev) =>
                        prev.map((r) =>
                            r.id === selectedRental.id
                            ? { 
                                ...r, 
                                assignedDrivers,
                                // Only change to Ready if BOTH readiness AND drivers are complete
                                status: r.readinessDone ? 'Ready' : 'Not Ready'
                              }
                            : r
                        )
                    );
                    
                    setLoading(false);
                    setShowAssignDriversModal(false);
                    const isReady = selectedRental.readinessDone;
                    await Swal.fire(
                      'Success', 
                      isReady 
                        ? 'Drivers assigned! Status changed to Ready.' 
                        : 'Drivers assigned! Complete readiness check to change status to Ready.', 
                      'success'
                    );
                } catch (error: any) {
                    console.error('Error assigning drivers:', error);
                    setLoading(false);
                    await Swal.fire('Error', error.message || 'Failed to assign drivers.', 'error');
                }
            }}
            />
        )}

        {/* Damage Check Modal */}
        {showDamageCheckModal && selectedRental && (
          <DamageCheckModal
            show={showDamageCheckModal}
            onClose={() => setShowDamageCheckModal(false)}
            busInfo={{
              rentalId: selectedRental.id,
              busNumber: selectedRental.bus,
              driver:
                selectedRental.assignedDrivers?.mainDriver.name || 'Juan Dela Cruz',
            }}
            damageData={selectedRental.damageData}
            onSave={async (data) => {
              try {
                setLoading(true);
                
                // Get authentication token
                const token = await fetchBackendToken();
                if (!token) {
                  throw new Error('Authentication failed');
                }

                // Validate that we have the required RentalBusAssignmentID
                if (!selectedRental.rentalBusAssignmentId) {
                  throw new Error('RentalBusAssignmentID is missing. Cannot save damage report.');
                }

                // Save the damage report for completed rental
                await updateRentalRequest(token, selectedRental.id, {
                  rentalRequestUpdates: {
                    damageReport: {
                      vehicleCondition: data.vehicleCondition,
                      note: data.note,
                      checkDate: new Date().toISOString()
                    }
                  }
                });

                // Update local state - mark damage check as done
                setRentals((prev) =>
                  prev.map((r) =>
                    r.id === selectedRental.id
                      ? { ...r, damageCheckDone: true }
                      : r
                  )
                );
                
                setLoading(false);
                setShowDamageCheckModal(false);
                await Swal.fire('Success', 'Damage check saved successfully!', 'success');
                return true;
              } catch (error: any) {
                console.error('Error saving damage check:', error);
                setLoading(false);
                await Swal.fire('Error', error.message || 'Failed to save damage check.', 'error');
                return false;
              }
            }}
          />
        )}

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
      </div>
    </div>
  );
};

export default ApprovedNotReadyPage;