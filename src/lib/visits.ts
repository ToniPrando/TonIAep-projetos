import { getSupabaseClient } from './supabase';

export interface VisitStats {
  total: number;
  today: number;
  lastVisitedAt?: string;
  source: 'server' | 'supabase' | 'local';
}

const LOCAL_STORAGE_KEY = 'portfolio_access_counter_total';
const SESSION_STORAGE_KEY = 'portfolio_session_access_registered';

export async function fetchVisitStats(): Promise<VisitStats> {
  try {
    const res = await fetch('/api/visits');
    if (res.ok) {
      const data = await res.json();
      if (typeof data.total === 'number') {
        localStorage.setItem(LOCAL_STORAGE_KEY, data.total.toString());
        return {
          total: data.total,
          today: data.today || 1,
          lastVisitedAt: data.lastVisitedAt,
          source: 'server',
        };
      }
    }
  } catch (err) {
    console.warn('Could not fetch server visits, using local cache:', err);
  }

  // Fallback to local storage
  const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
  const num = cached ? parseInt(cached, 10) : 1249;
  return {
    total: isNaN(num) ? 1249 : num,
    today: 1,
    source: 'local',
  };
}

export async function registerVisit(): Promise<VisitStats> {
  const isNewSession = !sessionStorage.getItem(SESSION_STORAGE_KEY);

  if (isNewSession) {
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    try {
      const res = await fetch('/api/visits/hit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: window.location.pathname,
          referrer: document.referrer || '',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (typeof data.total === 'number') {
          localStorage.setItem(LOCAL_STORAGE_KEY, data.total.toString());
          trySyncToSupabase();
          return {
            total: data.total,
            today: data.today || 1,
            lastVisitedAt: data.lastVisitedAt,
            source: 'server',
          };
        }
      }
    } catch (err) {
      console.warn('Error registering visit on server:', err);
    }

    // Local increment fallback
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    let num = cached ? parseInt(cached, 10) : 1248;
    if (isNaN(num)) num = 1248;
    num += 1;
    localStorage.setItem(LOCAL_STORAGE_KEY, num.toString());
    return {
      total: num,
      today: 1,
      source: 'local',
    };
  }

  // If already counted this session, just retrieve fresh statistics
  return fetchVisitStats();
}

async function trySyncToSupabase() {
  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('site_visits').insert([
        {
          visited_at: new Date().toISOString(),
          path: window.location.pathname,
          user_agent: navigator.userAgent,
        },
      ]);
    } catch {
      // ignore if table doesn't exist yet
    }
  }
}
