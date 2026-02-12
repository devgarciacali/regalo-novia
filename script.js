// Smooth scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Confetti Animation
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.randomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }
    
    randomColor() {
        const colors = ['#8B5CF6', '#EC4899', '#3B82F6', '#F9A8D4', '#A78BFA'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        
        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

let confettiArray = [];
let confettiActive = false;

function createConfetti() {
    for (let i = 0; i < 150; i++) {
        confettiArray.push(new Confetti());
    }
}

function animateConfetti() {
    if (!confettiActive) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confettiArray.forEach(confetti => {
        confetti.update();
        confetti.draw();
    });
    
    requestAnimationFrame(animateConfetti);
}

function startConfetti() {
    if (!confettiActive) {
        confettiActive = true;
        createConfetti();
        animateConfetti();
        
        setTimeout(() => {
            confettiActive = false;
            confettiArray = [];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 5000);
    }
}

// Love Button Click Event
const loveButton = document.getElementById('loveButton');
let clickCount = 0;

loveButton.addEventListener('click', () => {
    clickCount++;
    startConfetti();
    
    // Change button text on clicks
    const messages = [
        '¡Sabía que me amabas! 💜',
        '¡Eres increíble! ✨',
        '¡Te amo más! 💖',
        '¡Infinitamente! 🌟'
    ];
    
    if (clickCount <= messages.length) {
        loveButton.textContent = messages[clickCount - 1];
    }
    
    // Show hidden message after 3 clicks
    if (clickCount === 3) {
        setTimeout(() => {
            document.getElementById('hiddenMessage').classList.add('active');
        }, 1000);
    }
});

// Close hidden message
document.getElementById('closeMessage').addEventListener('click', () => {
    document.getElementById('hiddenMessage').classList.remove('active');
});

// Floating Particles with BT21 Characters (Styled Elements)
const particlesContainer = document.getElementById('particles');

function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.opacity = Math.random() * 0.4 + 0.2;
    particle.style.pointerEvents = 'none';
    
    // BT21 Characters with styled elements
    const bt21Elements = [
        { name: 'KOYA', class: 'particle-koya', size: 40 },
        { name: 'RJ', class: 'particle-rj', size: 40 },
        { name: 'SHOOKY', class: 'particle-shooky', size: 35 },
        { name: 'MANG', class: 'particle-mang', size: 40 },
        { name: 'CHIMMY', class: 'particle-chimmy', size: 40 },
        { name: 'TATA', class: 'particle-tata', size: 45 },
        { name: 'COOKY', class: 'particle-cooky', size: 40 },
        { name: 'VAN', class: 'particle-van', size: 35 },
        { name: '♡', class: 'particle-heart', size: 30 },
        { name: '★', class: 'particle-star', size: 25 },
    ];
    
    const randomElement = bt21Elements[Math.floor(Math.random() * bt21Elements.length)];
    
    particle.className = `floating-particle ${randomElement.class}`;
    particle.textContent = randomElement.name;
    particle.style.width = randomElement.size + 'px';
    particle.style.height = randomElement.size + 'px';
    particle.style.fontSize = (randomElement.size * 0.35) + 'px';
    particle.style.display = 'flex';
    particle.style.alignItems = 'center';
    particle.style.justifyContent = 'center';
    particle.style.fontWeight = '800';
    particle.style.borderRadius = '50%';
    
    const duration = Math.random() * 10 + 10;
    particle.style.animation = `float ${duration}s ease-in-out infinite`;
    
    particlesContainer.appendChild(particle);
}

// Create more particles to show all BT21 characters
for (let i = 0; i < 30; i++) {
    createParticle();
}

// Add float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(-40px) translateX(-10px);
        }
        75% {
            transform: translateY(-20px) translateX(10px);
        }
    }
`;
document.head.appendChild(style);

// Lyrics Data for Okey Dokey (Approximate Timestamps)
const lyrics = [
    { time: 0, text: '🎶 Okey Dokey - MINO, ZICO 🎶' },
    { time: 8, text: 'Is it true? Yes! Okey dokey yo! ✨' },
    { time: 13, text: 'Keep it simple, keep it real! 🕺' },
    { time: 46, text: 'Is it true? Yes! Okey dokey yo! 🎤' },
    { time: 60, text: '¡Eres la estrella de este escenario! 💙' },
    { time: 105, text: 'Say Is it true? Yes! Okey dokey yo! 🎶' },
    { time: 128, text: '¡Cada momento contigo es PERFECTO! ✨' }
];

let lastTime = -1;

function updateLyrics() {
    const currentTime = bgMusic.currentTime;
    const currentLyric = lyrics.slice().reverse().find(l => currentTime >= l.time);
    
    if (currentLyric && currentLyric.text !== typingText.textContent && currentTime !== lastTime) {
        typingText.textContent = currentLyric.text;
        lastTime = currentTime;
    }
}

// Typing Effect replaced by Sync Effect
function startLyricsSync() {
    bgMusic.addEventListener('timeupdate', updateLyrics);
}

// Overlay and Start Logic
const introOverlay = document.getElementById('introOverlay');
const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', () => {
    introOverlay.classList.add('hidden');
    bgMusic.play().catch(e => console.log("Playback failed:", e));
    startLyricsSync();
});

let messageIndex = 0;
// (Existing logic below remains, but we prioritized sync for lyrics)

function typeEffect() {
    // This is now replaced by updateLyrics for the stage section
}

// Start typing effect when section is visible
const stageSection = document.getElementById('stage');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && typingText.textContent === '') {
            typeEffect();
        }
    });
}, { threshold: 0.5 });

observer.observe(stageSection);

// Relationship Counter
// Start date: June 12, 2023 (2 años y 8 meses desde febrero 2026)
const startDate = new Date('2023-06-12T00:00:00');

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

setInterval(updateCounter, 1000);
updateCounter(); 


let sparkleTimeout;
document.addEventListener('mousemove', (e) => {
    clearTimeout(sparkleTimeout);
    sparkleTimeout = setTimeout(() => {
        createSparkle(e.pageX, e.pageY);
    }, 100);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.background = 'radial-gradient(circle, #EC4899, transparent)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkleAnimation 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnimation {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        alert('🎉 ¡Código secreto activado! Eres la mejor jugadora de mi vida 💜');
        startConfetti();
        konamiCode = [];
    }
});

console.log('%c💜 Hecho con amor para la persona más especial del mundo 💜', 'color: #EC4899; font-size: 20px; font-weight: bold;');

// Music Player Logic
const bgMusic = document.getElementById('bgMusic');
const playPauseBtn = document.getElementById('playPause');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const volUpBtn = document.getElementById('volUp');
const volDownBtn = document.getElementById('volDown');

// Set initial volume and icon state
bgMusic.volume = 0.5;
playIcon.style.display = 'block';
pauseIcon.style.display = 'none';

// Function to update icon
function updatePlayPauseIcon() {
    if (bgMusic.paused) {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    } else {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    }
}

bgMusic.addEventListener('play', updatePlayPauseIcon);
bgMusic.addEventListener('pause', updatePlayPauseIcon);

playPauseBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
});

volUpBtn.addEventListener('click', () => {
    if (bgMusic.volume < 1) {
        bgMusic.volume = Math.min(1, bgMusic.volume + 0.1);
    }
});

volDownBtn.addEventListener('click', () => {
    if (bgMusic.volume > 0) {
        bgMusic.volume = Math.max(0, bgMusic.volume - 0.1);
    }
});

// Auto-play attempt (many browsers block this until user interaction)
document.addEventListener('click', () => {
    if (bgMusic.paused && !playPauseBtn.dataset.interacted) {
        // We only want to try auto-playing once on first click if it's not already playing
        // but it's better to let the user click play
    }
}, { once: true });

