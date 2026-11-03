
// =========================
// 1. SMOOTH SCROLLING
// =========================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


// =========================
// 2. TYPING ANIMATION
// =========================

const typingText = document.querySelector(".typing-text");

const messages = [
    "digital experiences.",
    "creative solutions.",
    "meaningful applications."
];

let messageIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingText) return;

    const currentMessage = messages[messageIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent = currentMessage.substring(
        0, characterIndex
    );

    let speed = deleting ? 40 : 80;

    if (!deleting && characterIndex === currentMessage.length) {
        deleting = true;
        speed = 1500;
    }

    else if (deleting && characterIndex === 0) {
        deleting = false;

        messageIndex = (messageIndex + 1) % messages.length;

        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


// =========================
// 3. SCROLL REVEAL
// =========================

const revealElements = document.querySelectorAll(
    ".hero-content, .hero-image, .section"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});


// ======================================
// HAMBURGER MENU
// ======================================

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const closeMenu = document.getElementById("closeMenu");

// Open mobile menu
hamburger.addEventListener("click", function () {
    navLinks.classList.add("active");
});

// Close mobile menu
closeMenu.addEventListener("click", function () {
    navLinks.classList.remove("active");
});

// Close menu after clicking navigation links
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });
});

// Close menu when pressing Escape
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        navLinks.classList.remove("active");
    }
});



/* ==================================
   PROJECT IMAGE GALLERY
================================== */

const projectCards = document.querySelectorAll(
    ".project-view-link"
);

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");

const modalClose = document.getElementById("modalClose");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");
const imageCounter = document.getElementById("imageCounter");

let currentImages = [];
let currentIndex = 0;


// OPEN PROJECT GALLERY

projectCards.forEach(card => {

    card.addEventListener("click", function () {

        currentImages = this.dataset.images
            .split(",")
            .map(image => image.trim())
            .filter(image => image.length > 0);

        currentIndex = 0;

        modalTitle.textContent = this.dataset.title;

        showImage();

        imageModal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


// DISPLAY IMAGE

function showImage() {

    if (currentImages.length === 0) return;

    modalImage.src = currentImages[currentIndex];

    imageCounter.textContent =
        `${currentIndex + 1} / ${currentImages.length}`;

    // Hide navigation if only one image
    const showNavigation = currentImages.length > 1;

    prevImage.style.display = showNavigation ? "block" : "none";
    nextImage.style.display = showNavigation ? "block" : "none";

}


// NEXT IMAGE

nextImage.addEventListener("click", function () {

    currentIndex++;

    if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }

    showImage();

});


// PREVIOUS IMAGE

prevImage.addEventListener("click", function () {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    }

    showImage();

});


// CLOSE POPUP

function closeModal() {

    imageModal.classList.remove("active");

    document.body.style.overflow = "";

    modalImage.src = "";

}


// CLOSE BUTTON

modalClose.addEventListener("click", closeModal);


// CLICK OUTSIDE POPUP

imageModal.addEventListener("click", function (event) {

    if (event.target === imageModal) {
        closeModal();
    }

});


// KEYBOARD NAVIGATION

document.addEventListener("keydown", function (event) {

    if (!imageModal.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeModal();
    }

    if (event.key === "ArrowRight") {
        nextImage.click();
    }

    if (event.key === "ArrowLeft") {
        prevImage.click();
    }

});
