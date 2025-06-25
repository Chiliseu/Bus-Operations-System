import React, { useState, useEffect } from "react";
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
import dynamic from "next/dynamic";

const RouteMapPreview = dynamic(
  () => import("@/components/ui/RouteMapPreview"),
  { ssr: false }
);

interface AddRouteModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (route: {
    routeName: string;
    startStop: Stop;
    endStop: Stop;
    stopsBetween: { StopID: string; StopName: string }[];
  }) => void;
  routeName: string;
  setRouteName: (name: string) => void;
  startStop: Stop | null;
  setStartStop: (stop: Stop | null) => void;
  endStop: Stop | null;
  setEndStop: (stop: Stop | null) => void;
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
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleString('en-US', { hour12: true })
  );

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('en-US', { hour12: true }));
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

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
        CreatedAt: "",
        UpdatedAt: "",
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
    if (!routeName.trim() || !startStop?.StopName.trim() || !endStop?.StopName.trim()) {
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
    setStartStop(null);
    setEndStop(null);
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
                  * Max 30 characters and only . , - &apos; &amp; / # allowed.
                </small>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Start Stop</label>
                <input
                  type="text"
                  className={`${styles.input} ${startStop ? styles.filled : ""}`}
                  placeholder="Click to select start stop"
                  value={startStop?.StopName}
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
                  value={endStop?.StopName}
                  onClick={onEndStopClick}
                  readOnly
                />
              </div>
            </div>
          </div>

          <RouteMapPreview
            key={
              (startStop?.StopID || "") +
              (endStop?.StopID || "") +
              stopsBetween.map(s => s.StopID).join("-")
            }
            startStop={startStop}
            endStop={endStop}
            stopsBetween={stopsBetween}
          />

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

        <div className={`${styles.footer} d-flex justify-content-between align-items-center`}>
          <small className="text-muted">{currentTime}</small>
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
