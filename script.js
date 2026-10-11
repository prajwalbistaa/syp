const backToTopButton = document.getElementById("back-to-top");
const backToTopThreshold = 250;

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
