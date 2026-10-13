const plansLink = document.getElementById("plans-link");
const plansOverlay = document.getElementById("plans-overlay");
const plansClose = document.getElementById("plans-close");
const pricingCards = document.getElementById("pricing-cards");
const planSelectionStatus = document.getElementById("plan-selection-status");

const planOptions = [
  {
    id: "free",
    name: "Free",
    icon: "sprout",
    price: "Rs.0",
    period: "forever",
    description: "A simple starting point for building your learning habit.",
    features: [
      "Dashboard progress",
      "Two learning plans",
      "To-Do List",
      "Focus Timer",
    ],
  },
  {
    id: "monthly",
    name: "Monthly",
    icon: "zap",
    price: "Rs.99",
    period: "/ month",
    description: "Flexible access for learners who prefer monthly billing.",
    features: [
      "Everything of Free Plan",
      "Five learning plans",
      "Community plan discovery",
    ],
  },
  {
    id: "yearly",
    name: "Yearly",
    icon: "crown",
    price: "Rs.499",
    period: "/ year",
    description: "The best value for a full year of consistent learning.",
    features: [
      "Everything of Monthly Plan",
      "Unlimited learning plans",
      "AI agent features",
    ],
    popular: true,
  },
];

let selectedPlan = null;

const renderPlans = () => {
  pricingCards.innerHTML = planOptions
    .map(
      (plan) => `
        <article class="plan-card${plan.popular ? " is-popular" : ""}${selectedPlan === plan.id ? " is-selected" : ""}">
          ${plan.popular ? '<span class="plan-badge">Most popular</span>' : ""}
          <div class="plan-icon"><i data-lucide="${plan.icon}" aria-hidden="true"></i></div>
          <h2>${plan.name}</h2>
          <p class="plan-description">${plan.description}</p>
          <div class="plan-price"><strong>${plan.price}</strong><span>${plan.period}</span></div>
          <ul class="plan-features">
            ${plan.features.map((feature) => `<li><i data-lucide="check" aria-hidden="true"></i>${feature}</li>`).join("")}
          </ul>
          <button class="plan-button${plan.popular ? " primary" : ""}" type="button" data-plan-id="${plan.id}" aria-pressed="${selectedPlan === plan.id}">
            ${selectedPlan === plan.id ? "Selected" : `Choose ${plan.name}`}
          </button>
        </article>`,
    )
    .join("");

  lucide.createIcons();
};

const showPlans = () => {
  plansOverlay.hidden = false;
  document.body.classList.add("faq-open");
  document.querySelectorAll(".topbar-link").forEach((link) => {
    link.classList.toggle("current", link === plansLink);
  });
  plansClose.focus();
};

const hidePlans = () => {
  plansOverlay.hidden = true;
  document.body.classList.remove("faq-open");
  plansLink.classList.remove("current");
  history.replaceState(null, "", window.location.pathname);
};

plansLink.addEventListener("click", (event) => {
  event.preventDefault();
  showPlans();
  history.replaceState(null, "", "#plans");
});

plansClose.addEventListener("click", hidePlans);

plansOverlay.addEventListener("click", (event) => {
  if (event.target === plansOverlay) hidePlans();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !plansOverlay.hidden) hidePlans();
});

pricingCards.addEventListener("click", (event) => {
  const button = event.target.closest("[data-plan-id]");
  if (!button) return;

  selectedPlan = button.dataset.planId;
  const plan = planOptions.find((option) => option.id === selectedPlan);
  planSelectionStatus.textContent = `${plan.name} plan selected. You can continue exploring Ordia.`;
  planSelectionStatus.hidden = false;
  renderPlans();
});

renderPlans();

if (window.location.hash === "#plans") showPlans();
