const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    radius: 160
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', function() {
    mouse.x = window.innerWidth / 2;
    mouse.y = window.innerHeight / 2;
});

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.4 + 1;
        this.speedX = (Math.random() - 0.5) * 0.9;
        this.speedY = (Math.random() - 0.5) * 0.9;
        this.density = (Math.random() * 18) + 6;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;

            this.x -= directionX;
            this.y -= directionY;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fill();
    }
}

function drawVignette() {
    const centerX = mouse.x || canvas.width / 2;
    const centerY = mouse.y || canvas.height / 2;
    const radius = Math.max(canvas.width, canvas.height) * 0.9;

    const gradient = ctx.createRadialGradient(centerX, centerY, 140, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.55, 'rgba(0, 0, 0, 0.08)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.7)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function connectParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 90) {
                const opacity = 1 - distance / 90;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.18})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }
}

function init() {
    setCanvasSize();
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 1700;

    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }

    connectParticles();
    drawVignette();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);

init();
animate();

const track = document.getElementById('track');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const slides = document.querySelectorAll('.carousel-slide');
const videos = document.querySelectorAll('.carousel-slide video');

let currentIndex = 0;

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    videos.forEach(video => {
        video.pause();
    });
    videos[currentIndex].play();
}

if (track && btnPrev && btnNext && slides.length > 0) {
    btnNext.addEventListener('click', () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    btnPrev.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateCarousel();
    });
}

let currentIndexSertifikat = 0;

        function geserSertifikat(arah) {
            const wrapper = document.getElementById('sertifikatWrapper');
            if (!wrapper) return;
   
            const totalSlide = wrapper.querySelectorAll('.slide-item').length;

            currentIndexSertifikat += arah;
            if (currentIndexSertifikat >= totalSlide) {
                currentIndexSertifikat = 0;
            } else if (currentIndexSertifikat < 0) {
                currentIndexSertifikat = totalSlide - 1;
            }

            // Eksekusi animasi pergeseran
            const jarakGeser = -(currentIndexSertifikat * 100);
            wrapper.style.transform = `translateX(${jarakGeser}%)`;
        }
