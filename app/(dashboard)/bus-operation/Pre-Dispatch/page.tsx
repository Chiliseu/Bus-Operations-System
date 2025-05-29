'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './bus-operation.module.css';
import '../../../../styles/globals.css';
import Image from 'next/image';

// Number of items to display per page for pagination
const ITEMS_PER_PAGE = 10;

// Define TypeScript interface for a bus assignment
interface BusAssignment {
  id: string;
  bus: string;
  driver: string;
}

// Sample data of bus assignments to display initially
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
  // State to keep track of the current active page number for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State to hold all assignments loaded (initially empty)
  const [assignments, setAssignments] = useState<BusAssignment[]>([]);
  // State to hold the assignments currently displayed on the page (after filter/sort/pagination)
  const [displayedAssignments, setDisplayedAssignments] = useState<BusAssignment[]>([]);
  // Total number of pages after filtering
  const [totalPages, setTotalPages] = useState(1);
  // State for search input (to filter by bus or driver)
  const [searchQuery, setSearchQuery] = useState('');
  // State to hold current selected sort order
  const [sortOrder, setSortOrder] = useState('');

  // On component mount, initialize the assignments with sample data
  useEffect(() => {
    setAssignments(sampleAssignments);
  }, []);

  // Whenever currentPage, assignments, searchQuery, or sortOrder changes,
  // re-calculate the filtered, sorted, and paginated list of displayed assignments
  useEffect(() => {
    let filtered = [...assignments]; // start with all assignments

    // Filter by search query if it exists
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.bus.toLowerCase().includes(lower) || // filter by bus name
          a.driver.toLowerCase().includes(lower) // or by driver name
      );
    }

    // Sort based on selected sortOrder
    if (sortOrder === 'Bus A-Z') {
      filtered.sort((a, b) => a.bus.localeCompare(b.bus));
    } else if (sortOrder === 'Bus Z-A') {
      filtered.sort((a, b) => b.bus.localeCompare(a.bus));
    } else if (sortOrder === 'Driver A-Z') {
      filtered.sort((a, b) => a.driver.localeCompare(b.driver));
    } else if (sortOrder === 'Driver Z-A') {
      filtered.sort((a, b) => b.driver.localeCompare(a.driver));
    }

    // Pagination: calculate the slice of filtered data for current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedAssignments(filtered.slice(startIndex, endIndex));

    // Update total pages count based on filtered results
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  }, [currentPage, assignments, searchQuery, sortOrder]);

  // Change page handler (only changes page if valid page number)
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={`card mx-auto ${styles.wideCard}`}>
      <div className="card mx-auto w-100" style={{ maxWidth: '1700px' }}>
        <div className="card-body">
          {/* Page title */}
          <h2 className={styles.stopTitle}>PRE-DISPATCH BUS OPERATION</h2>
          <h2 className="card-title mb-3">Bus Assignments</h2>

          {/* Search and Sort inputs */}
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

          {/* Description */}
          <p className="text-muted ms-1">Check buses that are not ready for dispatch</p>

          {/* Table wrapper with custom styles */}
          <div className={styles.styledTableWrapper}>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>Bus</th>
                  <th>Driver</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedAssignments.length > 0 ? (
                  // Render rows for each displayed assignment
                  displayedAssignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td>{assignment.bus}</td>
                      <td>{assignment.driver}</td>
                      <td className="text-center">
                        {/* Edit button with icon */}
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
                  // Show message if no records found
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
                {/* Previous page button */}
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

                {/* Next page button */}
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
