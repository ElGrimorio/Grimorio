// --- FONDO ESTELAR DINÁMICO ---
const canvas = document.getElementById('canvas-stars');
const ctx = canvas.getContext('2d');

function setSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', setSize);
setSize();

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.2;
        this.blink = Math.random();
        this.speed = 0.01 + Math.random() * 0.02;
    }
    update() {
        this.blink += this.speed;
    }
    draw() {
        const opacity = Math.abs(Math.sin(this.blink));
        ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const stars = Array.from({ length: 150 }, () => new Star());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
        s.update();
        s.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// --- LÓGICA DE MENÚ MÓVIL ---
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');

if (menuBtn) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
}

// Cerrar menú al tocar fuera
document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('active') && !sidebar.contains(e.target)) {
        sidebar.classList.remove('active');
        menuBtn.querySelector('i').setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }
});
