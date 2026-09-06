/* =========================================================
   APEX SCIENCE ACADEMY
   ADMISSIONS PAGE SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       ADMISSION ENQUIRY DEMO
    ===================================================== */

  const admissionForm = document.getElementById("admissionForm");

  const formMessage = document.getElementById("formMessage");

  if (admissionForm && formMessage) {
    admissionForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const studentName = document.getElementById("studentName")?.value.trim();

      const programme = document.getElementById("programme")?.value.trim();

      if (!studentName || !programme) {
        formMessage.textContent =
          "Please enter the student's name and select a programme of interest.";

        formMessage.classList.add("show");

        return;
      }

      formMessage.textContent =
        "Your enquiry has been prepared successfully. The official submission connection will be added in a later development stage.";

      formMessage.classList.add("show");

      admissionForm.reset();
    });
  }

  /* =====================================================
       SMOOTH ANCHOR FALLBACK
    ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
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
