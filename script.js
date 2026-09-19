/* =====================================================
   GLOBAL STATE & VARIABLES
===================================================== */
let currentScreen = 'welcome';
let counterInterval = null;

// English Letter Content
const letterText = `Dearest Sofia,\n\nFrom the very first day, I knew you were someone truly special.\nThank you for every laugh, every hug, and every moment we've shared.\n\nThis little application is a special place kept just for the two of us.`;

/* =====================================================
   INITIALIZATION & SESSION RESTORATION (PWA FIX)
===================================================== */
window.addEventListener("load", () => {
    // Hide Loader
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 1000);
        }, 2400);
    }

    // Check if relationship date is already saved
    const savedDate = localStorage.getItem("relationshipDate");
    if (savedDate) {
        showCelebration();
    } else {
        createFloatingHearts();
    }
});

/* =====================================================
   SCREEN NAVIGATION
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
        }
    }
}

function nextScreen(screenId) {
    showScreenById(screenId);
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

    // Reset element content before typing
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
    // Save ISO date string for iOS compatibility
    const nowIso = new Date().toISOString();
    localStorage.setItem("relationshipDate", nowIso);

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
    const savedDateStr = localStorage.getItem("relationshipDate");
    if (!savedDateStr) return;

    const startTimestamp = new Date(savedDateStr).getTime();
    if (isNaN(startTimestamp)) return;

    updateCounter(startTimestamp);

    if (counterInterval) {
        clearInterval(counterInterval);
    }

    counterInterval = setInterval(() => {
        updateCounter(startTimestamp);
    }, 1000);
}

function updateCounter(startTimestamp) {
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
