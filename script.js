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

document.addEventListener('click', (e) => {
    if (sidebar && sidebar.classList.contains('active') && !sidebar.contains(e.target)) {
        sidebar.classList.remove('active');
        if(menuBtn) {
            menuBtn.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    }
});

// --- BUSCADOR DINÁMICO (NUEVO) ---
const inputBusqueda = document.getElementById('buscador-input');
const contenedorResultados = document.getElementById('resultados-busqueda');

if (inputBusqueda && contenedorResultados) {
    inputBusqueda.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase();
        contenedorResultados.innerHTML = ""; 

        if (termino.length < 2) {
            contenedorResultados.style.display = 'none';
            return;
        }

        let encontrados = 0;
        // Buscamos en 'biblioteca' (definida en datos.js)
        for (let id in biblioteca) {
            const art = biblioteca[id];
            if (art.titulo.toLowerCase().includes(termino)) {
                const item = document.createElement('a');
                // IMPORTANTE: Ajusta esta ruta si tu archivo se llama distinto
                item.href = `Articulos/Psicologia/articulo.html?id=${id}`; 
                item.className = "resultado-item";
                item.innerHTML = `<strong>${art.titulo}</strong><small>${art.breadcrumb}</small>`;
                contenedorResultados.appendChild(item);
                encontrados++;
            }
        }
        contenedorResultados.style.display = encontrados > 0 ? 'block' : 'none';
    });

    // Cerrar buscador al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!inputBusqueda.contains(e.target)) {
            contenedorResultados.style.display = 'none';
        }
    });
}

// --- CONEXIÓN CON GOOGLE SHEETS ---
const form = document.getElementById('registroForm');
const btnEnviar = document.getElementById('btnEnviar');
const mensajeExito = document.getElementById('mensajeExito');
const scriptURL = 'https://script.google.com/macros/s/AKfycbx1fTP_cGUDq9kj4kp0_9ChMfjQV0c4oeRg4rdK21-7cuLPY1D21mkEa4LVtcYwzNvILA/exec';

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        btnEnviar.innerText = 'Enviando...';
        btnEnviar.disabled = true;

        fetch(scriptURL, { 
            method: 'POST', 
            body: new FormData(form)
        })
        .then(response => {
            console.log('Success!', response);
            form.reset();
            btnEnviar.innerText = 'Consagrar Registro';
            btnEnviar.disabled = false;
            mensajeExito.style.display = 'block';
            setTimeout(() => { mensajeExito.style.display = 'none'; }, 5000);
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('Hubo un error en el ritual de registro. Inténtalo de nuevo.');
            btnEnviar.disabled = false;
            btnEnviar.innerText = 'Consagrar Registro';
        });
    });
}
