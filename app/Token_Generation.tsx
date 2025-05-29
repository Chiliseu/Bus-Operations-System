"use client";

import { useEffect } from "react";
import { fetchBackendToken } from "@/lib/backend";

export default function Token_Generation() {
  useEffect(() => {
    fetchBackendToken().then(token => {
      if (token) {
        localStorage.setItem("backend_token", token);
      } else {
        console.warn("[Token_Generation] Token is null or undefined");
      }
    }).catch((err) => {
      console.error("[Token_Generation] Failed to fetch backend token:", err);
    });
  }, []);

  return null;
}
