'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './bus-operation.module.css';
import '../../../../styles/globals.css';
import { fetchBusAssignmentsWithStatus } from '@/lib/apiCalls/bus-operation';

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

  const filterSections: FilterSection[] = [
    {
      id: "sortBy",
      title: "Sort By",
      type: "radio",
      options: [
        { id: "bus_az", label: "Bus A-Z" },
        { id: "bus_za", label: "Bus Z-A" },
        { id: "driver_az", label: "Driver A-Z" },
        { id: "driver_za", label: "Driver Z-A" },
        { id: "conductor_az", label: "Conductor A-Z" },
        { id: "conductor_za", label: "Conductor Z-A" },
        { id: "route_az", label: "Route A-Z" },
        { id: "route_za", label: "Route Z-A" },
      ],
      defaultValue: "bus_az"
    }
  ];

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const data = await fetchBusAssignmentsWithStatus('InOperation');
      setAssignments(data);
      console.log(data);
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

    switch (sortOrder) {
      case "bus_az":
        filtered.sort((a, b) => (a.busLicensePlate || '').localeCompare(b.busLicensePlate || ''));
        break;
      case "bus_za":
        filtered.sort((a, b) => (b.busLicensePlate || '').localeCompare(a.busLicensePlate || ''));
        break;
      case "driver_az":
        filtered.sort((a, b) => (a.driverName || '').localeCompare(b.driverName || ''));
        break;
      case "driver_za":
        filtered.sort((a, b) => (b.driverName || '').localeCompare(a.driverName || ''));
        break;
      case "conductor_az":
        filtered.sort((a, b) => (a.conductorName || '').localeCompare(b.conductorName || ''));
        break;
      case "conductor_za":
        filtered.sort((a, b) => (b.conductorName || '').localeCompare(a.conductorName || ''));
        break;
      case "route_az":
        filtered.sort((a, b) => (a.Route?.RouteName || '').localeCompare(b.Route?.RouteName || ''));
        break;
      case "route_za":
        filtered.sort((a, b) => (b.Route?.RouteName || '').localeCompare(a.Route?.RouteName || ''));
        break;
      default:
        break;
    }

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
        <h2 className={styles.stopTitle}>Post-Dispatch Bus Operation</h2>

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
          <FilterDropdown
            sections={filterSections}
            onApply={(values) => setSortOrder(values.sortBy)}
          />
        </div>

        {/* Description */}
        <p className={styles.description}>
          Review and update regular bus assignments after dispatch.
        </p>

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
                      <td>{assignment.Route.RouteName}</td>
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