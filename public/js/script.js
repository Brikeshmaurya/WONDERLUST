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


// Password validation
document.getElementById('passwordForm').addEventListener('submit', function(e) {
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('passwordError');
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
        e.preventDefault();
        errorElement.textContent = 'Password must be at least 8 characters long, contain at least one number, and one uppercase letter.';
    } else {
        errorElement.textContent = '';
    }


    const email = document.getElementById('email').value;
    const errorElement2 = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        e.preventDefault();
        errorElement2.textContent = 'Please enter a valid email address.';
    } else {
        errorElement.textContent = '';
    }
});