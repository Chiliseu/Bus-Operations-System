'use client';

import React, { useState, useEffect } from 'react';
import '@/styles/globals.css';
import styles from './route-management.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AssignStopsModal from '@/components/modal/Assign-Stop/AssignStopsModal';
import AssignBusModal from '@/components/modal/Assign-Bus/AssignBusModal';
import AddRouteModal from "@/components/modal/Add-Route/AddRouteModal";
import EditRouteModal from '@/components/modal/Edit-Route/EditRouteModal';
import { Stop, Route } from '@/app/interface'; //Importing the Stop interface
import { fetchRoutesWithToken, createRouteWithToken, deleteRouteWithToken, updateRouteWithToken } from '@/lib/apiCalls/route';

// --- Shared imports ---
import { Loading, FilterDropdown, PaginationComponent, Swal, Image, LoadingModal } from '@/shared/imports';
import type { FilterSection } from '@/shared/imports';

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
  const [modalLoading, setModalLoading] = useState(false);

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
  const [stopType, setStopType] = useState<'start' | 'end' | 'between' | null>(null);
  const [selectedStopIndex, setSelectedStopIndex] = useState<number | null>(null); // for between stops

  // FilterDropdown sections for sorting
  const filterSections: FilterSection[] = [
    {
      id: "sortBy",
      title: "Sort By",
      type: "radio",
      options: [
        { id: "route_az", label: "Route Name: A-Z" },
        { id: "route_za", label: "Route Name: Z-A" },
        { id: "start_az", label: "Start Stop: A-Z" },
        { id: "start_za", label: "Start Stop: Z-A" },
        { id: "end_az", label: "End Stop: A-Z" },
        { id: "end_za", label: "End Stop: Z-A" },
        { id: "stops_low", label: "Stops Between: Lowest to Highest" },
        { id: "stops_high", label: "Stops Between: Highest to Lowest" },
      ],
      defaultValue: "route_az"
    }
  ];

  // --- FilterDropdown sort handler ---
  const handleApplyFilters = (filterValues: Record<string, any>) => {
    setSortOrder(filterValues.sortBy);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const totalPages = Math.ceil(displayedroutes.length / pageSize);
  const currentRoutes = displayedroutes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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

    switch (sortOrder) {
      case "route_az":
        sortedRoutes.sort((a, b) => (a.RouteName || '').localeCompare(b.RouteName || ''));
        break;
      case "route_za":
        sortedRoutes.sort((a, b) => (b.RouteName || '').localeCompare(a.RouteName || ''));
        break;
      case "start_az":
        sortedRoutes.sort((a, b) => (a.StartStop?.StopName || '').localeCompare(b.StartStop?.StopName || ''));
        break;
      case "start_za":
        sortedRoutes.sort((a, b) => (b.StartStop?.StopName || '').localeCompare(a.StartStop?.StopName || ''));
        break;
      case "end_az":
        sortedRoutes.sort((a, b) => (a.EndStop?.StopName || '').localeCompare(b.EndStop?.StopName || ''));
        break;
      case "end_za":
        sortedRoutes.sort((a, b) => (b.EndStop?.StopName || '').localeCompare(a.EndStop?.StopName || ''));
        break;
      case "stops_low":
        sortedRoutes.sort((a, b) => (a.RouteStops?.length ?? 0) - (b.RouteStops?.length ?? 0));
        break;
      case "stops_high":
        sortedRoutes.sort((a, b) => (b.RouteStops?.length ?? 0) - (a.RouteStops?.length ?? 0));
        break;
      default:
        // Default to Route Name A-Z
        sortedRoutes.sort((a, b) => (a.RouteName || '').localeCompare(b.RouteName || ''));
        break;
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
      setModalLoading(true);
      await createRouteWithToken(newRoute);
      setModalLoading(false);
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
      setModalLoading(false);
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
      setModalLoading(true);
      await deleteRouteWithToken(routeID);
      setModalLoading(false);
      await Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Route deleted successfully!',
      });
      fetchRoutes(); // Refresh the route list
    } catch (error) {
      setModalLoading(false);
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
      setModalLoading(true);
      await updateRouteWithToken(updatedRoute); // Your API call to update route
      setModalLoading(false);
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
      setModalLoading(false);
      console.error('Error updating route:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error instanceof Error ? error.message : 'Failed to update route. Please try again.',
      });
    }
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

          {/* FilterDropdown for sorting */}
            <FilterDropdown
              sections={filterSections}
              onApply={handleApplyFilters}
          />

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

        {/* Loading */}
          {loading ? (
            <Loading />
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

        {modalLoading && <LoadingModal />}
      </div>
    </div>
  );

};

export default CreateRoutePage;

