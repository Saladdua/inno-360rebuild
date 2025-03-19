document.addEventListener("DOMContentLoaded", function() {
    let currentIndex = 0;
    const projects = document.querySelectorAll(".project");
    const totalProjects = projects.length;
    document.addEventListener("DOMContentLoaded", () => {
        const slider = document.querySelector(".project-slider");
        let index = 0;
        const totalSlides = document.querySelectorAll(".project").length;
    
        document.querySelector(".next").addEventListener("click", () => {
            index = (index + 1) % totalSlides;
            updateSlider();
        });
    
        document.querySelector(".prev").addEventListener("click", () => {
            index = (index - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    
        function updateSlider() {
            slider.style.transform = `translateX(-${index * 100}%)`;
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
