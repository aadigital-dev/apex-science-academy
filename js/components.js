/* ============================================================
   APEX SCIENCE ACADEMY
   INTERACTIVE COMPONENTS
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ========================================================
       QUICK ACCESS MENU
    ======================================================== */

  const quickAccess = document.querySelector(".quick-access");

  const quickAccessBtn = document.getElementById("quickAccessBtn");

  if (quickAccess && quickAccessBtn) {
    quickAccessBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = quickAccess.classList.toggle("open");

      quickAccessBtn.setAttribute("aria-expanded", isOpen);
    });

    document.addEventListener("click", (event) => {
      if (!quickAccess.contains(event.target)) {
        quickAccess.classList.remove("open");

        quickAccessBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ========================================================
       MOBILE MENU
    ======================================================== */

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");

  const mobileNav = document.getElementById("mobileNav");

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileMenuBtn.classList.toggle("open");

      mobileNav.classList.toggle("open", isOpen);

      mobileMenuBtn.setAttribute("aria-expanded", isOpen);

      mobileMenuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu",
      );
    });

    /* Close mobile menu after clicking a link */

    const mobileLinks = mobileNav.querySelectorAll("a");

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("open");

        mobileNav.classList.remove("open");

        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ========================================================
       DYNAMIC CARD POINTER EFFECT
    ======================================================== */

  const dynamicCards = document.querySelectorAll(".dynamic-card");

  dynamicCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      const rotateX = (y / rect.height - 0.5) * -4;

      const rotateY = (x / rect.width - 0.5) * 4;

      card.style.setProperty("--pointer-x", `${x}px`);

      card.style.setProperty("--pointer-y", `${y}px`);

      card.style.transform = `translateY(-8px)
                     perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

  /* ========================================================
       SMOOTH INTERNAL LINKS
    ======================================================== */

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});
