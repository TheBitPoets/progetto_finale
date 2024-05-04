window.addEventListener("DOMContentLoaded", e => {
  let updateButton = document.querySelector("#updateButton");
  updateButton.addEventListener("click", e => {
    let targetButton = e.target;
    const newQuestion = document.getElementById('question').value;
    const newAnswer = document.getElementById('answer').value;
    const newRating = document.getElementById('rating').value;
    const idQuestion = document.getElementById('idquestion').value;
    
    const question = {
      question: newQuestion,
      answer: newAnswer,
      rating: newRating
    };

    fetch(`/questions/${idQuestion}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(question)
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        displayQuestions();
      })
      .catch(error => console.log(error));
  });
});

function displayQuestions() {
    fetch('/questions')
      .then(response => response.json())
      .then(data => {
        const questionList = document.getElementById('question-list');
        questionList.innerHTML = '';
  
        data.forEach(question => {
          const listItem = document.createElement('li');
          listItem.className = 'list-group-item';
          listItem.innerHTML = `
            <strong>Question:</strong><div id="question-${question.id}">${question.question}</div><br>
            <strong>Answer:</strong><div id="answer-${question.id}">${question.answer}</div><br>
            <strong>Rating:</strong><div id="rating-${question.id}">${question.rating}</div><br>
            <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editModal" onclick="editQuestion(${question.id})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteQuestion(${question.id})">Delete</button>
          `;
          questionList.appendChild(listItem);
        });
      })
      .catch(error => console.log(error));
  }
  
  function editQuestion(id) {
    const questionElement = document.getElementById(`question-${id}`).innerText;
    const answerElement = document.getElementById(`answer-${id}`).innerText;
    const ratingElement = document.getElementById(`rating-${id}`).innerText;

    document.getElementById('question').value = questionElement;
    document.getElementById('answer').value = answerElement;
    document.getElementById('rating').value = ratingElement;
    document.getElementById('idquestion').value = id;

  }
  
  function deleteQuestion(id) {
    if (confirm('Are you sure you want to delete this question?')) {
      fetch(`/questions/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.text())
        .then(data => {
          alert(data);
          displayQuestions();
        })
        .catch(error => console.log(error));
    }
  }
  
displayQuestions();
  