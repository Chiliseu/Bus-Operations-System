'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './route-management.module.css';
import '../../../../styles/globals.css';
import { Stop } from '@/app/interface'; // Importing the Stop interface
import Image from 'next/image';
import PrintTable from '@/components/printtable/PrintTable'; // Importing the PrintTable component
import AddStopModal from "@/components/modal/AddStopModal";
import EditStopModal from '@/components/modal/EditStopModal';
import Pagination from '@/components/ui/Pagination';

const RouteManagementPage: React.FC = () => {
  const [stops, setStops] = useState<Stop[]>([]); // All stops
  const [displayedStops, setDisplayedStops] = useState<Stop[]>([]); // Stops for the current page
  const [searchQuery, setSearchQuery] = useState(''); // State for Search Query
  const [sortOrder, setSortOrder] = useState(''); // State for sorting order
  const [loading, setLoading] = useState(false); // Track loading state
  const [showAddStopModal, setShowAddStopModal] = useState(false);// Shows Add Stop Modal

  // For editing stops
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);

  // Pagination states
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10; // Number of items per page
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
  
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
  
    setDisplayedStops(filteredStops.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filteredStops.length / ITEMS_PER_PAGE)); // Update total pages based on filtered stops
  
    // Reset currentPage to 1 if the search query changes
    if (currentPage > Math.ceil(filteredStops.length / ITEMS_PER_PAGE)) {
      setCurrentPage(1);
    }
  }, [currentPage, stops, searchQuery, sortOrder]);

  const fetchStops = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch('/api/stops');
      if (!response.ok) {
        throw new Error(`Failed to fetch assignments: ${response.statusText}`);
      }
      const data = await response.json();
      setStops(data); // Update the full stops list
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setLoading(false); // Stop loading
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

    console.log(stop.name, stop.longitude, stop.latitude); // Debugging
    const newStop = {
      StopName: stop.name,
      longitude: stop.longitude,
      latitude: stop.latitude
    };

    try {
      const response = await fetch('/api/stops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStop),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', errorText);
        throw new Error('Failed to add stop');
      }

      alert('Stop added successfully!');
      fetchStops(); // Refresh the stops list
      setShowAddStopModal(false); // Close the modal
      return true;
    } catch (error) {
      console.error('Error adding stop:', error);
      alert('Failed to add stop. Please try again.');
      setShowAddStopModal(false); // Close the modal
      return false;
    } finally {
      setShowAddStopModal(false); // Close the modal
      return false;
    }
  };

  const handleSave = async (editedStop: { id: string; name: string; latitude: string; longitude: string }) => {
    if (!editedStop.name || !editedStop.latitude || !editedStop.longitude) {
      alert('Please fill in all fields with valid values.');
      return false;
    }

    const updatedStop = {
      StopName: editedStop.name,
      latitude: editedStop.latitude,
      longitude: editedStop.longitude,
    };

    try {
      const response = await fetch(`/api/stops/${editedStop.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStop),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed to update stop: ${response.statusText}`);
      }

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
      const response = await fetch(`/api/stops/${stopID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDeleted: true }),  // send only isDeleted in body
      });

      if (!response.ok) throw new Error(`Failed to delete stop: ${response.statusText}`);

      alert('Stop deleted successfully!');
      fetchStops(); // Refresh the stops list
    } catch (error) {
      console.error('Error deleting stop:', error);
      alert('Failed to delete stop. Please try again.');
    }

  }

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
          data={displayedStops}
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
          
          {/* Create Stop Section
          <h2 className={styles.stopTitle}>
            {isEditMode ? 'EDIT STOP' : 'CREATE STOP'}
          </h2>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <input type="text"className="form-control" placeholder="Stop Name" value={stopName}
                onChange={(e) => setStopName(e.target.value)}/>
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Longitude" value={longitude}
                onChange={(e) => setLongitude(e.target.value)}/>
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Latitude" value={latitude}
                onChange={(e) => setLatitude(e.target.value)}/>
            </div>
          </div> */}

          {/* Stops Table Section */}
          <h2 className="card-title mb-3">Stops</h2>
          <div className="row g-2 align-items-center mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery} // Bind to searchQuery state
                onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={sortOrder} // Bind to sortOrder state
                onChange={(e) => setSortOrder(e.target.value)} // Update sortOrder state
              >
                <option value="A-Z">Name: A-Z</option>
                <option value="Z-A">Name: Z-A</option>
              </select>
            </div>
            <div className="col-md-5 text-end">

              {/* Shows Add button as default, shows save button when edit mode */}
              <div>
                <button className="btn btn-success me-2" onClick={() => setShowAddStopModal(true)}>
                  <Image src="/assets/images/add-line.png" alt="Add" className="icon-small" width={20} height={20} />
                  Add
                </button>
                <AddStopModal
                  show={showAddStopModal}
                  onClose={() => setShowAddStopModal(false)}
                  onCreate={handleCreateStop}
                />
              </div>

              {/* <button className="btn btn-danger me-2" onClick={handlePrint}>
                <Image src="/assets/images/export.png" alt="Export" className="icon-small" width={20} height={20} />
                Print
              </button> */}
            </div>
          </div>
          
          {loading ? (
            // Render this when loading is true
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ):(
            <table className="table table-striped table-bordered custom-table">
            <thead>
              <tr>
                <th>Stop Name</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedStops.length > 0 ? (
                displayedStops.map((stop) => (
                  <tr key={stop.StopID}>
                    <td>{stop.StopName}</td>
                    <td>{stop.longitude}</td>
                    <td>{stop.latitude}</td>
                    <td className="text-center">
                      <div className="d-inline-flex align-items-center gap-1">
                        <button className="btn btn-sm btn-primary p-1" onClick={() => { setSelectedStop(stop); setShowEditModal(true); }}>
                          <Image
                            src="/assets/images/edit-white.png"
                            alt="Edit"
                            width={25}
                            height={25}
                          />
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
                          onSave={handleSave} // your function to update the stop
                        />
                        <button
                          className="btn btn-sm btn-danger p-1"
                          onClick={() => handleDelete(stop.StopID)} // Call the delete handler with the StopID
                        >
                          <Image
                            src="/assets/images/delete-white.png"
                            alt="Delete"
                            width={25}
                            height={25}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RouteManagementPage;
