function loadGame(game) {
    // Esconde a tela inicial
    document.getElementById('welcomeScreen').style.display = 'none';
    
    // Limpa o conteúdo do container do jogo
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';

    if (game === 'quiz') {
        // Carregar conteúdo do Quiz
        loadQuiz();
    } else if (game === 'flashcard') {
        // Carregar conteúdo do Flashcard
        loadFlashcard();
    }
}

function loadQuiz() {
    const gameContainer = document.getElementById('gameContainer');
    
    // Carregar HTML do quiz
    fetch('Quiz/quiz.html')
        .then(response => response.text())
        .then(html => {
            gameContainer.innerHTML = html;

            // Carregar CSS específico do quiz
            const quizStylesheet = document.createElement('link');
            quizStylesheet.rel = 'stylesheet';
            quizStylesheet.href = 'Quiz/quiz.css';
            document.head.appendChild(quizStylesheet);
            
            // Carregar o JavaScript do quiz (inclusive as questões)
            const quizScript = document.createElement('script');
            quizScript.src = 'Quiz/quiz.js';
            quizScript.onload = function() {
                // Carregar os dados do quiz (phrases.js)
                const quizDataScript = document.createElement('script');
                quizDataScript.src = 'Quiz/phrases.js';
                document.body.appendChild(quizDataScript);
            };
            document.body.appendChild(quizScript);
        });
}

function loadFlashcard() {
    const gameContainer = document.getElementById('gameContainer');
    
    // Carregar HTML do flashcard
    fetch('flashcards/flashcards.html')
        .then(response => response.text())
        .then(html => {
            gameContainer.innerHTML = html;

            // Carregar CSS específico do flashcard
            const flashcardStylesheet = document.createElement('link');
            flashcardStylesheet.rel = 'stylesheet';
            flashcardStylesheet.href = 'flashcards/flashcards.css';
            document.head.appendChild(flashcardStylesheet);
            
            // Carregar o JavaScript do flashcard (inclusive as palavras)
            const flashcardScript = document.createElement('script');
            flashcardScript.src = 'flashcards/flashcards.js';
            flashcardScript.onload = function() {
                // Carregar os dados do flashcard (words.js)
                const flashcardDataScript = document.createElement('script');
                flashcardDataScript.src = 'flashcards/words.js';
                document.body.appendChild(flashcardDataScript);
            };
            document.body.appendChild(flashcardScript);
        });
}
