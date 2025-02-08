document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = `Thank you, ${name}! We have received your message: "${message}"`;
  });