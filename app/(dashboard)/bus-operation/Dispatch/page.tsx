'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './bus-operation.module.css';
import '../../../../styles/globals.css';
import Image from 'next/image';

const ITEMS_PER_PAGE = 10;

interface BusAssignment {
  id: string;
  bus: string;
  driver: string;
}

// Sample data for bus assignments
const sampleAssignments: BusAssignment[] = [
  { id: '1', bus: 'Bus 101', driver: 'John Doe' },
  { id: '2', bus: 'Bus 102', driver: 'Jane Smith' },
  { id: '3', bus: 'Bus 103', driver: 'Bob Johnson' },
  { id: '4', bus: 'Bus 104', driver: 'Alice Brown' },
  { id: '5', bus: 'Bus 105', driver: 'Charlie Lee' },
  { id: '6', bus: 'Bus 106', driver: 'Diana Ross' },
  { id: '7', bus: 'Bus 107', driver: 'Ethan Hunt' },
  { id: '8', bus: 'Bus 108', driver: 'Fiona Green' },
  { id: '9', bus: 'Bus 109', driver: 'George White' },
  { id: '10', bus: 'Bus 110', driver: 'Hannah Black' },
  { id: '11', bus: 'Bus 111', driver: 'Ivan Grey' },
];

const BusOperationPage: React.FC = () => {
  // State: current page number for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State: all bus assignments
  const [assignments, setAssignments] = useState<BusAssignment[]>([]);
  // State: assignments to display on the current page
  const [displayedAssignments, setDisplayedAssignments] = useState<BusAssignment[]>([]);
  // State: total number of pages based on filtered data
  const [totalPages, setTotalPages] = useState(1);
  // State: search query input
  const [searchQuery, setSearchQuery] = useState('');
  // State: current sort order
  const [sortOrder, setSortOrder] = useState('');

  // Load initial assignments data on component mount
  useEffect(() => {
    setAssignments(sampleAssignments);
  }, []);

  // Filter, sort, paginate assignments whenever dependencies change
  useEffect(() => {
    let filtered = [...assignments];

    // Filter by search query on bus or driver fields
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.bus.toLowerCase().includes(lower) ||
          a.driver.toLowerCase().includes(lower)
      );
    }

    // Sort filtered data based on selected order
    if (sortOrder === 'Bus A-Z') {
      filtered.sort((a, b) => a.bus.localeCompare(b.bus));
    } else if (sortOrder === 'Bus Z-A') {
      filtered.sort((a, b) => b.bus.localeCompare(a.bus));
    } else if (sortOrder === 'Driver A-Z') {
      filtered.sort((a, b) => a.driver.localeCompare(b.driver));
    } else if (sortOrder === 'Driver Z-A') {
      filtered.sort((a, b) => b.driver.localeCompare(a.driver));
    }

    // Slice filtered list for current page based on pagination
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedAssignments(filtered.slice(startIndex, endIndex));

    // Calculate total pages for pagination
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  }, [currentPage, assignments, searchQuery, sortOrder]);

  // Handler to update page number when pagination buttons clicked
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    // Main container card
    <div className={`card mx-auto ${styles.wideCard}`}>
      <div className="card mx-auto w-100" style={{ maxWidth: '1700px' }}>
        <div className="card-body">
          {/* Page header */}
          <h2 className={styles.stopTitle}>DISPATCH BUS OPERATION</h2>
          <h2 className="card-title mb-3">Bus Assignments</h2>

          {/* Search and sort controls */}
          <div className="row g-2 mb-3">
            <div className="col-md-4">
              {/* Search input */}
              <input
                type="text"
                className="form-control"
                placeholder="Search by bus or driver..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              {/* Sort dropdown */}
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

          {/* Description below controls */}
          <p className="text-muted ms-1">Deploy buses to their designated routes.</p>

          {/* Table wrapper */}
          <div className={styles.styledTableWrapper}>
            {/* Table displaying assignments */}
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Bus</th>
                  <th>Driver</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Map assignments to table rows, or show 'No records' */}
                {displayedAssignments.length > 0 ? (
                  displayedAssignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td>{assignment.bus}</td>
                      <td>{assignment.driver}</td>
                      <td className="text-center">
                        {/* Edit button */}
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
                    <td colSpan={3} className="text-center py-4">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          {displayedAssignments.length > 0 && (
            <nav>
              <ul className="pagination justify-content-center mt-3">
                {/* Previous button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                  </button>
                </li>

                {/* Page number buttons */}
                {Array.from({ length: totalPages }).map((_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                  >
                    <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}

                {/* Next button */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusOperationPage;
