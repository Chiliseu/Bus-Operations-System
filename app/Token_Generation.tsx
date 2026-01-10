"use client";

import { useEffect, useState } from "react";
import { bootstrapAuth } from "@/lib/auth/bootstrap-auth";

/**
 * Token Generation Component
 * 
 * Bootstraps authentication on app startup by:
 * 1. Calling /api/auth/refresh (which reads httpOnly refreshToken cookie)
 * 2. Getting new accessToken if refresh token exists
 * 3. Storing accessToken in memory (authStore)
 * 
 * This runs ONCE when the app loads and ensures the user has a valid
 * accessToken before making any API calls.
 */
export default function Token_Generation() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        const success = await bootstrapAuth();
        
        if (success) {
          console.log("[Token_Generation] Authentication initialized successfully");
        } else {
          console.warn("[Token_Generation] No valid refresh token - user may need to login");
        }
      } catch (error) {
        console.error("[Token_Generation] Error during auth bootstrap:", error);
      } finally {
        setIsInitialized(true);
      }
    };

    initialize();
  }, []);

  // Optional: Show loading state while bootstrapping
  if (!isInitialized) {
    return null; // Or return a loading spinner
  }

  return null;
}