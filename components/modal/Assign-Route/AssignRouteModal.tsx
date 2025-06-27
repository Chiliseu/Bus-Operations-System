'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import DropdownButton from '@/components/ui/DropdownButton';
import { Route } from '@/app/interface';
import { fetchRoutesModalWithToken } from '@/lib/apiCalls/route';
import Loading from "@/components/ui/Loading/Loading";
import styles from "./assign-route.module.css";

const AssignRouteModal = ({ 
  onClose,
  onAssign, 
}: { 
  onClose: () => void;
  onAssign: (route: Route) => void; 
}) => {

  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  // TIME CHECK
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleString('en-US', { hour12: true })
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('en-US', { hour12: true }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadRoutes = async () => {
      setLoading(true);
      try {
        const routes = await fetchRoutesModalWithToken();
        setRoutes(routes);
        setFilteredRoutes(routes);
      } catch (error) {
        console.error('Error fetching routes from API:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRoutes();
  }, []);

  useEffect(() => {
    // @ts-expect-error: bootstrap has no type declarations
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const [filteredRoutes, setFilteredRoutes] = useState(routes);
  const [searchTerm, setSearchTerm] = useState('');

  const dropdownItems = [
    {
      name: 'All',
      action: () => {
        setFilteredRoutes(routes);
      },
    },
    {
      name: 'Alphabetical',
      action: () => {
        const sorted = [...filteredRoutes].sort((a, b) => a.RouteName.localeCompare(b.RouteName));
        setFilteredRoutes(sorted);
      },
    },
  ];
  
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Assign Route</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className={styles.body}>
          {/* Search Section */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Search & Filter</h4>
            <div className={styles.searchContainer}>
              <SearchBar
                placeholder="Search Route"
                value={searchTerm}
                onChange={(e) => {
                  const text = e.target.value;
                  setSearchTerm(text);
                  const filtered = routes.filter((route) =>
                    route.RouteName.toLowerCase().includes(text.toLowerCase()) ||
                    route.StartStop?.StopName.toLowerCase().includes(text.toLowerCase()) ||
                    route.EndStop?.StopName.toLowerCase().includes(text.toLowerCase())
                  );
                  setFilteredRoutes(filtered);
                }}
              />
              <div className={styles.filterSection}>
                <label className={styles.label}>Filter by:</label>
                <DropdownButton dropdownItems={dropdownItems} />
              </div>
            </div>
          </div>

          {/* Available Routes Section */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Available Routes ({filteredRoutes.length})</h4>
            <div className={styles.routeListContainer}>
              {loading ? (
                <div className={styles.loadingContainer}>
                  <Loading />
                </div>
              ) : filteredRoutes.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>No routes found matching your criteria.</p>
                </div>
              ) : (
                filteredRoutes.map((route, index) => (
                  <div
                    key={index}
                    className={styles.routeCard}
                  >
                    <div className={styles.routeInfo}>
                      <div className={styles.routeImageContainer}>
                        <Image
                          src="/assets/images/route.png"
                          alt="Route"
                          className={styles.routeImage}
                          fill
                        />
                      </div>
                      <div className={styles.routeDetails}>
                        <div className={styles.routeName}>
                          {route.RouteName || "No Name"}
                        </div>
                        <div className={styles.routeStart}>Start: {route.StartStop?.StopName}</div>
                        <div className={styles.routeEnd}>End: {route.EndStop?.StopName}</div>
                      </div>
                    </div>
                    <Button 
                      text="Assign" 
                      onClick={() => onAssign(route)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className={`${styles.footer} d-flex justify-content-between align-items-center`}>
          <small className="text-muted">
            {currentTime}
          </small>
        </div>
      </div>
    </div>
  );
};

export default AssignRouteModal;