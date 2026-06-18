const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "yako.jpeg";

const particles = [];
const maxParticles = 10;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createParticle() {
  const size = Math.random() * 35 + 35;

  return {
    x: Math.random() * (canvas.width - size),
    y: Math.random() * (canvas.height - size),
    size: size,
    dx: (Math.random() - 0.5) * 1.5,
    dy: (Math.random() - 0.5) * 1.5
  };
}

function addParticles() {
  while (particles.length < maxParticles) {
    particles.push(createParticle());
  }
}

function drawCircularImage(particle) {
  ctx.save();

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

  requestAnimationFrame(animateParticles);
}

img.onload = () => {
  addParticles();
  animateParticles();
};
