// ==============================================
// MAIN JS — GSAP Animations + Interactions
// ==============================================

document.addEventListener('DOMContentLoaded', () => {
  // ── Register GSAP Plugins ──────────────────
  gsap.registerPlugin(ScrollTrigger);

  // ── Header Scroll Behavior ─────────────────
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ── Mobile Menu ────────────────────────────
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');

  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  mobileClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ── Hero Animations ────────────────────────
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .from('.hero__label', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.3
    })
    .from('.hero__title', {
      opacity: 0,
      y: 50,
      duration: 1,
    }, '-=0.4')
    .from('.hero__subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8,
    }, '-=0.5')
    .from('.hero__actions', {
      opacity: 0,
      y: 20,
      duration: 0.6,
    }, '-=0.4')
    .from('.hero__scroll', {
      opacity: 0,
      duration: 0.6,
    }, '-=0.2');

  // ── Scroll Reveal Animations ───────────────
  const revealElements = document.querySelectorAll('.reveal');

  revealElements.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      }
    });
  });

  // ── Reveal Left/Right ──────────────────────
  document.querySelectorAll('.reveal-left').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      }
    });
  });

  document.querySelectorAll('.reveal-right').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      }
    });
  });

  // ── Stagger Grid Items ─────────────────────
  const grids = document.querySelectorAll('.services__grid, .testimonials__grid, .product__features');

  grids.forEach(grid => {
    const items = grid.children;
    ScrollTrigger.create({
      trigger: grid,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
        });
      }
    });
  });

  // ── Steps Card Stagger ──────────────────────
  const stepsGrid = document.querySelector('.steps__grid');
  if (stepsGrid) {
    const cards = stepsGrid.querySelectorAll('.steps__card');
    ScrollTrigger.create({
      trigger: stepsGrid,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'transform',
          onComplete: () => {
            cards.forEach(card => {
              card.style.opacity = '1';
              card.classList.add('revealed');
            });
          }
        });
      }
    });
  }

  // ── Stats Counter Animation ────────────────
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power1.out',
          onUpdate: () => {
            counter.textContent = Math.floor(obj.val);
          }
        });
      }
    });
  });

  // ── Section Labels Animation ───────────────
  const sectionLabels = document.querySelectorAll('.section-label');

  sectionLabels.forEach(label => {
    gsap.from(label, {
      opacity: 0,
      x: -30,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: label,
        start: 'top 85%',
        once: true,
      }
    });
  });

  // ── Section Titles Animation ───────────────
  const sectionTitles = document.querySelectorAll('.section-title');

  sectionTitles.forEach(title => {
    gsap.from(title, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        once: true,
      }
    });
  });

  // ── FAQ Accordion ──────────────────────────
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });

    // Keyboard accessibility
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });

  // ── Smooth Scroll for Anchors ──────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ── Parallax Effect on Hero Video ──────────
  gsap.to('.hero__video-wrap video', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });
});
