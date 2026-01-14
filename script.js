// ---------------------------
// Unlock Riddle Logic
// ---------------------------
const unlockScreen = document.getElementById('unlock-screen');
const answerInput = document.getElementById('answer-input');
const answerBtn = document.getElementById('answer-btn');
const mainContainer = document.getElementById('main-container');

answerBtn.addEventListener('click', () => {
  const val = answerInput.value.trim().toLowerCase();
  if (["anywhere door", "anywhere-door", "dokodemo door", "dokodemo"].includes(val)) {
    unlockScreen.classList.add('hidden');
    mainContainer.classList.remove('hidden');
    startGiftSequence();
  } else {
    answerInput.value = "";
    answerInput.placeholder = "nope 😛 try again";
  }
});


// ---------------------------
// Gift Box Sequence
// ---------------------------
function startGiftSequence() {
  const giftBox = document.getElementById('gift-box');
  const giftWrapper = document.getElementById('gift-box-wrapper');

  // Base64 gift image is set via CSS for cleaner layout
  giftWrapper.classList.remove('hidden');

  giftBox.addEventListener('click', () => {
    giftBox.classList.add('open-animation');

    setTimeout(() => {
      giftWrapper.classList.add('hidden');
      showLetter();
      launchFireworks();
    }, 1800);
  });
}


// ---------------------------
// Handwritten Letter Popup
// ---------------------------
function showLetter() {
  const letterPopup = document.getElementById('letter-popup');
  letterPopup.classList.remove('hidden');

  const closeLetter = document.getElementById('close-letter');
  closeLetter.addEventListener('click', () => {
    letterPopup.classList.add('hidden');
    showVoice();
  });
}


// ---------------------------
// Voice Message Mode (C1)
// ---------------------------
function showVoice() {
  const voiceWrapper = document.getElementById('voice-wrapper');
  voiceWrapper.classList.remove('hidden');

  const playBtn = document.getElementById('play-voice');
  const audio = document.getElementById('voice-audio');

  playBtn.addEventListener('click', () => {
    audio.play();
    playBtn.textContent = "Playing...";
  });
}


// ---------------------------
// Fireworks Logic
// ---------------------------
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * (canvas.height / 2);
  const count = 40 + Math.random() * 40;

  for (let i = 0; i < count; i++) {
    particles.push({
      x,
      y,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 3 + 2,
      opacity: 1,
    });
  }
}

function updateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.opacity -= 0.01;
    if (p.opacity <= 0) particles.splice(i, 1);
  });

  particles.forEach(p => {
    ctx.globalAlpha = p.opacity;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });

  requestAnimationFrame(updateFireworks);
}

function launchFireworks() {
  updateFireworks();
  for (let i = 0; i < 12; i++) {
    setTimeout(createFirework, i * 400);
  }
}


// ---------------------------
// Doraemon Floating Sprites
// ---------------------------
const doraLayer = document.getElementById('doraemon-layer');

function spawnDora() {
  const sprite = document.createElement('div');
  sprite.className = 'dora-sprite';
  sprite.style.left = Math.random() * 100 + "vw";
  doraLayer.appendChild(sprite);

  setTimeout(() => sprite.remove(), 12000);
}

setInterval(spawnDora, 3000);


// ---------------------------
// Balloons + Petals
// ---------------------------
const particleLayer = document.getElementById('particles-layer');
function spawnParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + "vw";
  particleLayer.appendChild(p);
  setTimeout(() => p.remove(), 15000);
}
setInterval(spawnParticle, 1200);
