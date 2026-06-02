/* ==========================================================================
   SOFTPWAVE — Kinetic Interaction Engine v2
   Editorial Premium · Limpio · Sin calculadora
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initScrollReveals();
  initBentoCardHover();
  initMobileMenu();
  initContactForm();
  initScrollIndicator();
});

/* ── 1. NAVBAR: Opacidad al hacer scroll ────────────────────────────────── */
function initNavbarScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ── 2. SCROLL REVEAL — Intersection Observer ───────────────────────────── */
function initScrollReveals() {
  // Respeta prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-fade').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal-fade').forEach(el => observer.observe(el));
}

/* ── 3. BENTO CARD — Efecto de luz suave al mover el cursor ─────────────── */
function initBentoCardHover() {
  const cards = document.querySelectorAll('.bento-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y      = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      card.style.setProperty('--cx', `${x}%`);
      card.style.setProperty('--cy', `${y}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--cx');
      card.style.removeProperty('--cy');
    });
  });
}

/* ── 4. MOBILE MENU ─────────────────────────────────────────────────────── */
function initMobileMenu() {
  const toggleBtn     = document.getElementById('menu-toggle');
  const mobileOverlay = document.getElementById('mobile-menu');
  const links         = document.querySelectorAll('.mobile-link');

  if (!toggleBtn || !mobileOverlay) return;

  function openMenu() {
    mobileOverlay.classList.add('active');
    mobileOverlay.removeAttribute('aria-hidden');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    const bars = toggleBtn.querySelectorAll('.menu-bar');
    bars[0].style.transform = 'translateY(3.5px) rotate(45deg)';
    bars[1].style.transform = 'translateY(-3.5px) rotate(-45deg)';
  }

  function closeMenu() {
    mobileOverlay.classList.remove('active');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    const bars = toggleBtn.querySelectorAll('.menu-bar');
    bars[0].style.transform = 'none';
    bars[1].style.transform = 'none';
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileOverlay.classList.contains('active');
    isOpen ? closeMenu() : openMenu();
  });

  links.forEach(link => link.addEventListener('click', closeMenu));

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
      closeMenu();
    }
  });
}

/* ── 5. CONTACT FORM — Simulación de envío + Success State ─────────────── */
function initContactForm() {
  const form        = document.getElementById('contact-form');
  const successEl   = document.getElementById('form-success');
  const submitBtn   = document.getElementById('form-submit-btn');

  if (!form || !successEl || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Feedback visual en el botón
    submitBtn.disabled       = true;
    submitBtn.style.opacity  = '0.65';
    submitBtn.textContent    = 'Enviando diagnóstico...';

    // Simular latencia de red
    setTimeout(() => {
      form.style.display            = 'none';
      successEl.style.display       = 'flex';
      successEl.style.opacity       = '0';
      successEl.style.transform     = 'translateY(20px)';

      requestAnimationFrame(() => {
        successEl.style.transition  = 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)';
        successEl.style.opacity     = '1';
        successEl.style.transform   = 'translateY(0)';
      });
    }, 1400);
  });
}

/* ── 6. SCROLL INDICATOR — Ocultar al bajar ─────────────────────────────── */
function initScrollIndicator() {
  const indicator = document.querySelector('.scroll-indicator');
  if (!indicator) return;

  const onScroll = () => {
    if (window.scrollY > 120) {
      indicator.style.opacity   = '0';
      indicator.style.transform = 'translateX(-50%) translateY(10px)';
    } else {
      indicator.style.opacity   = '1';
      indicator.style.transform = 'translateX(-50%) translateY(0)';
    }
  };

  indicator.style.transition = 'opacity 400ms ease, transform 400ms ease';
  window.addEventListener('scroll', onScroll, { passive: true });
}
