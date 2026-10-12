const liveClock = document.getElementById("live-clock");

const updateLiveClock = () => {
  const now = new Date();

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
