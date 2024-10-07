document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === 'ldsm_admin' && password === 'c24P30@2000') {
            sessionStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'home.html';
        } else {
            alert('Identifiants incorrects. Veuillez réessayer.');
        }
    });
});

// Check if user is already logged in
if (sessionStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'home.html';
}