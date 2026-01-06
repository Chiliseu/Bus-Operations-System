'use client';

import React, { useEffect, useRef } from 'react';
import styles from './route-map.module.css';

interface RouteMapModalProps {
  show: boolean;
  onClose: () => void;
  routeData: {
    pickupLocation: string;
    pickupLat: number;
    pickupLng: number;
    dropoffLocation: string;
    dropoffLat: number;
    dropoffLng: number;
    distance: string;
  };
}

const RouteMapModal: React.FC<RouteMapModalProps> = ({ show, onClose, routeData }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!show || !mapRef.current) return;

    // Dynamically load Leaflet only when modal is shown
    const loadLeaflet = async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css' as any);

      // Fix default marker icon issue
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      // Clear existing map if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const { pickupLat, pickupLng, dropoffLat, dropoffLng, pickupLocation, dropoffLocation } = routeData;

      // Calculate center point between pickup and dropoff
      const centerLat = (pickupLat + dropoffLat) / 2;
      const centerLng = (pickupLng + dropoffLng) / 2;

      // Initialize map (add non-null assertion since we check above)
      const map = L.map(mapRef.current!).setView([centerLat, centerLng], 13);
      mapInstanceRef.current = map;

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Custom marker icons using divIcon
      const pickupIcon = L.divIcon({
        html: '<div style="background: #10b981; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); font-size: 16px;">📍</div>',
        className: '',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const dropoffIcon = L.divIcon({
        html: '<div style="background: #ef4444; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); font-size: 16px;">🎯</div>',
        className: '',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      // Add markers
      L.marker([pickupLat, pickupLng], { icon: pickupIcon })
        .addTo(map)
        .bindPopup(`<b>Pickup:</b> ${pickupLocation}`);

      L.marker([dropoffLat, dropoffLng], { icon: dropoffIcon })
        .addTo(map)
        .bindPopup(`<b>Destination:</b> ${dropoffLocation}`);

      // Add route line
      const routeLine = L.polyline(
        [
          [pickupLat, pickupLng],
          [dropoffLat, dropoffLng],
        ],
        {
          color: '#3b82f6',
          weight: 4,
          opacity: 0.7,
          dashArray: '10, 10',
        }
      ).addTo(map);

      // Add directional arrow at midpoint
      const arrowIcon = L.divIcon({
        html: `<div style="font-size: 24px; transform: rotate(${calculateBearing(pickupLat, pickupLng, dropoffLat, dropoffLng)}deg);">➤</div>`,
        className: '',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      L.marker([centerLat, centerLng], { icon: arrowIcon }).addTo(map);

      // Fit map to show both markers
      map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });
    };

    loadLeaflet();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [show, routeData]);

  // Calculate bearing for arrow rotation
  const calculateBearing = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const y = Math.sin(dLng) * Math.cos((lat2 * Math.PI) / 180);
    const x =
      Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
      Math.sin((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.cos(dLng);
    const bearing = (Math.atan2(y, x) * 180) / Math.PI;
    return (bearing + 360) % 360;
  };

  if (!show) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Route Map</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.body}>
          {/* Route Info Banner */}
          <div className={styles.routeInfo}>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeLabel}>Pickup</div>
              <div className={styles.routeValue}>{routeData.pickupLocation}</div>
            </div>
            <div className={styles.routeArrow}>→</div>
            <div className={styles.routeInfoItem}>
              <div className={styles.routeLabel}>Destination</div>
              <div className={styles.routeValue}>{routeData.dropoffLocation}</div>
            </div>
            <div className={styles.routeDistance}>
              <div className={styles.distanceBadge}>📏 {routeData.distance}</div>
            </div>
          </div>

          {/* Map Container */}
          <div className={styles.mapContainer} ref={mapRef}></div>

          {/* Legend */}
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <div className={styles.legendIcon} style={{ background: '#10b981' }}>
                📍
              </div>
              <span>Pickup Location</span>
            </div>
            <div className={styles.legendItem}>
              <div className={styles.legendIcon} style={{ background: '#ef4444' }}>
                🎯
              </div>
              <span>Destination</span>
            </div>
            <div className={styles.legendItem}>
              <div style={{ width: '40px', height: '4px', background: '#3b82f6', borderRadius: '2px', border: '1px dashed #2563eb' }}></div>
              <span>Route</span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteMapModal;
