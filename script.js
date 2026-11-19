
const questions = [
    {
        question: "What is GitHub used for?",
        answers: [
            "Editing photos",
            "Hosting and sharing code",
            "Playing games",
            "Creating databases"
        ],
        correct: 1
    },
    {
        question: "What command downloads a GitHub repository?",
        answers: [
            "git push",
            "git commit",
            "git clone",
            "git status"
        ],
        correct: 2
    },
    {
        question: "What does git commit do?",
        answers: [
            "Saves a snapshot of changes",
            "Deletes a repository",
            "Starts Docker",
            "Opens VS Code"
        ],
        correct: 0
    },
    {
        question: "What does git push do?",
        answers: [
            "Downloads code",
            "Uploads local commits to a remote repository",
            "Deletes files",
            "Creates a folder"
        ],
        correct: 1
    },
    {
        question: "What is Docker used for?",
        answers: [
            "Writing documents",
            "Creating presentations",
            "Running applications in containers",
            "Editing images"
        ],
        correct: 2
    },
    {
        question: "What is a Dockerfile?",
        answers: [
            "A file containing instructions to build an image",
            "A GitHub account",
            "A programming language",
            "A text editor"
        ],
        correct: 0
    },
    {
        question: "Which command builds a Docker image?",
        answers: [
            "docker start",
            "docker build",
            "docker delete",
            "docker upload"
        ],
        correct: 1
    },
    {
        question: "What is Visual Studio Code?",
        answers: [
            "A web browser",
            "A database",
            "A code editor",
            "An operating system"
        ],
        correct: 2
    },
    {
        question: "What is the VS Code terminal used for?",
        answers: [
            "Running commands",
            "Watching movies",
            "Drawing pictures",
            "Sending emails"
        ],
        correct: 0
    },
    {
        question: "Which command shows the current Git status?",
        answers: [
            "git clone",
            "git status",
            "git push",
            "git build"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

// HTML elements
const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const feedbackElement = document.getElementById("feedback");
const progressElement = document.getElementById("progress");
const nextButton = document.getElementById("next-btn");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const trophyElement = document.getElementById("trophy");

// -----------------------------
// SHOW QUESTION
// -----------------------------

function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;

    progressElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    feedbackElement.textContent = "";
    nextButton.classList.add("hidden");

    answerButtons.forEach((button, index) => {
        button.textContent = q.answers[index];
        button.className = "answer-btn";
        button.disabled = false;
    });
}

// -----------------------------
// ANSWER BUTTONS
// -----------------------------

answerButtons.forEach((button, index) => {
    button.addEventListener("click", () => {

        if (answered) return;

        answered = true;

        const correctAnswer = questions[currentQuestion].correct;

        if (index === correctAnswer) {

            score++;

            feedbackElement.textContent = "Correct! Great job! 🎉";
            feedbackElement.style.color = "#4ade80";

            // Launch fireworks for correct answers
            launchFireworks();

        } else {

            feedbackElement.textContent =
                "Incorrect! The correct answer is: " +
                questions[currentQuestion].answers[correctAnswer];

            feedbackElement.style.color = "#f87171";
        }

        answerButtons.forEach((btn, i) => {

            btn.disabled = true;

            if (i === correctAnswer) {
                btn.classList.add("correct");
            } else if (i === index) {
                btn.classList.add("wrong");
            }

        });

        nextButton.classList.remove("hidden");
    });
});

// -----------------------------
// NEXT QUESTION
// -----------------------------

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }

});

// -----------------------------
// SHOW FINAL RESULT AND TROPHY
// -----------------------------

function showResult() {

    quizElement.classList.add("hidden");
    resultElement.classList.remove("hidden");

    scoreElement.textContent =
        `You scored ${score} out of ${questions.length}!`;

    // Trophy only if score is greater than 7
    if (score > 7) {
        trophyElement.classList.remove("hidden");
    } else {
        trophyElement.classList.add("hidden");
    }
}

// -----------------------------
// RESTART QUIZ
// -----------------------------

document.getElementById("restart-btn").addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    trophyElement.classList.add("hidden");

    quizElement.classList.remove("hidden");
    resultElement.classList.add("hidden");

    showQuestion();

});

// -----------------------------
// FIREWORKS EFFECT
// -----------------------------

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let particles = [];
let animationRunning = false;

function resizeCanvas() {
    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createFirework(x, y) {

    const colors = [
        "#ff3838",
        "#ffcc00",
        "#38bdf8",
        "#a855f7",
        "#4ade80",
        "#ff69b4"
    ];

    const color = colors[
        Math.floor(Math.random() * colors.length)
    ];

    for (let i = 0; i < 45; i++) {

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color: color,
            size: Math.random() * 3 + 2
        });
    }
}

function launchFireworks() {

    // Create three bursts in different positions
    createFirework(
        window.innerWidth * 0.25,
        window.innerHeight * 0.3
    );

    createFirework(
        window.innerWidth * 0.5,
        window.innerHeight * 0.2
    );

    createFirework(
        window.innerWidth * 0.75,
        window.innerHeight * 0.3
    );

    if (!animationRunning) {
        animationRunning = true;
        animateFireworks();
    }
}

function animateFireworks() {

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((particle) => {

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vy += 0.04;
        particle.alpha -= 0.015;

        ctx.globalAlpha = Math.max(particle.alpha, 0);

        ctx.fillStyle = particle.color;

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    });

    ctx.globalAlpha = 1;

    // Remove particles that have faded away
    particles = particles.filter(
        particle => particle.alpha > 0
    );

    if (particles.length > 0) {

        requestAnimationFrame(animateFireworks);

    } else {

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        animationRunning = false;

    }
}

// Start the quiz
showQuestion();
