const faqsLink = document.getElementById("faqs-link");
const faqOverlay = document.getElementById("faq-overlay");
const faqClose = document.getElementById("faq-close");
const faqList = document.getElementById("faq-list");

// FAQ content lives in faq-data.js so copy can change without touching behavior.
const faqItems = window.ordiaFaqItems ?? [];

let openFaqIndex = null;

const renderFaqs = () => {
  // Re-rendering keeps the accordion state and ARIA attributes in sync.
  faqList.innerHTML = faqItems
    .map(({ question, answer }, originalIndex) => {
      const isOpen = originalIndex === openFaqIndex;
      const answerId = `faq-answer-${originalIndex}`;

      return `<article class="faq-item${isOpen ? " is-open" : ""}">
        <button id="faq-question-${originalIndex}" class="faq-question" type="button" aria-expanded="${isOpen}" aria-controls="${answerId}" data-faq-index="${originalIndex}">
          <span>${question}</span>
          <i data-lucide="chevron-down" aria-hidden="true"></i>
        </button>
        <div id="${answerId}" class="faq-answer" role="region" aria-labelledby="faq-question-${originalIndex}">
          <p>${answer}</p>
        </div>
      </article>`;
    })
    .join("");

  lucide.createIcons();
};

const showFaqSection = () => {
  // Lock page scroll while the modal is open.
  faqOverlay.hidden = false;
  document.body.classList.add("faq-open");
  document.querySelectorAll(".topbar-link").forEach((link) => {
    link.classList.toggle("current", link === faqsLink);
  });
  faqClose.focus();
};

const hideFaqSection = () => {
  faqOverlay.hidden = true;
  document.body.classList.remove("faq-open");
  faqsLink.classList.remove("current");

  // Clear the hash so refreshes do not reopen the FAQ dialog.
  history.replaceState(null, "", window.location.pathname);
};

faqsLink.addEventListener("click", (event) => {
  event.preventDefault();
  showFaqSection();
  history.replaceState(null, "", "#faqs");
});

faqClose.addEventListener("click", hideFaqSection);

faqOverlay.addEventListener("click", (event) => {
  // Only backdrop clicks close the dialog; clicks inside the FAQ panel stay open.
  if (event.target === faqOverlay) hideFaqSection();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !faqOverlay.hidden) hideFaqSection();
});

faqList.addEventListener("click", (event) => {
  // Event delegation keeps the listener stable as FAQ items are re-rendered.
  const questionButton = event.target.closest(".faq-question");
  if (!questionButton) return;

  const clickedIndex = Number(questionButton.dataset.faqIndex);
  openFaqIndex = openFaqIndex === clickedIndex ? null : clickedIndex;
  renderFaqs();
});

renderFaqs();

// Allow direct links to frontend/index.html#faqs.
if (window.location.hash === "#faqs") showFaqSection();
