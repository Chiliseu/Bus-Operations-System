'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import SearchBar from '@/components/ui/SearchBar';
import DropdownButton from '../../ui/DropdownButton';
import { fetchBusesWithToken } from '@/lib/apiCalls/external';
import { Bus } from "@/app/interface";
import Loading from "@/components/ui/Loading/Loading";
import styles from "./assign-bus-modal.module.css";

const AssignBusModal = ({ 
  onClose,
  onAssign, 
}: { 
  onClose: () => void;
  onAssign: (bus: Bus) => void; 
}) => {

  const [buses, setBuses] = useState<Bus[]>([]);
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
    const loadBuses = async () => {
      setLoading(true);
      try {
        const buses = await fetchBusesWithToken();
        setBuses(buses);
        setFilteredBuses(buses);
      } catch (error) {
        console.error('Error fetching buses from API:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBuses();
  }, []);

  useEffect(() => {
    // @ts-expect-error: bootstrap has no type declarations
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const [filteredBuses, setFilteredBuses] = useState(buses);
  const [searchTerm, setSearchTerm] = useState('');

  const dropdownItems = [
    {
      name: 'All',
      action: () => {
        setFilteredBuses(buses);
      },
    },
    {
      name: 'Alphabetical',
      action: () => {
        const sorted = [...filteredBuses].sort((a, b) => 
          (a.license_plate || '').localeCompare(b.license_plate || '')
        );
        setFilteredBuses(sorted);
      },
    },
    {
      name: 'Aircon',
      action: () => {
        const airconOnly = buses.filter(bus => bus.type === 'Aircon');
        setFilteredBuses(airconOnly);
      },
    },
    {
      name: 'Non-Aircon',
      action: () => {
        const nonAirconOnly = buses.filter(bus => bus.type === 'Non-Aircon');
        setFilteredBuses(nonAirconOnly);
      },
    },
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Assign Bus</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.body}>
          {/* Search Section */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Search & Filter</h4>
            <div className={styles.searchContainer}>
              <SearchBar
                placeholder="Search Bus"
                value={searchTerm}
                onChange={(e) => {
                  const text = e.target.value;
                  setSearchTerm(text);
                  const filtered = buses.filter((bus) =>
                    (bus.license_plate || '').toLowerCase().includes(text.toLowerCase()) ||
                    bus.type.toLowerCase().includes(text.toLowerCase())
                  );
                  setFilteredBuses(filtered);
                }}
              />
              <div className={styles.filterSection}>
                <label className={styles.label}>Filter by:</label>
                <DropdownButton dropdownItems={dropdownItems} />
              </div>
            </div>
          </div>

          {/* Available Buses Section */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Available Buses ({filteredBuses.length})</h4>
            <div className={styles.busListContainer}>
              {loading ? (
                <div className={styles.loadingContainer}>
                  <Loading />
                </div>
              ) : filteredBuses.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>No buses found matching your criteria.</p>
                </div>
              ) : (
                filteredBuses.map((bus, index) => (
                  <div
                    key={index}
                    className={styles.busCard}
                  >
                    <div className={styles.busInfo}>
                      <div className={styles.busImageContainer}>
                        <Image
                          src={bus.image || '/assets/images/bus-fallback.png'}
                          alt="Bus"
                          className={styles.busImage}
                          fill
                        />
                      </div>
                      <div className={styles.busDetails}>
                        <div className={styles.busId}>{bus.license_plate}</div>
                        <div className={styles.busType}>{bus.type}</div>
                        <div className={styles.busCapacity}>{`${bus.capacity} seats`}</div>
                      </div>
                    </div>
                    <Button 
                      text="Assign"
                      onClick={() => onAssign(bus)}
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
                     <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
        </div>
      </div>
    </div>
  );
};

export default AssignBusModal;