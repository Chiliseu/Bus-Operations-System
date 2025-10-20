'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './pending.module.css';
import '../../../../styles/globals.css';
import { Loading, FilterDropdown, PaginationComponent, Swal } from '@/shared/imports';
import { FilterSection } from '@/components/ui/FilterDropDown/FilterDropdown'; // ✅ Proper import
import { fetchRentalRequestsByStatus, updateRentalRequest } from '@/lib/apiCalls/rental-request';
import { fetchBackendToken } from '@/lib/backend';

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

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {

      const data = await fetchRentalRequestsByStatus('Pending');

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format from server.');
      }

      const mappedData: BusRental[] = data.map((r: any) => ({
        id: r.RentalRequestID ?? '',
        customerName: r.CustomerName ?? 'N/A',
        contactNo: r.CustomerContact ?? 'N/A',
        busType: r.BusType ?? 'N/A',
        bus: r.PlateNumber ?? 'N/A',
        rentalDate: r.RentalDate ? new Date(r.RentalDate).toISOString().split('T')[0] : '',
        duration: r.Duration ? `${r.Duration} day${r.Duration > 1 ? 's' : ''}` : '',
        distance: r.DistanceKM ? `${r.DistanceKM} km` : '',
        destination: r.DropoffLocation ?? '',
        pickupLocation: r.PickupLocation ?? '',
        passengers: Number(r.NumberOfPassengers ?? 0),
        price: Number(r.RentalPrice ?? 0),
        note: r.SpecialRequirements ?? '',
        status: r.Status ?? 'Pending',
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

    const confirm = await Swal.fire({
      icon: 'question',
      title: 'Approve Rental',
      text: `Are you sure you want to approve ${rental.customerName}'s request?`,
      showCancelButton: true,
      confirmButtonText: 'Yes, approve',
    });

    if (confirm.isConfirmed) {
      try {
        setLoading(true);
        
        // Get authentication token
        const token = await fetchBackendToken();
        if (!token) {
          throw new Error('Authentication failed');
        }

        // Call the API to approve the rental request
        await updateRentalRequest(token, id, { command: 'approve' });

        // Remove from local state since it's no longer pending
        setRentals((prev) => prev.filter((r) => r.id !== id));
        
        Swal.fire('Approved!', 'The rental has been approved and moved to the approved section.', 'success');
      } catch (error: any) {
        console.error('Error approving rental:', error);
        Swal.fire('Error', error.message || 'Failed to approve rental request.', 'error');
      } finally {
        setLoading(false);
      }
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
      try {
        setLoading(true);
        
        // Get authentication token
        const token = await fetchBackendToken();
        if (!token) {
          throw new Error('Authentication failed');
        }

        // Call the API to reject the rental request
        await updateRentalRequest(token, id, { command: 'reject' });

        // Remove from local state since it's no longer pending
        setRentals((prev) => prev.filter((r) => r.id !== id));
        
        Swal.fire('Rejected!', 'The rental has been rejected and moved to the rejected section.', 'info');
      } catch (error: any) {
        console.error('Error rejecting rental:', error);
        Swal.fire('Error', error.message || 'Failed to reject rental request.', 'error');
      } finally {
        setLoading(false);
      }
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
