let currentIndex = 0;
let score = 0;

async function loadQuiz() {
    try {
        const response = await fetch('scam.json');
        if (!response.ok) {
            throw new Error('Json file error: ' + response.status);
        }   
        const quiz = await response.json();
        renderQuiz(quiz);
    } catch (error) {
        document.getElementById('quiz').textContent = 'Не удалось загрузить проверку, попробуйте позже.';
        console.error(error);
    }
}

function renderQuiz(quiz) {
    const container = document.getElementById('quiz');
    container.textContent = '';

    if (currentIndex === quiz.length) {
        const finalText = document.createElement('p');
        finalText.textContent = 'Твой результат: ' + score + ' из ' + quiz.length;
        container.appendChild(finalText);

        const againButton = document.createElement('button');
        againButton.textContent = 'Еще раз';
        againButton.addEventListener('click', () => {
            currentIndex = 0;
            score = 0;
            renderQuiz(quiz);
        });

        container.appendChild(againButton);
        return;
    }
    
    const item = quiz[currentIndex];

    const text = document.createElement('p');
    text.textContent = item.text;
    container.appendChild(text);

    const scamButton = document.createElement('button');
        scamButton.textContent = 'Скам';

    const okButton = document.createElement('button');
        okButton.textContent = 'Нормально';

        const buttonsBox = document.createElement('div');
        buttonsBox.className = 'quizButtons';
        buttonsBox.appendChild(scamButton);
        buttonsBox.appendChild(okButton);
        container.appendChild(buttonsBox);

    scamButton.addEventListener('click', () => checkAnswer(true, item, quiz));
    okButton.addEventListener('click', () => checkAnswer(false, item, quiz));
}

function checkAnswer(answer, item, quiz) {
    const container = document.getElementById('quiz');
    container.textContent = '';

    const result = document.createElement('p');
    if (answer === item.isScam) {
        score++;
        result.textContent = 'Верно!';
    } else {
        result.textContent = 'Неверно.';
    }
    container.appendChild(result);

    const explanation = document.createElement('p');
    explanation.textContent = item.explanation;
    container.appendChild(explanation);

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Дальше';
    nextButton.addEventListener('click', () => {
        currentIndex++;
        renderQuiz(quiz);
    });
    container.appendChild(nextButton);
}

loadQuiz();
