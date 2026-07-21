// =============================
// Mouse Glow
// =============================

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove",(e)=>{
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

// =============================
// Floating Geometric Shapes Background
// =============================

const container = document.getElementById("orbs-container");
const shapeColors = ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#e0c3fc'];
const shapeTypes = ['circle', 'square', 'triangle', 'diamond'];

for(let i = 0; i < 25; i++){
    const shape = document.createElement("div");
    shape.classList.add("shape");
    
    let size = Math.random() * 60 + 30; // 30px to 90px
    shape.style.width = size + "px";
    shape.style.height = size + "px";
    
    shape.style.left = Math.random() * 100 + "vw";
    shape.style.top = Math.random() * 100 + "vh";
    
    shape.style.animationDuration = (Math.random() * 20 + 15) + "s";
    shape.style.animationDelay = Math.random() * 5 + "s";
    
    const color = shapeColors[Math.floor(Math.random() * shapeColors.length)];
    
    // Mix solid, blurred, or border-only shapes
    const styleType = Math.floor(Math.random() * 3);
    if(styleType === 0) {
        shape.style.background = color;
        shape.style.filter = "blur(10px)";
        shape.style.opacity = "0.6";
    } else if (styleType === 1) {
        shape.style.background = color;
        shape.style.opacity = "0.4";
    } else {
        shape.style.border = `4px solid ${color}`;
        shape.style.background = "transparent";
        shape.style.opacity = "0.6";
    }

    // Apply geometry
    const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    if(type === 'circle') {
        shape.style.borderRadius = "50%";
    } else if(type === 'square') {
        shape.style.borderRadius = "15px";
    } else if(type === 'triangle') {
        shape.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
    } else if(type === 'diamond') {
        shape.style.clipPath = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
    }

    container.appendChild(shape);
}

// =============================
// Reveal Logic (Bounce Transition)
// =============================

const btnReveal = document.getElementById("btn-reveal");
const welcomeCard = document.getElementById("welcome-card");
const mainCard = document.getElementById("main-card");

btnReveal.onclick = () => {
    // 1. Kasih efek "pop" ringan di background
    document.body.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
    document.body.style.transform = "scale(1.02)";

    // 2. Lempar welcome card ke atas
    welcomeCard.classList.add('slide-out');

    // 3. Tampilkan main card dari bawah (bouncy effect ada di CSS)
    setTimeout(() => {
        mainCard.classList.remove('hidden');
        document.body.style.transform = "scale(1)"; // reset scale body
        
        // 4. Tembakkan Confetti warna-warni ceria
        setTimeout(fireVibrantConfetti, 400);
    }, 400);
};

// =============================
// Canvas Confetti (Vibrant/Pop Theme)
// =============================

function fireVibrantConfetti() {
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 35, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // Warna cerah pastel pop
        const vibrantColors = ['#ff758c', '#ff7eb3', '#fbd38d', '#805ad5', '#00e5ff'];

        // Ledakan dari kiri
        confetti(Object.assign({}, defaults, { 
            particleCount,
            colors: vibrantColors,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        // Ledakan dari kanan
        confetti(Object.assign({}, defaults, { 
            particleCount,
            colors: vibrantColors,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);
}

// =============================
// Secret Modal Logic
// =============================
const secretKeyBtn = document.getElementById("secret-key-btn");
const secretModal = document.getElementById("secret-modal");
const closeModal = document.getElementById("close-modal");

secretKeyBtn.onclick = () => {
    secretModal.classList.remove("hidden");
};

closeModal.onclick = () => {
    secretModal.classList.add("hidden");
};

// Tutup modal kalau user klik di luar kartu putih
secretModal.onclick = (e) => {
    if(e.target === secretModal) {
        secretModal.classList.add("hidden");
    }
};