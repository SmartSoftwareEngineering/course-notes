// Hero Slider
const sliders = document.querySelectorAll('.slider');
let currentSlide = 0;

function nextSlide() {
    sliders[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % sliders.length;
    sliders[currentSlide].classList.add('active');
}

setInterval(nextSlide, 5000);

// Statistics Animation
const stats = document.querySelectorAll('.stat-number');

stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const increment = target / 50; // Adjust for animation speed
    
    function updateCount() {
        const count = parseInt(stat.innerText);
        if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 50);
        } else {
            stat.innerText = target;
        }
    }
    
    // Start counting when section is in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCount();
        }
    });
    
    observer.observe(stat);
});

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

// Smooth scroll for CTA button
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('.contact').scrollIntoView({ behavior: 'smooth' });
});