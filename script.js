document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz');
    const submitButton = document.getElementById('submit');
    const resultContainer = document.getElementById('result');

    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            const questions = data.questions;
            displayQuiz(questions, quizContainer);
            submitButton.addEventListener('click', () => calculateScore(questions, resultContainer));
        });

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
        resultContainer.innerHTML = `<p>Your score: ${score}/${totalQuestions} (${percentage.toFixed(2)}%)</p>`;
    }
});
