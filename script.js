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