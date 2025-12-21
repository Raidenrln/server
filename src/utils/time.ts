export const getBaseKeyTime = (key: string): string => {
  return key.replace("minecraft:", "").toLowerCase();
};
// Convert ticks to total real seconds (2 decimals)
export const ticksToSeconds = (ticks: number) => {
  const secondsPerTick = 1 / 20;
  return parseFloat((ticks * secondsPerTick).toFixed(2));
};

// Convert ticks to total real minutes (2 decimals)
export const ticksToMinutes = (ticks: number) => {
  return parseFloat((ticksToSeconds(ticks) / 60).toFixed(2));
};

// Convert ticks to total real hours (2 decimals)
export const ticksToHours = (ticks: number) => {
  return parseFloat((ticksToMinutes(ticks) / 60).toFixed(2));
};

// Convert ticks to total real days (2 decimals)
export const ticksToDays = (ticks: number) => {
  return parseFloat((ticksToHours(ticks) / 24).toFixed(2));
};
