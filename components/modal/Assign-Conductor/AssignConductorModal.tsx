'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import DropdownButton from '../../ui/DropdownButton';
import { fetchConductorsWithToken } from '@/lib/apiCalls/external';
import { Conductor } from "@/app/interface";
import Loading from "@/components/ui/Loading/Loading";
import styles from "./assign-conductor.module.css";

const AssignConductorModal = ({ 
  onClose,
  onAssign, 
}: { 
  onClose: () => void;
  onAssign: (conductor: Conductor) => void; 
}) => {

  const [conductors, setConductors] = useState<Conductor[]>([]);
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
    const loadConductors = async () => {
      setLoading(true);
      try {
        const conductors = await fetchConductorsWithToken();
        setConductors(conductors);
        setFilteredConductors(conductors);
      } catch (error) {
        console.error('Error fetching conductors from API:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConductors();
  }, []);

  useEffect(() => {
    // @ts-expect-error: bootstrap has no type declarations
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const [filteredConductors, setFilteredConductors] = useState(conductors);
  const [searchTerm, setSearchTerm] = useState('');

  const dropdownItems = [
    {
      name: 'All',
      action: () => {
        setFilteredConductors(conductors);
      },
    },
    {
      name: 'Alphabetical',
      action: () => {
        const sorted = [...filteredConductors].sort((a, b) => a.name.localeCompare(b.name));
        setFilteredConductors(sorted);
      },
    },
  ];
  
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Assign Conductor</h2>
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
                placeholder="Search Conductor"
                value={searchTerm}
                onChange={(e) => {
                  const text = e.target.value;
                  setSearchTerm(text);
                  const filtered = conductors.filter((conductor) =>
                    conductor.name.toLowerCase().includes(text.toLowerCase()) ||
                    conductor.contactNo.toLowerCase().includes(text.toLowerCase()) ||
                    conductor.address.toLowerCase().includes(text.toLowerCase())
                  );
                  setFilteredConductors(filtered);
                }}
              />
              <div className={styles.filterSection}>
                <label className={styles.label}>Filter by:</label>
                <DropdownButton dropdownItems={dropdownItems} />
              </div>
            </div>
          </div>

          {/* Available Conductors Section */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Available Conductors ({filteredConductors.length})</h4>
            <div className={styles.conductorListContainer}>
              {loading ? (
                <div className={styles.loadingContainer}>
                  <Loading />
                </div>
              ) : filteredConductors.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>No conductors found matching your criteria.</p>
                </div>
              ) : (
                filteredConductors.map((conductor, index) => (
                  <div
                    key={index}
                    className={styles.conductorCard}
                  >
                    <div className={styles.conductorInfo}>
                      <div className={styles.conductorImageContainer}>
                        <Image
                          src={conductor.image || '/assets/images/conductor.png'}
                          alt="Conductor"
                          className={styles.conductorImage}
                          fill
                        />
                      </div>
                      <div className={styles.conductorDetails}>
                        <div className={styles.conductorName}>
                          {conductor.name || "No Name"}
                          <span className={styles.conductorJob}>{conductor.job}</span>
                        </div>
                        <div className={styles.conductorContact}>{conductor.contactNo}</div>
                        <div className={styles.conductorAddress}>{conductor.address}</div>
                      </div>
                    </div>
                    <Button 
                      text="Assign" 
                      onClick={() => onAssign(conductor)}
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

export default AssignConductorModal;