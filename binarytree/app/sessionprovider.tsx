// app/providers/SessionProvider.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/supabase-js';

interface SessionContextType {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false; // flag to prevent race conditions

    supabase.auth.getSession().then(({ data }) => {
      if (!ignore) setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth event:', _event, session);

      if (ignore) return;

      setSession(session);

      if (_event === 'SIGNED_OUT') {
        // Only redirect if session really cleared
        if (!session) {
          router.push('/auth/login');
        }
      }

    });

    return () => {
      ignore = true;
      listener.subscription.unsubscribe();
    };
  }, [supabase, router]);

  return (
    <SessionContext.Provider value={{ session, setSession, loading }}>
      {children}
    </SessionContext.Provider>
  );
}