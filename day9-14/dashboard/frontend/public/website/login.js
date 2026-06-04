document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill out all fields.');
        return;
    }

    // Accept credentials to simulate successful login
    alert(`Login Successful! Welcome, ${username}.`);
    localStorage.setItem('currentUser', username);
    window.location.href = 'home.html';
});
