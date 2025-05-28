import React from "react";
import Image from "next/image";
import { Stop, Route } from "@/app/interface";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

interface EditRouteModalProps {
  show: boolean;
  onClose: () => void;
  route: Route | null;
  routeName: string;
  setRouteName: React.Dispatch<React.SetStateAction<string>>;
  startStop: string;
  setStartStop: React.Dispatch<React.SetStateAction<string>>;
  endStop: string;
  setEndStop: React.Dispatch<React.SetStateAction<string>>;
  stopsBetween: Stop[];
  setStopsBetween: React.Dispatch<React.SetStateAction<Stop[]>>;
  onSave: (route: {
    RouteID: string;
    RouteName: string;
    StartStop: string;
    EndStop: string;
    stopsBetween: Stop[];
  }) => void;
  onStartStopClick: () => void;
  onEndStopClick: () => void;
  onBetweenStopClick: (index: number) => void;
}

const EditRouteModal: React.FC<EditRouteModalProps> = ({
  show,
  onClose,
  route,
  routeName,
  setRouteName,
  startStop,
  setStartStop,
  endStop,
  setEndStop,
  stopsBetween,
  setStopsBetween,
  onSave,
  onStartStopClick,
  onEndStopClick,
  onBetweenStopClick,
}) => {
  const handleAddStop = () => {
    setStopsBetween([
      ...stopsBetween,
      {
        StopID: "",
        StopName: "",
        IsDeleted: false,
        latitude: "",
        longitude: "",
      },
    ]);
  };

  const handleRemoveStop = (index: number) => {
    setStopsBetween(stopsBetween.filter((_, i) => i !== index));
  };

  const handleStopChange = (value: string, index: number) => {
    const updatedStops = [...stopsBetween];
    updatedStops[index] = { ...updatedStops[index], StopName: value };
    setStopsBetween(updatedStops);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(stopsBetween);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setStopsBetween(reordered);
  };

  const handleSave = () => {
    if (!routeName || !startStop || !endStop) {
      alert("Please fill in all required fields.");
      return;
    }
    if (stopsBetween.some(stop => !stop.StopName.trim())) {
      alert("All 'Stops Between' must have a stop selected.");
      return;
    }
    if (!route) return;
    onSave({
      RouteID: route.RouteID,
      RouteName: routeName,
      StartStop: startStop,
      EndStop: endStop,
      stopsBetween,
    });
    onClose();
  };

  if (!show || !route) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Route</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label">Route Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Route Name"
                  value={routeName}
                  onChange={(e) => setRouteName(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Start Stop</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Start Stop"
                  value={startStop}
                  onClick={onStartStopClick}
                  readOnly
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">End Stop</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="End Stop"
                  value={endStop}
                  onClick={onEndStopClick}
                  readOnly
                />
              </div>
            </div>
            <h5 className="mb-2">Stops Between</h5>
            <div className="stops-scroll-container">
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="stops">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {stopsBetween.length === 0 ? (
                        <p className="text-muted">Click + button to add stops.</p>
                      ) : (
                        stopsBetween.map((stop, index) => (
                          <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
                            {(provided) => (
                              <div
                                className="d-flex align-items-center mb-2"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <span {...provided.dragHandleProps} className="me-2">⋮⋮</span>
                                <input
                                  type="text"
                                  className="form-control me-2"
                                  placeholder={`Stop ${index + 1}`}
                                  value={stop.StopName}
                                  onClick={() => onBetweenStopClick(index)}
                                  readOnly
                                />
                                <button className="btn btn-danger" onClick={() => handleRemoveStop(index)}>
                                  <Image src="/assets/images/close-line.png" alt="Remove Stop" className="icon-small" width={20} height={20} />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            <div className="my-2">
              <button className="btn btn-success" onClick={handleAddStop}>
                <Image src="/assets/images/add-line.png" alt="Add Stop" className="icon-small" width={20} height={20} />
              </button>
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

export default EditRouteModal;