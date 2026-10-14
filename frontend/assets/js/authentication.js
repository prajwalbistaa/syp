// Clerk is loaded from the CDN in index.html; wait for it before wiring auth UI.
window.addEventListener("load", async () => {
  await Clerk.load();

  // Shared styling for Clerk's hosted sign-in, sign-up, and user menu surfaces.
  const clerkAppearance = {
    variables: {
      colorPrimary: "#7661dc",
      colorText: "#30254a",
      colorTextSecondary: "#726a8b",
      colorBackground: "#f6f4fb",
      colorInputBackground: "#ffffff",
      colorInputText: "#30254a",
      borderRadius: "12px",
      fontFamily: '"Trebuchet MS", "Segoe UI", sans-serif',
    },
    elements: {
      modalBackdrop: "ordia-clerk-backdrop",
      modalContent: "ordia-clerk-modal",
      card: "ordia-clerk-card",
      headerTitle: "ordia-clerk-title",
      headerSubtitle: "ordia-clerk-subtitle",
      socialButtonsBlockButton: "ordia-clerk-social-button",
      formFieldLabel: "ordia-clerk-label",
      formFieldInput: "ordia-clerk-input",
      formButtonPrimary: "ordia-clerk-primary-button",
      footer: "ordia-clerk-footer",
      footerActionLink: "ordia-clerk-link",
      identityPreviewEditButton: "ordia-clerk-link",
      userButtonPopoverCard: "ordia-clerk-user-card",
      userButtonPopoverActionButton: "ordia-clerk-user-action",
    },
  };

  const signedOutControls = document.getElementById("signed-out-controls");
  const signedInControls = document.getElementById("signed-in-controls");
  const userButtonContainer = document.getElementById("clerk-user-button");
  const joinOrdiaButton = document.getElementById("join-ordia");
  const getStartedLink = document.getElementById("get-started-link");
  let userButtonMounted = false;

  // Signed-out visitors must authenticate before opening app features.
  document.addEventListener(
    "click",
    (event) => {
      const protectedTarget = event.target.closest("[data-auth-required]");
      const user = Clerk.user ?? Clerk.session?.user;

      if (!protectedTarget || user) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      Clerk.openSignUp({ appearance: clerkAppearance });
    },
    true,
  );

  const setControlVisibility = (element, visible) => {
    element.hidden = !visible;
    element.style.display = visible ? "flex" : "none";
  };

  const renderAuthControls = (resources) => {
    const user = resources?.user ?? Clerk.user ?? Clerk.session?.user;

    if (user) {
      setControlVisibility(signedOutControls, false);
      setControlVisibility(signedInControls, true);
      Clerk.closeSignIn();
      Clerk.closeSignUp();

      // Clerk user buttons should only be mounted once into the target element.
      if (!userButtonMounted) {
        Clerk.mountUserButton(userButtonContainer, {
          appearance: clerkAppearance,
        });
        userButtonMounted = true;
      }
    } else {
      setControlVisibility(signedOutControls, true);
      setControlVisibility(signedInControls, false);
    }
  };

  document
    .getElementById("clerk-sign-in")
    .addEventListener("click", () =>
      Clerk.openSignIn({ appearance: clerkAppearance }),
    );
  document
    .getElementById("clerk-sign-up")
    .addEventListener("click", () =>
      Clerk.openSignUp({ appearance: clerkAppearance }),
    );
  const openSignUp = (event) => {
    event.preventDefault();
    Clerk.openSignUp({ appearance: clerkAppearance });
  };

  joinOrdiaButton.addEventListener("click", openSignUp);
  getStartedLink.addEventListener("click", openSignUp);

  renderAuthControls();

  if (window.location.hash.toLowerCase() === "#getstarted") {
    Clerk.openSignUp({ appearance: clerkAppearance });
  }

  Clerk.addListener((resources) => renderAuthControls(resources));
});
