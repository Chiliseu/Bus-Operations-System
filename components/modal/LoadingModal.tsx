import React from "react";
import Loading from "@/components/ui/Loading/Loading";

const LoadingModal: React.FC = () => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 2000,
      background: "rgba(255,255,255,0.6)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "auto", // Ensures clicks are blocked
    }}
    aria-modal="true"
    role="dialog"
  >
    <Loading />
  </div>
);

export default LoadingModal;