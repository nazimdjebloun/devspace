
'use client'

import React, { createContext, useContext } from 'react'
import { authClient } from "@/lib/auth-client";
// Define the session type - adjust this to match your actual session structure
type SessionData = {
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      createdAt: Date;
      updatedAt: Date;
      image?: string | null;
      phone?: string | null;
      bio?: string | null;
      website?: string | null;
      location?: string | null;
      // Add any other properties your user object has
    } | null;
  } | null;
  isPending: boolean;
  error: Error | null;
  refetch: () => void;
}



// Create context with proper type (either SessionData or null initially)
const SessionContext = createContext<SessionData | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const sessionData = authClient.useSession();
  
  return (
    <SessionContext.Provider value={sessionData}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionContext() {
  const context = useContext(SessionContext);
  if (context === null) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }
  return context;
}