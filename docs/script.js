// efeito fade-in nas páginas
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ANIMAÇÃO DAS PÁGINAS
  ========================== */
  const pages = document.querySelectorAll(".page");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  pages.forEach(page => observer.observe(page));


  /* =========================
     SCROLL SUAVE
  ========================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });


  /* =========================
     BOTÃO VOLTAR AO TOPO
  ========================== */
  const btn = document.querySelector(".back-to-top");

  if (btn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    });

    window.scrollToTop = function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  }


  /* =========================
     LINK ATIVO NA NAVBAR
  ========================== */
  const sections = document.querySelectorAll("section");
  const links = document.querySelectorAll(".navbar nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    links.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });


  /* =========================
     NAVBAR SOME / VOLTA
  ========================== */
  let lastScroll = 0;
  const navbar = document.querySelector(".navbar");

  if (navbar) {
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


  /* =========================
     ANIMAÇÃO DO FOOTER
  ========================== */
  const footerNav = document.querySelector(".footer-nav");

  if (footerNav) {
    const observerFooter = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footerNav.classList.add("show");
        }
      });
    });

    observerFooter.observe(footerNav);
  }

});

function toggleMenu() {
  const menu = document.querySelector(".nav-menu");
  menu.classList.toggle("active");
}

/* =========================
   ENVIO DE FORMULÁRIO (EMAILJS)
========================== */
const leadForm = document.getElementById('lead-form');

if (leadForm) {
  leadForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const btn = this.querySelector('.btn-submit');
    const originalText = btn.innerText;
    
    btn.innerText = "Enviando...";
    btn.disabled = true;

    // Use o Service ID e Template ID gerados no seu painel
    emailjs.sendForm('service_aw650bg', 'template_ydz6fp2', this)
      .then(function() {
        alert('Solicitação enviada com sucesso!');
        leadForm.reset();
      }, function(error) {
        alert('Falha ao enviar: ' + JSON.stringify(error));
      })
      .finally(() => {
        btn.innerText = originalText;
        btn.disabled = false;
      });
  });
}


