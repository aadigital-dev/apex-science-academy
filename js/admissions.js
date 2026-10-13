
/* =========================================================
   APEX SCIENCE ACADEMY
   ADMISSIONS PAGE SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     ADMISSIONS FORM — SUPABASE CONNECTION
  ===================================================== */

  const admissionForm = document.getElementById("admissionForm");
  const formMessage = document.getElementById("formMessage");

  const submitUrl =
    "https://mmmhwamuixquhsjbtmaq.supabase.co/functions/v1/submit-admission";

  if (admissionForm && formMessage) {
    admissionForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (admissionForm.dataset.submitting === "true") {
        return;
      }

      const studentName =
        document.getElementById("studentName")?.value.trim() || "";

      const parentName =
        document.getElementById("parentName")?.value.trim() || "";

      const phone =
        document.getElementById("phone")?.value.trim() || "";

      const programme =
        document.getElementById("programme")?.value.trim() || "";

      const classLevel =
        document.getElementById("classLevel")?.value.trim() || "";

      const message =
        document.getElementById("message")?.value.trim() || "";

      formMessage.classList.add("show");
      formMessage.setAttribute("role", "status");

      if (
        !studentName ||
        !parentName ||
        !phone ||
        !programme ||
        !classLevel
      ) {
        formMessage.textContent =
          "Please complete the student name, parent/guardian name, phone number, programme and desired class.";

        return;
      }

      const submitButton = admissionForm.querySelector(
        'button[type="submit"]'
      );

      const originalButtonText = submitButton
        ? submitButton.innerHTML
        : "";

      admissionForm.dataset.submitting = "true";

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
      }

      formMessage.textContent = "Submitting your enquiry. Please wait.";

      try {
        const response = await fetch(submitUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentName,
            parentName,
            phone,
            programme,
            classLevel,
            message,
          }),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.success !== true) {
          throw new Error(
            result.error ||
              "We could not submit your enquiry. Please try again."
          );
        }

        formMessage.textContent =
          "Your enquiry was submitted successfully. Thank you for contacting APEX Science Academy Zaria.";

        admissionForm.reset();
      } catch (error) {
        console.error("Admissions submission error:", error);

        formMessage.textContent =
          error.message ||
          "Unable to submit your enquiry. Please check your internet connection and try again.";
      } finally {
        admissionForm.dataset.submitting = "false";

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
        }
      }
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
