document.addEventListener("DOMContentLoaded", function() {
    let currentIndex = 0;
    const projects = document.querySelectorAll(".project");
    const totalProjects = projects.length;
    document.addEventListener("DOMContentLoaded", () => {
        const slider = document.querySelector(".project-slider");
        const slides = document.querySelectorAll(".project");
        let index = 0;
        const totalSlides = slides.length;
    
        // Set the width of the slider dynamically
        slider.style.width = `${totalSlides * 100}%`;
    
        // Set each slide's width to be equal to the container
        slides.forEach(slide => {
            slide.style.width = `${100 / totalSlides}%`;
        });
    
        document.querySelector(".next").addEventListener("click", () => {
            if (index < totalSlides - 1) {
                index++;
            } else {
                index = 0;
            }
            updateSlider();
        });
    
        document.querySelector(".prev").addEventListener("click", () => {
            if (index > 0) {
                index--;
            } else {
                index = totalSlides - 1;
            }
            updateSlider();
        });
    
        function updateSlider() {
            slider.style.transform = `translateX(-${index * (100 / totalSlides)}%)`;
        }
    });    
    

    function showNextProject() {
        projects[currentIndex].style.display = "none";
        currentIndex = (currentIndex + 1) % totalProjects;
        projects[currentIndex].style.display = "block";
    }

    // Hide all projects except the first one
    projects.forEach((project, index) => {
        if (index !== 0) project.style.display = "none";
    });

    // Auto slide every 3 seconds
    setInterval(showNextProject, 3000);
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
