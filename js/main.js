/* =========================================================
   PLANECT — interactions
   ========================================================= */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  const bar = preloader.querySelector('.preloader__bar span');
  const numEl = document.getElementById('loadNum');
  let progress = 0;

  function runPreloader(done) {
    const tick = setInterval(() => {
      progress += Math.random() * 18 + 6;
      if (progress >= 100) { progress = 100; clearInterval(tick); }
      bar.style.width = progress + '%';
      numEl.textContent = Math.floor(progress);
      if (progress === 100) {
        setTimeout(() => {
          preloader.classList.add('is-done');
          setTimeout(() => { preloader.style.display = 'none'; }, 1000);
          done();
        }, 350);
      }
    }, 130);
  }

  /* ---------- Lenis smooth scroll ---------- */
  let lenis = null;
  function initLenis() {
    if (prefersReduced || typeof Lenis === 'undefined') return;
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
    }
  }

  /* ---------- Custom cursor ---------- */
  function initCursor() {
    if (isTouch) return;
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursorDot');
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    });
    function loop() {
      cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    }
    loop();
    document.querySelectorAll('[data-hover], a, button').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  }

  /* ---------- Header solid on scroll ---------- */
  function initHeader() {
    const header = document.getElementById('header');
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.7) header.classList.add('is-solid');
      else header.classList.remove('is-solid');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('mobileMenu');
    const close = () => { document.body.classList.remove('menu-open'); if (lenis) lenis.start(); };
    burger.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      if (lenis) { open ? lenis.stop() : lenis.start(); }
    });
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  }

  /* ---------- Anchor smooth scroll ---------- */
  function initAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { offset: -10, duration: 1.2 });
        else target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    document.querySelectorAll('.qa').forEach((qa) => {
      const q = qa.querySelector('.qa__q');
      const a = qa.querySelector('.qa__a');
      q.addEventListener('click', () => {
        const open = qa.classList.toggle('is-open');
        a.style.maxHeight = open ? a.scrollHeight + 'px' : 0;
        if (lenis) setTimeout(() => ScrollTrigger && ScrollTrigger.refresh(), 520);
      });
    });
  }

  /* ---------- Contact form (demo) ---------- */
  function initForm() {
    const form = document.getElementById('contactForm');
    const note = document.getElementById('formNote');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      if (!data.get('name') || !data.get('email') || !data.get('message')) {
        note.textContent = '必須項目（*）をご入力ください。';
        note.style.color = '#ffab8f';
        return;
      }
      note.textContent = '送信しました。ありがとうございます！（※ これはデモ用フォームです）';
      note.style.color = '#7ee0b0';
      form.reset();
    });
  }

  /* ---------- GSAP animations ---------- */
  function initGsap() {
    if (typeof gsap === 'undefined') { document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; }); return; }
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    // Hero intro
    const heroTl = gsap.timeline({ delay: 0.15 });
    heroTl
      .to('.hero__title .line span', { y: 0, duration: 1.1, stagger: 0.12, ease: 'expo.out' })
      .from('.hero__eyebrow', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.2)
      .from('.hero__lead', { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.6)
      .from('.hero__actions', { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.75)
      .from('.hero__scroll, .hero__side', { opacity: 0, duration: 1 }, 0.9);

    if (prefersReduced || typeof ScrollTrigger === 'undefined') {
      document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
      return;
    }

    // Reveal on scroll
    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    // Stagger grids
    [['.services__list', '.svc'], ['.works__grid', '.work'], ['.team__grid', '.member'], ['.steps', '.step']].forEach(([wrap, item]) => {
      const container = document.querySelector(wrap);
      if (!container) return;
      gsap.set(container.querySelectorAll(item), { opacity: 1 });
    });

    // Counters
    gsap.utils.toArray('.stat__num').forEach((el) => {
      const target = +el.dataset.count;
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el, start: 'top 90%', once: true,
        onEnter: () => gsap.to(obj, {
          v: target, duration: 1.8, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.floor(obj.v).toLocaleString(); }
        })
      });
    });

    // Hero parallax
    gsap.to('.hero__bg', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // Section fade for services/contact bg blocks: subtle scale of works images
    gsap.utils.toArray('.work__thumb img').forEach((img) => {
      gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    ScrollTrigger.refresh();
  }

  /* ---------- Boot ---------- */
  function boot() {
    initLenis();
    initCursor();
    initHeader();
    initMenu();
    initAnchors();
    initFaq();
    initForm();
    initGsap();
  }

  if (prefersReduced) {
    preloader.style.display = 'none';
    boot();
  } else {
    window.addEventListener('load', () => runPreloader(boot));
    // Fallback if load takes too long / assets blocked
    setTimeout(() => { if (progress === 0) runPreloader(boot); }, 1200);
  }
})();
