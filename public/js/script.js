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

//Validation
document.getElementById('passwordForm').addEventListener('submit', function(e) {
    let formIsValid = true;
    const password = document.getElementById('password').value;
    const passwordErrorElement = document.getElementById('passwordError');
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    passwordErrorElement.textContent = '';

    if (!passwordRegex.test(password)) {
        passwordErrorElement.textContent = 'Password must be at least 8 characters long, contain at least one number, and one uppercase letter.';
        formIsValid = false; 
    }

    const email = document.getElementById('email').value;
    const emailErrorElement = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailErrorElement.textContent = '';
    if (!emailRegex.test(email)) {
        emailErrorElement.textContent = 'Please enter a valid email address.';
        formIsValid = false; 
    }

    if (!formIsValid) {
        e.preventDefault();  // Stop the form from submitting
    }

});
