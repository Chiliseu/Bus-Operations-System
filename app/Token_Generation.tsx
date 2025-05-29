"use client";

import { useEffect } from "react";
import { fetchBackendToken } from "@/lib/backend";

export default function Token_Generation() {
  useEffect(() => {
    console.log("[Token_Generation] Running token fetch...");
    fetchBackendToken().then(token => {
      console.log("[Token_Generation] Token received:", token);
    }).catch((err) => {
      console.error("[Token_Generation] Failed to fetch backend token:", err);
    });
  }, []);

  return null;
}