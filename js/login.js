document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Ici, vous pouvez ajouter votre logique de vérification
        // Pour cet exemple, nous utiliserons des identifiants codés en dur
        if (username === 'ldsm_admin' && password === 'c24P30@2000') {
            sessionStorage.setItem('isLoggedIn', 'true');
            window.location.href = '../index.html';
        } else {
            alert('Identifiants incorrects. Veuillez réessayer.');
        }
    });
});