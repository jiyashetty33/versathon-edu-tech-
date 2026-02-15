const questionsContainer = document.getElementById('questions-container');
const addQuestionBtn = document.getElementById('add-question');
const submitBtn = document.getElementById('submit-quiz');

let questions = [];

function addQuestion() {
  const index = questions.length + 1;
  const div = document.createElement('div');
  div.innerHTML = `
    <input type="text" placeholder="Question ${index} Text" class="question-text">
    <input type="text" placeholder="Correct Answer" class="question-answer">
  `;
  questionsContainer.appendChild(div);
  questions.push(div);
}

addQuestionBtn.addEventListener('click', addQuestion);

submitBtn.addEventListener('click', () => {
  const title = document.getElementById('quiz-title').value;
  const questionData = questions.map(q => ({
    question_text: q.querySelector('.question-text').value,
    correct_answer: q.querySelector('.question-answer').value,
    options: [], // can add options if needed
    type: 'multiple_choice'
  }));

  // Send to backend using fetch
  fetch('http://localhost:5000/api/quizzes/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, questions: questionData, teacher_id: 101 })
  })
  .then(res => res.json())
  .then(data => alert('Quiz Created!'));
});
