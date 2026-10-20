/**
 * Personal Portfolio Website Script
 * Handles navigation bar scrolling effects, mobile menu interaction,
 * smooth scrolling, and contact form handling.
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. HEADER SCROLL SHADOW EFFECT
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. MOBILE HAMBURGER MENU TOGGLE
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });

  // Close mobile drawer when clicking navigation links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = hamburger.querySelector('i');
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    });
  });

  // 3. INTERACTIVE CONTACT FORM SUBMISSION
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Basic client-side validation check
      if (!name || !email || !message) {
        formStatus.textContent = 'Please fill out all fields.';
        formStatus.className = 'form-message error';
        return;
      }

      // UI visual feedback during submission
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate async network request
      setTimeout(() => {
        formStatus.textContent = 'Message sent successfully! Thank you.';
        formStatus.className = 'form-message success';
        
        // Reset form inputs and restore button state
        contactForm.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          formStatus.className = 'form-message';
        }, 5000);
      }, 1200);
    });
  }

});