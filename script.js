// -----------------------------
// cl2up
// -----------------------------

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
