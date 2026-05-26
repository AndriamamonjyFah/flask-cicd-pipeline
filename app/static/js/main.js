const words = ['faster.', 'smarter.', 'with CI/CD.', 'on every push.'];
let wordIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
  if (!typedEl) return;
  const word = words[wordIndex];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++charIndex);
    if (charIndex === word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    typedEl.textContent = word.slice(0, --charIndex);
    if (charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; }
  }
  setTimeout(typeLoop, deleting ? 60 : 100);
}
typeLoop();


const terminalEl = document.getElementById('terminal-lines');
const lines = [
  { text: '$ git push origin main', cls: 'muted' },
  { text: '→ Triggered: CI/CD Pipeline', cls: 'info' },
  { text: '✓ Checkout code', cls: 'success' },
  { text: '✓ Setup Python 3.11', cls: 'success' },
  { text: '✓ Install dependencies', cls: 'success' },
  { text: '✓ pytest tests/ — 2 passed', cls: 'success' },
  { text: '→ Building Docker image...', cls: 'info' },
  { text: '✓ docker build -t flask-app .', cls: 'success' },
  { text: '✓ docker push fahrendren/flask-app:latest', cls: 'success' },
  { text: '→ Deploying to VPS via SSH...', cls: 'info' },
  { text: '✓ Container restarted 🚀', cls: 'success' },
];

function renderTerminal() {
  if (!terminalEl) return;
  let i = 0;
  function next() {
    if (i >= lines.length) {
      const cursor = document.createElement('span');
      cursor.className = 't-cursor';
      terminalEl.appendChild(cursor);
      return;
    }
    const span = document.createElement('span');
    span.className = `t-line ${lines[i].cls}`;
    span.textContent = lines[i].text;
    terminalEl.appendChild(span);
    i++;
    setTimeout(next, 320);
  }
  setTimeout(next, 600);
}
renderTerminal();


const animated = document.querySelectorAll('.card, .service-row');
if (animated.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = (entry.target.dataset.delay || 0) * 80;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  animated.forEach(c => observer.observe(c));
}
