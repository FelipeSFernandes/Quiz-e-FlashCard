let currentQuestion = 0;
let score = 0;
let results = [];

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    results = [];
    document.getElementById('start-btn').style.display = 'none';
    updateQuestionCounter(); // Atualiza o contador de perguntas ao iniciar
    showQuestion(currentQuestion);
}

function showQuestion(index) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    const question = phrases[index];
    const options = generateOptions(question.portuguese);

    let questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `<p>${question.english}</p>`;

    options.forEach(option => {
        let optionBox = document.createElement('div');
        optionBox.classList.add('option-box');
        optionBox.innerText = option;
        optionBox.onclick = function () {
            document.querySelectorAll('.option-box').forEach(box => box.classList.remove('selected'));
            optionBox.classList.add('selected');
        };
        questionDiv.appendChild(optionBox);
    });

    let submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    submitButton.classList.add('start-btn');
    submitButton.onclick = function () {
        const selectedOption = document.querySelector('.option-box.selected');
        if (selectedOption) {
            const isCorrect = selectedOption.innerText === question.portuguese[0];
            results.push({
                question: question.english,
                correctAnswer: question.portuguese[0],
                userAnswer: selectedOption.innerText,
                isCorrect: isCorrect
            });
            if (isCorrect) {
                score++;
            }
            showFeedback(isCorrect, question.portuguese[0], selectedOption);
            if (index + 1 < phrases.length) {
                setTimeout(() => {
                    currentQuestion++;
                    updateQuestionCounter();
                    showQuestion(index + 1);
                }, 2000);
            } else {
                setTimeout(showResults, 2000);
            }
        } else {
            alert('Please select an answer.');
        }
    };

    questionDiv.appendChild(submitButton);
    quizContainer.appendChild(questionDiv);
}

function showFeedback(isCorrect, correctAnswer, selectedOption) {
    const quizContainer = document.getElementById('quiz-container');
    const feedback = document.createElement('div');
    feedback.classList.add('feedback');
    feedback.style.color = isCorrect ? 'green' : 'red';
    feedback.innerText = isCorrect ? 'Correct!' : `Wrong! The correct answer is: ${correctAnswer}`;

    if (!isCorrect) {
        selectedOption.classList.add('incorrect');
        document.querySelectorAll('.option-box').forEach(option => {
            if (option.innerText === correctAnswer) option.classList.add('correct');
        });
    }

    quizContainer.appendChild(feedback);
}

function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '<h2>Results:</h2>';
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');

    results.forEach((result, index) => {
        let resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        resultDiv.innerHTML = `<p>${index + 1}. ${result.question}</p>
            <p>Your answer: ${result.userAnswer}</p>
            <p>Correct answer: ${result.correctAnswer}</p>
            <p>${result.isCorrect ? 'Correct' : 'Wrong'}</p>`;
        resultDiv.style.color = result.isCorrect ? 'green' : 'red';
        resultContainer.appendChild(resultDiv);
    });

    quizContainer.appendChild(resultContainer);
    quizContainer.innerHTML += `<p>Your score is: ${score} out of ${phrases.length}</p>`;

    // Rolagem automática
    quizContainer.style.overflowY = 'auto';
}

function updateQuestionCounter() {
    const questionCounter = document.getElementById('question-counter');
    questionCounter.innerText = `Question ${currentQuestion + 1} of ${phrases.length}`;
}

function generateOptions(correctAnswers) {
    let options = [...correctAnswers];
    while (options.length < 4) {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        const randomPhrase = phrases[randomIndex].portuguese[0];
        if (!options.includes(randomPhrase)) {
            options.push(randomPhrase);
        }
    }
    return shuffleArray(options);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
