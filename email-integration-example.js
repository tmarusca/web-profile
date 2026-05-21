// ================================================================
// EMAIL INTEGRATION EXAMPLE
// ================================================================
// This file shows how to integrate the contact form with EmailJS
// to actually send emails when users submit the form.
//
// SETUP INSTRUCTIONS:
// 1. Sign up at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Get your credentials from the EmailJS dashboard
// 5. Replace the placeholders below with your actual IDs
// 6. Copy this code into script.js, replacing the simulated submission
// ================================================================

// Initialize EmailJS (add this near the top of script.js)
// Get your public key from: https://dashboard.emailjs.com/admin/account
emailjs.init("_d7lu5UoHYQCvUzq1"); // e.g., "user_abc123xyz"

// Replace the contact form submission handler with this:
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot check - if filled, it's likely a bot
    const honeypot = document.getElementById('website');
    if (honeypot && honeypot.value !== '') {
        console.warn('Honeypot triggered - likely spam');
        showMessage('Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
        return;
    }

    // Human verification check
    const humanVerification = document.getElementById('humanVerification');
    if (!humanVerification.checked) {
        showMessage('Please confirm you are human before submitting.', 'error');
        return;
    }

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value || 'Not provided',
        project: document.getElementById('project').value,
        message: document.getElementById('message').value
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.project || !formData.message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        // Send email via EmailJS
        // Get these IDs from: https://dashboard.emailjs.com/admin
        const serviceID = 'service_uvdfqpq';    // e.g., 'service_abc123'
        const templateID = 'template_t8a47bt';  // e.g., 'template_xyz789'
        
        // Template variables (must match your EmailJS template)
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            company: formData.company,
            project_type: formData.project,
            message: formData.message,
            to_email: 'maruscak@gmx.de' // Your email address
        };

        await emailjs.send(serviceID, templateID, templateParams);

        // Success!
        showMessage('Thank you for your message! I will get back to you as soon as possible.', 'success');
        contactForm.reset();

    } catch (error) {
        console.error('EmailJS error:', error);
        showMessage('Sorry, there was an error sending your message. Please email me directly at maruscak@gmx.de', 'error');
    } finally {
        // Restore button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});

// ================================================================
// EMAIL TEMPLATE EXAMPLE
// ================================================================
// Create a template in EmailJS with these variables:
//
// Subject: New Contact Form Submission from {{from_name}}
//
// Body:
// New contact form submission from your portfolio website:
//
// Name: {{from_name}}
// Email: {{from_email}}
// Company: {{company}}
// Project Type: {{project_type}}
//
// Message:
// {{message}}
//
// ---
// Sent via Portfolio Contact Form
// ================================================================

// ================================================================
// ALTERNATIVE: FORMSPREE INTEGRATION
// ================================================================
// Simpler option - no JavaScript needed!
// 
// 1. Sign up at https://formspree.io/
// 2. Create a new form and get your form ID
// 3. Update the HTML form tag:
//
// <form id="contactForm" 
//       action="https://formspree.io/f/YOUR_FORM_ID" 
//       method="POST">
//
// 4. Formspree will handle the rest, including spam protection
// ================================================================

// ================================================================
// ALTERNATIVE: NETLIFY FORMS
// ================================================================
// If hosting on Netlify, add these attributes to the form tag:
//
// <form id="contactForm" 
//       name="contact" 
//       method="POST" 
//       data-netlify="true"
//       data-netlify-honeypot="bot-field">
//
// Netlify automatically handles form submissions!
// ================================================================
