// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Character counter for message field
    if (messageField) {
        messageField.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;

            if (count > 500) {
                this.value = this.value.substring(0, 500);
                charCount.textContent = 500;
            }

            // Change color based on character count
            if (count > 400) {
                charCount.parentElement.style.color = '#e74c3c';
            } else if (count > 250) {
                charCount.parentElement.style.color = '#f39c12';
            } else {
                charCount.parentElement.style.color = '#27ae60';
            }
        });
    }

    // Form validation and submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Hide previous messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';

            // Validate form
            if (!contactForm.checkValidity() === false) {
                e.stopPropagation();
            }

            // Perform custom validation
            const isValid = validateForm();

            if (isValid) {
                submitForm();
            }
        });
    }

    // Input focus effects
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('form-group-focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('form-group-focused');
            validateField(this);
        });

        // Real-time validation
        input.addEventListener('input', function() {
            validateField(this);
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        const isValid = field.checkValidity() && value.length > 0;

        if (isValid) {
            field.classList.add('is-valid');
            field.classList.remove('is-invalid');
        } else if (field.value.length > 0 || field.classList.contains('is-invalid')) {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }
    }

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Check if required fields are filled
        if (!name || !email || !subject || !message) {
            errorMessage.textContent = 'Please fill in all required fields.';
            errorMessage.style.display = 'block';
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorMessage.textContent = 'Please enter a valid email address.';
            errorMessage.style.display = 'block';
            return false;
        }

        // Phone validation (if provided)
        const phone = document.getElementById('phone').value.trim();
        if (phone) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone) || phone.length < 10) {
                errorMessage.textContent = 'Please enter a valid phone number.';
                errorMessage.style.display = 'block';
                return false;
            }
        }

        return true;
    }

    function submitForm() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

        // Simulate form submission (in real app, this would send to a server)
        setTimeout(() => {
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Log the data (in production, send this to your backend)
            console.log('Form submitted with data:', data);

            // Show success message
            successMessage.style.display = 'block';

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Reset form
            contactForm.reset();
            charCount.textContent = 0;
            charCount.parentElement.style.color = '#27ae60';

            // Remove validation classes
            formInputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });

            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }, 1500);
    }
});
