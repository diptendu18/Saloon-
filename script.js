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

const genderSwitch = document.querySelector('.gender-switch');
if (genderSwitch) {
  const tabs = genderSwitch.querySelectorAll('.gender-tab');
  const rateCards = document.querySelectorAll('.rate-card[data-gender]');
  const serviceSelect = document.getElementById('service');

  function applyGender(target) {
    rateCards.forEach(card => {
      const g = card.dataset.gender;
      card.style.display = (g === target || g === 'both') ? '' : 'none';
    });
    if (serviceSelect) {
      serviceSelect.querySelectorAll('optgroup[data-gender]').forEach(og => {
        og.hidden = og.dataset.gender !== target;
      });
      serviceSelect.value = '';
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      applyGender(tab.dataset.target);
    });
  });

  const initialTab = genderSwitch.querySelector('.gender-tab.active') || tabs[0];
  applyGender(initialTab.dataset.target);
}

const experienceVideo = document.querySelector('.experience-video');
const experiencePlay = document.querySelector('.experience-play');
if (experienceVideo && experiencePlay) {
  experiencePlay.addEventListener('click', () => {
    experienceVideo.muted = false;
    experienceVideo.controls = true;
    experienceVideo.play();
    experiencePlay.classList.add('is-hidden');
  });
}
