// ── FAQ TOGGLE ──
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(el => {
        if (el !== item) el.classList.remove('open');
      });

      item.classList.toggle('open', !isOpen);
    });
  });
}

// ── NAV ACTIVE STATE ──
function initNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ── HAMBURGER MENU ──
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

// ── SCROLL REVEAL ──
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.card, .update-card, .pricing-card, .contact-method, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ── NAV SCROLL STYLE ──
function initNavScroll() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.style.borderBottomColor = 'rgba(54,194,255,0.2)';
    } else {
      nav.style.borderBottomColor = 'rgba(54,194,255,0.12)';
    }
  });
}

// ── SUPPORT FORM ──
function initSupportForm() {
  const form = document.getElementById('supportForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showNotif('Please fill in all required fields.', 'error');
      return;
    }

    const mailtoLink = `mailto:masadavid010@gmail.com?subject=${encodeURIComponent(subject || 'Support Request from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
    showNotif('Opening your email client...', 'success');
  });
}

// ── NOTIFICATION ──
function showNotif(msg, type = 'success') {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
    background: ${type === 'success' ? '#0d1117' : '#1a0d12'};
    border: 1px solid ${type === 'success' ? '#36c2ff' : '#ff4757'};
    color: ${type === 'success' ? '#36c2ff' : '#ff4757'};
    padding: 1rem 1.5rem; border-radius: 8px;
    font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;
    box-shadow: 0 0 30px rgba(54,194,255,0.2);
    animation: slideIn 0.3s ease;
    max-width: 300px;
  `;
  notif.textContent = msg;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 4000);
}

// ── COUNTER ANIMATION ──
function animateCounters() {
  document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 7500;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initFAQ();
  initNav();
  initHamburger();
  initScrollReveal();
  initNavScroll();
  initSupportForm();

  // Delay counter animation
  setTimeout(animateCounters, 400);
});
