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
