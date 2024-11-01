const loginForm = document.getElementById('loginForm');
const loginMessageDiv = document.getElementById('loginMessage');

let users = JSON.parse(localStorage.getItem('users')) || [];

// Inicio de sesión
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    // Verificar si el usuario existe y la contraseña es correcta
    const user = users.find(user => user.username === loginUsername && user.password === loginPassword);
    
    if (user) {
        loginMessageDiv.innerText = 'Inicio de sesión exitoso. ¡Bienvenido!';
        // Aquí podrías redirigir a otra página, por ejemplo:
        // window.location.href = 'welcome.html';
    } else {
        loginMessageDiv.innerText = 'Usuario o contraseña incorrectos.';
    }
});
