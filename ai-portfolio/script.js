// AOS Init
AOS.init();

// Typed.js Init
const typed = new Typed(".typing-text", {
  strings: ["Developer", "Designer", "Freelancer"],
  typeSpeed: 100,
  backSpeed: 50,
  loop: true
});

// Hamburger Toggle
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

if (hamburger && navList) {
  hamburger.addEventListener('click', () => {
    navList.classList.toggle('show');
  });
}

// Back to Top
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Year auto update
document.getElementById("year").textContent = new Date().getFullYear();

// Form Submit (no backend — just demo)
const form = document.getElementById('form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert("Message sent successfully!");
    form.reset();
  });
}
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
    const formMessage = document.getElementById('formMessage');
    formMessage.style.display = 'none';
    
    // Get values
    const formData = new FormData(this);
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Replace with your actual Formspree endpoint
    fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok');
    })
    .then(data => {
        formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        this.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        formMessage.textContent = 'Failed to send message. Please email me directly at abivarthan444@gmail.com';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
    })
    .finally(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
});
fetch('send_email.php', {
    method: 'POST',
    body: JSON.stringify({
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    }),
    headers: {
        'Content-Type': 'application/json'
    }
})
// Portfolio Filter
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});document.querySelector('form').addEventListener('submit', function(e) {
  const btn = this.querySelector('.btn');
  
  // Add loading state
  btn.classList.add('loading');
  btn.disabled = true;
  
  // Optional: Add a delay to show loading state
  setTimeout(() => {
    // FormSubmit.co will handle the actual submission
    // This just ensures the loading state shows
  }, 300);
});

// Optional: Handle FormSubmit.co response
if (window.location.search.includes('success=true')) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'form-message success';
  messageDiv.textContent = 'Message sent successfully!';
  document.querySelector('form').prepend(messageDiv);
}