/* ============================================================
   APEX SCIENCE ACADEMY
   ANIMATIONS
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ========================================================
       SCROLL REVEAL
    ======================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  } else {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");

          observerInstance.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,

        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  }

  /* ========================================================
       STATISTICS COUNTERS
    ======================================================== */

  const statNumbers = document.querySelectorAll(".stat-number");

  if (!statNumbers.length) {
    return;
  }

  const animateCounter = (element) => {
    const target = Number(element.dataset.count);

    if (Number.isNaN(target)) {
      return;
    }

    const duration = 1600;

    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      /*
                Smooth ease-out.
            */

      const eased = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(target * eased);

      element.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(updateCounter);
  };

  /* ========================================================
       OBSERVE STATISTICS
    ======================================================== */

  if ("IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          animateCounter(entry.target);

          observerInstance.unobserve(entry.target);
        });
      },
      {
        threshold: 0.5,
      },
    );

    statNumbers.forEach((number) => {
      statsObserver.observe(number);
    });
  } else {
    statNumbers.forEach((number) => {
      number.textContent = Number(number.dataset.count).toLocaleString();
    });
  }
});
/* =========================================================
   DYNAMIC CARD ACCENTS
   ========================================================= */

const dynamicCards = document.querySelectorAll(".dynamic-card");

const accentColors = [
  {
    accent: "rgba(77,141,255,.32)",
    glow: "rgba(77,141,255,.12)",
  },
  {
    accent: "rgba(130,108,255,.32)",
    glow: "rgba(130,108,255,.12)",
  },
  {
    accent: "rgba(112,168,255,.32)",
    glow: "rgba(112,168,255,.10)",
  },
];

dynamicCards.forEach((card, index) => {
  const color = accentColors[index % accentColors.length];

  card.style.setProperty("--card-accent", color.accent);
  card.style.setProperty("--card-glow", color.glow);

  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -4;
    const rotateY = (x / rect.width - 0.5) * 4;

    card.style.transform = `translateY(-8px) perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});
