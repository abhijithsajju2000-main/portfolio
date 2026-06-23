/* =========================================
   Navbar scroll effect
========================================= */
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* =========================================
   Typing effect
========================================= */
const roles = [
  'Software Developer',
  'Flutter Developer',
  'Django Backend Dev',
  'Full Stack Developer',
];

let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const word = roles[ri];
  typedEl.textContent = deleting
    ? word.slice(0, --ci)
    : word.slice(0, ++ci);

  let delay = deleting ? 55 : 95;

  if (!deleting && ci === word.length) {
    delay = 2000;
    deleting = true;
  } else if (deleting && ci === 0) {
    deleting = false;
    ri = (ri + 1) % roles.length;
    delay = 350;
  }

  setTimeout(type, delay);
}

setTimeout(type, 1300);

/* =========================================
   Particle canvas (hero background)
========================================= */
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 55;
  const particles = Array.from({ length: COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.6 + 0.4,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.4 + 0.1,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* draw connections */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59,130,246,${0.08 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    /* draw dots */
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(96,165,250,${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(draw);
  }

  draw();
})();

/* =========================================
   Scroll reveal (Intersection Observer)
========================================= */
const revealEls = document.querySelectorAll('.reveal');

const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => revealObs.observe(el));

/* =========================================
   Progress bar animation
========================================= */
const fills = document.querySelectorAll('.prog-fill');

const progObs = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.w + '%';
        progObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.35 }
);

fills.forEach(f => progObs.observe(f));

/* =========================================
   Active nav link highlighting
========================================= */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('#mainNav .nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

/* =========================================
   Close mobile menu on link click
========================================= */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const collapse = document.getElementById('navContent');
    if (collapse.classList.contains('show')) {
      bootstrap.Collapse.getInstance(collapse)?.hide();
    }
  });
});
