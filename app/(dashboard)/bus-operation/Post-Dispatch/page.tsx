'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './bus-operation.module.css';
import '../../../../styles/globals.css';
import Image from 'next/image';
import PaginationComponent from '@/components/ui/PaginationV2';
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

    // if (sortOrder === 'Bus A-Z') {
    //   filtered.sort((a, b) => a.BusAssignment.BusID.localeCompare(b.BusAssignment.BusID));
    // } else if (sortOrder === 'Bus Z-A') {
    //   filtered.sort((a, b) => b.BusAssignment.BusID.localeCompare(a.BusAssignment.BusID));
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
    <div className={`card mx-auto ${styles.wideCard}`}>
      <div className="card mx-auto w-100" style={{ maxWidth: '1700px' }}>
        <div className="card-body">
          <h2 className={styles.stopTitle}>POST-DISPATCH BUS OPERATION</h2>
          <h2 className="card-title mb-3">Bus Assignments</h2>

          <div className="row g-2 mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by bus, driver, or conductor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
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
          </div>

          <p className="text-muted ms-1">Review and update regular bus assignments after dispatch.</p>

          <div className={styles.styledTableWrapper}>
            {loading?(
              <div className="text-center my-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ):(
              <table className={styles.styledTable}>
                <thead>
                  <tr>
                    <th>Bus</th>
                    <th>Driver</th>
                    <th>Conductor</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedAssignments.length > 0 ? (
                    displayedAssignments.map((assignment) => (
                      <tr key={assignment.BusAssignmentID}>
                        <td>{assignment.BusID}</td>
                        <td>{assignment.RegularBusAssignment?.DriverID}</td>
                        <td>{assignment.RegularBusAssignment?.ConductorID}</td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-primary p-1">
                            <Image
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
                      <td colSpan={4} className="text-center py-4">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {displayedAssignments.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default BusOperationPage;