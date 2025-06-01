'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './route-management.module.css';
import '../../../../styles/globals.css';
import { Stop } from '@/app/interface'; // Importing the Stop interface
import Image from 'next/image';
import PrintTable from '@/components/printtable/PrintTable'; // Importing the PrintTable component
import AddStopModal from "@/components/modal/Add-Stop/AddStopModal";
import EditStopModal from '@/components/modal/Edit-Stop/EditStopModal';
import Pagination from '@/components/ui/Pagination';
import PaginationComponent from '@/components/ui/PaginationV2'; //Kay Brian na pagination
import { fetchStopsWithToken, createStopWithToken, updateStopWithToken, softDeleteStopWithToken } from '@/lib/apiCalls/stops';

const RouteManagementPage: React.FC = () => {
  const [stops, setStops] = useState<Stop[]>([]); // All stops
  const [displayedStops, setDisplayedStops] = useState<Stop[]>([]); // Stops for the current page
  const [searchQuery, setSearchQuery] = useState(''); // State for Search Query
  const [sortOrder, setSortOrder] = useState(''); // State for sorting order
  const [loading, setLoading] = useState(false); // Track loading state
  const [showAddStopModal, setShowAddStopModal] = useState(false);// Shows Add Stop Modal
  const [showRegularBusAssignmentModal, setShowRegularBusAssignmentModal] = useState(false);// Shows Add Stop Modal

  // For editing stops
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const totalPages = Math.ceil(displayedStops.length / pageSize);
  const currentStops = displayedStops.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Update displayed stops whenever the current page or search query changes
  useEffect(() => {
    const sortedStops = [...stops];

    // Sort stops based on the selected sortOrder
    if (sortOrder === 'A-Z') {
      sortedStops.sort((a, b) => a.StopName.localeCompare(b.StopName));
    } else if (sortOrder === 'Z-A') {
      sortedStops.sort((a, b) => b.StopName.localeCompare(a.StopName));
    }

    const filteredStops = sortedStops.filter((stop) =>
      stop.StopName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stop.longitude?.toString().includes(searchQuery) ||
      stop.latitude?.toString().includes(searchQuery)
    );

    setDisplayedStops(filteredStops); // <-- Store ALL filtered stops, not paginated

    // Reset currentPage to 1 if the search query or sort changes and currentPage is out of range
    const totalPages = Math.ceil(filteredStops.length / pageSize);
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [stops, searchQuery, sortOrder, pageSize]);

  const fetchStops = async () => {
    setLoading(true);
    try {
      const data = await fetchStopsWithToken();
      setStops(data);
    } catch (error) {
      console.error("Error fetching stops:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchStops();
  }, []);

 const handleCreateStop = async (stop: { name: string; latitude: string; longitude: string }) => {
    if (!stop.name || !stop.longitude || !stop.latitude) {
      alert('Please fill in all fields with valid values.');
      return false;
    }

    try {
      await createStopWithToken(stop);

      alert('Stop added successfully!');
      fetchStops(); // Refresh the stops list
      setShowAddStopModal(false); // Close the modal
      return true;
    } catch (error) {
      console.error('Error adding stop:', error);
      alert('Failed to add stop. Please try again.');
      setShowAddStopModal(false);
      return false;
    }
  };

    const handleSave = async (editedStop: { id: string; name: string; latitude: string; longitude: string }) => {
        if (!editedStop.name || !editedStop.latitude || !editedStop.longitude) {
          alert('Please fill in all fields with valid values.');
          return false;
        }

        try {
          await updateStopWithToken(editedStop);

          alert('Stop updated successfully!');
          fetchStops(); // Refresh the stops list
          setShowEditModal(false); // Close the modal
          setSelectedStop(null);   // Clear selection
          return true;
        } catch (error) {
          console.error('Error updating stop:', error);
          alert(error instanceof Error ? error.message : 'Failed to update stop. Please try again.');
          return false;
        }
      };

  const handleDelete = async (stopID: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this stop?');
    if (!confirmDelete) return;

    try {
      await softDeleteStopWithToken(stopID);

      alert('Stop deleted successfully!');
      fetchStops();
    } catch (error) {
      console.error('Error deleting stop:', error);
      alert('Failed to delete stop. Please try again.');
    }
  };

  const handlePrint = () => {
    const printContents = document.getElementById('print-section')?.innerHTML;
    if (!printContents) return;
    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) return;
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className={`card mx-auto ${styles.wideCard}`}>
      <div style={{ display: 'none' }}>
        <PrintTable
          title="Stop List"
          subtitle=""
          data={currentStops}
          filterInfo={`Search: ${searchQuery || 'None'} | Sort: ${sortOrder || 'None'}`}
          columns={[
            { header: 'Stop Name', accessor: (row) => row.StopName },
            { header: 'Longitude', accessor: (row) => row.longitude },
            { header: 'Latitude', accessor: (row) => row.latitude },
          ]}
        />
      </div>
      <div className="card mx-auto w-100" style={{ maxWidth: '1700px' }}>
        <div className="card-body">

            {/* Stops Table Section */}
            <h2 className={styles.stopTitle}>CREATE STOP</h2>

            {/* Search & Sort Inputs */}
            <div className="row g-2 align-items-center mb-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
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
                  <option value="A-Z">Name: A-Z</option>
                  <option value="Z-A">Name: Z-A</option>
                </select>
              </div>
              <div className="col-md-5 text-end">
                <button
                  className="btn btn-success"
                  onClick={() => setShowAddStopModal(true)}
                >
                  <Image
                    src="/assets/images/add-line.png"
                    alt="Add"
                    width={20}
                    height={20}
                  />
                  Add
                </button>
                <AddStopModal
                  show={showAddStopModal}
                  onClose={() => setShowAddStopModal(false)}
                  onCreate={handleCreateStop}
                />
              </div>
            </div>

              {/* Loading Spinner */}
              {loading ? (
                <div className="text-center my-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr className={styles.tableHeadRow}>
                      <th>Stop Name</th>
                      <th>Longitude</th>
                      <th>Latitude</th>
                      <th className={styles.actions}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStops.length > 0 ? (
                      currentStops.map((stop) => (
                        <tr key={stop.StopID} className={styles.tableRow}>
                          <td>{stop.StopName}</td>
                          <td>{stop.longitude}</td>
                          <td>{stop.latitude}</td>
                          <td className={styles.actions}>
                            <button
                              className={styles.editBtn}
                              onClick={() => {
                                setSelectedStop(stop);
                                setShowEditModal(true);
                              }}
                            >
                              <Image src="/assets/images/edit-white.png" alt="Edit" width={25} height={25} />
                            </button>
                            <EditStopModal
                              show={showEditModal}
                              onClose={() => setShowEditModal(false)}
                              stop={
                                selectedStop
                                  ? {
                                      id: selectedStop.StopID,
                                      name: selectedStop.StopName,
                                      latitude: selectedStop.latitude,
                                      longitude: selectedStop.longitude,
                                    }
                                  : null
                              }
                              onSave={handleSave}
                            />
                            <button
                              className={styles.deleteBtn}
                              onClick={() => handleDelete(stop.StopID)}
                            >
                              <Image src="/assets/images/delete-white.png" alt="Delete" width={25} height={25} />
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
              )}

              {/* Pagination */}
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
              />
        </div>
      </div>
    </div>
  );
};

export default RouteManagementPage;