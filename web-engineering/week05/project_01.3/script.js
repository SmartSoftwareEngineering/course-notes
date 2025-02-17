// Project Data
let projects = [];

// Skills Data
let skills = [];

// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.style.opacity = 0;
    setTimeout(() => loader.style.display = 'none', 500);
});

// Custom Cursor
if (window.innerWidth > 768) {
    const cursor = document.querySelector('.custom-cursor');
    cursor.style.display = 'block';
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.width = '15px';
        cursor.style.height = '15px';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
    });
}

// Header Scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    lastScroll = currentScroll;
});

// Responsive Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("show");
});

// Hero Section Text Change
const words = ["Developer", "Tester", "Cloud Engineer"];
let index = 0;
const textElement = document.querySelector(".typewriter-text");

function typeWriterEffect(word) {
    textElement.textContent = ""; // Clear text
    let charIndex = 0;

    function typeChar() {
        if (charIndex < word.length) {
            textElement.textContent += word[charIndex];
            charIndex++;
            setTimeout(typeChar, 150); // Adjust speed
        } else {
            setTimeout(changeWord, 1500); // Wait before deleting
        }
    }

    typeChar();
}

function changeWord() {
    let word = words[index];
    index = (index + 1) % words.length;
    textElement.style.borderRight = "2px solid white"; // Show cursor
    typeWriterEffect(word);
}
changeWord(); // Start animation loop


// -----------------------------------
// Hero Section Interactive Image
// -----------------------------------
const container = document.querySelector('.hero-image');
const layers = document.querySelectorAll('.layer');

// Maximum rotation angle in degrees
const maxRotation = 45;

document.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const { innerWidth, innerHeight } = window;

  // Calculate rotation based on cursor position
  const rotateX = (clientY - innerHeight / 2) / (innerHeight / 2) * -maxRotation;
  const rotateY = (clientX - innerWidth / 2) / (innerWidth / 2) * maxRotation;

  // Apply different rotation intensities to each layer
  layers.forEach((layer, index) => {
    const intensity = (index + 1) * 0.2;
    layer.style.transform = `rotateX(${rotateX * intensity}deg) rotateY(${rotateY * intensity}deg) translateZ(${25}px)`;
  });
});

// -----------------------------------
// Project Cards
// -----------------------------------

// Project Cards Animation
const observeCards = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
};

// Create an XMLHttpRequest object
const xhttpsProjects = new XMLHttpRequest();

// Define a callback function
xhttpsProjects.onload = function() {
    projects = JSON.parse(this.responseText).records.map(record => record.fields);
    console.log(projects);
    
    const projectsGrid = document.querySelector('.projects-grid');
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.Image[0].url}" alt="${project.Title}" class="project-image">
            <h3 class="project-title">${project.Title}</h3>
            <p>${project.Description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
        projectsGrid.appendChild(card);
    });
    observeCards();
}

// Open a request
xhttpsProjects.open("GET", "https://api.airtable.com/v0/appL5u4hDzeIvJLkH/tblcTuRvT1sTtIjLU");
// Set Bearer Token
xhttpsProjects.setRequestHeader("Authorization", "Bearer pat3ccG5CYVByZBPR.3c90148b9bd3b4ebef912bdcb62c63f46e76c8eaa672a31d25dbcbd3b7705ff2");
// Send a request
xhttpsProjects.send();

// -----------------------------------
// Skills Cards
// -----------------------------------

// Create an XMLHttpRequest object
const xhttpsSkills = new XMLHttpRequest();

// Define a callback function
xhttpsSkills.onload = function() {
    skills = JSON.parse(this.responseText).records.map(record => record.fields);
    console.log(skills);
    
    const skillsGrid = document.querySelector('.skills-grid');
    skills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerHTML = `
            <div class="skill-icon">${skill.icon}</div>
            <h3>${skill.Name}</h3>
        `;
        skillsGrid.appendChild(card);
    });
}

// Open a request
xhttpsSkills.open("GET", "https://api.airtable.com/v0/appL5u4hDzeIvJLkH/tblgJ4caM0TTTreAm");
// Set Bearer Token
xhttpsSkills.setRequestHeader("Authorization", "Bearer pat3ccG5CYVByZBPR.3c90148b9bd3b4ebef912bdcb62c63f46e76c8eaa672a31d25dbcbd3b7705ff2");
// Send a request
xhttpsSkills.send();


// FAQ Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        content.classList.toggle('active');
    });
});

// Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const contactMethodInputs = document.getElementsByName('contactMethod');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Name validation
    if (!nameInput.value.trim()) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('phoneError').style.display = 'none';
    }

    // Contact method validation
    let contactMethodSelected = false;
    contactMethodInputs.forEach(input => {
        if (input.checked) contactMethodSelected = true;
    });
    if (!contactMethodSelected) {
        document.getElementById('contactMethodError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('contactMethodError').style.display = 'none';
    }

    // Message validation
    if (!messageInput.value.trim()) {
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('messageError').style.display = 'none';
    }

    if (isValid) {
        // Get additional form data
        const priorityContact = document.getElementById('priority').checked;
        const preferredMethod = Array.from(contactMethodInputs).find(input => input.checked).value;
        
        // You would typically send this data to your server
        console.log('Form submitted with priority:', priorityContact);
        console.log('Preferred contact method:', preferredMethod);

        const xhrContact = new XMLHttpRequest();
        xhrContact.open("POST", "https://api.airtable.com/v0/appNlMgYUa4JoPrJ2/tblVsAbDF0dsyFg1R", true);

        // Send the proper header information along with the request
        xhrContact.setRequestHeader("Content-Type", "application/json");

        // Set Bearer Token
        xhrContact.setRequestHeader("Authorization", "Bearer patzww4W7XTfB8axE.2a097d414a602df675d25fe66ece99d7f19e6bc03a4a6f799ae9f3b446c52119");

        xhrContact.onreadystatechange = () => {
        // Call a function when the state changes.
        if (xhrContact.readyState === XMLHttpRequest.DONE && xhrContact.status === 200) {
            alert('Message sent successfully!');
            contactForm.reset();
        }
        };
        contactDetails = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            contactMethod: preferredMethod,
            priority: priorityContact,
            message: messageInput.value.trim()
        }
        xhrContact.send(JSON.stringify({records: [ {"fields": contactDetails} ]}));
    }
});

// Theme Toggle

function applyTheme(isDark) {
    console.log(isDark);
    
    document.documentElement.style.setProperty('--bg', isDark ? '#0a192f' : '#f5f5f5');
    document.documentElement.style.setProperty('--bg-light', isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(7, 95, 92, 0.29)');
    document.documentElement.style.setProperty('--bg-lighter', isDark ? 'rgba(100, 255, 218, 0.1)' : 'rgba(6, 83, 80, 0.1)');
    document.documentElement.style.setProperty('--text', isDark ? '#8892b0' : '#2a2a2a');
    document.documentElement.style.setProperty('--text-light', isDark ? '#ccd6f6' : '#000000');
    themeToggle.innerHTML = isDark ? '☀️' : '🌙';
}

const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = window.localStorage.getItem("isDark");
console.log(savedTheme);

let isDark = (savedTheme === "false") ? false : true;
applyTheme(isDark)

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    applyTheme(isDark)
    window.localStorage.setItem("isDark", isDark);
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effect for interactive elements
const addHoverEffect = (element) => {
    element.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            document.querySelector('.custom-cursor').style.transform = 'translate(-50%, -50%) scale(1.5)';
        }
    });
    
    element.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            document.querySelector('.custom-cursor').style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });
};

// Apply hover effect to interactive elements
document.querySelectorAll('a, button, .project-card, .skill-card', '.accordion-item').forEach(addHoverEffect);