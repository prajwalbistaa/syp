const backToTopButton = document.getElementById("back-to-top");
const backToTopThreshold = 250;
const liveClock = document.getElementById("live-clock");

const updateLiveClock = () => {
  const now = new Date();

  liveClock.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  liveClock.dateTime = now.toISOString();
};

const updateBackToTopVisibility = () => {
  const shouldShow = window.scrollY >= backToTopThreshold;

  backToTopButton.classList.toggle("is-visible", shouldShow);
  backToTopButton.setAttribute("aria-hidden", String(!shouldShow));
};

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", updateBackToTopVisibility, {
  passive: true,
});
updateBackToTopVisibility();

updateLiveClock();
window.setInterval(updateLiveClock, 1000);
