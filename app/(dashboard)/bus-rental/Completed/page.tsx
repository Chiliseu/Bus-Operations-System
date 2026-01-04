'use client';

import React, { useEffect, useState } from 'react';
import styles from './completed.module.css';
import '../../../../styles/globals.css';
import { Loading, FilterDropdown, PaginationComponent, Swal } from '@/shared/imports';
import { FilterSection } from '@/components/ui/FilterDropDown/FilterDropdown';
import ViewDamageModal from '@/components/modal/View-Damage-Modal/ViewDamageModal'; // import new modal
import CustomerInfoModal from '@/components/modal/Customer-Info-Modal/CustomerInfoModal';
import { RiEyeLine } from 'react-icons/ri'; // eye icon
import { fetchRentalRequestsByStatus } from '@/lib/apiCalls/rental-request';

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
  passengers: number;
  price: number;
  note: string;
  status: string;
  driver: string;
  damageData?: {
    vehicleCondition: Record<string, boolean>;
    note: string;
  };
}

const CompletedRentalPage: React.FC = () => {
  const [rentals, setRentals] = useState<BusRental[]>([]);
  const [displayedRentals, setDisplayedRentals] = useState<BusRental[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRental, setSelectedRental] = useState<BusRental | null>(null);
  const [showDamageModal, setShowDamageModal] = useState(false);
  const [showCustomerInfoModal, setShowCustomerInfoModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<BusRental | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
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
      const res = await fetchRentalRequestsByStatus('Completed'); // cookie-based auth handled

      if (!Array.isArray(res)) throw new Error('Invalid response from server');

      const mappedData: BusRental[] = res.map((r: any) => {
        // Get the most recent damage report if it exists
        const latestDamageReport = r.DamageReports && r.DamageReports.length > 0
          ? r.DamageReports[r.DamageReports.length - 1] // Get the last (most recent) damage report
          : null;

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
          rentalDate: r.RentalDate
            ? new Date(r.RentalDate).toISOString().split('T')[0]
            : '',
          duration: r.Duration ? `${r.Duration} day${r.Duration > 1 ? 's' : ''}` : '',
          distance: r.DistanceKM ? `${r.DistanceKM} km` : '',
          destination: r.DropoffLocation ?? '',
          pickupLocation: r.PickupLocation ?? '',
          passengers: Number(r.NumberOfPassengers ?? 0),
          price: Number(r.RentalPrice ?? 0),
          note: r.SpecialRequirements ?? '',
          status: r.Status ?? 'Completed',
          driver: r.RentalBusAssignment?.RentalDrivers
            ?.map((d: any) => d.DriverID)
            .join(', ') ?? '',
          damageData: latestDamageReport
            ? {
                vehicleCondition: {
                  Battery: latestDamageReport.Battery ?? false,
                  Lights: latestDamageReport.Lights ?? false,
                  Oil: latestDamageReport.Oil ?? false,
                  Water: latestDamageReport.Water ?? false,
                  Brake: latestDamageReport.Brake ?? false,
                  Air: latestDamageReport.Air ?? false,
                  Gas: latestDamageReport.Gas ?? false,
                  Engine: latestDamageReport.Engine ?? false,
                  "Tire Condition": latestDamageReport.TireCondition ?? false,
                },
                note: latestDamageReport.Note ?? '',
              }
            : undefined,
        };
      });

      setRentals(mappedData);
    } catch (err: any) {
      console.error('Error fetching completed rentals:', err);
      Swal.fire('Error', err.message || 'Failed to load completed rentals.', 'error');
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
  }, [rentals, searchQuery, activeFilters, currentPage, pageSize]);

  const handleViewNote = (note: string) => {
    Swal.fire({ title: 'Rental Note', text: note || 'No note provided.', icon: 'info' });
  };

  const handleViewCustomerInfo = (rental: BusRental) => {
    setSelectedCustomer(rental);
    setShowCustomerInfoModal(true);
  };

  const handleViewDamage = (rental: BusRental) => {
    setSelectedRental(rental);
    setShowDamageModal(true);
  };

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        <h2 className={styles.stopTitle}>Completed Bus Rentals</h2>
        
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
          View all completed bus rentals and damage reports.
        </p>

        {loading ? (
          <Loading />
        ) : (
          <div className={styles.styledTableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Bus</th>
                  <th>Rental Date</th>
                  <th>Passengers</th>
                  <th>Price</th>
                  <th>Customer Info</th>
                  <th>Damage</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedRentals.length > 0 ? (
                  displayedRentals.map((rental) => (
                    <tr key={rental.id}>
                      <td>{rental.customerName}</td>
                      <td>{rental.bus}</td>
                      <td>{rental.rentalDate}</td>
                      <td>{rental.passengers}</td>
                      <td>₱{rental.price.toLocaleString()}</td>
                      <td>
                        <button className={styles.noteBtn} onClick={() => handleViewCustomerInfo(rental)}>
                          View Details
                        </button>
                      </td>
                      <td>
                        <button className={styles.noteBtn} onClick={() => handleViewDamage(rental)}>
                          <RiEyeLine size={18} />
                        </button>
                      </td>
                      <td>{rental.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className={styles.noRecords}>No completed rentals found.</td>
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

        {showDamageModal && selectedRental && (
          <ViewDamageModal
            show={showDamageModal}
            onClose={() => setShowDamageModal(false)}
            busInfo={{ rentalId: selectedRental.id, busNumber: selectedRental.bus, driver: selectedRental.driver }}
            damageData={selectedRental.damageData}
          />
        )}

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

export default CompletedRentalPage;
