import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Swal from "sweetalert2";

L.Icon.Default.mergeOptions({
  iconUrl: "/assets/images/marker-icon.png",
  shadowUrl: "/assets/images/marker-shadow.png",
});

interface StopMapPickerProps {
  latitude: string;
  longitude: string;
  setLatitude: (lat: string) => void;
  setLongitude: (lng: string) => void;
}

// Philippines boundaries
const PHILIPPINES_BOUNDS: L.LatLngBoundsExpression = [
  [4.5, 116.0],  // Southwest coordinates (southernmost, westernmost)
  [21.5, 127.0]  // Northeast coordinates (northernmost, easternmost)
];

// Check if coordinates are within Philippines
const isWithinPhilippines = (lat: number, lng: number): boolean => {
  return lat >= 4.5 && lat <= 21.5 && lng >= 116.0 && lng <= 127.0;
};

// Validate if location is on land (not water) using Nominatim reverse geocoding
const validateLandArea = async (lat: number, lng: number): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'BusOperationsSystem/1.0'
        }
      }
    );
    
    if (!response.ok) {
      return false; // Reject if API fails
    }
    
    const data = await response.json();
    
    // If no result or error from Nominatim, it's likely water
    if (data.error || !data.display_name) {
      return false;
    }
    
    // Check if it's explicitly marked as water or coastline
    if (data.class === 'natural' && (data.type === 'water' || data.type === 'coastline' || data.type === 'bay' || data.type === 'ocean' || data.type === 'sea')) {
      return false;
    }
    
    if (data.class === 'waterway' || data.class === 'water') {
      return false;
    }
    
    if (data.type === 'sea' || data.type === 'ocean' || data.type === 'water') {
      return false;
    }
    
    // Check if address exists and has valid land-based components
    if (!data.address) {
      return false; // No address = likely water or uninhabited area
    }
    
    // Must have at least one of these land-based address components
    const hasValidAddress = Boolean(
      data.address.road || 
      data.address.street ||
      data.address.highway ||
      data.address.pedestrian ||
      data.address.footway ||
      data.address.city || 
      data.address.town || 
      data.address.village || 
      data.address.municipality || 
      data.address.suburb ||
      data.address.neighbourhood ||
      data.address.hamlet ||
      data.address.province ||
      data.address.state ||
      data.address.region ||
      data.address.county
    );
    
    if (!hasValidAddress) {
      return false; // No valid land address components
    }
    
    // Additional check: if display_name contains water-related terms
    const displayName = data.display_name.toLowerCase();
    const waterKeywords = ['ocean', 'sea', 'water', 'bay', 'strait', 'channel', 'gulf'];
    const hasWaterKeyword = waterKeywords.some(keyword => displayName.includes(keyword));
    
    if (hasWaterKeyword && !hasValidAddress) {
      return false; // Contains water keyword and no valid address
    }
    
    return true; // Valid land area
  } catch (error) {
    console.error('Error validating location:', error);
    return false; // Reject on error
  }
};

const LocationPicker: React.FC<StopMapPickerProps> = ({ latitude, longitude, setLatitude, setLongitude }) => {
  useMapEvents({
    async click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      
      // Check if within Philippines
      if (!isWithinPhilippines(lat, lng)) {
        await Swal.fire({
          icon: "warning",
          title: "Location Outside Philippines",
          text: "Please select a location within the Philippines only.",
          confirmButtonColor: "#961c1e"
        });
        return;
      }
      
      // Validate it's not a water area
      const isLand = await validateLandArea(lat, lng);
      
      if (!isLand) {
        await Swal.fire({
          icon: "warning",
          title: "Invalid Location",
          text: "You cannot select water areas. Please choose a location on land.",
          confirmButtonColor: "#961c1e"
        });
        return;
      }
      
      // Valid location, update coordinates
      setLatitude(lat.toString());
      setLongitude(lng.toString());
    },
  });

  return latitude && longitude ? (
    <Marker position={[parseFloat(latitude), parseFloat(longitude)]} />
  ) : null;
};

const StopMapPicker: React.FC<StopMapPickerProps> = (props) => (
  <MapContainer
    center={[
      props.latitude ? parseFloat(props.latitude) : 14.5995, // Manila center
      props.longitude ? parseFloat(props.longitude) : 120.9842,
    ]}
    zoom={12}
    style={{ height: "100%", width: "100%" }}
    maxBounds={PHILIPPINES_BOUNDS}
    maxBoundsViscosity={1.0}
    minZoom={6}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
      bounds={PHILIPPINES_BOUNDS}
    />
    <LocationPicker {...props} />
  </MapContainer>
);

export default StopMapPicker;