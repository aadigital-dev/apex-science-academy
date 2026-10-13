/* ==========================================
   APEX SCIENCE ACADEMY
   FEEDBACK & COMPLAINTS WIDGET
   Homepage only
========================================== */

(() => {
    "use strict";

    // Prevent duplicate widgets.
    if (document.getElementById("apexFeedbackWidget")) return;

    // Only display this widget on the homepage.
    const path = window.location.pathname;
    const isHomePage =
        path.endsWith("/") ||
        path.endsWith("/index.html") ||
        path === "";

    if (!isHomePage) return;

    // School contact details.
    const SCHOOL_EMAIL = "muhammadabdulkadire664@gmail.com";
    const WHATSAPP_NUMBER = "2349063644891";

    // Remember when the introductory message was dismissed.
    const NOTICE_STORAGE_KEY = "apexFeedbackNoticeDismissed";

    const widget = document.createElement("div");
    widget.className = "feedback-widget";
    widget.id = "apexFeedbackWidget";

    widget.innerHTML = `
        <section
            class="feedback-notice"
            id="apexFeedbackNotice"
            aria-label="Feedback invitation"
            aria-hidden="true"
        >
            <button
                type="button"
                class="feedback-notice-close"
                id="apexFeedbackNoticeClose"
                aria-label="Dismiss message"
            >&times;</button>

            <h3>💬 We Value Your Feedback!</h3>

            <p>
                Have a suggestion, complaint, or question?
                We'd love to hear from you.
            </p>

            <button
                type="button"
                class="feedback-notice-action"
                id="apexFeedbackNoticeAction"
            >Send Feedback</button>
        </section>

        <section
            class="feedback-panel"
            id="apexFeedbackPanel"
            role="dialog"
            aria-modal="false"
            aria-labelledby="apexFeedbackTitle"
            aria-hidden="true"
            inert
        >
            <div class="feedback-panel-header">
                <div>
                    <h2 id="apexFeedbackTitle">
                        Feedback &amp; Complaints
                    </h2>
                    <p>APEX Science Academy Zaria</p>
                </div>

                <button
                    type="button"
                    class="feedback-panel-close"
                    id="apexFeedbackClose"
                    aria-label="Close feedback form"
                >&times;</button>
            </div>

            <form id="apexFeedbackForm">
                <div class="feedback-field">
                    <label for="apexFeedbackCategory">
                        What is your feedback about?
                    </label>

                    <select id="apexFeedbackCategory" required>
                        <option value="">Select a category</option>
                        <option value="Suggestion">Suggestion</option>
                        <option value="Complaint">Complaint</option>
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Compliment">Compliment</option>
                    </select>
                </div>

                <div class="feedback-field">
                    <label for="apexFeedbackName">
                        Your name (optional)
                    </label>

                    <input
                        type="text"
                        id="apexFeedbackName"
                        maxlength="100"
                        autocomplete="name"
                        placeholder="Enter your name"
                    >
                </div>

                <div class="feedback-field">
                    <label for="apexFeedbackContact">
                        Your email or phone (optional)
                    </label>

                    <input
                        type="text"
                        id="apexFeedbackContact"
                        maxlength="150"
                        autocomplete="email"
                        placeholder="How can we contact you?"
                    >
                </div>

                <div class="feedback-field">
                    <label for="apexFeedbackMessage">
                        Your message
                    </label>

                    <textarea
                        id="apexFeedbackMessage"
                        required
                        minlength="3"
                        maxlength="3000"
                        placeholder="Tell us how we can help..."
                    ></textarea>
                </div>

                <p class="feedback-send-title">
                    Choose how to send your message
                </p>

                <div class="feedback-send-options">
                    <button
                        type="button"
                        class="feedback-send-button feedback-whatsapp"
                        id="apexFeedbackWhatsApp"
                    >Send via WhatsApp</button>

                    <button
                        type="button"
                        class="feedback-send-button feedback-email"
                        id="apexFeedbackEmail"
                    >Send via Email</button>
                </div>

                <p
                    class="feedback-status"
                    id="apexFeedbackStatus"
                    role="status"
                    aria-live="polite"
                ></p>

                <p class="feedback-privacy">
                    Please avoid including passwords or other sensitive
                    personal information. Your selected messaging or
                    email app will handle the final sending step.
                </p>
            </form>
        </section>

        <button
            type="button"
            class="feedback-toggle"
            id="apexFeedbackToggle"
            aria-label="Open feedback and complaints"
            aria-expanded="false"
            aria-controls="apexFeedbackPanel"
        >
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
            >
                <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8
                    8.5 8.5 0 0 1-7.6 4.7
                    8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7
                    a8.4 8.4 0 0 1-.9-3.8
                    8.5 8.5 0 0 1 4.7-7.6
                    8.4 8.4 0 0 1 3.8-.9h.5
                    a8.5 8.5 0 0 1 8 8v.5z"
                ></path>
            </svg>
        </button>
    `;

    document.body.appendChild(widget);

    const notice = document.getElementById("apexFeedbackNotice");
    const noticeClose = document.getElementById("apexFeedbackNoticeClose");
    const noticeAction = document.getElementById("apexFeedbackNoticeAction");

    const panel = document.getElementById("apexFeedbackPanel");
    const toggle = document.getElementById("apexFeedbackToggle");
    const closeButton = document.getElementById("apexFeedbackClose");

    const form = document.getElementById("apexFeedbackForm");
    const category = document.getElementById("apexFeedbackCategory");
    const name = document.getElementById("apexFeedbackName");
    const contact = document.getElementById("apexFeedbackContact");
    const message = document.getElementById("apexFeedbackMessage");

    const whatsappButton = document.getElementById("apexFeedbackWhatsApp");
    const emailButton = document.getElementById("apexFeedbackEmail");
    const status = document.getElementById("apexFeedbackStatus");

    let noticeTimer;

    function setStatus(text) {
        status.textContent = text;
    }

    function openPanel() {
        clearTimeout(noticeTimer);

        notice.classList.remove("is-visible");
        notice.setAttribute("aria-hidden", "true");

        panel.inert = false;
        panel.classList.add("is-open");
        panel.setAttribute("aria-hidden", "false");

        toggle.setAttribute("aria-expanded", "true");

        window.setTimeout(() => category.focus(), 100);
    }

    function closePanel() {
        panel.classList.remove("is-open");
        panel.setAttribute("aria-hidden", "true");
        panel.inert = true;

        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
    }

    function dismissNotice() {
        notice.classList.remove("is-visible");
        notice.setAttribute("aria-hidden", "true");

        try {
            localStorage.setItem(NOTICE_STORAGE_KEY, "yes");
        } catch (error) {
            // The widget remains usable if storage is unavailable.
        }
    }

    function getFeedbackData() {
        if (!form.reportValidity()) return null;

        return {
            category: category.value.trim(),
            name: name.value.trim(),
            contact: contact.value.trim(),
            message: message.value.trim()
        };
    }

    function buildFeedbackText(data) {
        return [
            "APEX SCIENCE ACADEMY ZARIA",
            "Feedback & Complaints",
            "",
            "Category: " + data.category,
            "Name: " + (data.name || "Not provided"),
            "Contact: " + (data.contact || "Not provided"),
            "",
            "Message:",
            data.message
        ].join("\n");
    }

    whatsappButton.addEventListener("click", () => {
        const data = getFeedbackData();
        if (!data) return;

        const text = buildFeedbackText(data);

        const url =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(text);

        setStatus(
            "WhatsApp is opening. Review your message and press Send there."
        );

        window.open(url, "_blank", "noopener,noreferrer");
    });

    emailButton.addEventListener("click", () => {
        const data = getFeedbackData();
        if (!data) return;

        const subject = encodeURIComponent(
            "APEX Science Academy - " + data.category
        );

        const body = encodeURIComponent(buildFeedbackText(data));

        const url =
            "mailto:" +
            SCHOOL_EMAIL +
            "?subject=" +
            subject +
            "&body=" +
            body;

        setStatus(
            "Your email app should open with the message prepared. Send it from that app."
        );

        window.location.href = url;
    });

    toggle.addEventListener("click", () => {
        if (panel.classList.contains("is-open")) {
            closePanel();
        } else {
            openPanel();
        }
    });

    noticeAction.addEventListener("click", openPanel);

    noticeClose.addEventListener("click", dismissNotice);

    closeButton.addEventListener("click", closePanel);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (panel.classList.contains("is-open")) {
                closePanel();
            } else if (notice.classList.contains("is-visible")) {
                dismissNotice();
            }
        }
    });

    // Display the attention message unless it was dismissed previously.
    let noticeWasDismissed = false;

    try {
        noticeWasDismissed =
            localStorage.getItem(NOTICE_STORAGE_KEY) === "yes";
    } catch (error) {
        // Continue normally if browser storage is unavailable.
    }

    if (!noticeWasDismissed) {
        window.setTimeout(() => {
            if (panel.classList.contains("is-open")) return;

            notice.classList.add("is-visible");
            notice.setAttribute("aria-hidden", "false");

            noticeTimer = window.setTimeout(() => {
                notice.classList.remove("is-visible");
                notice.setAttribute("aria-hidden", "true");
            }, 8000);
        }, 1500);
    }
})();
