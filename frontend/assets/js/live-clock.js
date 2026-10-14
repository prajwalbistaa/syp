const liveClock = document.getElementById("live-clock");
const liveDate = document.getElementById("live-date");

const updateLiveClock = () => {
  const now = new Date();

  if (liveDate) {
    liveDate.textContent = now.toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    liveDate.dateTime = now.toISOString().slice(0, 10);
  }

  // Show a readable time while keeping the machine-readable datetime updated.
  liveClock.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  liveClock.dateTime = now.toISOString();
};

if (liveClock) {
  // Render immediately, then refresh once per second.
  updateLiveClock();
  window.setInterval(updateLiveClock, 1000);
}
