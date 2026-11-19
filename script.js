
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

const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const feedbackElement = document.getElementById("feedback");
const progressElement = document.getElementById("progress");
const nextButton = document.getElementById("next-btn");

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

answerButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        if (answered) return;

        answered = true;

        const correctAnswer = questions[currentQuestion].correct;

        if (index === correctAnswer) {
            score++;
            feedbackElement.textContent = "Correct! Great job!";
            feedbackElement.style.color = "#4ade80";
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

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    document.getElementById("score").textContent =
        `You scored ${score} out of ${questions.length}!`;
}

document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    document.getElementById("quiz").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");

    showQuestion();
});

showQuestion();
