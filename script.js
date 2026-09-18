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