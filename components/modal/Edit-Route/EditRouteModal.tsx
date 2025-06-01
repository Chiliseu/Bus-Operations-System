import React from "react";
import Image from "next/image";
import { Stop, Route } from "@/app/interface";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import styles from './edit-route.module.css';

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
    setStopsBetween(prev => prev.filter((_, i) => i !== index));
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
    <div className={styles.modalOverlay}>
      <div className={styles.modalDialog}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h5 className={styles.modalTitle}>Edit Route</h5>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          
          <div className={styles.modalBody}>
            {/* Route Information Section */}
            <div className={styles.formSection}>
              <h6 className={styles.sectionTitle}>Route Information</h6>
              <div className={styles.row}>
                <div className={styles.col}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Route Name</label>
                    <input
                      type="text"
                      className={`${styles.formControl} ${styles.regularInput}`}
                      placeholder="Enter route name"
                      value={routeName}
                      onChange={(e) => setRouteName(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.col}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Start Stop</label>
                    <input
                      type="text"
                      className={`${styles.formControl} ${styles.selectionInput} ${startStop ? styles.filled : ''}`}
                      placeholder="Click to select start stop"
                      value={startStop}
                      onClick={onStartStopClick}
                      readOnly
                    />
                  </div>
                </div>
                <div className={styles.col}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>End Stop</label>
                    <input
                      type="text"
                      className={`${styles.formControl} ${styles.selectionInput} ${endStop ? styles.filled : ''}`}
                      placeholder="Click to select end stop"
                      value={endStop}
                      onClick={onEndStopClick}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stops Between Section */}
            <div className={styles.formSection}>
              <h6 className={styles.sectionTitle}>Stops Between</h6>
              <div className={styles.stopsScrollContainer}>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="stops">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {stopsBetween.map((stop, index) => (
                          <Draggable key={stop.StopID || index.toString()} draggableId={stop.StopID || index.toString()} index={index}>
                            {(provided) => (
                              <div
                                className={styles.stopItem}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <span {...provided.dragHandleProps} className={styles.dragHandle}>⋮⋮</span>
                                <input
                                  type="text"
                                  className={`${styles.formControl} ${styles.selectionInput} ${styles.stopInput} ${stop.StopName ? styles.filled : ''}`}
                                  placeholder={`Stop ${index + 1}`}
                                  value={stop.StopName}
                                  onClick={() => onBetweenStopClick(index)}
                                  readOnly
                                />
                                <button 
                                  className={`${styles.btn} ${styles.btnRemoveStop}`}
                                  onClick={() => handleRemoveStop(index)}
                                  type="button"
                                >
                                  <Image src="/assets/images/close-line.png" alt="Remove Stop" className={styles.iconSmall} width={16} height={16} />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {stopsBetween.length === 0 && (
                          <div className={styles.emptyStopsMessage}>
                            Click the + button below to add stops between start and end points.
                          </div>
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
              <button className={`${styles.btn} ${styles.btnAddStop}`} onClick={handleAddStop} type="button">
                <Image src="/assets/images/add-line.png" alt="Add Stop" className={styles.iconSmall} width={16} height={16} />
                Add Stop
              </button>
            </div>
          </div>
          
          <div className={styles.modalFooter}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnCancel}`}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnSave}`}
              onClick={handleSave}
              disabled={!routeName || !startStop || !endStop}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRouteModal;