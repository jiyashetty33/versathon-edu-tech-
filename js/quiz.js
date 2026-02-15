const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get('quizId');

const questionContainer = document.getElementById('question-container');

let current = 0;
let responses = [];

// Simulate fetching quiz questions
const questions = [
  { id: 1, question_text: "2 + 2 = ?", correct_answer: "4", options: ["2","3","4","5"] },
  { id: 2, question_text: "3 + 5 = ?", correct_answer: "8", options: ["6","7","8","9"] }
];

function showQuestion() {
  const q = questions[current];
  questionContainer.innerHTML = `<h3>Question ${current+1}: ${q.question_text}</h3>`;
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => answerQuestion(opt);
    questionContainer.appendChild(btn);
  });
}

function answerQuestion(answer) {
  const q = questions[current];
  responses.push({
    question_id: q.id,
    student_answer: answer,
    is_correct: answer === q.correct_answer,
    points: answer === q.correct_answer ? 10 : 0,
    time_taken: 5
  });
  current++;
  if(current < questions.length) showQuestion();
  else submitQuiz();
}

function submitQuiz() {
  fetch('http://localhost:5000/api/quizzes/attempt', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ student_id: 1, quiz_id: quizId, responses })
  })
  .then(res => res.json())
  .then(data => alert('Quiz submitted! Your score: ' + data.attempt.score));
}

showQuestion();
