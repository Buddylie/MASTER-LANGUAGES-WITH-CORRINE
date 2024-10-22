// Floating objects animation
function createFloatingObjects() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD93D'];
    for (let i = 0; i < 20; i++) {
        const obj = document.createElement('div');
        obj.classList.add('floating-object');
        obj.style.width = `${Math.random() * 50 + 20}px`;
        obj.style.height = obj.style.width;
        obj.style.background = colors[Math.floor(Math.random() * colors.length)];
        obj.style.left = `${Math.random() * 100}%`;
        obj.style.top = `${Math.random() * 100}%`;
        document.querySelector('.hero').appendChild(obj);

        gsap.to(obj, {
            x: random(-100, 100),
            y: random(-100, 100),
            rotation: random(-180, 180),
            duration: random(5, 10),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

createFloatingObjects();

// Scroll to calendar section
function scrollToCalendar() {
    gsap.to(window, {duration: 1, scrollTo: "#calendar-section"});
}

// Language game logic
const questions = {
    english: [
        { question: "What's the Italian word for 'Hello'?", options: ["Ciao", "Arrivederci", "Grazie"], answer: "Ciao" },
        { question: "How do you say 'Thank you' in Spanish?", options: ["Gracias", "Por favor", "De nada"], answer: "Gracias" }
    ],
    italian: [
        { question: "Come si dice 'Hello' in italiano?", options: ["Ciao", "Arrivederci", "Grazie"], answer: "Ciao" }
    ],
    spanish: [
        { question: "¿Cómo se dice 'Hello' en italiano?", options: ["Ciao", "Arrivederci", "Grazie"], answer: "Ciao" }
    ]
};

let currentLanguage = 'english';
let currentQuestion = 0;

document.addEventListener('DOMContentLoaded', function() {
    function setLanguage(language) {
        currentLanguage = language;
        currentQuestion = 0;
        document.querySelectorAll('.language-button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${language}-button`).classList.add('active');
        loadQuestion();
    }

    function loadQuestion() {
        const question = questions[currentLanguage][currentQuestion];
        document.getElementById('game-question').textContent = question.question;
        const optionsContainer = document.getElementById('game-options');
        optionsContainer.innerHTML = '';
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'game-option';
            button.textContent = option;
            button.onclick = () => checkAnswer(option);
            optionsContainer.appendChild(button);
        });
        document.getElementById('game-result').textContent = '';
    }

    function checkAnswer(selectedAnswer) {
        const question = questions[currentLanguage][currentQuestion];
        const resultElement = document.getElementById('game-result');
        if (selectedAnswer === question.answer) {
            resultElement.textContent = "Correct! Well done!";
            resultElement.style.color = "#4CAF50";
        } else {
            resultElement.textContent = `Incorrect. The correct answer is: ${question.answer}`;
            resultElement.style.color = "#FF6B6B";
        }

        setTimeout(() => {
            currentQuestion = (currentQuestion + 1) % questions[currentLanguage].length;
            loadQuestion();
        }, 2000);
    }

    document.getElementById('english-button').addEventListener('click', () => setLanguage('english'));
    document.getElementById('italian-button').addEventListener('click', () => setLanguage('italian'));
    document.getElementById('spanish-button').addEventListener('click', () => setLanguage('spanish'));

    loadQuestion();
});
