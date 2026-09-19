/* =====================================
   FOR SOFIA
   Created with ❤️ by Marco
===================================== */

console.log("For Sofia loaded ❤️");

/* =====================================================
APP STATE & NAVIGATION
===================================================== */

const screens = document.querySelectorAll(".screen");

let currentScreen = 0;
let galleryInterval = null;
let counterInterval = null;
let confettiAnimationId = null;

function showScreen(index) {
    if (index < 0 || index >= screens.length) return;

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    screens[index].classList.add("active");
    currentScreen = index;
}

/* =====================================================
INITIALIZATION & RESTORE SESSION
===================================================== */

window.addEventListener("load", () => {
    // Esconder Loader
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 1000);
        }, 2400);
    }

    // Verificar si ya había una fecha guardada
    const saved = localStorage.getItem("relationshipDate");
    if (saved) {
        showCelebration();
    }
});

/* =====================================================
BEGIN
===================================================== */

const beginBtn = document.getElementById("beginBtn");

if (beginBtn) {
    beginBtn.addEventListener("click", () => {
        showScreen(1);

        setTimeout(() => {
            showScreen(2);
            startGallery();
        }, 2800);
    });
}

/* =====================================================
GALLERY
===================================================== */

const memories = document.querySelectorAll(".memory");
let currentMemory = 0;

function startGallery() {
    if (memories.length === 0) return;

    if (galleryInterval) {
        clearInterval(galleryInterval);
    }

    memories.forEach(memory => {
        memory.classList.remove("visible");
    });

    currentMemory = 0;
    memories[currentMemory].classList.add("visible");

    galleryInterval = setInterval(nextPhoto, 5500);
}

function nextPhoto() {
    if (memories.length === 0) return;

    memories[currentMemory].classList.remove("visible");
    currentMemory = (currentMemory + 1) % memories.length;
    memories[currentMemory].classList.add("visible");
}

function prevPhoto() {
    if (memories.length === 0) return;

    memories[currentMemory].classList.remove("visible");
    currentMemory = (currentMemory - 1 + memories.length) % memories.length;
    memories[currentMemory].classList.add("visible");
}

const continueGallery = document.getElementById("continueGallery");

if (continueGallery) {
    continueGallery.addEventListener("click", () => {
        if (galleryInterval) {
            clearInterval(galleryInterval);
        }
        showScreen(3);
        startLetter();
    });
}

/* =====================================================
SWIPE GALLERY
===================================================== */

let touchStartX = 0;
const gallery = document.getElementById("gallery");

if (gallery) {
    gallery.addEventListener("touchstart", event => {
        touchStartX = event.touches[0].clientX;
    }, { passive: true });

    gallery.addEventListener("touchend", event => {
        const endX = event.changedTouches[0].clientX;
        if (endX < touchStartX - 60) {
            nextPhoto();
        } else if (endX > touchStartX + 60) {
            prevPhoto();
        }
    }, { passive: true });
}

/* =====================================================
LETTER
===================================================== */

const letter = `Dear Sofia,

Sometimes life surprises us.

I never expected to meet someone who could make ordinary moments feel special.

Thank you for every smile,
every conversation,
every hug,
and every memory.

You have made my life brighter.

And there is only one thing left to ask...`;

let letterIndex = 0;
let letterTimer = null;

function startLetter() {
    const target = document.getElementById("typedLetter");
    const continueBtn = document.getElementById("continueLetter");
    
    if (!target) return;

    target.textContent = "";
    letterIndex = 0;

    if (letterTimer) {
        clearInterval(letterTimer);
    }

    letterTimer = setInterval(() => {
        target.textContent = letter.substring(0, letterIndex);
        letterIndex++;

        if (letterIndex > letter.length) {
            clearInterval(letterTimer);
            letterTimer = null;
            
            // Forzar visualización del botón anulando cualquier CSS
            if (continueBtn) {
                continueBtn.style.display = "block";
                continueBtn.style.opacity = "1";
                continueBtn.style.visibility = "visible";
                continueBtn.classList.add("visible");
            }

            // Cambio automático tras 2.5 segundos como respaldo de seguridad
            setTimeout(() => {
                if (currentScreen === 3) {
                    showScreen(4);
                }
            }, 2500);
        }
    }, 35);
}

const continueLetter = document.getElementById("continueLetter");

if (continueLetter) {
    continueLetter.addEventListener("click", () => {
        if (letterTimer) clearInterval(letterTimer);
        showScreen(4);
    });
}

/* =====================================================
PROPOSAL
===================================================== */

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

function moveNoButton() {
    const proposal = document.querySelector(".proposalCard");
    if (!proposal || !noBtn) return;

    const btnWidth = noBtn.offsetWidth || 100;
    const btnHeight = noBtn.offsetHeight || 40;

    const maxX = Math.max(0, proposal.clientWidth - btnWidth - 20);
    const maxY = Math.max(0, proposal.clientHeight - btnHeight - 20);

    noBtn.style.position = "absolute";
    noBtn.style.left = Math.floor(Math.random() * maxX + 10) + "px";
    noBtn.style.top = Math.floor(Math.random() * maxY + 10) + "px";
}

if (noBtn) {
    noBtn.addEventListener("mouseenter", moveNoButton);
    noBtn.addEventListener("touchstart", (event) => {
        event.preventDefault();
        moveNoButton();
    }, { passive: false });
}

if (yesBtn) {
    yesBtn.addEventListener("click", () => {
        if (navigator.vibrate) {
            navigator.vibrate([80, 50, 80]);
        }
        saveRelationship();
    });
}

/* =====================================================
SAVE RELATIONSHIP
===================================================== */

function saveRelationship() {
    const now = Date.now();
    localStorage.setItem("relationshipDate", now);
    showScreen(5);
    startSaving();
}

/* =====================================================
SAVING
===================================================== */

function startSaving() {
    const bar = document.getElementById("savingProgress");
    if (!bar) {
        showCelebration();
        return;
    }

    let progress = 0;
    bar.style.width = "0%";

    const timer = setInterval(() => {
        progress++;
        bar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(timer);
            showCelebration();
        }
    }, 35);
}

/* =====================================================
CELEBRATION
===================================================== */

function showCelebration() {
    showScreen(6);
    launchConfetti();
    startCounter();
}

/* =====================================================
COUNTER
===================================================== */

function startCounter() {
    const saved = Number(localStorage.getItem("relationshipDate"));
    if (!saved) return;

    updateCounter(saved);

    if (counterInterval) {
        clearInterval(counterInterval);
    }

    counterInterval = setInterval(() => {
        updateCounter(saved);
    }, 1000);
}

function updateCounter(start) {
    const diff = Math.floor((Date.now() - start) / 1000);

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
CONFETTI
===================================================== */

const canvas = document.getElementById("confetti");
const ctx = canvas ? canvas.getContext("2d") : null;
const pieces = [];

function initConfetti() {
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    pieces.length = 0;
    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: -Math.random() * canvas.height,
            r: 2 + Math.random() * 4,
            vx: (Math.random() - 0.5) * 2,
            vy: 2 + Math.random() * 3
        });
    }
}

function launchConfetti() {
    if (!ctx) return;
    initConfetti();

    if (confettiAnimationId) {
        cancelAnimationFrame(confettiAnimationId);
    }
    animateConfetti();
}

function animateConfetti() {
    if (!ctx || currentScreen !== 6) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }
    });

    confettiAnimationId = requestAnimationFrame(animateConfetti);
}

/* =====================================================
FLOATING HEARTS
===================================================== */

const heartContainer = document.getElementById("heartContainer");

function createHeart() {
    if (!heartContainer) return;

    const heart = document.createElement("div");
    heart.className = "floatingHeart";
    heart.textContent = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (18 + Math.random() * 20) + "px";
    heart.style.animationDuration = (5 + Math.random() * 4) + "s";

    heartContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 9000);
}

setInterval(() => {
    if (currentScreen === 6) {
        createHeart();
    }
}, 800);

/* =====================================================
SPARKLES
===================================================== */

const sparkleContainer = document.getElementById("sparkleContainer");

function createSparkle() {
    if (!sparkleContainer) return;

    const star = document.createElement("span");
    star.className = "sparkle";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";

    sparkleContainer.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 3000);
}

setInterval(() => {
    if (currentScreen === 6) {
        createSparkle();
    }
}, 350);

/* =====================================================
INSTALL
===================================================== */

let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;

    const card = document.getElementById("installCard");
    if (card) {
        card.classList.remove("installHidden");
    }
});

const installButton = document.getElementById("installButton");

if (installButton) {
    installButton.addEventListener("click", async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;

        const card = document.getElementById("installCard");
        if (card) card.classList.add("installHidden");
    });
}

const laterButton = document.getElementById("laterButton");

if (laterButton) {
    laterButton.addEventListener("click", () => {
        const card = document.getElementById("installCard");
        if (card) card.classList.add("installHidden");
    });
}

/* =====================================================
RESIZE HANDLER
===================================================== */

window.addEventListener("resize", () => {
    if (canvas && currentScreen === 6) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

/* =====================================================
END
===================================================== */

console.log(
    "%cFor Sofia ❤️",
    "font-size:22px;color:white;font-family:serif;"
);
