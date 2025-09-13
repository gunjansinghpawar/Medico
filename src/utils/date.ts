export const formatDate = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const formatDateTime = (date: Date | string) => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

export const isToday = (date: Date | string) => {
  const d = new Date(date);
  const today = new Date();
  return d.toDateString() === today.toDateString();
};

export const isYesterday = (date: Date | string) => {
  const d = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.toDateString() === yesterday.toDateString();
};