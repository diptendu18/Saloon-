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
