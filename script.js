// ===== Age (birth date: 16.02.2013) =====
function getAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function ageWord(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return 'лет';
  if (mod10 === 1) return 'год';
  if (mod10 >= 2 && mod10 <= 4) return 'года';
  return 'лет';
}

const birthDate = new Date(2013, 1, 16);
const age = getAge(birthDate);
const ageText = `${age} ${ageWord(age)}`;

document.querySelectorAll('.age').forEach(el => {
  el.textContent = ageText;
});

// ===== Theme =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next === 'dark' ? 'dark' : '');
  if (next === 'light') document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

// ===== Header scroll =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile nav =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Active nav link =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const observerNav = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -50% 0px' }
);

sections.forEach(s => observerNav.observe(s));

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll('.reveal');

const observerReveal = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observerReveal.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach(el => observerReveal.observe(el));

// ===== Skill bars =====
const skillFills = document.querySelectorAll('.skill-fill');

const observerSkills = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        entry.target.style.width = `${width}%`;
        observerSkills.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

skillFills.forEach(bar => observerSkills.observe(bar));

// ===== Project modal =====
const projectData = {
  1: {
    emoji: '🎭',
    tag: 'Спектакль',
    title: 'Омулевая бочка',
    desc: 'Отчётный концерт студии «Ирбис». Главная роль в постановке.',
    video: 'https://vk.com/video762584587_456239021',
  },
  2: {
    emoji: '🎤',
    tag: 'Песня',
    title: 'Сын луны',
    desc: 'Вокальное выступление — исполнитель.',
    video: 'https://vk.com/video762584587_456239017',
  },
  3: {
    emoji: '🦁',
    tag: 'Спектакль',
    title: 'Хроники Нарнии',
    desc: 'Отчётный концерт студии «Ирбис». Второстепенная роль волка.',
    video: 'https://vkvideo.ru/video762584587_456239019',
  },
  4: {
    emoji: '🌅',
    tag: 'Спектакль',
    title: 'Зори здесь тихие',
    desc: 'Режиссёр и исполнение роли в постановке.',
    video: 'https://vk.com/video762584587_456239018',
  },
  5: {
    emoji: '🐍',
    tag: 'Спектакль',
    title: 'Рики-тики-тави',
    desc: 'Отчётный концерт студии «Ирбис».',
    video: 'https://vk.com/video762584587_456239020',
  },
  6: {
    emoji: '🎨',
    tag: 'Рисунок',
    title: 'Мои рисунки',
    desc: 'Творческие работы — галерея рисунков скоро появится здесь.',
    video: null,
  },
};

const modal = document.getElementById('projectModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');

const modalLink = document.getElementById('modalLink');

function openModal(id) {
  const data = projectData[id];
  if (!data) return;
  document.getElementById('modalEmoji').textContent = data.emoji;
  document.getElementById('modalTag').textContent = data.tag;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalDesc').textContent = data.desc;
  if (data.video) {
    modalLink.href = data.video;
    modalLink.style.display = 'inline-flex';
  } else {
    modalLink.style.display = 'none';
  }
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-card[data-project]').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.project));
});

modalBackdrop.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ===== Contact form =====
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  formNote.textContent = 'Спасибо! Сообщение отправлено (пока это демо — форма не подключена к серверу).';
  contactForm.reset();
  setTimeout(() => { formNote.textContent = ''; }, 5000);
});
