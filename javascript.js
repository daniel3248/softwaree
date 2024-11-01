const registerForm = document.getElementById('registerForm');
const registerMessageDiv = document.getElementById('registerMessage');

let users = JSON.parse(localStorage.getItem('users')) || [];

// Registro de usuario
registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificar si el usuario ya está registrado
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        registerMessageDiv.innerText = 'El correo ya está registrado.';
        return;
    }

    // Registrar usuario
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    registerMessageDiv.innerText = 'Usuario registrado con éxito.';
    registerForm.reset();
});

