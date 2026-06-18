const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "yako.jpeg";

const particles = [];
const maxParticles = 10;

let celebrationUntil = 0;
let normalSpeed = 1;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createParticle(isCelebration = false) {
  const size = isCelebration
    ? Math.random() * 25 + 20
    : Math.random() * 50 + 30;

  const speed = isCelebration ? 5 : 1.5;

  opacity: 1,
  exploding: false,
  growth: isCelebration ? Math.random() * 2 + 2 : 0

  return {
    x: Math.random() * (canvas.width - size),
    y: Math.random() * (canvas.height - size),
    size: size,
    dx: (Math.random() - 0.5) * speed,
    dy: (Math.random() - 0.5) * speed,
    celebration: isCelebration,
    opacity: 1,
    exploding: false,
    growth: isCelebration ? Math.random() * 2 + 2 : 0
  };
}

function addParticles() {
  while (particles.length < maxParticles) {
    particles.push(createParticle());
  }
}

function drawCircularImage(particle) {
  ctx.save();

  ctx.globalAlpha = particle.opacity;

  ctx.beginPath();
  ctx.arc(
    particle.x + particle.size / 2,
    particle.y + particle.size / 2,
    particle.size / 2,
    0,
    Math.PI * 2
  );
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(
    img,
    particle.x,
    particle.y,
    particle.size,
    particle.size
  );

  ctx.restore();
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.x += particle.dx;
    particle.y += particle.dy;

    if (particle.x <= 0 || particle.x + particle.size >= canvas.width) {
      particle.dx *= -1;
    }

    if (particle.y <= 0 || particle.y + particle.size >= canvas.height) {
      particle.dy *= -1;
    }

    drawCircularImage(particle);
  });

  if (Date.now() > celebrationUntil) {
    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].celebration) {
        particles[i].exploding = true;
        particles[i].size += particles[i].growth;
        particles[i].opacity -= 0.04;
  
        if (particles[i].opacity <= 0) {
          particles.splice(i, 1);
        }
      }
    }
  
    while (particles.filter(p => !p.celebration).length < maxParticles) {
      particles.push(createParticle(false));
    }
  }

  requestAnimationFrame(animateParticles);
}

img.onload = () => {
  addParticles();
  animateParticles();
};

function launchCelebration() {
  celebrationUntil = Date.now() + 2000;

  for (let i = 0; i < 35; i++) {
    particles.push(createParticle(true));
  }
}
