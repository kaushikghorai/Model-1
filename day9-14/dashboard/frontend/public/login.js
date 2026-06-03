document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Here you can add code to validate the form data or perform any other action
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password') {
        alert('Login successful!');
    } else {
        alert('Invalid credentials. Please try again.');
    }
});
