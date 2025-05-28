import React, { useState } from "react";

interface AddStopModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (stop: { name: string; latitude: string; longitude: string }) => Promise<boolean>;
}

const AddStopModal: React.FC<AddStopModalProps> = ({ show, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleCreate = async () => {
        const success = await onCreate({ name, latitude, longitude });
        if (success) {
            setName("");
            setLatitude("");
            setLongitude("");
            onClose();
        }
    };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Stop</h5>
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
            <button type="button" className="btn btn-primary" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStopModal;