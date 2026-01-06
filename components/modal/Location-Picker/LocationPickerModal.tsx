import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import styles from "./location-picker.module.css";
import { BusLocation, CreateBusLocationDTO, UpdateBusLocationDTO } from "@/app/interface/bus-location";
import { fetchBusLocations, createBusLocation, updateBusLocation, deleteBusLocation } from "@/lib/apiCalls/bus-location";
import { MapPin, Plus, Edit2, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const LocationMapPicker = dynamic(() => import("@/components/ui/MapPicker"), { ssr: false });

interface LocationPickerModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (location: { name: string; latitude: string; longitude: string }) => Promise<boolean>;
  title?: string;
  selectButtonText?: string;
  initialName?: string;
  initialLat?: string;
  initialLng?: string;
  locationType?: 'pickup' | 'destination';
}

const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  show,
  onClose,
  onCreate,
  title = "Select Location",
  selectButtonText = "Set Location",
  initialName = "",
  initialLat = "",
  initialLng = "",
  locationType,
}) => {
  const [name, setName] = useState(initialName);
  const [latitude, setLatitude] = useState(initialLat);
  const [longitude, setLongitude] = useState(initialLng);
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleString('en-US', { hour12: true })
  );

  // Bus locations state
  const [busLocations, setBusLocations] = useState<BusLocation[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [loadingLocations, setLoadingLocations] = useState(false);

  // Show/hide map section
  const [showMapSection, setShowMapSection] = useState(false);

  // CRUD modal state
  const [showCrudModal, setShowCrudModal] = useState(false);
  const [crudMode, setCrudMode] = useState<'create' | 'edit'>('create');
  const [editingLocation, setEditingLocation] = useState<BusLocation | null>(null);
  const [crudForm, setCrudForm] = useState({
    name: '',
    latitude: '',
    longitude: '',
    type: 'both' as 'pickup' | 'destination' | 'both',
  });

  useEffect(() => {
    if (!show) return;
    setName(initialName);
    setLatitude(initialLat);
    setLongitude(initialLng);
    loadBusLocations();
  }, [show, initialName, initialLat, initialLng]);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('en-US', { hour12: true }));
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

  const loadBusLocations = async () => {
    setLoadingLocations(true);
    try {
      const locations = await fetchBusLocations();
      const filtered = locationType
        ? locations.filter(loc => loc.isActive && (loc.type === locationType || loc.type === 'both'))
        : locations.filter(loc => loc.isActive);
      setBusLocations(filtered);
    } catch (error) {
      console.error('Error loading bus locations:', error);
    } finally {
      setLoadingLocations(false);
    }
  };

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocationId(locationId);
    const location = busLocations.find(loc => loc.id === locationId);
    if (location) {
      setName(location.name);
      setLatitude(location.latitude.toString());
      setLongitude(location.longitude.toString());
    }
  };

  const handleOpenCrudModal = (mode: 'create' | 'edit', location?: BusLocation) => {
    setCrudMode(mode);
    if (mode === 'edit' && location) {
      setEditingLocation(location);
      setCrudForm({
        name: location.name,
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString(),
        type: location.type,
      });
    } else {
      setEditingLocation(null);
      setCrudForm({
        name: '',
        latitude: latitude || '',
        longitude: longitude || '',
        type: locationType || 'both',
      });
    }
    setShowCrudModal(true);
  };

  const handleCloseCrudModal = () => {
    setShowCrudModal(false);
    setEditingLocation(null);
    setCrudForm({
      name: '',
      latitude: '',
      longitude: '',
      type: 'both',
    });
  };

  const handleSaveCrudLocation = async () => {
    if (!crudForm.name.trim() || !crudForm.latitude || !crudForm.longitude) {
      await Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please provide name, latitude, and longitude.',
      });
      return;
    }

    try {
      if (crudMode === 'create') {
        const newLocation: CreateBusLocationDTO = {
          name: crudForm.name.trim(),
          latitude: parseFloat(crudForm.latitude),
          longitude: parseFloat(crudForm.longitude),
          type: crudForm.type,
          isActive: true,
        };
        await createBusLocation(newLocation);
        await Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Location created successfully.',
          timer: 1500,
        });
      } else if (crudMode === 'edit' && editingLocation) {
        const updateData: UpdateBusLocationDTO = {
          id: editingLocation.id,
          name: crudForm.name.trim(),
          latitude: parseFloat(crudForm.latitude),
          longitude: parseFloat(crudForm.longitude),
          type: crudForm.type,
        };
        await updateBusLocation(updateData);
        await Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Location updated successfully.',
          timer: 1500,
        });
      }
      handleCloseCrudModal();
      await loadBusLocations();
    } catch (error) {
      console.error('Error saving bus location:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save location. Please try again.',
      });
    }
  };

  const handleDeleteLocation = async (location: BusLocation) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Delete Location?',
      text: `Are you sure you want to delete "${location.name}"?`,
      showCancelButton: true,
      confirmButtonColor: '#961c1e',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await deleteBusLocation(location.id);
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Location deleted successfully.',
          timer: 1500,
        });
        await loadBusLocations();
        if (selectedLocationId === location.id) {
          setSelectedLocationId('');
        }
      } catch (error) {
        console.error('Error deleting bus location:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete location. Please try again.',
        });
      }
    }
  };

  const handleCreate = async () => {
    if (!name && !latitude && !longitude) {
      await Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please select a location or pick one on the map.",
      });
      return;
    }

    try {
      const success = await onCreate({
        name: name || `${latitude}, ${longitude}`,
        latitude: latitude || "",
        longitude: longitude || "",
      });

      if (success) {
        setName("");
        setLatitude("");
        setLongitude("");
        setSelectedLocationId("");
        setShowMapSection(false);
        onClose();
      }
    } catch (err) {
      console.error("LocationPickerModal onCreate error:", err);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to set location. Please try again.",
      });
    }
  };

  if (!show) return null;

  return (
    <>
      {/* Main Location Selection Modal */}
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>

          <div className={styles.body}>
            {/* Predefined Locations Dropdown Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <label className={styles.label}>
                  <MapPin size={16} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
                  Select Location
                </label>
                <div className={styles.crudButtons}>
                  <button
                    type="button"
                    className={styles.crudBtn}
                    onClick={() => handleOpenCrudModal('create')}
                    title="Add new location"
                  >
                    <Plus size={16} />
                  </button>
                  {selectedLocationId && (
                    <>
                      <button
                        type="button"
                        className={styles.crudBtn}
                        onClick={() => {
                          const location = busLocations.find(loc => loc.id === selectedLocationId);
                          if (location) handleOpenCrudModal('edit', location);
                        }}
                        title="Edit selected location"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        type="button"
                        className={`${styles.crudBtn} ${styles.crudBtnDelete}`}
                        onClick={() => {
                          const location = busLocations.find(loc => loc.id === selectedLocationId);
                          if (location) handleDeleteLocation(location);
                        }}
                        title="Delete selected location"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <select
                className={styles.input}
                value={selectedLocationId}
                onChange={(e) => handleLocationSelect(e.target.value)}
                disabled={loadingLocations}
              >
                <option value="">-- Select a predefined location --</option>
                {busLocations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
              <small className={styles.inputHint}>
                Choose from saved locations or add a new one using the + button.
              </small>
            </div>

            {/* Toggle Map Section Button */}
            <button
              type="button"
              className={styles.toggleMapBtn}
              onClick={() => setShowMapSection(!showMapSection)}
            >
              {showMapSection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              <span>Want more specific location?</span>
            </button>

            {/* Collapsible Map Section */}
            {showMapSection && (
              <div className={styles.mapSection}>
                {/* Custom Name Input */}
                <div className={styles.section}>
                  <label className={styles.label}>Custom Name (Optional)</label>
                  <input
                    className={styles.input}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a custom name"
                  />
                  <small className={styles.inputHint}>
                    Override the selected location name with a custom one.
                  </small>
                </div>

                {/* Map Picker */}
                <label className={styles.label} style={{ marginBottom: 6 }}>
                  Click on the map to set precise coordinates:
                </label>
                <div style={{ height: 300, width: "100%", marginBottom: 12 }}>
                  <LocationMapPicker
                    latitude={latitude}
                    longitude={longitude}
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                  />
                </div>

                {/* Coordinates Display */}
                <div className={styles.coords}>
                  <div style={{ flex: 1 }}>
                    <label className={styles.label}>Latitude</label>
                    <input className={styles.input} value={latitude} readOnly />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className={styles.label}>Longitude</label>
                    <input className={styles.input} value={longitude} readOnly />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.footer}>
            <small className={styles.currentTime}>{currentTime}</small>
            <button className={styles.setLocationBtn} onClick={handleCreate} type="button">
              {selectButtonText}
            </button>
          </div>
        </div>
      </div>

      {/* CRUD Modal for Creating/Editing Bus Locations */}
      {showCrudModal && (
        <div className={styles.crudOverlay}>
          <div className={styles.crudModal}>
            <div className={styles.header}>
              <h2 className={styles.title}>
                {crudMode === 'create' ? 'Add New Location' : 'Edit Location'}
              </h2>
              <button className={styles.closeBtn} onClick={handleCloseCrudModal} aria-label="Close">
                ×
              </button>
            </div>

            <div className={styles.body}>
              <div className={styles.section}>
                <label className={styles.label}>Location Name *</label>
                <input
                  className={styles.input}
                  type="text"
                  value={crudForm.name}
                  onChange={(e) => setCrudForm({ ...crudForm, name: e.target.value })}
                  placeholder="e.g., City Terminal"
                />
              </div>

              <div className={styles.section}>
                <label className={styles.label}>Location Type *</label>
                <select
                  className={styles.input}
                  value={crudForm.type}
                  onChange={(e) => setCrudForm({ ...crudForm, type: e.target.value as any })}
                >
                  <option value="pickup">Pickup Only</option>
                  <option value="destination">Destination Only</option>
                  <option value="both">Both (Pickup & Destination)</option>
                </select>
              </div>

              {/* Map Picker for CRUD Modal */}
              <div className={styles.section}>
                <label className={styles.label}>Pick Location on Map *</label>
                <div style={{ height: 300, width: "100%", marginBottom: 12 }}>
                  <LocationMapPicker
                    latitude={crudForm.latitude}
                    longitude={crudForm.longitude}
                    setLatitude={(lat) => setCrudForm({ ...crudForm, latitude: lat })}
                    setLongitude={(lng) => setCrudForm({ ...crudForm, longitude: lng })}
                  />
                </div>
                <small className={styles.inputHint}>
                  Click on the map to set the coordinates for this location.
                </small>
              </div>

              <div className={styles.coords}>
                <div style={{ flex: 1 }}>
                  <label className={styles.label}>Latitude *</label>
                  <input
                    className={styles.input}
                    type="number"
                    step="any"
                    value={crudForm.latitude}
                    onChange={(e) => setCrudForm({ ...crudForm, latitude: e.target.value })}
                    placeholder="e.g., 14.5995"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className={styles.label}>Longitude *</label>
                  <input
                    className={styles.input}
                    type="number"
                    step="any"
                    value={crudForm.longitude}
                    onChange={(e) => setCrudForm({ ...crudForm, longitude: e.target.value })}
                    placeholder="e.g., 120.9842"
                  />
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              <div></div>
              <button className={styles.setLocationBtn} onClick={handleSaveCrudLocation} type="button">
                {crudMode === 'create' ? 'Create Location' : 'Update Location'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationPickerModal;
