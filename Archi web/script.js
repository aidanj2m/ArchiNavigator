// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        
        // Create thank you content
        const thankYouContent = `
            <div class="thank-you-content">
                <div class="checkmark-circle">
                    <div class="checkmark"></div>
                </div>
                <h3>Thank you, ${name}!</h3>
                <p>We'll be in touch with you shortly.</p>
            </div>
        `;
        
        // Add animation class
        contactForm.classList.add('fade-out');
        
        // Replace content after fade out
        setTimeout(() => {
            contactForm.innerHTML = thankYouContent;
            contactForm.classList.remove('fade-out');
            contactForm.classList.add('fade-in');
        }, 300);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Waitlist Modal Functionality
const modal = document.getElementById('waitlistModal');
const waitlistForm = document.getElementById('waitlistForm');
const joinButtons = document.querySelectorAll('.cta-button, .nav-cta-button');

// Open modal when any join button is clicked
joinButtons.forEach(button => {
    if (button.closest('form')) return; // Skip buttons inside forms
    button.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    waitlistForm.reset(); // Clear form
}

// Handle form submission
waitlistForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(waitlistForm);
    const name = formData.get('fullName');
    
    // Replace form with thank you message
    const thankYouContent = `
        <div class="thank-you-content">
            <div class="checkmark-circle">
                <div class="checkmark"></div>
            </div>
            <h3>Thank you, ${name}!</h3>
            <p>You've been added to the waitlist.</p>
        </div>
    `;
    
    const modalForm = modal.querySelector('.modal-form');
    modalForm.classList.add('fade-out');
    
    setTimeout(() => {
        modalForm.innerHTML = thankYouContent;
        modalForm.classList.remove('fade-out');
        modalForm.classList.add('fade-in');
        
        // Close modal after showing thank you message
        setTimeout(closeModal, 2000);
    }, 300);
}); 