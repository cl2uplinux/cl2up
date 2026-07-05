// -----------------------------
// cl2up
// -----------------------------

// ==========================
// PRELOADER
// ==========================

const preloader = document.getElementById("preloader");
const progress = document.querySelector(".loader-progress");
const text = document.querySelector(".loader-text");

let percent = 0;

const loading = setInterval(()=>{

    percent++;

    progress.style.width = percent + "%";

    if(percent == 35){

        text.textContent = "loading assets...";

    }

    if(percent == 70){

        text.textContent = "starting animations...";

    }

    if(percent >= 100){

        clearInterval(loading);

        text.textContent = "welcome back.";

        setTimeout(()=>{

            preloader.classList.add("hide");

        },500);

    }

},18);

// ===== Cursor =====

const dot = document.querySelector(".cursor-dot");
const outline = document.querySelector(".cursor-outline");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let outlineX = mouseX;
let outlineY = mouseY;

window.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";

});

function animateCursor(){

    outlineX += (mouseX - outlineX) * 0.12;
    outlineY += (mouseY - outlineY) * 0.12;

    outline.style.left = outlineX + "px";
    outline.style.top = outlineY + "px";

    requestAnimationFrame(animateCursor);

}

animateCursor();


// ===== Cursor Hover =====

document.querySelectorAll("a, button").forEach(el => {

    el.addEventListener("mouseenter", () => {

        outline.style.width = "50px";
        outline.style.height = "50px";
        outline.style.background = "rgba(255,255,255,.08)";
        outline.style.borderColor = "#fff";

    });

    el.addEventListener("mouseleave", () => {

        outline.style.width = "34px";
        outline.style.height = "34px";
        outline.style.background = "transparent";
        outline.style.borderColor = "rgba(255,255,255,.45)";

    });

});


// ===== Navbar Active =====

const sections = document.querySelectorAll("section, main");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 200;
        const height = section.offsetHeight;

        if(window.scrollY >= top){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});


// ===== Reveal Animation =====

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.2
});

document.querySelectorAll(".section").forEach(section=>{

    observer.observe(section);

});


// ===== Hero Fade =====

const hero = document.querySelector(".hero");

window.addEventListener("scroll",()=>{

    hero.style.opacity = Math.max(1 - window.scrollY / 500, .15);

});

// ===== Logo Parallax =====

const logo = document.querySelector(".logo");

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;

window.addEventListener("mousemove",(e)=>{

    const x = (e.clientX / window.innerWidth - .5);
    const y = (e.clientY / window.innerHeight - .5);

    targetX = x * 18;
    targetY = y * 18;

});

function animateLogo(){

    currentX += (targetX - currentX) * .05;
    currentY += (targetY - currentY) * .05;

    logo.style.transform = `
        translate(${currentX}px, ${currentY}px)
    `;

    requestAnimationFrame(animateLogo);

}

animateLogo();

// ===== Magnetic Buttons =====

const magneticButtons = document.querySelectorAll(".buttons a");

magneticButtons.forEach(button => {

    button.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `
            translate(${x * 0.18}px, ${y * 0.18}px)
            scale(1.03)
        `;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translate(0px, 0px) scale(1)";

    });

});

// ==========================
// Background Grid Parallax
// ==========================

const grid = document.querySelector(".grid-bg");

let gridTargetX = 0;
let gridTargetY = 0;

let gridX = 0;
let gridY = 0;

window.addEventListener("mousemove",(e)=>{

    const x = (e.clientX / window.innerWidth - .5);
    const y = (e.clientY / window.innerHeight - .5);

    gridTargetX = x * 35;
    gridTargetY = y * 35;

});

function animateGrid(){

    gridX += (gridTargetX - gridX) * .03;
    gridY += (gridTargetY - gridY) * .03;

    grid.style.transform =
        `translate(${gridX}px, ${gridY}px)`;

    requestAnimationFrame(animateGrid);

}

animateGrid();

// ===== Spotlight =====

document.querySelectorAll(".card").forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        card.style.setProperty(
            "--x",
            `${e.clientX - rect.left}px`
        );

        card.style.setProperty(
            "--y",
            `${e.clientY - rect.top}px`
        );

    });

});

// ===== Particles =====

const container = document.getElementById("particles");

for(let i=0;i<18;i++){

    const p=document.createElement("div");

    p.className="particle";

    p.style.left=Math.random()*100+"vw";
    p.style.top=Math.random()*100+"vh";

    p.style.animation=`
        float${i}
        ${18+Math.random()*15}s
        linear
        infinite
    `;

    const style=document.createElement("style");

    style.innerHTML=`
    @keyframes float${i}{

        0%{

            transform:
            translate(0,0);

            opacity:.05;

        }

        50%{

            opacity:.18;

        }

        100%{

            transform:
            translate(${Math.random()*80-40}px,-${250+Math.random()*200}px);

            opacity:0;

        }

    }`;

    document.head.appendChild(style);

    container.appendChild(p);

}
