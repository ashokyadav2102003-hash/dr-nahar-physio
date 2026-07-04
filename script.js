/* ===========================
   DR. NAHAR PHYSIO YADAV
   script.js — All Interactions
=========================== */

// ===== HERO VIDEO TOGGLE =====
const playVideoBtn  = document.getElementById('playVideoBtn');
const closeVideoBtn = document.getElementById('closeVideoBtn');
const heroPhotoView = document.getElementById('heroPhotoView');
const heroVideoView = document.getElementById('heroVideoView');
const heroVideo      = document.getElementById('heroVideo');

if (playVideoBtn && heroVideoView) {
  playVideoBtn.addEventListener('click', () => {
    heroPhotoView.style.display = 'none';
    heroVideoView.classList.add('active');
    heroVideo.play().catch(() => {
      // Autoplay might be blocked — that's fine, user can press play manually
    });
  });
}

if (closeVideoBtn && heroVideoView) {
  closeVideoBtn.addEventListener('click', () => {
    heroVideo.pause();
    heroVideo.currentTime = 0;
    heroVideoView.classList.remove('active');
    heroPhotoView.style.display = 'block';
  });
}

// ===== NAVBAR: Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
  '.service-card, .why-card, .condition-pill, .highlight-item, .contact-card, .about-content, .about-visual, .section-header, .insta-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay based on sibling index
      const siblings = [...entry.target.parentElement.children];
      const index = siblings.indexOf(entry.target);
      const delay = index * 80;

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== ACTIVE NAV LINK on scroll =====
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active-nav');
        }
      });
    }
  });
}, {
  threshold: 0.4
});

sections.forEach(sec => sectionObserver.observe(sec));

// Add active-nav CSS dynamically
const activeStyle = document.createElement('style');
activeStyle.textContent = `.active-nav { color: #ffffff !important; background: rgba(13,115,119,0.25) !important; }`;
document.head.appendChild(activeStyle);

// ===== WHATSAPP ENQUIRY FORM =====
const sendWaBtn = document.getElementById('sendWaBtn');

sendWaBtn.addEventListener('click', () => {
  const name    = document.getElementById('fname').value.trim();
  const phone   = document.getElementById('fphone').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  // Validation
  if (!name && !message) {
    showToast('Please enter your name and describe your condition.', 'error');
    return;
  }
  if (!name) {
    showToast('Please enter your name.', 'error');
    document.getElementById('fname').focus();
    return;
  }
  if (!message) {
    showToast('Please describe your condition or question.', 'error');
    document.getElementById('fmessage').focus();
    return;
  }

  // Build WhatsApp message
  let waText = `Hello Dr. Nahar,\n\n`;
  waText += `*Name:* ${name}\n`;
  if (phone) waText += `*Phone:* ${phone}\n`;
  waText += `\n*Condition/Query:* ${message}\n\n`;
  waText += `I would like to book an appointment. Thank you!`;

  const encodedText = encodeURIComponent(waText);
  const waUrl = `https://wa.me/917221099628?text=${encodedText}`;

  // Open WhatsApp
  window.open(waUrl, '_blank');
  showToast('Opening WhatsApp... 🎉', 'success');

  // Clear form
  document.getElementById('fname').value    = '';
  document.getElementById('fphone').value   = '';
  document.getElementById('fmessage').value = '';
});

// ===== TOAST NOTIFICATION =====
function showToast(msg, type = 'success') {
  // Remove existing toast
  const existing = document.querySelector('.toast-notify');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notify';
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✅' : '⚠️'}</span>
    <span>${msg}</span>
  `;

  const bg = type === 'success' ? '#0d7377' : '#c0392b';

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '100px',
    right: '28px',
    background: bg,
    color: '#fff',
    padding: '14px 20px',
    borderRadius: '12px',
    fontSize: '0.88rem',
    fontWeight: '500',
    fontFamily: "'DM Sans', sans-serif",
    zIndex: '9999',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 8px 28px rgba(0,0,0,0.25)',
    transform: 'translateY(20px)',
    opacity: '0',
    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
    maxWidth: '300px'
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity   = '1';
    });
  });

  // Animate out & remove
  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity   = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// ===== COUNTER ANIMATION for Hero Stats =====
function animateCounter(el, target, duration = 1800) {
  let start     = 0;
  const isPercent = el.textContent.includes('%');
  const hasPlus   = el.textContent.includes('+');
  const step      = target / (duration / 16);

  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start) + (hasPlus ? '+' : '') + (isPercent ? '%' : '');
  }, 16);
}

// Trigger counters when hero comes into view
const heroStats = document.querySelectorAll('.stat-num');
let countersStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    heroStats.forEach(el => {
      const raw    = el.textContent.replace(/[+%]/g, '');
      const target = parseInt(raw);
      if (!isNaN(target)) animateCounter(el, target);
    });
    counterObserver.disconnect();
  }
}, { threshold: 0.5 });

if (heroStats.length) counterObserver.observe(heroStats[0].closest('.hero-stats') || document.querySelector('.hero'));

// ===== FLOATING WHATSAPP: Hide on Contact Section =====
const floatWa       = document.getElementById('floatWa');
const contactSection = document.getElementById('contact');

if (floatWa && contactSection) {
  const floatObserver = new IntersectionObserver((entries) => {
    floatWa.style.opacity    = entries[0].isIntersecting ? '0' : '1';
    floatWa.style.pointerEvents = entries[0].isIntersecting ? 'none' : 'auto';
  }, { threshold: 0.3 });

  floatObserver.observe(contactSection);
}

// ===== FORM INPUT: Enter key moves to next field =====
const formInputs = document.querySelectorAll('.form-group input');
formInputs.forEach((input, i) => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const next = formInputs[i + 1];
      if (next) next.focus();
      else document.getElementById('fmessage').focus();
    }
  });
});

// ===== SCROLL TO TOP on logo click =====
document.querySelector('.nav-logo').style.cursor = 'pointer';
document.querySelector('.nav-logo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== PAGE LOAD: Fade in body =====
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});
