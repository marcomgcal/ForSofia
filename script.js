/* =====================================================
   GLOBAL STATE & VARIABLES
===================================================== */
let currentScreen = 'welcome';
let counterInterval = null;
let galleryInterval = null;
let activeGalleryIndex = 0;

// CALCULO EXACTO DE FECHA DE INICIO:
// 7 horas y 20 minutos expresados en milisegundos
const SEVEN_HOURS_TWENTY_MIN_MS = (7 * 60 * 60 * 1000) + (20 * 60 * 1000);

// Guarda en memoria la hora exacta de inicio fija (Hora actual del sistema - 7h 20m)
if (!localStorage.getItem("relationshipStartTime")) {
    const fixedStartTime = Date.now() - SEVEN_HOURS_TWENTY_MIN_MS;
    localStorage.setItem("relationshipStartTime", fixedStartTime);
}

// English Letter Content
const letterText = `From the very first day, I knew you were someone truly special.\nThank you for all the amazing moments we've shared, and for loving me even when I start acting weird!\n\nThis little application is a special place kept just for the two of us.`;

/* =====================================================
   INITIALIZATION
===================================================== */
window.addEventListener("load", () => {
    // Hide Loader
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 800);
        }, 1800);
    }

    createFloatingHearts();
});

/* =====================================================
   SCREEN NAVIGATION & GALLERY CONTROLLER
===================================================== */
function showScreenById(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.remove('active'));

    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        currentScreen = screenId;

        if (screenId === 'letter') {
            typeWriter();
        } else if (screenId === 'gallery') {
            startGallerySlideshow();
        } else {
            if (galleryInterval) clearInterval(galleryInterval);
        }
    }
}

function nextScreen(screenId) {
    showScreenById(screenId);
}

function startGallerySlideshow() {
    const memories = document.querySelectorAll('.memory');
    if (memories.length === 0) return;

    memories.forEach((mem, idx) => {
        if (idx === 0) {
            mem.classList.add('visible');
        } else {
            mem.classList.remove('visible');
        }
    });

    activeGalleryIndex = 0;

    if (galleryInterval) clearInterval(galleryInterval);

    galleryInterval = setInterval(() => {
        memories[activeGalleryIndex].classList.remove('visible');
        activeGalleryIndex = (activeGalleryIndex + 1) % memories.length;
        memories[activeGalleryIndex].classList.add('visible');
    }, 3500);
}

/* =====================================================
   LETTER TYPEWRITER EFFECT
===================================================== */
let typed = false;
function typeWriter() {
    if (typed) return;
    typed = true;

    const el = document.getElementById("typedLetter");
    const btn = document.getElementById("continueLetter");
    let i = 0;

    if (el) el.textContent = "";

    function type() {
        if (i < letterText.length) {
            el.textContent += letterText.charAt(i);
            i++;
            setTimeout(type, 35);
        } else {
            if (btn) btn.style.display = "inline-block";
        }
    }
    type();
}

/* =====================================================
   SAVE DATE & SAVING ANIMATION
===================================================== */
function saveRelationship() {
    showScreenById("saving");
    startSaving();
}

function startSaving() {
    const bar = document.getElementById("savingProgress");
    let progress = 0;

    const interval = setInterval(() => {
        progress += 5;
        if (bar) bar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                showCelebration();
            }, 400);
        }
    }, 100);
}

/* =====================================================
   CELEBRATION & COUNTER
===================================================== */
function showCelebration() {
    showScreenById("celebration");
    triggerConfetti();
    startCounter();
}

function startCounter() {
    // Lee la marca de tiempo fija almacenada
    let savedTimestamp = localStorage.getItem("relationshipStartTime");
    
    // Si por algún motivo no existe, la genera al instante
    if (!savedTimestamp) {
        savedTimestamp = Date.now() - SEVEN_HOURS_TWENTY_MIN_MS;
        localStorage.setItem("relationshipStartTime", savedTimestamp);
    }

    const startTimestamp = parseInt(savedTimestamp, 10);

    // Actualización inmediata antes del primer intervalo
    updateCounter(startTimestamp);

    if (counterInterval) {
        clearInterval(counterInterval);
    }

    // Actualiza cada segundo en tiempo real
    counterInterval = setInterval(() => {
        updateCounter(startTimestamp);
    }, 1000);
}

function updateCounter(startTimestamp) {
    // Calcula la diferencia real en segundos entre la hora actual del dispositivo y la hora de inicio
    const diff = Math.max(0, Math.floor((Date.now() - startTimestamp) / 1000));

    const years = Math.floor(diff / 31536000);
    const months = Math.floor((diff % 31536000) / 2592000);
    const days = Math.floor((diff % 2592000) / 86400);

    const hours = Math.floor((diff % 86400) / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    const elYears = document.getElementById("years");
    const elMonths = document.getElementById("months");
    const elDays = document.getElementById("days");
    const elHours = document.getElementById("hours");
    const elMinutes = document.getElementById("minutes");
    const elSeconds = document.getElementById("seconds");

    if (elYears) elYears.textContent = years;
    if (elMonths) elMonths.textContent = months;
    if (elDays) elDays.textContent = days;

    if (elHours) elHours.textContent = String(hours).padStart(2, "0");
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, "0");
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, "0");
}

/* =====================================================
   EXTRA EFFECTS
===================================================== */
function triggerConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

function createFloatingHearts() {
    const container = document.getElementById("heartContainer");
    if (!container) return;

    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("floatingHeart");
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 15 + 12) + "px";
        heart.style.animationDuration = (Math.random() * 3 + 5) + "s";

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 1200);
}
