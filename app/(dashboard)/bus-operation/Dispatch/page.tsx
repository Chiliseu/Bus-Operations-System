'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './bus-operation.module.css';
import '../../../../styles/globals.css';
import { fetchBusAssignmentsWithStatus, updateBusAssignmentData } from '@/lib/apiCalls/bus-operation';

// --- Shared imports ---
import { Loading, FilterDropdown, PaginationComponent, Swal } from '@/shared/imports';
import type { FilterSection } from '@/shared/imports';
import { BusAssignment } from '@/app/interface/bus-assignment';

const BusOperationPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [assignments, setAssignments] = useState<(BusAssignment & {
    driverName?: string;
    conductorName?: string;
    busLicensePlate?: string;
    busType?: string;
  })[]>([]);
  const [displayedAssignments, setDisplayedAssignments] = useState<typeof assignments>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{ sortBy: string; busTypeFilter?: string }>({
    sortBy: 'created_newest'
  });

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
        { id: "created_newest", label: "Created At (Newest First)" },
        { id: "created_oldest", label: "Created At (Oldest First)" },
        { id: "updated_newest", label: "Updated At (Newest First)" },
        { id: "updated_oldest", label: "Updated At (Oldest First)" }
      ],
      defaultValue: 'created_newest'
    },
    {
      id: "busTypeFilter",
      title: "Bus Type",
      type: "radio",
      options: [
        { id: "Aircon", label: "Aircon" },
        { id: "Non-Aircon", label: "Non-Aircon" }
      ]
    }
  ];

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const data = await fetchBusAssignmentsWithStatus("NotStarted");

      // Sort newest first (by CreatedAt)
      const sorted = data.sort((a, b) =>
        new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
      );

      setAssignments(sorted);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Fetch Failed',
        text: 'Failed to load assignments.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleApplyFilters = (filterValues: Record<string, any>) => {
    setActiveFilters({
      sortBy: filterValues.sortBy || 'created_newest',
      busTypeFilter: filterValues.busTypeFilter
    });
  };

  useEffect(() => {
    let filtered = [...assignments];

    // Search filter
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(a => {
        const busTypeLabel = renderBusTypeLabel(a.busType).toLowerCase();
        return (
          a.busLicensePlate?.toLowerCase().includes(lower) ||
          a.driverName?.toLowerCase().includes(lower) ||
          a.conductorName?.toLowerCase().includes(lower) ||
          a.Route?.RouteName?.toLowerCase().includes(lower) ||
          a.busType?.toLowerCase().includes(lower) ||
          busTypeLabel.includes(lower)
        );
      });
    }

    if (activeFilters.busTypeFilter) {
      filtered = filtered.filter(a => a.busType === activeFilters.busTypeFilter);
    }

    switch (activeFilters.sortBy) {
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
      case "created_newest":
        filtered.sort((a, b) => new Date(b.CreatedAt || 0).getTime() - new Date(a.CreatedAt || 0).getTime());
        break;
      case "created_oldest":
        filtered.sort((a, b) => new Date(a.CreatedAt || 0).getTime() - new Date(b.CreatedAt || 0).getTime());
        break;
      case "updated_newest":
        filtered.sort((a, b) => new Date(b.UpdatedAt || 0).getTime() - new Date(a.UpdatedAt || 0).getTime());
        break;
      case "updated_oldest":
        filtered.sort((a, b) => new Date(a.UpdatedAt || 0).getTime() - new Date(b.UpdatedAt || 0).getTime());
        break;
      default:
        break;
    }

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setDisplayedAssignments(filtered.slice(start, end));
    setTotalPages(Math.ceil(filtered.length / pageSize));
  }, [assignments, searchQuery, activeFilters, currentPage, pageSize]);

   // SWITCH 2: DISPLAY TEXT SWITCH  // changes by Y 6/18/2025
    const renderBusTypeLabel = (busType?: string) => {
    switch (busType) {
      case "Aircon":
        return "Air-conditioned Bus";
      case "Non-Aircon":
        return "Ordinary Bus";
      default:
        return "Unknown";
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDispatch = async (BusAssignmentID: string) => {
    const result = await Swal.fire({
      title: 'Confirm Dispatch',
      text: 'Are you sure you want to dispatch this bus?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, dispatch',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await updateBusAssignmentData(BusAssignmentID, { Status: "InOperation" });
        await Swal.fire('Success', 'Bus dispatched successfully!', 'success');
        fetchAssignments();
      } catch (error: any) {
        await Swal.fire({
          icon: 'error',
          title: 'Dispatch Failed',
          text: 'Failed to dispatch.',
        });
      }
    }
  };

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        <h2 className={styles.stopTitle}>Dispatch Bus Operation</h2>

        <div className={styles.toolbar}>
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

          <FilterDropdown
            sections={filterSections}
            onApply={handleApplyFilters}
          />
        </div>

        <p className={styles.description}>Check buses that are ready for dispatch</p>

        {loading ? (
          <Loading />
        ) : (
          <div className={styles.styledTableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Bus</th>
                  <th>Bus Type</th>
                  <th>Driver</th>
                  <th>Conductor</th>
                  <th>Route</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th className={styles.centeredColumn}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedAssignments.length > 0 ? (
                  displayedAssignments.map(assignment => (
                    <tr key={assignment.BusAssignmentID}>
                      <td>{assignment.busLicensePlate}</td>
                      <td>{renderBusTypeLabel(assignment.busType)}</td>
                      <td>{assignment.driverName}</td>
                      <td>{assignment.conductorName}</td>
                      <td>{assignment.Route?.RouteName ?? "No Route"}</td>
                      <td>
                        {assignment.CreatedAt
                          ? new Date(assignment.CreatedAt).toLocaleString()
                          : "N/A"}
                      </td>
                      <td>
                        {assignment.UpdatedAt
                          ? new Date(assignment.UpdatedAt).toLocaleString()
                          : "No updates"}
                      </td>
                      <td className={styles.centeredColumn}>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleDispatch(assignment.BusAssignmentID)}
                        >
                          <img
                            src="/assets/images/edit-white.png"
                            alt="Dispatch"
                            width={25}
                            height={25}
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className={styles.noRecords}>
                      No records found.
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
          onPageChange={handlePageChange}
          onPageSizeChange={size => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default BusOperationPage;
