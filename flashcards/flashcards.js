const words = [];
let currentWordIndex = 0;
let correctScore = 0;
let wrongScore = 0;
let answerChecked = false;
let incorrectWords = [];
let originalWords = [];

async function loadWords() {
    try {
        const response = await fetch('words.js');
        if (!response.ok) throw new Error('Erro ao carregar palavras');
        const data = await response.text();
        const wordsArray = JSON.parse(data);
        words.push(...wordsArray);
        originalWords = [...wordsArray];
        shuffle(words);
        updateWordCount();
        showWord();
    } catch (error) {
        console.error('Erro ao carregar palavras:', error);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateWordCount() {
    document.getElementById('word-count').innerText = `Total de palavras: ${originalWords.length}`;
}

function showWord() {
    if (currentWordIndex >= words.length) {
        endGame();
        return;
    }
    const word = words[currentWordIndex].english;
    document.getElementById('word').innerText = word;
    document.getElementById('result').innerText = '';
    document.getElementById('translation').value = '';
    document.getElementById('check-answer').disabled = false;
    answerChecked = false;
}

function endGame() {
    const incorrectList = incorrectWords.map(word => `<li>${word.english} - ${word.portuguese}</li>`).join('');
    document.getElementById('flashcard').innerHTML = `
        <h3>Parabéns! Você acertou ${correctScore} palavras e errou ${wrongScore}!</h3>
        <h4>Total de palavras: ${originalWords.length}</h4>
        <h4>Palavras erradas:</h4>
        <ol>${incorrectList}</ol>
    `;
    document.getElementById('translation').disabled = true;
    document.getElementById('check-answer').disabled = true;
    document.getElementById('next-word').disabled = true;
}

function checkAnswer() {
    if (answerChecked) return;
    const answer = document.getElementById('translation').value.trim().toLowerCase();
    const correctAnswers = words[currentWordIndex].portuguese.map(word => word.toLowerCase());
    const feedbackElement = document.getElementById('result');
    
    if (correctAnswers.includes(answer)) {
        feedbackElement.innerText = 'Correto!';
        feedbackElement.style.color = '#66fcf1';
        correctScore++;
    } else {
        feedbackElement.innerText = `Errado! A resposta correta é: ${correctAnswers.join(", ")}`;
        feedbackElement.style.color = '#ff4c4c';
        wrongScore++;
        incorrectWords.push(words[currentWordIndex]);
    }

    words.splice(currentWordIndex, 1);
    updateScore();
    answerChecked = true;
}

document.getElementById('translation').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkAnswer();
        setTimeout(showWord, 1000);
    }
});

document.getElementById('check-answer').addEventListener('click', () => {
    checkAnswer();
    setTimeout(showWord, 1000);
});

document.getElementById('next-word').addEventListener('click', () => {
    currentWordIndex++;
    showWord();
});

function updateScore() {
    document.getElementById('correct-score').innerText = `Corretas: ${correctScore}`;
    document.getElementById('wrong-score').innerText = `Erradas: ${wrongScore}`;
}

loadWords();
