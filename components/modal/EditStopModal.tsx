import React, { useState, useEffect } from "react";

interface EditStopModalProps {
  show: boolean;
  onClose: () => void;
  stop: { id: string; name: string; latitude: string; longitude: string } | null;
  onSave: (stop: { id: string; name: string; latitude: string; longitude: string }) => Promise<boolean>;
}

const EditStopModal: React.FC<EditStopModalProps> = ({ show, onClose, stop, onSave }) => {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Populate fields when stop changes
  useEffect(() => {
    if (stop) {
      setName(stop.name);
      setLatitude(stop.latitude);
      setLongitude(stop.longitude);
    }
  }, [stop]);

  const handleSave = async () => {
    if (!stop) return;
    const success = await onSave({ id: stop.id, name, latitude, longitude });
    if (success) {
      onClose();
    }
  };

  if (!show || !stop) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.1)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Stop</h5>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Stop Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Latitude</label>
              <input
                type="text"
                className="form-control"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Longitude</label>
              <input
                type="text"
                className="form-control"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStopModal;