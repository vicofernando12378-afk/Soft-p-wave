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
  initChatSimulator();
  initFormProgress();
  initFAQAccordion();
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

    // Validar el formulario activamente al submitir
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Feedback visual en el botón
    submitBtn.disabled       = true;
    submitBtn.style.opacity  = '0.65';
    submitBtn.textContent    = 'ACTIVANDO ANÁLISIS DE IA...';

    // Simular latencia de red
    setTimeout(() => {
      // Ocultar wrapper de progreso si existiera
      const progEl = document.querySelector('.form-progress-wrapper');
      if (progEl) progEl.style.display = 'none';

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

/* ── 7. CHAT SIMULATOR ──────────────────────────────────────────────────── */
function initChatSimulator() {
  const container = document.getElementById('chat-simulator');
  if (!container) return;

  const msg1 = document.getElementById('chat-msg-1');
  const msg2 = document.getElementById('chat-msg-2');
  const msg3 = document.getElementById('chat-msg-3');
  const typingIndicator = document.getElementById('msg-typing-indicator');
  const msg3Text = document.getElementById('chat-msg-3-text');

  // Trigger sequence on scroll entry to ensure user sees it
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startSimulation();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  observer.observe(container);

  function startSimulation() {
    // Msg 1 (Hermes) reveals
    setTimeout(() => {
      msg1.classList.add('revealed');
    }, 400);

    // Msg 2 (User) reveals
    setTimeout(() => {
      msg2.style.display = 'flex';
      requestAnimationFrame(() => {
        msg2.classList.add('revealed');
      });
    }, 2600);

    // Msg 3 (Hermes typing) reveals
    setTimeout(() => {
      msg3.style.display = 'flex';
      requestAnimationFrame(() => {
        msg3.classList.add('revealed');
      });
    }, 4800);

    // Msg 3 (Hermes text) replaces typing indicator
    setTimeout(() => {
      if (typingIndicator) typingIndicator.style.display = 'none';
      if (msg3Text) {
        msg3Text.style.display = 'block';
        msg3Text.style.opacity = '0';
        msg3Text.style.transition = 'opacity 400ms ease';
        requestAnimationFrame(() => {
          msg3Text.style.opacity = '1';
        });
      }
    }, 7000);
  }
}

/* ── 8. FORM PROGRESS TRACKING ──────────────────────────────────────────── */
function initFormProgress() {
  const form = document.getElementById('contact-form');
  const progressBar = document.getElementById('form-progress-bar');
  const progressText = document.getElementById('form-progress-text');

  if (!form || !progressBar || !progressText) return;

  // Lista de campos requeridos
  const fields = [
    document.getElementById('cf-name'),
    document.getElementById('cf-email'),
    document.getElementById('cf-url'),
    document.getElementById('cf-service'),
    document.getElementById('cf-message'),
    document.getElementById('cf-cro-compliance')
  ];

  function updateProgress() {
    let completedCount = 0;

    fields.forEach(field => {
      if (!field) return;

      if (field.type === 'checkbox') {
        if (field.checked) completedCount++;
      } else {
        if (field.value.trim() !== '') completedCount++;
      }
    });

    const percentage = Math.round((completedCount / fields.length) * 100);
    progressBar.style.width = `${percentage}%`;

    if (percentage === 0) {
      progressText.textContent = '0% completado — Completa los campos para activar el diagnóstico';
    } else if (percentage < 100) {
      progressText.textContent = `${percentage}% completado — Estás a un paso de la optimización`;
    } else {
      progressText.textContent = '100% completado — Listo para activar tu análisis de IA';
    }
  }

  // Escuchar eventos en los campos
  fields.forEach(field => {
    if (!field) return;

    if (field.type === 'select-one' || field.type === 'checkbox') {
      field.addEventListener('change', updateProgress);
    } else {
      field.addEventListener('input', updateProgress);
    }
  });

  updateProgress(); // inicializar
}

/* ── 9. FAQ ACCORDION ───────────────────────────────────────────────────── */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const answerWrap = item.querySelector('.faq-answer-wrap');

    if (!btn || !answerWrap) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Cerrar otros acordeones abiertos
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherWrap = otherItem.querySelector('.faq-answer-wrap');
          if (otherWrap) otherWrap.style.maxHeight = '0';
        }
      });

      // Alternar estado actual
      if (isActive) {
        item.classList.remove('active');
        answerWrap.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        answerWrap.style.maxHeight = `${answerWrap.scrollHeight}px`;
      }
    });
  });
}
