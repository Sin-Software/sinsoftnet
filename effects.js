// === Floating Runes ===
const canvas = document.createElement('canvas');
canvas.id = 'runes';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ'.split('');
const particles = Array.from({ length: 40 }, () => ({
  rune: runes[Math.floor(Math.random() * runes.length)],
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  speed: 0.3 + Math.random() * 0.5,
  size: 16 + Math.random() * 10
}));

function drawRunes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = '20px MedievalSharp';
  particles.forEach(p => {
    ctx.fillText(p.rune, p.x, p.y);
    p.y -= p.speed;
    if (p.y < -20) {
      p.y = canvas.height + 20;
      p.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawRunes);
}
drawRunes();

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '0';

// === Spell Burst on Button Click ===
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const burst = document.createElement('div');
      burst.className = 'burst';
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;
      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 600);
    });
  });
});

// === Fireflies ===
const fireflyCanvas = document.createElement('canvas');
fireflyCanvas.id = 'fireflies';
document.body.appendChild(fireflyCanvas);
const fctx = fireflyCanvas.getContext('2d');
fireflyCanvas.width = window.innerWidth;
fireflyCanvas.height = window.innerHeight;
fireflyCanvas.style.position = 'fixed';
fireflyCanvas.style.top = '0';
fireflyCanvas.style.left = '0';
fireflyCanvas.style.pointerEvents = 'none';
fireflyCanvas.style.zIndex = '0';

const fireflies = Array.from({ length: 50 }, () => ({
  x: Math.random() * fireflyCanvas.width,
  y: Math.random() * fireflyCanvas.height,
  radius: Math.random() * 2 + 1,
  dx: Math.random() * 0.5 - 0.25,
  dy: Math.random() * 0.5 - 0.25
}));

function drawFireflies() {
  fctx.clearRect(0, 0, fireflyCanvas.width, fireflyCanvas.height);
  fireflies.forEach(f => {
    f.x += f.dx;
    f.y += f.dy;
    if (f.x < 0 || f.x > fireflyCanvas.width) f.dx *= -1;
    if (f.y < 0 || f.y > fireflyCanvas.height) f.dy *= -1;
    fctx.beginPath();
    fctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
    fctx.fillStyle = 'rgba(255, 255, 200, 0.7)';
    fctx.fill();
  });
  requestAnimationFrame(drawFireflies);
}
drawFireflies();
