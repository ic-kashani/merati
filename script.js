(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var menuToggle = document.querySelector(".menu-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var revealEls = document.querySelectorAll(
    ".section-head, .service-card, .gallery-item, .about-text, .about-portrait, .contact-info, .contact-form"
  );
  revealEls.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Toon dankbericht na succesvol verzenden via FormSubmit (?sent=1).
  if (window.location.search.indexOf("sent=1") !== -1) {
    var form = document.querySelector(".contact-form");
    if (form) {
      var thanks = document.createElement("div");
      thanks.className = "form-thanks";
      thanks.innerHTML = "<strong>Bedankt voor uw aanvraag.</strong><br />Behrouz neemt binnen 24u contact met u op.";
      form.parentNode.insertBefore(thanks, form);
      form.style.display = "none";
      thanks.scrollIntoView({ behavior: "smooth", block: "center" });
      try { history.replaceState({}, "", window.location.pathname); } catch (e) {}
    }
  }
})();