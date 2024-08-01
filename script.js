document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz');
    const submitButton = document.getElementById('submit');
    const resultContainer = document.getElementById('result');
    const part1Button = document.getElementById('part1');
    const part2Button = document.getElementById('part2');
    const part3Button = document.getElementById('part3');

    part1Button.addEventListener('click', () => {
        loadQuiz('questions_part1.json');
        activateButton(part1Button);
    });
    part2Button.addEventListener('click', () => {
        loadQuiz('questions_part2.json');
        activateButton(part2Button);
    });
    part3Button.addEventListener('click', () => {
        loadQuiz('questions_part3.json');
        activateButton(part3Button);
    });

    function loadQuiz(jsonFile) {
        fetch(jsonFile)
            .then(response => response.json())
            .then(data => {
                const questions = data.questions;
                displayQuiz(questions, quizContainer);
                submitButton.onclick = () => calculateScore(questions, resultContainer);
            });
    }

    function displayQuiz(questions, container) {
        container.innerHTML = '';
        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                ${q.options.map((option, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${option}">
                        ${option}
                    </label>
                `).join('')}
                <div class="feedback" id="feedback${index}"></div>
            `;
            container.appendChild(questionDiv);
        });
    }

    function calculateScore(questions, resultContainer) {
        let score = 0;
        let totalQuestions = questions.length;

        questions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            const feedbackDiv = document.getElementById(`feedback${index}`);
            if (selected && selected.value.trim() === q.correct.trim()) {
                score++;
                feedbackDiv.innerHTML = '';
            } else {
                feedbackDiv.innerHTML = `<span class="incorrect">الإجابة الصحيحة: ${q.correct}</span>`;
                feedbackDiv.classList.add('incorrect-feedback');
            }
        });

        const percentage = (score / totalQuestions) * 100;
        resultContainer.innerHTML = `<p>درجتك: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)</p>`;
    }

    function activateButton(activeButton) {
        const buttons = [part1Button, part2Button, part3Button];
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
});
