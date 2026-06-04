document.querySelector('.registration-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;

    if (password !== confirm_password) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    const submitBtn = this.querySelector('button[type="submit"]') || this.querySelector('input[type="submit"]');
    const originalText = submitBtn ? submitBtn.value || submitBtn.textContent : '';
    
    if (submitBtn) {
        if (submitBtn.tagName === 'INPUT') submitBtn.value = 'Registering Account...';
        else submitBtn.textContent = 'Registering Account...';
        submitBtn.disabled = true;
    }

    try {
        const response = await fetch('http://localhost:5500/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.status === 201 || response.status === 200) {
            alert('Registration Successful! Redirecting to login...');
            window.location.href = 'login.html';
        } else {
            alert('Registration failed: ' + (data.error || 'Unknown error occurred.'));
        }
    } catch (err) {
        console.warn('Backend server offline. Simulating local signup.', err);
        alert('Express server unreachable. Simulating local registration success!');
        localStorage.setItem('currentUser', username);
        window.location.href = 'home.html';
    } finally {
        if (submitBtn) {
            if (submitBtn.tagName === 'INPUT') submitBtn.value = originalText;
            else submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
});
