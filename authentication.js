lucide.createIcons();

window.addEventListener("load", async () => {
  await Clerk.load();

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
      footerActionLink: "ordia-clerk-link",
      identityPreviewEditButton: "ordia-clerk-link",
      userButtonPopoverCard: "ordia-clerk-user-card",
      userButtonPopoverActionButton: "ordia-clerk-user-action",
    },
  };

  const signedOutControls = document.getElementById("signed-out-controls");
  const signedInControls = document.getElementById("signed-in-controls");
  const userButtonContainer = document.getElementById("clerk-user-button");
  let userButtonMounted = false;

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

  renderAuthControls();

  if (!Clerk.user) {
    Clerk.openSignUp({ appearance: clerkAppearance });
  }

  Clerk.addListener((resources) => renderAuthControls(resources));
});
