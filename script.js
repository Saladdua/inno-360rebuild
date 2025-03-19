document.addEventListener("DOMContentLoaded", function() {
    let currentIndex = 0;
    const projects = document.querySelectorAll(".project");
    const totalProjects = projects.length;
    const sliders = document.querySelectorAll(".project-slider");

    sliders.forEach(slider => {
        let images = slider.querySelectorAll("img");
        let dotsContainer = slider.parentElement.querySelector(".dots");
        let index = 0;

        // Create dots dynamically
        images.forEach((_, i) => {
            let dot = document.createElement("div");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                images[index].classList.remove("active");
                dotsContainer.children[index].classList.remove("active");
                index = i;
                images[index].classList.add("active");
                dotsContainer.children[index].classList.add("active");
            });
            dotsContainer.appendChild(dot);
        });

        function showNextImage() {
            images[index].classList.remove("active");
            dotsContainer.children[index].classList.remove("active");
            index = (index + 1) % images.length;
            images[index].classList.add("active");
            dotsContainer.children[index].classList.add("active");
        }

        images[0].classList.add("active");

        setInterval(showNextImage, 3000);
    });

    // Carousel navigation
    const carousel = document.querySelector(".carousel");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let scrollAmount = 0;
    const scrollStep = 300;

    prevBtn.addEventListener("click", () => {
        scrollAmount -= scrollStep;
        if (scrollAmount < 0) scrollAmount = 0;
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
    });

    nextBtn.addEventListener("click", () => {
        scrollAmount += scrollStep;
        if (scrollAmount > carousel.scrollWidth - carousel.clientWidth) {
            scrollAmount = carousel.scrollWidth - carousel.clientWidth;
        }
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
    });
});

// Get elements
const loginBtn = document.querySelector(".login");
const modal = document.getElementById("loginModal");
const closeBtn = document.querySelector(".close");

// Show modal when login button is clicked
loginBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

// Close modal when clicking close button
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside the box
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
