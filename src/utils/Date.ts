export const timestampToDate = (timestamp: Date): string => {
  const date = new Date(timestamp);

  const timeString = date.toLocaleString('pl-PL', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });

  return timeString;
};
