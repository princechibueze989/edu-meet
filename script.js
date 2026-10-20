
// =========================================
// EDU-MEET — INTERACTIONS
// Mobile menu, scroll reveals
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const backToTop = document.getElementById("backToTop");
  const currentYear = document.getElementById("currentYear");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // -----------------------------------------
  // 1. MOBILE NAVIGATION
  // -----------------------------------------

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navLinks.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation menu" : "Close navigation menu"
      );

      navLinks.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) {
        closeMenu();
      }
    });
  }

  // -----------------------------------------
  // 2. SCROLL REVEAL ANIMATIONS
  // -----------------------------------------

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // -----------------------------------------
  // 3. BACK-TO-TOP BUTTON
  // -----------------------------------------

  function updateBackToTop() {
    if (!backToTop) return;

    backToTop.classList.toggle(
      "visible",
      window.scrollY > 450
    );
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });
  }

  // -----------------------------------------
  // 4. CURRENT YEAR IN FOOTER
  // -----------------------------------------

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // -----------------------------------------
  // 5. APP STORE PLACEHOLDER LINKS
  // -----------------------------------------
  // The app store destinations are not available
  // until the Edu-Meet apps are published.
  // Prevent placeholder links from jumping to the top.

  document.querySelectorAll("[data-store]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const storeName =
        link.dataset.store === "google"
          ? "Google Play"
          : "Apple App Store";

      alert(
        `${storeName} download link is not available yet. ` +
        "It can be activated when the Edu-Meet app is published."
      );
    });
  });

  // -----------------------------------------
  // 6. FAQ ACCORDION
  // -----------------------------------------
  // Keeps the FAQ tidy by opening one answer at a time.

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });
});
