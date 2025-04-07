export const formatDistance = (km: number): { value: number; unit: 'm' | 'km' } => {
  if (km < 1) {
    return { value: Math.round(km * 1000), unit: 'm' };
  }
  return { value: parseFloat(km.toFixed(2)), unit: 'km' };
};


export const estimateTravelTime = (km: number, speedKmPerHour = 10): number => {
  return Math.ceil((km / speedKmPerHour) * 60);
};
