"use client";

import { useEffect } from "react";
import { fetchBackendToken } from "@/lib/backend";

export default function Token_Generation() {
  useEffect(() => {
    fetchBackendToken().then(token => {
      if (!token) {
        console.warn("[Token_Generation] Token is null or undefined");
      }
      // No need to set localStorage or document.cookie
    }).catch((err) => {
      console.error("[Token_Generation] Failed to fetch backend token:", err);
    });
  }, []);

  return null;
}