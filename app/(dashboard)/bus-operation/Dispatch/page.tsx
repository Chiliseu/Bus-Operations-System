'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './bus-operation.module.css';
import '../../../../styles/globals.css';
import { fetchReadyBusAssignments } from '@/lib/apiCalls/bus-operation';

// --- Shared imports ---
import { Loading, FilterDropdown, PaginationComponent, Swal, Image, LoadingModal } from '@/shared/imports';
import type { FilterSection } from '@/shared/imports';

// Import interfaces
import { BusAssignment } from '@/app/interface/bus-assignment';

const BusOperationPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [assignments, setAssignments] = useState<(BusAssignment & {
        driverName?: string;
        conductorName?: string;
        busLicensePlate?: string;
      })[]>([]);
  const [displayedAssignments, setDisplayedAssignments] = useState<(BusAssignment & {
        driverName?: string;
        conductorName?: string;
        busLicensePlate?: string;
      })[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchAssignments = async () => {
      try {
        setLoading(true);
        const data = await fetchReadyBusAssignments();
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching stops:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchAssignments();
    }, []);

  useEffect(() => {
    let filtered = [...assignments];

    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.BusID.toLowerCase().includes(lower) ||
          a.RegularBusAssignment?.DriverID.toLowerCase().includes(lower) ||
          a.RegularBusAssignment?.ConductorID.toLowerCase().includes(lower)
      );
    }

    // if (sortOrder === 'Bus A-Z') {
    //   filtered.sort((a, b) => (a.BusAssignment?.BusID ?? '').localeCompare(b.BusAssignment?.BusID ?? ''));
    // } else if (sortOrder === 'Bus Z-A') {
    //   filtered.sort((a, b) => (b.BusAssignment?.BusID ?? '').localeCompare(a.BusAssignment?.BusID ?? ''));
    // } else if (sortOrder === 'Driver A-Z') {
    //   filtered.sort((a, b) => a.DriverID.localeCompare(b.DriverID));
    // } else if (sortOrder === 'Driver Z-A') {
    //   filtered.sort((a, b) => b.DriverID.localeCompare(a.DriverID));
    // }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedAssignments(filtered.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filtered.length / pageSize));
  }, [currentPage, assignments, searchQuery, sortOrder, pageSize]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        {/* Page title */}
        <h2 className={styles.stopTitle}>Dispatch Bus Operation</h2>

        {/* Search and Sort inputs */}
        <div className={styles.toolbar}>
          {/* Search Input */}
          <div className={styles.searchWrapper}>
            <i className="ri-search-2-line"></i>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <select
            className={styles.sortSelect}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by...</option>
            <option value="Bus A-Z">Bus A-Z</option>
            <option value="Bus Z-A">Bus Z-A</option>
            <option value="Driver A-Z">Driver A-Z</option>
            <option value="Driver Z-A">Driver Z-A</option>
          </select>
        </div>

        {/* Description */}
        <p className={styles.description}>Check buses that are ready for dispatch</p>

        {/* Loading centered in the card */}
        {loading ? (
          <Loading/>
        ) : (
          <div className={styles.styledTableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Bus</th>
                  <th>Driver</th>
                  <th>Conductor</th>
                  <th>Route</th>
                  <th className={styles.centeredColumn}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedAssignments.length > 0 ? (
                  displayedAssignments.map((assignment) => (
                    <tr key={assignment.BusAssignmentID}>
                      <td>{assignment.busLicensePlate}</td>
                      <td>{assignment.driverName}</td>
                      <td>{assignment.conductorName}</td>
                      <td>{assignment.Route?.RouteName ?? "No Route"}</td>
                      <td className={styles.centeredColumn}>
                        <button className={styles.editBtn}>
                          <img
                            src="/assets/images/edit-white.png"
                            alt="Edit"
                            width={25}
                            height={25}
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className={styles.noRecords}>
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination controls */}
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={(size: number) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );

};

export default BusOperationPage;