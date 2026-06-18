(function (root) {
  const weddingDate = new Date("2026-08-15T00:00:00+07:00");

  function getCountdownParts(targetDate, currentDate = new Date()) {
    const difference = Math.max(0, targetDate.getTime() - currentDate.getTime());
    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = String(value).padStart(2, "0");
  }

  function updateCountdown() {
    const parts = getCountdownParts(weddingDate);
    setText("[data-countdown-days]", parts.days);
    setText("[data-countdown-hours]", parts.hours);
    setText("[data-countdown-minutes]", parts.minutes);
    setText("[data-countdown-seconds]", parts.seconds);
  }

  function initReveal() {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    elements.forEach((element) => observer.observe(element));
  }

  function initGuestForm() {
    const form = document.querySelector("[data-guest-form]");
    const successMessage = document.querySelector("[data-success-message]");
    if (!form || !successMessage) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      successMessage.hidden = false;
      form.reset();
      successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function initLocationMap() {
    const toggle = document.querySelector("[data-map-toggle]");
    const map = document.querySelector("[data-location-map]");
    if (!toggle || !map) return;

    toggle.addEventListener("click", () => {
      map.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      map.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function init() {
    if (typeof document === "undefined") return;
    updateCountdown();
    setInterval(updateCountdown, 1000);
    initReveal();
    initGuestForm();
    initLocationMap();
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { getCountdownParts };
  } else {
    root.getCountdownParts = getCountdownParts;
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
})(typeof window !== "undefined" ? window : globalThis);
