const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
let mouse = {
    x: undefined,
    y: undefined,
    radius: 120
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.density = (Math.random() * 20) + 1;
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
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; // Warna partikel
        ctx.fill();
    }
}

function init() {
    setCanvasSize();
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 4000; 
    
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
    requestAnimationFrame(animate); 
}

const track = document.getElementById('track');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const slides = document.querySelectorAll('.carousel-slide');
const videos = document.querySelectorAll('.carousel-slide video');

let currentIndex = 0;

function updateCarousel() {
    // Geser trek sebesar (Lebar 1 Slide x Index Saat Ini)
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Jeda seluruh video di semua slide
    videos.forEach(video => {
        video.pause();
    });

    // Jalankan (play) otomatis hanya video pada slide yang sedang aktif di layar
    videos[currentIndex].play();
}

btnNext.addEventListener('click', () => {
    // Jika belum di slide terakhir, maju. Jika sudah, kembali ke awal
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

btnPrev.addEventListener('click', () => {
    // Jika belum di slide pertama, mundur. Jika sudah, pergi ke akhir
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    updateCarousel();
});