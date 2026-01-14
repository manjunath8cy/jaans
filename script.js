const riddleBtn = document.getElementById("riddle-btn");
const riddleInput = document.getElementById("riddle-input");
const unlockScreen = document.getElementById("unlock-screen");
const mainContent = document.getElementById("main-content");
const giftBox = document.getElementById("gift-box");
const letterPopup = document.getElementById("letter-popup");
const closeLetter = document.getElementById("close-letter");
const voice = document.getElementById("voice");
const voiceBtn = document.getElementById("voice-play");

// Riddle
riddleBtn.onclick = () => {
  if (riddleInput.value.toLowerCase().includes("anywhere door") || riddleInput.value.toLowerCase().includes("door")) {
    unlockScreen.classList.remove("active");
    unlockScreen.classList.add("hidden");
    mainContent.style.display = "block";
    startFireworks();
  }
};

// Gift opening
let giftStage = 0;
giftBox.onclick = () => {
  if (giftStage === 0) {
    giftBox.src = "assets/gift/gift-open1.png";
    giftStage = 1;
  } else if (giftStage === 1) {
    giftBox.src = "assets/gift/gift-open2.png";
    giftStage = 2;
    setTimeout(() => {
      letterPopup.classList.add("show");
    }, 600);
  }
};

// Close letter
closeLetter.onclick = () => {
  letterPopup.classList.remove("show");
};

// Voice
voiceBtn.onclick = () => {
  voice.play();
};

// Fireworks (simple particle)
function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  let particles = [];

  function spawn() {
    for (let i = 0; i < 10; i++) {
      particles.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        life: 60
      });
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.fillRect(p.x, p.y, 3, 3);
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
    });
    particles = particles.filter(p => p.life > 0);
  }

  setInterval(spawn, 300);
  animate();
}
