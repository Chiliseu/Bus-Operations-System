'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './pending.module.css';
import '../../../../styles/globals.css';
import { Loading, FilterDropdown, PaginationComponent, Swal } from '@/shared/imports';
import { FilterSection } from '@/components/ui/FilterDropDown/FilterDropdown'; // ✅ Proper import

// --- BusRental Interface ---
interface BusRental {
  id: string;
  customerName: string;
  contactNo: string;
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
}

const PendingRentalPage: React.FC = () => {
  const [rentals, setRentals] = useState<BusRental[]>([]);
  const [displayedRentals, setDisplayedRentals] = useState<BusRental[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [activeFilters, setActiveFilters] = useState<{ sortBy: string }>({
    sortBy: 'created_newest',
  });

  // --- Fetch dummy data with validation ---
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        // Simulate fetch
        const data: Partial<BusRental>[] = [
          {
            id: '1',
            customerName: 'Juan Dela Cruz',
            contactNo: '09123456789',
            busType: 'Aircon',
            bus: 'Bus-101',
            rentalDate: '2025-10-18',
            duration: '2 days',
            distance: '120 km',
            destination: 'Tagaytay',
            pickupLocation: 'Cubao Terminal',
            passengers: 40,
            price: 15000,
            note: 'Wedding event',
            status: 'Pending',
          },
        ];

        // Validate each rental
        const validData: BusRental[] = data
          .filter(
            (r) =>
              r.id &&
              r.customerName &&
              r.contactNo &&
              r.busType &&
              r.bus &&
              r.rentalDate &&
              r.duration &&
              r.destination &&
              r.pickupLocation &&
              typeof r.passengers === 'number' &&
              typeof r.price === 'number' &&
              r.status
          )
          .map((r) => r as BusRental);

        if (validData.length === 0) {
          throw new Error('No valid rental data found.');
        }

        setRentals(validData);
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

    const confirm = await Swal.fire({
      icon: 'question',
      title: 'Approve Rental',
      text: `Are you sure you want to approve ${rental.customerName}'s request?`,
      showCancelButton: true,
      confirmButtonText: 'Yes, approve',
    });

    if (confirm.isConfirmed) {
      setRentals((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'Approved' } : r))
      );
      Swal.fire('Approved!', 'The rental has been approved.', 'success');
    }
  };

  // --- Reject Handler ---
  const handleReject = async (id: string) => {
    const rental = rentals.find((r) => r.id === id);
    if (!rental) return Swal.fire('Error', 'Rental not found.', 'error');

    if (rental.status !== 'Pending') {
      return Swal.fire('Error', 'Rental is not pending.', 'warning');
    }

    const confirm = await Swal.fire({
      icon: 'warning',
      title: 'Reject Rental',
      text: `Are you sure you want to reject ${rental.customerName}'s request?`,
      showCancelButton: true,
      confirmButtonText: 'Yes, reject',
    });

    if (confirm.isConfirmed) {
      setRentals((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'Rejected' } : r))
      );
      Swal.fire('Rejected!', 'The rental has been rejected.', 'info');
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
          Review and manage pending bus rental requests.
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
                  <th>Note</th>
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
                      <td>{rental.destination || 'N/A'}</td>
                      <td>{rental.pickupLocation || 'N/A'}</td>
                      <td>{rental.passengers ?? 'N/A'}</td>
                      <td>₱{rental.price?.toLocaleString() ?? '0'}</td>
                      <td>
                        <button
                          className={styles.noteBtn}
                          onClick={() => handleViewNote(rental.note)}
                        >
                          View Notes
                        </button>
                      </td>
                      <td className={styles.centeredColumn}>
                        <button
                          className={styles.approveBtn}
                          onClick={() => handleApprove(rental.id)}
                        >
                          Approve
                        </button>
                        <button
                          className={styles.rejectBtn}
                          onClick={() => handleReject(rental.id)}
                        >
                          Reject
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
    </div>
  );
};

export default PendingRentalPage;
