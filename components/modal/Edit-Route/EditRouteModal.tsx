import React from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { Stop, Route } from "@/app/interface";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import styles from "./edit-route.module.css";

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
  if (!show || !route) return null;

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

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(stopsBetween);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setStopsBetween(reordered);
  };

  const handleSave = async () => {
    if (!routeName || !startStop || !endStop) {
      await Swal.fire({
        icon: "warning",
        title: "Incomplete Fields",
        text: "Please fill in the incomplete fields.",
      });
      return;
    }

    if (stopsBetween.some((stop) => !stop.StopName.trim())) {
      await Swal.fire({
        icon: "warning",
        title: "Invalid Stops",
        text: "All 'Stops Between' must have a stop selected.",
      });
      return;
    }

    onSave({
      RouteID: route.RouteID,
      RouteName: routeName,
      StartStop: startStop,
      EndStop: endStop,
      stopsBetween,
    });

    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalDialog}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Edit Route</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Route Information */}
          <div className={styles.formSection}>
            <h4 className={styles.sectionTitle}>Route Information</h4>
            <div className={styles.row}>
              <div className={styles.col}>
                <label className={styles.formLabel}>Route Name</label>
                <input
                  type="text"
                  className={styles.formControl}
                  placeholder="Enter route name"
                  value={routeName}
                  onChange={(e) => setRouteName(e.target.value)}
                />
              </div>
              <div className={styles.col}>
                <label className={styles.formLabel}>Start Stop</label>
                <input
                  type="text"
                  className={`${styles.formControl} ${startStop ? styles.filled : ""}`}
                  placeholder="Click to select start stop"
                  value={startStop}
                  onClick={onStartStopClick}
                  readOnly
                />
              </div>
              <div className={styles.col}>
                <label className={styles.formLabel}>End Stop</label>
                <input
                  type="text"
                  className={`${styles.formControl} ${endStop ? styles.filled : ""}`}
                  placeholder="Click to select end stop"
                  value={endStop}
                  onClick={onEndStopClick}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Stops Between */}
          <div className={styles.formSection}>
            <h4 className={styles.sectionTitle}>Stops Between</h4>
            <div className={styles.stopsScrollContainer}>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="stops">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {stopsBetween.length === 0 ? (
                        <div className={styles.emptyStopsMessage}>
                          Click the + button below to add stops between start and end points.
                        </div>
                      ) : (
                        stopsBetween.map((stop, index) => (
                          <Draggable
                            key={stop.StopID || index.toString()}
                            draggableId={stop.StopID || index.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className={styles.stopItem}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <span
                                  className={styles.dragHandle}
                                  {...provided.dragHandleProps}
                                >
                                  ⋮⋮
                                </span>
                                <input
                                  type="text"
                                  className={`${styles.formControl} ${styles.stopInput} ${stop.StopName ? styles.filled : ""}`}
                                  placeholder={`Stop ${index + 1}`}
                                  value={stop.StopName}
                                  onClick={() => onBetweenStopClick(index)}
                                  readOnly
                                />
                                <button
                                  className={styles.btnRemoveStop}
                                  onClick={() => handleRemoveStop(index)}
                                >
                                  <Image
                                    src="/assets/images/close-line.png"
                                    alt="Remove Stop"
                                    width={16}
                                    height={16}
                                  />
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
            <button
              className={styles.btnAddStop}
              onClick={handleAddStop}
              type="button"
            >
              <Image
                src="/assets/images/add-line.png"
                alt="Add Stop"
                width={16}
                height={16}
              />
              Add Stop
            </button>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.saveRouteBtn}
            onClick={handleSave}
          >
            Save Route
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRouteModal;
