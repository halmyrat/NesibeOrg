document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navLinkList = document.querySelectorAll('.nav-link');
  const langBtns = document.querySelectorAll('.lang-btn');

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 50);
    lastScroll = y;
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinkList.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinkList.forEach(l => {
          l.classList.toggle('active', l.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });
  sections.forEach(s => observerNav.observe(s));

  const fadeEls = document.querySelectorAll(
    '.service-card, .project-card, .whyus-list li, .value-card, .sector-item, .contact-item, .cert-badge, .milestone, .section-header, .about-text, .expertise-inner'
  );
  fadeEls.forEach(el => el.classList.add('fade-up'));
  const observerFade = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  fadeEls.forEach(el => observerFade.observe(el));

  const counters = document.querySelectorAll('.stat-num[data-count]');
  let countTriggered = false;
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countTriggered) {
        countTriggered = true;
        counters.forEach(el => {
          const target = parseInt(el.dataset.count, 10);
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const tick = () => {
            current += step;
            if (current >= target) {
              el.textContent = target;
            } else {
              el.textContent = Math.floor(current);
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
        });
      }
    });
  }, { threshold: 0.3 });
  const statsContainer = document.querySelector('.hero-stats');
  if (statsContainer) countObserver.observe(statsContainer);

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.querySelector('span').textContent = 'Sending...';
      setTimeout(() => {
        formSuccess.classList.add('show');
        btn.querySelector('span').textContent = 'Submit Inquiry';
        btn.disabled = false;
        contactForm.reset();
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }, 1200);
    });
  }

  const particles = document.getElementById('heroParticles');
  if (particles) {
    for (let i = 0; i < 30; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position:absolute;
        width:${Math.random() * 3 + 1}px;
        height:${Math.random() * 3 + 1}px;
        background:rgba(0,161,156,${Math.random() * 0.3 + 0.05});
        border-radius:50%;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        animation:float ${Math.random() * 10 + 8}s ease-in-out infinite;
        animation-delay:${Math.random() * -10}s;
      `;
      particles.appendChild(dot);
    }
    const style = document.createElement('style');
    style.textContent = `@keyframes float{0%,100%{transform:translate(0,0)}25%{transform:translate(${Math.random()*20-10}px,${Math.random()*20-10}px)}50%{transform:translate(${Math.random()*20-10}px,${Math.random()*20-10}px)}75%{transform:translate(${Math.random()*20-10}px,${Math.random()*20-10}px)}}`;
    document.head.appendChild(style);
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
});
