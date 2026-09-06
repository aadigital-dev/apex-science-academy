/* ============================================================
   APEX SCIENCE ACADEMY
   MAIN JAVASCRIPT
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ========================================================
       PAGE LOADER
    ======================================================== */

  const pageLoader = document.getElementById("pageLoader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (pageLoader) {
        pageLoader.classList.add("loaded");
      }
    }, 350);
  });

  /* ========================================================
       HEADER SCROLL
    ======================================================== */

  const siteHeader = document.getElementById("siteHeader");

  const handleHeaderScroll = () => {
    if (!siteHeader) return;

    if (window.scrollY > 30) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  handleHeaderScroll();

  /* ========================================================
       BACK TO TOP
    ======================================================== */

  const backToTop = document.getElementById("backToTop");

  const handleBackToTop = () => {
    if (!backToTop) return;

    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", handleBackToTop, { passive: true });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* ========================================================
       DYNAMIC YEARS OPERATING
       School started January 2009.
    ======================================================== */

  const yearsOperating = document.getElementById("yearsOperating");

  if (yearsOperating) {
    const currentYear = new Date().getFullYear();

    const startYear = 2009;

    const years = currentYear - startYear;

    yearsOperating.textContent = `${years}+`;
  }
});
