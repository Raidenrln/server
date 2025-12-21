export const formatKey = (key: string) => key.replace("minecraft:", "").replace(/_/g, " ");
export const cmToKm = (cm: number) => (cm / 100_000).toFixed(2);