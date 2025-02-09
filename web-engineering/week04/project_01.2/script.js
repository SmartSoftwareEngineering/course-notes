// Project Data
const projects = [
    {
        title: "E-commerce Platform",
        description: "A full-featured online store with real-time inventory management.",
        image: "/api/placeholder/400/320",
        tags: ["React", "Node.js", "MongoDB"]
    },
    {
        title: "AI Chat Application",
        description: "Real-time chat platform with AI-powered responses.",
        image: "/api/placeholder/400/320",
        tags: ["Python", "TensorFlow", "WebSocket"]
    },
    {
        title: "Portfolio Generator",
        description: "Dynamic portfolio creator with customizable themes.",
        image: "/api/placeholder/400/320",
        tags: ["Vue.js", "Firebase", "Sass"]
    }
];

// Skills Data
const skills = [
    { name: "JavaScript", icon: "⚡" },
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "🚀" },
    { name: "Python", icon: "🐍" },
    { name: "CSS3", icon: "🎨" },
    { name: "Git", icon: "🔄" }
];

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


// function changeWord() {
//     const textElement = document.querySelector(".typewriter-text");
//     textElement.style.animation = "none"; // Reset animation
//     textElement.textContent = words[index]; // Change word
//     textElement.offsetHeight; // Trigger reflow
//     textElement.style.animation = `typing 2s steps(${words[index].length}, end) forwards`; // Restart animation
    
//     index = (index + 1) % words.length; // Move to next word
// }

// setInterval(changeWord, 3000); // Change word every 3 seconds
// changeWord(); // Initial call

// Project Cards
const projectsGrid = document.querySelector('.projects-grid');
projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <h3 class="project-title">${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
    `;
    projectsGrid.appendChild(card);
});

// Skills Cards
const skillsGrid = document.querySelector('.skills-grid');
skills.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `
        <div class="skill-icon">${skill.icon}</div>
        <h3>${skill.name}</h3>
    `;
    skillsGrid.appendChild(card);
});

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
observeCards();

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
        
        alert('Message sent successfully!');
        contactForm.reset();
    }
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
let isDark = true;

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.style.setProperty('--bg', isDark ? '#0a192f' : '#f5f5f5');
    document.documentElement.style.setProperty('--bg-light', isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(7, 95, 92, 0.29)');
    document.documentElement.style.setProperty('--bg-lighter', isDark ? 'rgba(100, 255, 218, 0.1)' : 'rgba(6, 83, 80, 0.1)');
    document.documentElement.style.setProperty('--text', isDark ? '#8892b0' : '#2a2a2a');
    document.documentElement.style.setProperty('--text-light', isDark ? '#ccd6f6' : '#000000');
    themeToggle.innerHTML = isDark ? '☀️' : '🌙';
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