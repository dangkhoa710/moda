import { useEffect, useState } from 'react';
import { getDistanceKm } from '../utils/location';

export function useWatchPositionWithPrompt(
  current: { lat: number; lng: number } | null,
  thresholdMeters: number = 300
): {
  updatedPos: { lat: number; lng: number } | null;
  shouldUpdate: boolean;
  confirmUpdate: () => void;
  cancelUpdate: () => void;
} {
  const [updatedPos, setUpdatedPos] = useState<{ lat: number; lng: number } | null>(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    if (!current) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const newPos = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        const distanceKm = getDistanceKm(current.lat, current.lng, newPos.lat, newPos.lng);
        const distanceM = distanceKm * 1000;

        if (distanceM > thresholdMeters) {
          setUpdatedPos(newPos);
          setShouldUpdate(true);
        }
      },
      (err) => {
        console.warn('❌ watchPosition error:', err.message);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [current]);

  const confirmUpdate = () => {
    setShouldUpdate(false);
  };

  const cancelUpdate = () => {
    setUpdatedPos(null);
    setShouldUpdate(false);
  };

  return { updatedPos, shouldUpdate, confirmUpdate, cancelUpdate };
}
