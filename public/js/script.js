(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})();

// Password and Email validation
document.getElementById('passwordForm').addEventListener('submit', function(e) {
    // Password validation
    const password = document.getElementById('password').value;
    const passwordErrorElement = document.getElementById('passwordError');
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
        e.preventDefault();
        passwordErrorElement.textContent = 'Password must be at least 8 characters long, contain at least one number, and one uppercase letter.';
    } else {
        passwordErrorElement.textContent = '';
    }

    // Email validation
    const email = document.getElementById('email').value;
    const emailErrorElement = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        e.preventDefault();
        emailErrorElement.textContent = 'Please enter a valid email address.';
    } else {
        emailErrorElement.textContent = '';
    }
});