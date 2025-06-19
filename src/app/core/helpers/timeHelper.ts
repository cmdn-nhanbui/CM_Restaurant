export const getCurrentDate = (): string => {
  const today = new Date();

  const formatted = today.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return formatted;
};

export function formatTimestamp(timestamp?: string | number): string {
  if (!timestamp) return '';

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return '';

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; // Giờ 0 => 12 AM

  return `${hours}:${minutes} ${ampm} ${day}/${month}/${year}`;
}
