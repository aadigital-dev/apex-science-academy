/* ============================================================
   APEX SCIENCE ACADEMY
   NEWS PAGE JAVASCRIPT
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ========================================================
       NEWS FILTER
       ======================================================== */

  const filterButtons = document.querySelectorAll(".filter-button");

  const newsCards = document.querySelectorAll(".news-card");

  const newsEmpty = document.getElementById("newsEmpty");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      /* Update active button */

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      let visibleCards = 0;

      /* Filter cards */

      newsCards.forEach((card) => {
        const category = card.dataset.category;

        const shouldShow =
          selectedFilter === "all" || category === selectedFilter;

        if (shouldShow) {
          card.style.display = "";

          visibleCards++;

          /* Small entrance animation */

          card.animate(
            [
              {
                opacity: 0,
                transform: "translateY(15px)",
              },
              {
                opacity: 1,
                transform: "translateY(0)",
              },
            ],
            {
              duration: 350,
              easing: "ease-out",
            },
          );
        } else {
          card.style.display = "none";
        }
      });

      /* Empty state */

      if (visibleCards === 0) {
        newsEmpty.classList.add("visible");
      } else {
        newsEmpty.classList.remove("visible");
      }
    });
  });

  /* ========================================================
       READ MORE DEMO
       ======================================================== */

  const readButtons = document.querySelectorAll(
    ".news-read-more, .text-button",
  );

  readButtons.forEach((button) => {
    button.addEventListener("click", () => {
      /*
                These are currently demonstration buttons.

                Later, each news article can link to its own
                article page, for example:

                news/waec-success.html
                news/school-event.html
                news/islamiyyah-update.html
            */

      alert(
        "This news article page will be added when the APEX News system is connected.",
      );
    });
  });

  /* ========================================================
       CURRENT YEAR
       ======================================================== */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* ========================================================
       HERO IMAGE READY
       ======================================================== */

  /*
        When the real school photo is available,
        change the CSS in news.css:

        background-image:
            url("../images/news-hero.jpg");

        No JavaScript changes are required.
    */

  /* ========================================================
       REDUCED MOTION
       ======================================================== */

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) {
    document.querySelectorAll(".news-card, .event-card").forEach((element) => {
      element.style.transition = "none";
    });
  }
});
