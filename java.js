let playerName = "";  // Variable para almacenar el nombre del jugador
let currentQuestionIndex = 0;
let score = 0;
const requiredScore = 20;  // Puntuación mínima para pasar al siguiente nivel
let currentLevel = 1;  // Variable para controlar el nivel actual

// Preguntas y respuestas del nivel 1
const quizDataLevel1 = [
    {
        question: "The elephant is _ than the lion.",
        options: ["biggest", "bigger", "more big"],
        correct: "bigger"
    },
    {
        question: "This is the _ day of the year.",
        options: ["most hot", "hottest", "hotter"],
        correct: "hottest"
    },
    {
        question: "Her new house is _ than the old one.",
        options: ["more big", "bigger", "biggest"],
        correct: "bigger"
    },
    {
        question: "This is the _ pizza I've ever eaten!",
        options: ["most delicious", "deliciouser", "more delicious"],
        correct: "most delicious"
    }
];

// Preguntas y respuestas del nivel 2
const quizDataLevel2 = [
    {
        question: "She sings _ than anyone else in the choir.",
        options: ["more beautifully", "most beautifully", "beautiful"],
        correct: "more beautifully"
    },
    {
        question: "This exercise is the _ of all.",
        options: ["hardest", "more hard", "harder"],
        correct: "hardest"
    },
    {
        question: "His car is _ than mine.",
        options: ["more fast", "faster", "fastest"],
        correct: "faster"
    },
    {
        question: "This book is _ than the last one.",
        options: ["more interesting", "most interesting", "interesting"],
        correct: "more interesting"
    }
];

// Función para el inicio de sesión con nombre
function login(event) {
    event.preventDefault();  // Evitar que el formulario recargue la página
    playerName = document.getElementById("playerName").value;

    if (playerName.trim() !== "") {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("intro-container").style.display = "block";
        document.getElementById("playerDisplayName").textContent = playerName;
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}

// Función para comenzar el quiz
function startQuiz() {
    document.getElementById("intro-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    showQuestion();
    updateScore();
}

// Función para mostrar la pregunta actual
function showQuestion() {
    const quizData = currentLevel === 1 ? quizDataLevel1 : quizDataLevel2;
    const currentQuestion = quizData[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ""; // Limpiar opciones anteriores

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectAnswer(option, button); // Pasar el botón a la función
        optionsContainer.appendChild(button);
    });
}

// Función para seleccionar respuesta
function selectAnswer(selectedOption, button) {
    const quizData = currentLevel === 1 ? quizDataLevel1 : quizDataLevel2;
    const currentQuestion = quizData[currentQuestionIndex];

    // Determinar si la respuesta es correcta
    if (selectedOption === currentQuestion.correct) {
        score += 10; // Incrementar la puntuación si la respuesta es correcta
        button.classList.add("correct"); // Añadir clase de correcto
    } else {
        button.classList.add("incorrect"); // Añadir clase de incorrecto
    }

    // Deshabilitar todas las opciones después de seleccionar una
    const options = document.getElementById("options").children;
    for (let opt of options) {
        opt.disabled = true; // Deshabilitar los botones
    }

    currentQuestionIndex++; // Avanzar a la siguiente pregunta

    // Esperar un momento antes de mostrar la siguiente pregunta
    setTimeout(() => {
        if (currentQuestionIndex < quizData.length) {
            showQuestion(); // Mostrar la siguiente pregunta
            updateScore(); // Actualizar la puntuación
        } else {
            endLevel(); // Terminar el nivel
        }
    }, 1000); // Espera 1 segundo
}

// Función para actualizar la puntuación en la interfaz
function updateScore() {
    document.getElementById("score").textContent = `Score: ${score}`;
}

// Función para finalizar el nivel
function endLevel() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("level-end-container").style.display = "block";

    const endMessage = score >= requiredScore
        ? `${playerName}, you passed level ${currentLevel}!`
        : `${playerName}, you didn't pass level ${currentLevel}.`;

    document.getElementById("end-message").textContent = endMessage;

    if (score >= requiredScore) {
        currentLevel++;  // Aumentar el nivel actual
        document.getElementById("next-level-btn").style.display = "block"; // Mostrar botón para siguiente nivel
    } else {
        document.getElementById("retry-btn").style.display = "block"; // Mostrar botón para repetir el nivel
    }
}

// Función para ir al siguiente nivel
function goToNextLevel() {
    currentLevel++;  // Aumentar el nivel actual
    score = 0; // Reiniciar la puntuación
    currentQuestionIndex = 0; // Reiniciar la pregunta
    document.getElementById("level-end-container").style.display = "none"; // Ocultar fin de nivel
    document.getElementById("level-intro-container").style.display = "block"; // Mostrar introducción del nuevo nivel
}

// Función para iniciar el nivel 2
function startLevelTwo() {
    document.getElementById("level-intro-container").style.display = "none"; // Ocultar introducción del nuevo nivel
    startQuiz(); // Iniciar el quiz del nivel 2
}

// Función para reiniciar el nivel
function retryLevel() {
    score = 0; // Reiniciar la puntuación
    currentQuestionIndex = 0; // Reiniciar la pregunta
    document.getElementById("level-end-container").style.display = "none"; // Ocultar fin de nivel
    startQuiz(); // Reiniciar el quiz
}
