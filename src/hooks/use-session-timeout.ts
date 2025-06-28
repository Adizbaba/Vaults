
"use client";

import React, { useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase/clientApp';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes
const WARNING_TIMEOUT = 9 * 60 * 1000; // 9 minutes (1 minute before timeout)

export function useSessionTimeout() {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const activityTimer = useRef<NodeJS.Timeout | null>(null);
  const warningTimer = useRef<NodeJS.Timeout | null>(null);
  const toastId = useRef<string | null>(null);

  const handleLogout = useCallback(async () => {
    if (toastId.current) {
      dismiss(toastId.current);
    }
    try {
      await signOut(auth);
      // The toast on the login page is sufficient, no need for two.
    } catch (error) {
        console.error("Error signing out:", error);
    } finally {
        router.push('/login?sessionExpired=true');
    }
  }, [router, dismiss]);

  const resetTimers = useCallback(() => {
    if (activityTimer.current) clearTimeout(activityTimer.current);
    if (warningTimer.current) clearTimeout(warningTimer.current);
    if (toastId.current) {
        dismiss(toastId.current);
        toastId.current = null;
    }

    activityTimer.current = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
    
    warningTimer.current = setTimeout(() => {
      const { id } = toast({
        title: "Session Expiry Warning",
        description: `You will be logged out due to inactivity in 1 minute.`,
        variant: "destructive",
        duration: INACTIVITY_TIMEOUT - WARNING_TIMEOUT,
        action: React.createElement(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => {
              resetTimers();
            },
          },
          "Stay Logged In"
        ),
      });
      if(id) toastId.current = id;
    }, WARNING_TIMEOUT);

  }, [handleLogout, toast, dismiss]);

  useEffect(() => {
    const events: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keydown', 'touchstart'];

    const handleActivity = () => {
      resetTimers();
    };

    // Only run on the client
    if (typeof window !== 'undefined') {
        events.forEach(event => window.addEventListener(event, handleActivity));
        resetTimers(); // Initialize timers on mount
    }

    return () => {
      if (activityTimer.current) clearTimeout(activityTimer.current);
      if (warningTimer.current) clearTimeout(warningTimer.current);
      if (typeof window !== 'undefined') {
        events.forEach(event => window.removeEventListener(event, handleActivity));
      }
       if (toastId.current) {
        dismiss(toastId.current);
      }
    };
  }, [resetTimers, dismiss]);
}
