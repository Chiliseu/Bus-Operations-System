import React from "react";
import Swal from 'sweetalert2';
import Image from "next/image";
import { Stop } from "@/app/interface";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import styles from "./add-route.module.css";

interface AddRouteModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (route: {
    routeName: string;
    startStop: string;
    endStop: string;
    stopsBetween: { StopID: string; StopName: string }[];
  }) => void;
  routeName: string;
  setRouteName: (name: string) => void;
  startStop: string;
  setStartStop: (name: string) => void;
  endStop: string;
  setEndStop: (name: string) => void;
  stopsBetween: Stop[];
  setStopsBetween: (stops: Stop[]) => void;
  onStartStopClick: () => void;
  onEndStopClick: () => void;
  onBetweenStopClick: (index: number) => void;
}

const AddRouteModal: React.FC<AddRouteModalProps> = ({
  show,
  onClose,
  onCreate,
  routeName,
  setRouteName,
  startStop,
  setStartStop,
  endStop,
  setEndStop,
  stopsBetween,
  setStopsBetween,
  onStartStopClick,
  onEndStopClick,
  onBetweenStopClick,
}) => {
  if (!show) return null;

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

  const handleCreate = async () => {
    if (!routeName.trim() || !startStop.trim() || !endStop.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
      });
      return;
    }

    if (stopsBetween.some((stop) => !stop.StopName.trim())) {
      await Swal.fire({
        icon: "warning",
        title: "Incomplete Stops",
        text: "All 'Stops Between' must have a stop selected.",
      });
      return;
    }

    onCreate({ routeName, startStop, endStop, stopsBetween });
    setRouteName("");
    setStartStop("");
    setEndStop("");
    setStopsBetween([]);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add Route</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.body}>
          {/* Route Info */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Route Information</h4>
            <div className={styles.grid3}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Route Name</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter route name"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                maxLength={30}
              />
              <small className={styles.hint}>
                * Max 30 characters and only . , - ' & / # allowed.
              </small>
            </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Start Stop</label>
                <input
                  type="text"
                  className={`${styles.input} ${startStop ? styles.filled : ""}`}
                  placeholder="Click to select start stop"
                  value={startStop}
                  onClick={onStartStopClick}
                  readOnly
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>End Stop</label>
                <input
                  type="text"
                  className={`${styles.input} ${endStop ? styles.filled : ""}`}
                  placeholder="Click to select end stop"
                  value={endStop}
                  onClick={onEndStopClick}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Stops Between */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Stops Between</h4>
            <div className={styles.scrollArea}>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="stops">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {stopsBetween.length === 0 ? (
                        <div className={styles.empty}>
                          No intermediate stops added yet.
                        </div>
                      ) : (
                        stopsBetween.map((stop, index) => (
                          <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
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
                                  className={styles.stopInput}
                                  placeholder={`Stop ${index + 1}`}
                                  value={stop.StopName}
                                  onChange={(e) => handleStopChange(e.target.value, index)}
                                  onClick={() => onBetweenStopClick(index)}
                                  readOnly
                                />
                                <button
                                  className={styles.btnRemove}
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
            <button className={styles.btnAdd} onClick={handleAddStop}>
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

        <div className={styles.footer}>
          <button
            className={styles.createRouteBtn}
            onClick={handleCreate}
          >
            Create Route
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRouteModal;
