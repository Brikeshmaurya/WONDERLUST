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

document.getElementById('passwordForm').addEventListener('submit', function(e) {
    let formIsValid = true; // Use this to keep track of the form's validity

    // Password validation
    const password = document.getElementById('password').value;
    const passwordErrorElement = document.getElementById('passwordError');
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
        passwordErrorElement.textContent = 'Password must be at least 8 characters long, contain at least one number, and one uppercase letter.';
        formIsValid = false; // Set formIsValid to false if password is invalid
    } else {
        passwordErrorElement.textContent = '';
    }

    // Email validation
    const email = document.getElementById('email').value;
    const emailErrorElement = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        emailErrorElement.textContent = 'Please enter a valid email address.';
        formIsValid = false; // Set formIsValid to false if email is invalid
    } else {
        emailErrorElement.textContent = '';
    }

    // Prevent form submission if there are any validation errors
    if (!formIsValid) {
        e.preventDefault();
    }
});