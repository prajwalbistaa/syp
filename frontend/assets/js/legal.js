const bindLegalDialog = ({ overlayId, closeId, linkId, hash }) => {
  const overlay = document.getElementById(overlayId);
  const closeButton = document.getElementById(closeId);
  const openLink = document.getElementById(linkId);

  const show = () => {
    overlay.hidden = false;
    document.body.classList.add("faq-open");
    closeButton.focus();
  };

  const hide = () => {
    overlay.hidden = true;
    document.body.classList.remove("faq-open");
    history.replaceState(null, "", window.location.pathname);
  };

  openLink.addEventListener("click", (event) => {
    event.preventDefault();
    show();
    history.replaceState(null, "", hash);
  });

  closeButton.addEventListener("click", hide);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) hide();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) hide();
  });

  if (window.location.hash === hash) show();
};

bindLegalDialog({
  overlayId: "about-overlay",
  closeId: "about-close",
  linkId: "about-link",
  hash: "#About",
});

bindLegalDialog({
  overlayId: "privacy-overlay",
  closeId: "privacy-close",
  linkId: "privacy-link",
  hash: "#privacy",
});
