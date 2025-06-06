'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './bus-operation.module.css';
import '../../../../styles/globals.css';
import Image from 'next/image';
import PaginationComponent from '@/components/ui/PaginationV2';
import BusReadinessModal from '@/components/modal/UpdateBusReadinessModal';
import { fetchDriverById, fetchConductorById, fetchBusById } from '@/lib/apiCalls/external';
import { fetchBusAssignmentsWithStatus } from '@/lib/apiCalls/bus-operation';

// Import interfaces
import { BusAssignment } from '@/app/interface/bus-assignment';

const BusOperationPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [assignments, setAssignments] = useState<BusAssignment[]>([]);
  const [displayedAssignments, setDisplayedAssignments] = useState<BusAssignment[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  // Bus Readiness Check Modal
  type BusInfo = {
    regularBusAssignmentID: string;
    busNumber: string;
    driver: string;
    conductor: string;
  };
  const [showBusReadinessModal, setShowBusReadinessModal] = useState(false);
  const [selectedBusAssignment, setSelectedBusAssignment] = useState<BusAssignment | null>(null);
  const [selectedBusInfo, setSelectedBusInfo] = useState<BusInfo | null>(null);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const data = await fetchBusAssignmentsWithStatus('NotStarted');
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

    // if (sortOrder === 'Bus A-Z') {
    //   filtered.sort((a, b) => a.BusID.localeCompare(b.BusID));
    // } else if (sortOrder === 'Bus Z-A') {
    //   filtered.sort((a, b) => b.BusID.localeCompare(a.BusID));
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

  const handleSaveReadiness = () => {
    return;
  };

  // const handleOpenBusReadinessModal = async (assignment: BusAssignment) => {
  //   const bus = await fetchBusById(assignment.BusID);
  //   const driver = await fetchDriverById(assignment.RegularBusAssignment.DriverID);
  //   const conductor = await fetchConductorById(assignment.RegularBusAssignment.ConductorID);

  //   setSelectedBusInfo({
  //     regularBusAssignmentID: assignment.RegularBusAssignment?.RegularBusAssignmentID??,
  //     busNumber: bus?.license_plate || 'Unknown',
  //     driver: driver?.name || 'Unknown',
  //     conductor: conductor?.name || 'Unknown',
  //   });

  //   setShowBusReadinessModal(true);
  // };

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        {/* Page title */}
        <h2 className={styles.stopTitle}>Pre-Dispatch Bus Operation</h2>

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
        <p className={styles.description}>Check buses that are not ready for dispatch</p>

        {/* Loading centered in the card */}
        {loading ? (
          <div className={styles.loadingWrapper}>
            <img src="/loadingbus.gif" alt="Loading..." className={styles.loadingImage} />
          </div>
        ) : (
          <div className={styles.styledTableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Bus</th>
                  <th>Driver</th>
                  <th>Conductor</th>
                  <th className={styles.centeredColumn}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedAssignments.length > 0 ? (
                  displayedAssignments.map((assignment) => (
                    <tr key={assignment.BusAssignmentID}>
                      <td>{assignment.BusID}</td>
                      <td>{assignment.RegularBusAssignment?.DriverID}</td>
                      <td>{assignment.RegularBusAssignment?.ConductorID}</td>
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

        {/* Bus Readiness Modal (commented out) */}
        {/* {selectedBusInfo && (
          <BusReadinessModal
            show={showBusReadinessModal}
            onClose={() => {
              setShowBusReadinessModal(false);
              setSelectedBusInfo(null);
            }}
            busInfo={selectedBusInfo}
            onSave={handleSaveReadiness}
          />
        )} */}
      </div>
    </div>
  );
};

export default BusOperationPage;