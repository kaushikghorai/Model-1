document.querySelector('.registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Here you can add code to validate the form data or perform any other action
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;

    if (password !== confirm_password) {
        alert('Passwords do not match. Please try again.');
    } else {
        alert('Registration successful!');
    }
});
