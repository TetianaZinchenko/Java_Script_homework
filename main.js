// All answer options
const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');

// All our options
const optionElements = document.querySelectorAll('.option');

// Question
const question = document.getElementById('question');

// Number of question
const numberOfQuestion = document.getElementById('number-of-question');

// Amount of all questions
const numberOfAllQuestions = document.getElementById('number-of-all-questions');

// Index of current question
let indexOfQuestion;

// Index of current page
let indexOfPage = 0;

// Wrapper for our tracker
const answersTracker = document.getElementById('answers-tracker');

// Button for next step
const btnNext = document.getElementById('btn-next');

// otal result for quiz
let score = 0;

// Amount of correct answers
const correctAnswer = document.getElementById('correct-answer');

// Amount of all questions in modal window
const numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2');

// Button 'Try quiz again'
const btnTryAgain = document.getElementById('btn-try-again');

const questions = [{
        question: 'Сложно ли изучать программирование?',
        options: [
            'Да',
            'Нет',
            'Зависит от ситуации',
            'Зависит от желания'
        ],
        rightAnswer: 3
    },
    {
        question: 'Любишь ли ты учиться online?',
        options: [
            'Да',
            'Нет',
            'Жить без этого не могу',
            'А что это?'
        ],
        rightAnswer: 2
    },
    {
        question: 'Нравится ли тебе учиться в WayUp?',
        options: [
            'Да',
            'Нет',
            'Не знаю',
            'Не задумывался над этим'
        ],
        rightAnswer: 0
    }
];

// Output of amount of all questions
numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // Choiсe of question
    // To map all questions
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];
    // Setting the number of current page
    numberOfQuestion.innerHTML = indexOfPage + 1;
    // Increase the number of page
    indexOfPage++;
};

// Massive for completed answers
let completedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    // Anchor to check the same questions
    let hitDuplicate = false;

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) { // second option: hitDuplicate == true;
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    // console.log(el.target); The property of target after clicking on an option
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for (option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e))
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

// Removing all classes from all options in answers
const enabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enabledOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})