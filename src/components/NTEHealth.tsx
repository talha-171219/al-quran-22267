import React, { useEffect, useState, useRef } from 'react';
import useNTE from '@/hooks/useNTE';

const formatTime = (d: Date | null) => {
  if (!d) return '—';
  return d.toLocaleTimeString();
};

const NTEHealth: React.FC = () => {
  const { ready, ping } = useNTE();
  const [lastPing, setLastPing] = useState<Date | null>(null);
  const [pinging, setPinging] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    // Ping immediately once on mount
    const doPing = async () => {
      setPinging(true);
      try {
        const ok = await ping();
        if (ok && mounted.current) setLastPing(new Date());
      } catch (e) {
        // ignore - we will show no last ping
      } finally {
        if (mounted.current) setPinging(false);
      }
    };
    doPing();

    // periodic ping every 60s in background to update health
    const id = setInterval(() => {
      doPing();
    }, 60000);

    return () => {
      mounted.current = false;
      clearInterval(id);
    };
  }, [ping]);

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <strong style={{ fontSize: 12 }}>NTE</strong>
        <div style={{ fontSize: 12 }}>
          Status: {ready ? '✅ Ready' : '⏳ Not ready'}
        </div>
        <div style={{ fontSize: 12 }}>
          Last ping: {formatTime(lastPing)} {pinging ? ' (pinging...)' : ''}
        </div>
      </div>
      <div>
        <button
          onClick={async () => {
            setPinging(true);
            try {
              const ok = await ping();
              if (ok && mounted.current) setLastPing(new Date());
            } finally {
              if (mounted.current) setPinging(false);
            }
          }}
          style={{ padding: '6px 8px', fontSize: 12 }}
        >
          Ping now
        </button>
      </div>
    </div>
  );
};

export default NTEHealth;
