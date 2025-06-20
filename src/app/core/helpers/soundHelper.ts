export const playNotificationSound = () => {
  const audio = new Audio('/notification.wav'); // Nếu file trong thư mục public
  audio.play().catch((err) => {
    console.warn('Không thể phát âm thanh:', err);
  });
};
