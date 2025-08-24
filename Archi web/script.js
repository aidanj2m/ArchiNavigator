import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

// Initialize Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const waitlistForm = document.getElementById('waitlistForm');
    
    // Handle contact form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        
        try {
            // Insert data into Supabase
            const { data, error } = await supabaseClient
                .from('contact_requests')
                .insert([
                    { name, email, type: 'call_booking' }
                ]);

            if (error) throw error;
            
            // Show thank you message
            const thankYouContent = `
                <div class="thank-you-content">
                    <div class="checkmark-circle">
                        <div class="checkmark"></div>
                    </div>
                    <h3>Thank you, ${name}!</h3>
                    <p>We'll be in touch with you shortly.</p>
                </div>
            `;
            
            contactForm.classList.add('fade-out');
            
            setTimeout(() => {
                contactForm.innerHTML = thankYouContent;
                contactForm.classList.remove('fade-out');
                contactForm.classList.add('fade-in');
            }, 300);
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting your request. Please try again.');
        }
    });
    
    // Handle waitlist form submission
    waitlistForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(waitlistForm);
        const name = formData.get('fullName');
        const email = formData.get('email');
        
        try {
            // Insert data into Supabase
            const { data, error } = await supabaseClient
                .from('waitlist')
                .insert([
                    { name, email }
                ]);

            if (error) throw error;
            
            // Show thank you message
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
                
                setTimeout(closeModal, 2000);
            }, 300);
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error joining the waitlist. Please try again.');
        }
    });
});

// Modal functionality
const modal = document.getElementById('waitlistModal');
const joinButtons = document.querySelectorAll('.cta-button, .nav-cta-button');

joinButtons.forEach(button => {
    if (button.closest('form')) return;
    button.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('waitlistForm').reset();
}

// Smooth scrolling
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

// Navigation highlighting
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