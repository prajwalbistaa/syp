const faqsLink = document.getElementById("faqs-link");
const faqOverlay = document.getElementById("faq-overlay");
const faqSection = document.getElementById("faq-section");
const faqClose = document.getElementById("faq-close");
const faqList = document.getElementById("faq-list");

const faqItems = [
  {
    question: "What is Ordia?",
    answer:
      "Ordia is a learning management platform designed to help you organise your learning journey. You can create learning plans, explore plans shared by other users, manage your activities, and track your progress.",
  },
  {
    question: "How do I use Ordia?",
    answer:
      "Start by visiting your Dashboard to review your learning progress. Open Learning Plan to create and organise your learning plans, Community to explore plans shared by other users, and To-Do List to manage your activities. You can also use the Focus from the topbar and visit Plans to review the available subscription options.",
  },
  {
    question: "How do I create a learning plan?",
    answer:
      "Open Learning Plan from the sidebar and select the option to create a new plan. Give your plan a meaningful name based on what you want to learn, then organise the relevant topics and learning resources within it using the available features. Return to your plan as you progress through your learning journey.",
  },
  {
    question: "How can I track my learning progress?",
    answer:
      "Open Dashboard from the sidebar to view your learning progress. Use it to review your progress towards your learning goals. Keep your learning plans and activities updated so that the information shown by Ordia reflects your current progress.",
  },
  {
    question: "What is the Community section?",
    answer:
      "Community allows you to explore learning plans shared by other Ordia users. You can browse their learning approaches, discover ideas, and find inspiration for organising your own learning journey.",
  },
  {
    question: "How do I use the To-Do List?",
    answer:
      "Open To-Do List from the sidebar to add and manage activities you want to complete. Use it to organise your upcoming tasks and keep your learning activities manageable.",
  },
  {
    question: "How do I use the Focus?",
    answer:
      "Click the Focus option in the topbar to access the timer. Select a timer plan for the amount of time you want to focus and start your session. Use this feature to dedicate a specific period to studying or completing a task.",
  },
  {
    question: "What is the difference between Free and Premium?",
    answer:
      "Ordia provides Free and Premium subscription options. Open Plans from the topbar to review the available plans, features, and pricing. Compare the details displayed there before deciding which option suits your needs.",
  }
];

let openFaqIndex = null;

const renderFaqs = () => {
  faqList.innerHTML = faqItems
    .map(({ question, answer }) => {
      const originalIndex = faqItems.findIndex(
        (item) => item.question === question,
      );
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
  history.replaceState(null, "", window.location.pathname);
};

faqsLink.addEventListener("click", (event) => {
  event.preventDefault();
  showFaqSection();
  history.replaceState(null, "", "#faqs");
});

faqClose.addEventListener("click", hideFaqSection);

faqOverlay.addEventListener("click", (event) => {
  if (event.target === faqOverlay) hideFaqSection();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !faqOverlay.hidden) hideFaqSection();
});

faqList.addEventListener("click", (event) => {
  const questionButton = event.target.closest(".faq-question");
  if (!questionButton) return;

  const clickedIndex = Number(questionButton.dataset.faqIndex);
  openFaqIndex = openFaqIndex === clickedIndex ? null : clickedIndex;
  renderFaqs();
});

renderFaqs();

if (window.location.hash === "#faqs") showFaqSection();