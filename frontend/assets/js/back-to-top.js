const backToTopButton = document.getElementById("back-to-top");
const backToTopThreshold = 250;

const updateBackToTopVisibility = () => {
  const shouldShow = window.scrollY >= backToTopThreshold;

  // Match visual visibility with accessibility state.
  backToTopButton.classList.toggle("is-visible", shouldShow);
  backToTopButton.setAttribute("aria-hidden", String(!shouldShow));
};

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", updateBackToTopVisibility, {
    passive: true,
  });

  // Set the correct state if the page loads already scrolled.
  updateBackToTopVisibility();
}
