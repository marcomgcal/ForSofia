/* =====================================
   FOR SOFIA
   Created with ❤️ by Marco
===================================== */

console.log("For Sofia loaded ❤️");

/* ---------- APP ---------- */

const app = document.getElementById("app");

let currentScreen = 0;

function showScreen(index){

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen=>{
        screen.classList.remove("active");
    });

    if(screens[index]){

        screens[index].classList.add("active");

        currentScreen = index;

    }

}

/* ---------- LOADER ---------- */

window.addEventListener("load",()=>{

    console.log("Application ready.");

});

/* ---------- BEGIN ---------- */

document.addEventListener("click",(event)=>{

    if(event.target.id==="beginBtn"){

        showScreen(1);

    }

});

/* =====================================================
   FOR SOFIA
   MAIN APP ENGINE
===================================================== */

const screens=document.querySelectorAll(".screen");

let currentScreen=0;

function showScreen(index){

    screens.forEach(screen=>{

        screen.classList.remove("active");

    });

    screens[index].classList.add("active");

    currentScreen=index;

}

function nextScreen(){

    if(currentScreen<screens.length-1){

        showScreen(currentScreen+1);

    }

}

/* =====================================================
BEGIN
===================================================== */

const beginBtn=document.getElementById("beginBtn");

if(beginBtn){

beginBtn.addEventListener(

"click",

()=>{

showScreen(1);

setTimeout(()=>{

showScreen(2);

startGallery();

},2800);

}

);

}

/* =====================================================
GALLERY
===================================================== */

const memories=document.querySelectorAll(".memory");

let currentMemory=0;

function startGallery(){

if(memories.length===0)return;

memories.forEach(memory=>{

memory.classList.remove("visible");

});

currentMemory=0;

memories[0].classList.add("visible");

galleryLoop();

}

function galleryLoop(){

setInterval(()=>{

memories[currentMemory].classList.remove("visible");

currentMemory++;

if(currentMemory>=memories.length){

currentMemory=0;

}

memories[currentMemory].classList.add("visible");

},5500);

}

const continueGallery=document.getElementById("continueGallery");

if(continueGallery){

continueGallery.addEventListener(

"click",

()=>{

showScreen(3);

startLetter();

}

);

}

/* =====================================================
LETTER
===================================================== */

const letter=`Dear Sofia,

Sometimes life surprises us.

I never expected to meet someone who could make ordinary moments feel special.

Thank you for every smile,
every conversation,
every hug,
and every memory.

You have made my life brighter.

And there is only one thing left to ask...

`;

let letterIndex=0;

function startLetter(){

const target=document.getElementById("typedLetter");

if(!target)return;

target.innerHTML="";

letterIndex=0;

const timer=setInterval(()=>{

target.innerHTML+=letter.charAt(letterIndex);

letterIndex++;

if(letterIndex>=letter.length){

clearInterval(timer);

}

},32);

}

const continueLetter=document.getElementById("continueLetter");

if(continueLetter){

continueLetter.addEventListener(

"click",

()=>{

showScreen(4);

}

);

}

/* =====================================================
PROPOSAL
===================================================== */

const yesBtn=document.getElementById("yesBtn");
const noBtn=document.getElementById("noBtn");

if(noBtn){

noBtn.addEventListener("mouseenter",moveNoButton);
noBtn.addEventListener("touchstart",moveNoButton);

}

function moveNoButton(){

const proposal=document.querySelector(".proposalCard");

const maxX=proposal.clientWidth-180;
const maxY=proposal.clientHeight-80;

const x=Math.random()*maxX;
const y=Math.random()*maxY;

noBtn.style.position="absolute";
noBtn.style.left=x+"px";
noBtn.style.top=y+"px";

}

if(yesBtn){

yesBtn.addEventListener("click",()=>{

if(navigator.vibrate){

navigator.vibrate([80,50,80]);

}

saveRelationship();

});

}

/* =====================================================
SAVE DATE
===================================================== */

function saveRelationship(){

const now=new Date().getTime();

localStorage.setItem(

"relationshipDate",

now

);

showScreen(5);

startSaving();

}

/* =====================================================
SAVING BAR
===================================================== */

function startSaving(){

const bar=document.getElementById("savingProgress");

let progress=0;

const timer=setInterval(()=>{

progress++;

bar.style.width=progress+"%";

if(progress>=100){

clearInterval(timer);

showCelebration();

}

},35);

}

/* =====================================================
CELEBRATION
===================================================== */

function showCelebration(){

showScreen(6);

launchConfetti();

startCounter();

}

/* =====================================================
COUNTER
===================================================== */

function startCounter(){

const saved=Number(

localStorage.getItem(

"relationshipDate"

)

);

updateCounter(saved);

setInterval(()=>{

updateCounter(saved);

},1000);

}

function updateCounter(start){

const diff=Math.floor(

(Date.now()-start)/1000

);

const years=Math.floor(diff/31536000);

const months=Math.floor(

(diff%31536000)/2592000

);

const days=Math.floor(

(diff%2592000)/86400

);

const hours=Math.floor(

(diff%86400)/3600

);

const minutes=Math.floor(

(diff%3600)/60

);

const seconds=diff%60;

document.getElementById("years").textContent=years;
document.getElementById("months").textContent=months;
document.getElementById("days").textContent=days;

document.getElementById("hours").textContent=
String(hours).padStart(2,"0");

document.getElementById("minutes").textContent=
String(minutes).padStart(2,"0");

document.getElementById("seconds").textContent=
String(seconds).padStart(2,"0");

}

/* =====================================================
CONFETTI
===================================================== */

const canvas=document.getElementById("confetti");

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

const pieces=[];

for(let i=0;i<180;i++){

pieces.push({

x:Math.random()*canvas.width,

y:-Math.random()*canvas.height,

r:2+Math.random()*5,

vx:(Math.random()-.5)*3,

vy:2+Math.random()*4

});

}

function launchConfetti(){

animateConfetti();

}

function animateConfetti(){

ctx.clearRect(

0,

0,

canvas.width,

canvas.height

);

pieces.forEach(p=>{

ctx.beginPath();

ctx.arc(

p.x,

p.y,

p.r,

0,

Math.PI*2

);

ctx.fillStyle="white";

ctx.fill();

p.x+=p.vx;
p.y+=p.vy;

if(p.y>canvas.height){

p.y=-20;

}

});

requestAnimationFrame(

animateConfetti

);

}

/* =====================================================
RESTORE SESSION
===================================================== */

window.addEventListener("load",()=>{

const saved=

localStorage.getItem(

"relationshipDate"

);

if(saved){

showCelebration();

}

});