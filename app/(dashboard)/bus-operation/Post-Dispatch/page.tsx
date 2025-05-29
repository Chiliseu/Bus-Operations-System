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
  // State for current page number in pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State to hold all assignments
  const [assignments, setAssignments] = useState<BusAssignment[]>([]);
  // State for assignments displayed on current page after filtering and sorting
  const [displayedAssignments, setDisplayedAssignments] = useState<BusAssignment[]>([]);
  // State for total number of pages available based on filtered data
  const [totalPages, setTotalPages] = useState(1);
  // State to store search input query
  const [searchQuery, setSearchQuery] = useState('');
  // State to store current sorting order
  const [sortOrder, setSortOrder] = useState('');

  // On component mount, initialize assignments with sample data
  useEffect(() => {
    setAssignments(sampleAssignments);
  }, []);

  // Effect to filter, sort and paginate assignments when dependencies change
  useEffect(() => {
    let filtered = [...assignments];

    // Filter assignments based on search query for bus or driver (case-insensitive)
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.bus.toLowerCase().includes(lower) ||
          a.driver.toLowerCase().includes(lower)
      );
    }

    // Sort filtered assignments according to selected sort order
    if (sortOrder === 'Bus A-Z') {
      filtered.sort((a, b) => a.bus.localeCompare(b.bus));
    } else if (sortOrder === 'Bus Z-A') {
      filtered.sort((a, b) => b.bus.localeCompare(a.bus));
    } else if (sortOrder === 'Driver A-Z') {
      filtered.sort((a, b) => a.driver.localeCompare(b.driver));
    } else if (sortOrder === 'Driver Z-A') {
      filtered.sort((a, b) => b.driver.localeCompare(a.driver));
    }

    // Calculate start and end index for current page slice
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    // Set displayed assignments for current page
    setDisplayedAssignments(filtered.slice(startIndex, endIndex));
    // Calculate total pages based on filtered length
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  }, [currentPage, assignments, searchQuery, sortOrder]);

  // Handler to change page, ensures page is within valid range
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    // Outer card container with styling
    <div className={`card mx-auto ${styles.wideCard}`}>
      <div className="card mx-auto w-100" style={{ maxWidth: '1700px' }}>
        <div className="card-body">
          
          {/* Header titles */}
          <h2 className={styles.stopTitle}>POST-DISPATCH BUS OPERATION</h2>
          <h2 className="card-title mb-3">Bus Assignments</h2>

          {/* Row containing search input and sort dropdown */}
          <div className="row g-2 mb-3">
            <div className="col-md-4">
              {/* Search input box */}
              <input
                type="text"
                className="form-control"
                placeholder="Search by bus or driver..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              {/* Sort order select dropdown */}
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

          {/* Description text */}
          <p className="text-muted ms-1">Review operations and record Sales Entry.</p>

          {/* Wrapper for styled table */}
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
                {/* Display table rows if assignments exist, else show no records */}
                {displayedAssignments.length > 0 ? (
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
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination controls shown only if there are assignments */}
          {displayedAssignments.length > 0 && (
            <nav>
              <ul className="pagination justify-content-center mt-3">
                {/* Previous page button, disabled on first page */}
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

                {/* Next page button, disabled on last page */}
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
