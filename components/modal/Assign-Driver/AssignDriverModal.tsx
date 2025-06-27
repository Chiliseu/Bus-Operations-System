'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import DropdownButton from '../../ui/DropdownButton';
import { fetchDriversWithToken } from '@/lib/apiCalls/external';
import { Driver } from "@/app/interface";
import Loading from "@/components/ui/Loading/Loading";
import styles from "./assign-driver.module.css";

const AssignDriverModal = ({ 
  onClose,
  onAssign, 
}: { 
  onClose: () => void;
  onAssign: (driver: Driver) => void; 
}) => {

  const [drivers, setDrivers] = useState<Driver[]>([]);
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
    const loadDrivers = async () => {
      setLoading(true);
      try {
        const drivers = await fetchDriversWithToken();
        setDrivers(drivers);
        setFilteredDrivers(drivers);
      } catch (error) {
        console.error('Error fetching drivers from API:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDrivers();
  }, []);

  useEffect(() => {
    // @ts-expect-error: bootstrap has no type declarations
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const [filteredDrivers, setFilteredDrivers] = useState(drivers);
  const [searchTerm, setSearchTerm] = useState('');

  const dropdownItems = [
    {
      name: 'All',
      action: () => {
        setFilteredDrivers(drivers);
      },
    },
    {
      name: 'Alphabetical',
      action: () => {
        const sorted = [...filteredDrivers].sort((a, b) => a.name.localeCompare(b.name));
        setFilteredDrivers(sorted);
      },
    },
  ];
  
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Assign Driver</h2>
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
                placeholder="Search Driver"
                value={searchTerm}
                onChange={(e) => {
                  const text = e.target.value;
                  setSearchTerm(text);
                  const filtered = drivers.filter((driver) =>
                    driver.name.toLowerCase().includes(text.toLowerCase()) ||
                    driver.contactNo.toLowerCase().includes(text.toLowerCase()) ||
                    driver.address.toLowerCase().includes(text.toLowerCase())
                  );
                  setFilteredDrivers(filtered);
                }}
              />
              <div className={styles.filterSection}>
                <label className={styles.label}>Filter by:</label>
                <DropdownButton dropdownItems={dropdownItems} />
              </div>
            </div>
          </div>

          {/* Available Drivers Section */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Available Drivers ({filteredDrivers.length})</h4>
            <div className={styles.driverListContainer}>
              {loading ? (
                <div className={styles.loadingContainer}>
                  <Loading />
                </div>
              ) : filteredDrivers.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>No drivers found matching your criteria.</p>
                </div>
              ) : (
                filteredDrivers.map((driver, index) => (
                  <div
                    key={index}
                    className={styles.driverCard}
                  >
                    <div className={styles.driverInfo}>
                      <div className={styles.driverImageContainer}>
                        <Image
                          src={driver.image || '/assets/images/busdriver.png'}
                          alt="Driver"
                          className={styles.driverImage}
                          fill
                        />
                      </div>
                      <div className={styles.driverDetails}>
                        <div className={styles.driverName}>
                          {driver.name || "No Name"}
                          <span className={styles.driverJob}>{driver.job}</span>
                        </div>
                        <div className={styles.driverContact}>{driver.contactNo}</div>
                        <div className={styles.driverAddress}>{driver.address}</div>
                      </div>
                    </div>
                    <Button 
                      text="Assign" 
                      onClick={() => onAssign(driver)}
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

export default AssignDriverModal;