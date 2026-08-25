(function () {
  const INTRO_KEY = 'mtIntroShown';
  if (sessionStorage.getItem(INTRO_KEY)) return;
  sessionStorage.setItem(INTRO_KEY, '1');

  const overlay = document.createElement('div');
  overlay.className = 'intro-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const frame = document.createElement('div');
  frame.className = 'intro-video-frame';

  const video = document.createElement('video');
  video.muted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.preload = 'auto';
  video.disablePictureInPicture = true;
  video.src = 'assets/magic_touch_no_gemini.mp4';

  frame.appendChild(video);
  overlay.appendChild(frame);
  document.body.appendChild(overlay);

  let dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    overlay.classList.add('intro-fade');
    setTimeout(() => overlay.remove(), 550);
  }

  video.addEventListener('ended', dismiss);
  video.addEventListener('error', dismiss);
  video.play().catch(dismiss);

  setTimeout(dismiss, 15000);
})();

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

const routes = { "#about": "about.html", "#services": "services.html", "#gallery": "gallery.html", "#reviews": "reviews.html", "#contact": "contact.html" };
document.querySelectorAll('.nav a').forEach(a => {
  const href = a.getAttribute('href');
  if (routes[href]) {
    a.addEventListener('click', e => {
      if (location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname.endsWith('/')) {
        e.preventDefault();
        location.href = routes[href];
      }
    });
  }
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
