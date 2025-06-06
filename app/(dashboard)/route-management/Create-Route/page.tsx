'use client';

import React, { useState, useEffect } from 'react';
import cuid from 'cuid'; // Install cuid if not already installed: npm install cuid
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './route-management.module.css';
import AssignStopsModal from '@/components/modal/Assign-Stop/AssignStopsModal';
import AssignBusModal from '@/components/modal/Assign-Bus/AssignBusModal';
import AddRouteModal from "@/components/modal/Add-Route/AddRouteModal";
import { Stop, Route } from '@/app/interface'; //Importing the Stop interface
import Image from 'next/image';
import PaginationComponent from '@/components/ui/PaginationV2';
import EditRouteModal from '@/components/modal/Edit-Route/EditRouteModal';
import Swal from 'sweetalert2';

import '@/styles/globals.css';
import { fetchRoutesWithToken, createRouteWithToken, deleteRouteWithToken, updateRouteWithToken } from '@/lib/apiCalls/route';

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';

const CreateRoutePage: React.FC = () => {
  const [displayedroutes, setDisplayedRoutes] = useState<Route[]>([]);
  const [editingRouteID, setEditingRouteID] = useState<string | null>(null); // Track the route being edited
  const [routes, setRoutes] = useState<Route[]>([]); // All routes
  const [routeName, setRouteName] = useState('');
  const [startStopID, setStartStopID] = useState<string | null>(null); // Track StartStopID
  const [endStopID, setEndStopID] = useState<string | null>(null); // Track EndStopID
  const [startStop, setStartStop] = useState('');
  const [endStop, setEndStop] = useState('');
  const [stopsBetween, setStopsBetween] = useState<Stop[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for Search Query
  const [sortOrder, setSortOrder] = useState(''); // State for sorting order
  const [loading, setLoading] = useState(false); // Track loading state

  // Use State for modal
  const [showStopsModal, setShowStopsModal] = useState(false);
  const [showAssignBusModal, setShowAssignBusModal] = useState(false);
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);
  const [showEditRouteModal, setShowEditRouteModal] = useState(false);
  const [routeToEdit, setRouteToEdit] = useState<Route | null>(null);
  const [editRouteName, setEditRouteName] = useState('');
  const [editStartStop, setEditStartStop] = useState('');
  const [editEndStop, setEditEndStop] = useState('');
  const [editStopsBetween, setEditStopsBetween] = useState<Stop[]>([]);
  const [editSelectedStartStop, setEditSelectedStartStop] = useState<Stop | null>(null);
  const [editSelectedEndStop, setEditSelectedEndStop] = useState<Stop | null>(null);

  // Current record
  const [selectedStartStop, setSelectedStartStop] = useState<Stop | null>(null);
  const [selectedEndStop, setSelectedEndStop] = useState<Stop | null>(null);
  const [selectedStopBetween, setSelectedStopBetween] = useState<Stop | null>(null);
  const [stopType, setStopType] = useState<'start' | 'end' | 'between' | null>(null);
  const [selectedStopIndex, setSelectedStopIndex] = useState<number | null>(null); // for between stops

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const totalPages = Math.ceil(displayedroutes.length / pageSize);
  const currentRoutes = displayedroutes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  // const TotalPages = Math.ceil(displayedroutes.length / ITEMS_PER_PAGE);
  // const currentRoutes = displayedroutes.slice(
  //   (currentPage - 1) * ITEMS_PER_PAGE,
  //   currentPage * ITEMS_PER_PAGE
  // );
  // const handlePageChange = (page: number) => {
  //   if (page >= 1 && page <= TotalPages) {
  //     setCurrentPage(page);
  //   }
  // };

  // Fetch routes from the backend
  const fetchRoutes = async () => {
    setLoading(true); // Start loading
    try {
      const data = await fetchRoutesWithToken(); // Call the new function
      setRoutes(data);
    } catch (error) {
      console.error('Error fetching routes:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch routes when the component mounts
  useEffect(() => {
    fetchRoutes();
  }, []);

  // Update displayed routes whenever the current page, search query, or sort order changes
  useEffect(() => {
    const sortedRoutes = [...routes];

    if (sortOrder === 'A-Z') {
      sortedRoutes.sort((a, b) => a.RouteName.localeCompare(b.RouteName));
    } else if (sortOrder === 'Z-A') {
      sortedRoutes.sort((a, b) => b.RouteName.localeCompare(a.RouteName));
    }

    const filteredRoutes = sortedRoutes.filter((route) =>
      route.RouteName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.StartStop?.StopName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.EndStop?.StopName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setDisplayedRoutes(filteredRoutes);

    // Reset currentPage if out of range
    const totalPages = Math.ceil(filteredRoutes.length / pageSize);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [routes, searchQuery, sortOrder, pageSize]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(stopsBetween);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    setStopsBetween(reordered);
  };

  const handleAddStop = () => {
    setStopsBetween([...stopsBetween, { 
          StopID: '',
          StopName: '',
          IsDeleted: false,
          latitude: '',
          longitude: ''
     }]);
  };

  const handleRemoveStop = (index: number) => {
    setStopsBetween(stopsBetween.filter((_, i) => i !== index));
  };

  const handleStopChange = (value: string, index: number) => {
    const updatedStops = [...stopsBetween];
    updatedStops[index] = { ...updatedStops[index], StopName: value }; // Update only the StopName
    setStopsBetween(updatedStops);
  };

  const handleEditRoute = (route: Route) => {
    setRouteToEdit(route);
    setEditRouteName(route.RouteName || '');
    setEditStartStop(route.StartStop?.StopName || '');
    setEditEndStop(route.EndStop?.StopName || '');
    setStartStopID(route.StartStop?.StopID || null);
    setEndStopID(route.EndStop?.StopID || null);
    setEditSelectedStartStop(route.StartStop || null);
    setEditSelectedEndStop(route.EndStop || null);
    setEditStopsBetween(
    route.RouteStops
      ? route.RouteStops
          .filter(rs => rs.Stop && rs.Stop.StopID)
          .map(rs => ({
            StopID: rs.Stop.StopID,
            StopName: rs.Stop.StopName || '',
            IsDeleted: rs.Stop.IsDeleted ?? false,
            latitude: rs.Stop.latitude ?? '',
            longitude: rs.Stop.longitude ?? ''
          }))
      : []
  );
    setShowEditRouteModal(true);
  };

  const handleAddRoute = async () => {
    if (!routeName || !selectedStartStop || !selectedEndStop) {
         await Swal.fire({
            icon: 'warning',
            title: 'Incomplete Fields',
            text: 'Please fill in all required fields.',
          });
      return;
    }

    const routeStops = stopsBetween.map((stop, index) => ({
      StopID: stop.StopID,
      StopOrder: index + 1,
    }));

    const newRoute = {
      RouteName: routeName,
      StartStopID: selectedStartStop.StopID,
      EndStopID: selectedEndStop.StopID,
      RouteStops: routeStops,
    };


    try {
      await createRouteWithToken(newRoute);
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Route added successfully!',
        });
      setRouteName('');
      setStartStop('');
      setEndStop('');
      setStopsBetween([]);
      fetchRoutes();
    } catch (error) {
      console.error('Error adding route:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error instanceof Error ? error.message : 'Failed to add route. Please try again.',
      });
    }
  };

  const handleDeleteRoute = async (routeID: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this route?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

  if (!result.isConfirmed) return;

    try {
      await deleteRouteWithToken(routeID);
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Route deleted successfully!',
        });
      fetchRoutes(); // Refresh the route list
    } catch (error) {
      console.error('Error deleting route:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error instanceof Error ? error.message : 'Failed to delete route. Please try again.',
      });
    }
  };

  const handleSaveEditedRoute = async () => {
  if (!routeToEdit || !editRouteName || !startStopID || !endStopID) {
      await Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    // Prepare stopsBetween array for the payload
    const routeStops = editStopsBetween.map((stop, index) => ({
      StopID: stop.StopID,
      StopOrder: index + 1,
    }));

    const updatedRoute = {
      RouteID: routeToEdit.RouteID,
      RouteName: editRouteName,
      StartStopID: startStopID,
      EndStopID: endStopID,
      RouteStops: routeStops,
    };

    try {
      await updateRouteWithToken(updatedRoute); // Your API call to update route
       await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Route updated successfully!',
      });

      // Refresh the routes list after update
      fetchRoutes();

      // Close modal and reset
      setShowEditRouteModal(false);
      setRouteToEdit(null);
      setEditRouteName('');
      setStartStopID(null);
      setEndStopID(null);
      setEditStopsBetween([]);
    } catch (error) {
      console.error('Error updating route:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error instanceof Error ? error.message : 'Failed to update route. Please try again.',
      });
    }
  };

  const handleSaveRoute = async () => {
    if (!routeName || !startStop || !endStop) {
      await Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all fields with valid values.',
      });
      return;
    }

    // Prepare the RouteStops array with StopID and StopOrder
    const routeStops = stopsBetween.map((stop, index) => ({
      StopID: stop.StopID, 
      StopOrder: index + 1, 
    }));
    
    const updatedRoute = {
      RouteID: editingRouteID, // Ensure this matches the backend's expected field name
      RouteName: routeName,
      StartStopID: startStopID, // Send StartStopID
      EndStopID: endStopID, // Send EndStopID
      RouteStops: routeStops, // Send RouteStops
    };

    console.log('Request body:', updatedRoute); // Debugging

      try {
        const response = await fetch(`/api/route-management/${editingRouteID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRoute),
        });

      if (!response.ok) {
        // Try to get error message from response JSON
        let errorMsg = `Failed to update route: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMsg = errorData.error;
          }
        } catch {
          // ignore JSON parsing errors, fallback to statusText
        }
        throw new Error(errorMsg);
      }

        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Route updated successfully!',
        });
      setEditingRouteID(null);
      handleClear();
      fetchRoutes();
    } catch (error) {
      console.error('Error updating route:', error);
      // Safe error message extraction
      const message = error instanceof Error ? error.message : 'Failed to update route. Please try again.';
        await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
      });
    }
  };
  
  const handleClear = () => {
    setRouteName('');
    setStartStop('');
    setEndStop('');
    setStopsBetween([]);
    setSelectedStartStop(null);
    setSelectedEndStop(null);
    setSelectedStopBetween(null);
    setStopType(null);
    setSelectedStopIndex(null);
  };

  return (
    <div className={styles.wideCard}>
      <div className={styles.cardBody}>
        {/* Title */}
        <h2 className={styles.stopTitle}>Create Route</h2>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <i className="ri-search-2-line"></i>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <select
            className={styles.sortSelect}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="A-Z">Name: A-Z</option>
            <option value="Z-A">Name: Z-A</option>
          </select>

          <button
            className={styles.addButton}
            onClick={() => setShowAddRouteModal(true)}
          >
            <Image src="/assets/images/add-line.png" alt="Add" width={20} height={20} />
            Add Route
          </button>

          <AddRouteModal
            show={showAddRouteModal}
            onClose={() => setShowAddRouteModal(false)}
            onCreate={handleAddRoute}
            routeName={routeName}
            setRouteName={setRouteName}
            startStop={startStop}
            setStartStop={setStartStop}
            endStop={endStop}
            setEndStop={setEndStop}
            stopsBetween={stopsBetween}
            setStopsBetween={setStopsBetween}
            onStartStopClick={() => {
              setStopType('start');
              setShowStopsModal(true);
            }}
            onEndStopClick={() => {
              setStopType('end');
              setShowStopsModal(true);
            }}
            onBetweenStopClick={(idx) => {
              setStopType('between');
              setSelectedStopIndex(idx);
              setShowStopsModal(true);
            }}
          />
        </div>

        {/* Loading or Table */}
        {loading ? (
          <div className="text-center my-4">
            <img src="/loadingbus.gif" alt="Loading..." className="mx-auto w-24 h-24" />
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeadRow}>
                <th>Route Name</th>
                <th>Start Stop</th>
                <th>End Stop</th>
                <th>No. of Stops Between</th>
                <th className={styles.actions}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedroutes.length > 0 ? (
                currentRoutes.map((route) => (
                  <tr key={route.RouteID} className={styles.tableRow}>
                    <td>{route.RouteName}</td>
                    <td>{route.StartStop?.StopName}</td>
                    <td>{route.EndStop?.StopName}</td>
                    <td>{route.RouteStops?.length ?? 0}</td>
                    <td className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEditRoute(route)}
                      >
                        <Image
                          src="/assets/images/edit-white.png"
                          alt="Edit"
                          width={25}
                          height={25}
                        />
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteRoute(route.RouteID)}
                      >
                        <Image
                          src="/assets/images/delete-white.png"
                          alt="Delete"
                          width={25}
                          height={25}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className={styles.noRecords}>
                    No routes found.
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

        {/* Modals */}
        {showStopsModal && (
          <AssignStopsModal
            onClose={() => setShowStopsModal(false)}
            onAssign={(stop) => {
              if (showEditRouteModal) {
                if (stopType === 'start') {
                  setEditStartStop(stop.StopName);
                  setEditSelectedStartStop(stop);
                  setStartStopID(stop.StopID);
                } else if (stopType === 'end') {
                  setEditEndStop(stop.StopName);
                  setEditSelectedEndStop(stop);
                  setEndStopID(stop.StopID);
                } else if (stopType === 'between' && selectedStopIndex !== null) {
                  const updatedStops = [...editStopsBetween];
                  updatedStops[selectedStopIndex] = {
                    StopID: stop.StopID,
                    StopName: stop.StopName,
                    IsDeleted: false,
                    latitude: '',
                    longitude: '',
                  };
                  setEditStopsBetween(updatedStops);
                }
              } else {
                if (stopType === 'start') {
                  setStartStop(stop.StopName);
                  setStartStopID(stop.StopID);
                  setSelectedStartStop(stop);
                } else if (stopType === 'end') {
                  setEndStop(stop.StopName);
                  setEndStopID(stop.StopID);
                  setSelectedEndStop(stop);
                } else if (stopType === 'between' && selectedStopIndex !== null) {
                  const updatedStops = [...stopsBetween];
                  updatedStops[selectedStopIndex] = {
                    StopID: stop.StopID,
                    StopName: stop.StopName,
                    IsDeleted: false,
                    latitude: '',
                    longitude: '',
                  };
                  setStopsBetween(updatedStops);
                }
              }
              setStopType(null);
              setSelectedStopIndex(null);
              setShowStopsModal(false);
            }}
          />
        )}

        {showAssignBusModal && (
          <AssignBusModal
            onClose={() => setShowAssignBusModal(false)}
            onAssign={async (bus) => {
              await Swal.fire({
                icon: 'success',
                title: 'Bus Assigned',
                text: `Assigned Bus: ${bus.busId}`,
              });
              setShowAssignBusModal(false);
            }}
          />
        )}

        <EditRouteModal
          show={showEditRouteModal}
          onClose={() => setShowEditRouteModal(false)}
          route={routeToEdit}
          routeName={editRouteName}
          setRouteName={setEditRouteName}
          startStop={editStartStop}
          setStartStop={setEditStartStop}
          endStop={editEndStop}
          setEndStop={setEditEndStop}
          stopsBetween={editStopsBetween}
          setStopsBetween={setEditStopsBetween}
          onSave={handleSaveEditedRoute}
          onStartStopClick={() => {
            setStopType('start');
            setShowStopsModal(true);
          }}
          onEndStopClick={() => {
            setStopType('end');
            setShowStopsModal(true);
          }}
          onBetweenStopClick={(idx) => {
            setStopType('between');
            setSelectedStopIndex(idx);
            setShowStopsModal(true);
          }}
        />
      </div>
    </div>
  );

};

export default CreateRoutePage;

