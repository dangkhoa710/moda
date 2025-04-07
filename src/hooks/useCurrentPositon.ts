import { useEffect, useState } from 'react';

export function useCurrentPosition(
  fallback: { lat: number; lng: number } = { lat: 10.7769, lng: 106.7009 }
) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn('⚠️ Lỗi định vị:', err.message);
        setPosition(fallback);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

  return position;
}