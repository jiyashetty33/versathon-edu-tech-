// Example: Fetch assigned quizzes from backend
const quizList = document.getElementById('quiz-list');

// Simulate API data
const quizzes = [
  { id: 1, title: "Math Quiz", description: "Algebra and Equations" },
  { id: 2, title: "Science Quiz", description: "Physics Basics" }
];

quizzes.forEach(q => {
  const div = document.createElement('div');
  div.innerHTML = `<h3>${q.title}</h3><p>${q.description}</p><button onclick="startQuiz(${q.id})">Start Quiz</button>`;
  quizList.appendChild(div);
});

function startQuiz(quizId) {
  // redirect to quiz page with query param
  window.location.href = `quiz.html?quizId=${quizId}`;
}
