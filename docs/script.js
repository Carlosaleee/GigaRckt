/* global emailjs, SITE_DATA */

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderNav() {
  const nav = document.getElementById("main-nav");
  if (!nav || !window.SITE_DATA) return;
  const { sections } = SITE_DATA;
  nav.innerHTML = sections
    .map(
      (s) =>
        `<a href="#${escapeHtml(s.id)}">${escapeHtml(s.navLabel)}</a>`
    )
    .join("");
}

function renderFooterLinks() {
  const el = document.getElementById("footer-social");
  if (!el || !SITE_DATA.footerLinks) return;
  el.innerHTML = SITE_DATA.footerLinks
    .map((link) => {
      const rel = link.external ? ' rel="noopener noreferrer"' : "";
      const target = link.external ? ' target="_blank"' : "";
      return `<a href="${escapeHtml(link.href)}"${target}${rel}>${escapeHtml(link.label)}</a>`;
    })
    .join("");
}

function renderEventTypes() {
  const container = document.getElementById("event-type-cards");
  if (!container || !SITE_DATA.eventTypes) return;
  const types = SITE_DATA.eventTypes;
  container.innerHTML = types
    .map((t, i) => {
      const required = i === 0 ? " required" : "";
      return `
        <label class="event-card">
          <input type="radio" name="tipo_evento" value="${escapeHtml(t.value)}"${required}>
          <span>${escapeHtml(t.label)}</span>
        </label>`;
    })
    .join("");
}

function renderCredits() {
  const el = document.getElementById("footer-credits");
  if (!el || !SITE_DATA.credits) return;
  const c = SITE_DATA.credits;
  el.innerHTML = `
    <span><span class="design-by">Design by</span> ${escapeHtml(c.designBy)}</span>
    <a href="tel:${escapeHtml(c.phone)}" class="phone-link">${escapeHtml(c.phoneDisplay)}</a>`;
}

function slideSection(s) {
  return `
    <section id="${escapeHtml(s.id)}" class="page" data-section-kind="slide">
      <img src="${escapeHtml(s.image)}" alt="${escapeHtml(s.alt)}" loading="lazy" decoding="async">
    </section>`;
}

function differentialsSection(s) {
  const items = (s.bullets || [])
    .map(
      (b, i) => `
      <div class="diff-item">
        <button type="button" class="diff-toggle" aria-expanded="false" aria-controls="diff-panel-${s.id}-${i}" id="diff-btn-${s.id}-${i}">
          <span class="diff-toggle-title">${escapeHtml(b.title)}</span>
          <span class="diff-chevron" aria-hidden="true">▼</span>
        </button>
        <div class="diff-panel" id="diff-panel-${s.id}-${i}" hidden role="region">
          <p>${escapeHtml(b.text)}</p>
        </div>
      </div>`
    )
    .join("");

  return `
    <section id="${escapeHtml(s.id)}" class="page page-rich page-differentials" data-section-kind="differentials">
      <div class="rich-inner rich-stack">
        <div class="rich-visual full-width">
          <img src="${escapeHtml(s.image)}" alt="${escapeHtml(s.alt)}" loading="lazy" decoding="async">
        </div>
        <div class="rich-body rich-body--text">
          <h2 class="section-headline">${escapeHtml(s.headline || "")}</h2>
          <div class="diff-accordion">${items}</div>
        </div>
      </div>
    </section>`;
}

function servicesSection(s) {
  const cards = (s.services || [])
    .map(
      (svc, i) => `
      <article class="service-card" data-index="${i}">
        <button type="button" class="service-card-btn" aria-expanded="false">
          <span class="service-card-title">${escapeHtml(svc.title)}</span>
          <span class="service-card-hint">Detalhes</span>
        </button>
        <div class="service-card-body" hidden>
          <p>${escapeHtml(svc.text)}</p>
        </div>
      </article>`
    )
    .join("");

  return `
    <section id="${escapeHtml(s.id)}" class="page page-rich page-services" data-section-kind="services">
      <div class="rich-inner rich-stack">
        <div class="rich-visual full-width">
          <img src="${escapeHtml(s.introImage)}" alt="${escapeHtml(s.introAlt || "")}" loading="lazy" decoding="async">
        </div>
        <div class="rich-body rich-body--text">
          <h2 class="section-headline">${escapeHtml(s.headline || "")}</h2>
          <div class="service-grid">${cards}</div>
        </div>
      </div>
    </section>`;
}

function partnersSection(s) {
  const chips = (s.partners || [])
    .map(
      (p) => `
      <span class="partner-chip" title="${escapeHtml(p.tag)}">
        <span class="partner-name">${escapeHtml(p.name)}</span>
        <span class="partner-tag">${escapeHtml(p.tag)}</span>
      </span>`
    )
    .join("");

  return `
    <section id="${escapeHtml(s.id)}" class="page page-rich page-partners" data-section-kind="partners">
      <div class="rich-inner rich-stack">
        <div class="rich-visual full-width">
          <img src="${escapeHtml(s.image)}" alt="${escapeHtml(s.alt)}" loading="lazy" decoding="async">
        </div>
        <div class="rich-body rich-body--text">
          <h2 class="section-headline">${escapeHtml(s.headline || "")}</h2>
          <p class="section-subline">${escapeHtml(s.subline || "")}</p>
          <div class="partner-cloud">${chips}</div>
        </div>
      </div>
    </section>`;
}

function testimonialsSection(s) {
  const items = s.testimonials || [];
  const slides = items
    .map(
      (t, i) => `
      <blockquote class="testimonial-slide" data-slide="${i}" ${i === 0 ? "" : 'hidden aria-hidden="true"'}>
        <p class="testimonial-quote">“${escapeHtml(t.quote)}”</p>
        <footer>
          <cite class="testimonial-author">${escapeHtml(t.author)}</cite>
          <span class="testimonial-company">${escapeHtml(t.company)}</span>
        </footer>
      </blockquote>`
    )
    .join("");

  const dots = items
    .map(
      (_, i) =>
        `<button type="button" class="carousel-dot${i === 0 ? " active" : ""}" data-slide-to="${i}" aria-label="Depoimento ${i + 1}"></button>`
    )
    .join("");

  return `
    <section id="${escapeHtml(s.id)}" class="page page-rich page-testimonials" data-section-kind="testimonials">
      <div class="rich-inner rich-stack">
        <div class="rich-visual full-width">
          <img src="${escapeHtml(s.image)}" alt="${escapeHtml(s.alt)}" loading="lazy" decoding="async">
        </div>
        <div class="rich-body rich-body--text">
          <h2 class="section-headline">${escapeHtml(s.headline || "")}</h2>
          <div class="testimonial-carousel" data-count="${items.length}">
            <div class="testimonial-viewport">${slides}</div>
            <div class="testimonial-controls">
              <button type="button" class="carousel-prev" aria-label="Depoimento anterior">‹</button>
              ${dots}
              <button type="button" class="carousel-next" aria-label="Próximo depoimento">›</button>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

function renderSections() {
  const main = document.getElementById("main-sections");
  if (!main || !window.SITE_DATA) return;

  const html = SITE_DATA.sections
    .map((s) => {
      switch (s.kind) {
        case "slide":
          return slideSection(s);
        case "differentials":
          return differentialsSection(s);
        case "services":
          return servicesSection(s);
        case "partners":
          return partnersSection(s);
        case "testimonials":
          return testimonialsSection(s);
        default:
          return slideSection(s);
      }
    })
    .join("");

  main.innerHTML = html;
  if (SITE_DATA.meta && SITE_DATA.meta.title) {
    document.title = SITE_DATA.meta.title;
  }
}

function bindDifferentialAccordions() {
  document.querySelectorAll(".diff-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel) return;

      btn.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
      btn.closest(".diff-item").classList.toggle("is-open", !expanded);
    });
  });
}

function bindServiceCards() {
  document.querySelectorAll(".service-card-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const card = btn.closest(".service-card");
      const body = card && card.querySelector(".service-card-body");
      if (!body) return;
      btn.setAttribute("aria-expanded", String(!expanded));
      body.hidden = expanded;
      btn.closest(".service-card").classList.toggle("is-open", !expanded);
    });
  });
}

function initTestimonialCarousels() {
  document.querySelectorAll(".testimonial-carousel").forEach((root) => {
    const slides = root.querySelectorAll(".testimonial-slide");
    const dots = root.querySelectorAll(".carousel-dot");
    const prev = root.querySelector(".carousel-prev");
    const next = root.querySelector(".carousel-next");
    let idx = 0;
    const n = slides.length;
    if (n < 2) {
      if (prev) prev.style.display = "none";
      if (next) next.style.display = "none";
      dots.forEach((d) => (d.style.display = "none"));
      return;
    }

    function show(i) {
      idx = (i + n) % n;
      slides.forEach((el, j) => {
        const on = j === idx;
        el.hidden = !on;
        if (on) el.removeAttribute("aria-hidden");
        else el.setAttribute("aria-hidden", "true");
      });
      dots.forEach((d, j) => d.classList.toggle("active", j === idx));
    }

    prev.addEventListener("click", () => show(idx - 1));
    next.addEventListener("click", () => show(idx + 1));
    dots.forEach((d) => {
      d.addEventListener("click", () => show(parseInt(d.getAttribute("data-slide-to"), 10)));
    });
  });
}

function initScrollObservers() {
  const pages = document.querySelectorAll(".page");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );
  pages.forEach((page) => observer.observe(page));

  const footerNav = document.querySelector(".footer-nav");
  if (footerNav) {
    const observerFooter = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footerNav.classList.add("show");
        }
      });
    });
    observerFooter.observe(footerNav);
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth"
        });
      }
      const menu = document.querySelector(".nav-menu");
      if (menu) menu.classList.remove("active");
    });
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll("section.page");
  const links = document.querySelectorAll(".navbar nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

function initNavbarHide() {
  let lastScroll = 0;
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll <= 0) {
      navbar.classList.remove("hide");
      return;
    }
    if (currentScroll > lastScroll) {
      navbar.classList.add("hide");
    } else {
      navbar.classList.remove("hide");
    }
    lastScroll = currentScroll;
  });
}

function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });
  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

function initLeadForm() {
  const leadForm = document.getElementById("lead-form");
  if (!leadForm) return;
  leadForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const btn = this.querySelector(".btn-submit");
    const originalText = btn.innerText;
    btn.innerText = "Enviando...";
    btn.disabled = true;
    emailjs.sendForm("service_aw650bg", "template_ydz6fp2", this).then(
      function () {
        alert("Solicitação enviada com sucesso!");
        leadForm.reset();
        const firstRadio = leadForm.querySelector('input[name="tipo_evento"]');
        if (firstRadio) firstRadio.checked = true;
      },
      function (error) {
        alert("Falha ao enviar: " + JSON.stringify(error));
      }
    ).finally(() => {
      btn.innerText = originalText;
      btn.disabled = false;
    });
  });
}

function toggleMenu() {
  const menu = document.querySelector(".nav-menu");
  if (menu) menu.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  if (!window.SITE_DATA) {
    console.error("SITE_DATA não encontrado. Inclua data.js antes de script.js.");
    return;
  }

  renderNav();
  renderSections();
  renderFooterLinks();
  renderEventTypes();
  renderCredits();

  bindDifferentialAccordions();
  bindServiceCards();
  initTestimonialCarousels();

  initScrollObservers();
  initSmoothScroll();
  initActiveNav();
  initNavbarHide();
  initBackToTop();
  initLeadForm();
});
