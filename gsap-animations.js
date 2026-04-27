gsap.registerPlugin(ScrollTrigger);

/* ─── CURSOR ─────────────────────────────────────────────── */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

window.addEventListener('mousemove', e => {
  gsap.to(cursor,   { x: e.clientX, y: e.clientY, duration: 0.1 });
  gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' });
});

document.querySelectorAll('a, button, .menu-item, .galeria__item, .diferencial').forEach(el => {
  el.addEventListener('mouseenter', () => gsap.to(follower, { scale: 2, opacity: .5, duration: .25 }));
  el.addEventListener('mouseleave', () => gsap.to(follower, { scale: 1, opacity: 1,  duration: .25 }));
});

/* ─── NAV ────────────────────────────────────────────────── */
gsap.to('#nav', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: .3 });

/* ─── HERO — entrada cinematográfica ─────────────────────── */
const heroTl = gsap.timeline({ delay: .6 });

heroTl
  .to('.hero__line--v1', { scaleY: 1, duration: 1.2, ease: 'power3.inOut' })
  .to('.hero__line--v2', { scaleY: 1, duration: .9,  ease: 'power3.inOut' }, '-=.8')
  .to('.hero__line--h',  { scaleX: 1, duration: .8,  ease: 'power3.inOut' }, '-=.6')
  .to('#heroTag',        { opacity: 1, x: 0, duration: .7, ease: 'power3.out' }, '-=.4')
  .from('#heroLine1',    { y: '110%', duration: .9, ease: 'power4.out' }, '-=.3')
  .from('#heroLine2',    { y: '110%', duration: .9, ease: 'power4.out' }, '-=.6')
  .to('#heroSub',        { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, '-=.3')
  .to('#heroActions',    { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, '-=.4')
  .to('#heroScroll',     { opacity: 1, duration: .6 }, '-=.2')
  .to('.hero__deco-num', { opacity: 1, duration: 1.5, ease: 'power2.out' }, '-=1');

/* ─── HERO parallax ──────────────────────────────────────── */
gsap.to('#heroBg', {
  yPercent: 25, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});

/* ─── SOBRE ──────────────────────────────────────────────── */
// Garante estado inicial correto via GSAP (não CSS scale)
gsap.set('.sobre__badge', { opacity: 0, scale: 0 });

const sobreTl = gsap.timeline({
  scrollTrigger: { trigger: '#sobre', start: 'top 75%', toggleActions: 'play none none none' }
});
sobreTl
  .to('.sobre__img--1', { opacity: 1, x: 0, duration: .9, ease: 'power3.out' })
  .to('.sobre__img--2', { opacity: 1, x: 0, duration: .9, ease: 'power3.out' }, '-=.5')
  .to('.sobre__badge',  { opacity: 1, scale: 1, duration: .6, ease: 'back.out(1.7)' }, '-=.3')
  .to('#sobreText',     { opacity: 1, x: 0, duration: .9, ease: 'power3.out' }, '-=.7');

/* ─── CONTADORES ─────────────────────────────────────────── */
document.querySelectorAll('.stat[data-count]').forEach(stat => {
  const target = +stat.dataset.count;
  const numEl  = stat.querySelector('.stat__num');
  const obj    = { val: 0 };
  ScrollTrigger.create({
    trigger: stat,
    start: 'top 85%',
    onEnter: () => gsap.to(obj, {
      val: target, duration: 1.8, ease: 'power2.out',
      onUpdate: () => { numEl.textContent = Math.round(obj.val); }
    })
  });
});

/* ─── DIFERENCIAIS ───────────────────────────────────────── */
gsap.to('.diferencial', {
  opacity: 1, y: 0, duration: .7, ease: 'power3.out', stagger: .15,
  scrollTrigger: { trigger: '#diferenciais', start: 'top 75%' }
});

gsap.to('.diferenciais__bg-text', {
  xPercent: -15, ease: 'none',
  scrollTrigger: { trigger: '#diferenciais', start: 'top bottom', end: 'bottom top', scrub: 1 }
});

/* ─── SECTION TITLES & TAGS ──────────────────────────────── */
// Usa gsap.to (não from) pois o CSS já define opacity:0 / transform
document.querySelectorAll('.section-title').forEach(el => {
  gsap.set(el, { opacity: 0, y: 40 });
  gsap.to(el, {
    opacity: 1, y: 0, duration: .9, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});
document.querySelectorAll('.section-tag').forEach(el => {
  gsap.set(el, { opacity: 0, x: -20 });
  gsap.to(el, {
    opacity: 1, x: 0, duration: .7, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%' }
  });
});

/* ─── CARDÁPIO — fade-up genérico ────────────────────────── */
gsap.utils.toArray('[data-gsap="fade-up"]').forEach(el => {
  gsap.set(el, { opacity: 0, y: 30 });
  gsap.to(el, {
    opacity: 1, y: 0, duration: .8, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});

/* ─── DEPOIMENTOS ────────────────────────────────────────── */
gsap.to('.depoimento', {
  opacity: 1, y: 0, duration: .7, ease: 'power3.out', stagger: .2,
  scrollTrigger: { trigger: '#depoimentos', start: 'top 75%' }
});

/* ─── CTA parallax + fade ────────────────────────────────── */
gsap.to('#ctaBg', {
  yPercent: 20, ease: 'none',
  scrollTrigger: { trigger: '#cta', start: 'top bottom', end: 'bottom top', scrub: true }
});

gsap.set(['#cta h2', '#cta p', '#cta .btn'], { opacity: 0, y: 30 });
const ctaTl = gsap.timeline({ scrollTrigger: { trigger: '#cta', start: 'top 70%' } });
ctaTl
  .to('#cta h2',   { opacity: 1, y: 0, duration: .8, ease: 'power3.out' })
  .to('#cta p',    { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, '-=.4')
  .to('#cta .btn', { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, '-=.3');

/* ─── CONTATO ────────────────────────────────────────────── */
const contatoTl = gsap.timeline({ scrollTrigger: { trigger: '#contato', start: 'top 75%' } });
contatoTl
  .to('.contato__info', { opacity: 1, x: 0, duration: .9, ease: 'power3.out' })
  .to('.contato__mapa', { opacity: 1, x: 0, duration: .9, ease: 'power3.out' }, '-=.5');

/* ─── MENU ITEMS stagger ─────────────────────────────────── */
function animateMenuItems() {
  gsap.fromTo(
    '.cardapio__panel.active .menu-item',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: .5, ease: 'power3.out', stagger: .08 }
  );
}
animateMenuItems();

// Sobrescreve switchTab após o DOM estar pronto
window.addEventListener('load', () => {
  const _orig = window.switchTab;
  window.switchTab = function(btn, id) {
    _orig(btn, id);
    animateMenuItems();
  };
});
