logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', function () {
    window.location.href = "../login_admin/index.html";
});
dashboard = document.getElementById('dashboard');
dashboard.addEventListener('click', function () {
    window.location.href = "../dashboard/index.html";
});
var listExam = [
    {
        id: 1,
        name: "Exam 1",
        start: 1628700000000,
        duration: 60,
        questions: []
    },
    {
        id: 2,
        name: "Exam 2",
        start: 1628700000000,
        duration: 60,
        questions: []
    },
    {
        id: 3,
        name: "Exam 3",
        start: 1628700000000,
        duration: 60,
        questions: []
    }
    
]; 
// generate exam list into exam-list element, use bootstrap card, edit and delete button beside and margin each card
function generateList() {
    var examList = document.getElementById("exam-list");
    examList.innerHTML = "";
    listExam.forEach(exam => {
        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class ="card w-75 mx-auto my-3 alert-warning">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title">${exam.name}</h5>
                <div>
                    <a href="#" class="btn btn-primary "><i class="bi bi-pencil-square"></i></a>
                    <a href="#" class="btn btn-danger"><i class="bi bi-trash"></i></a>
                </div>
            </div>
            <div class="card-body">
                <p class="card-text">Start: ${
                    exam.start ? new Date(exam.start).toLocaleString() : "Not set"
                }</p>
                <p class="card-text">Duration: ${exam.duration} minutes</p>
                <div class="mt-4">
                    <a href="/admin/exams/view?id=${exam.id}" class="btn btn-success">View</a>
                </div>
            </div>
        `;
            
        examList.appendChild(card);
    });
}

var addExamForm = document.getElementById("add-exam-form");

addExamForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var examName = document.getElementById("exam-name").value;
    var examDate = document.getElementById("exam-date").value;
    var examTime = document.getElementById("exam-time").value;
    var examDuration = document.getElementById("exam-duration").value;
    var typeExam = document.getElementById("exam-type").value;

    var newExam = {
        id: listExam.length + 1,
        name: examName,
        start: (typeExam == "free") ? null : new Date(`${examDate}T${examTime}`).getTime(),
        duration: examDuration,
        questions: []
    };

    listExam.push(newExam);
    generateList();

    // dismiss modal
    var modal = bootstrap.Modal.getInstance(document.getElementById("add-exam-modal"));
    modal.hide();
});
generateList();

// delete exam button
var deleteButtons = document.querySelectorAll(".btn-danger");
deleteButtons.forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        var confirmDelete = confirm("Are you sure to delete this exam?");
        if (confirmDelete) {
            var examId = this.getAttribute("href").split("=")[1];
            var examIndex = listExam.findIndex(exam => exam.id == examId);
            listExam.splice(examIndex, 1);
            var examItem = this.closest(".card");
            examItem.remove();
        }
    });
});

// Counter for generating unique question IDs
var questionCounter = 1;

// Function to open modal for adding a new question
function openAddQuestionModal() {
    var addQuestionModal = new bootstrap.Modal(document.getElementById('add-question-modal'));
    addQuestionModal.show();
}

function saveQuestion() {
    var questionContent = document.getElementById('question-content').value;
    var option0 = document.getElementById('option-0').value;
    var option1 = document.getElementById('option-1').value;
    var option2 = document.getElementById('option-2').value;
    var option3 = document.getElementById('option-3').value;
    var correctAnswer = document.getElementById('correct-answer').value;

    // Create new question object
    var newQuestion = {
        id: 'Question ' + questionCounter,
        content: questionContent,
        options: [option0, option1, option2, option3],
        correctAnswer: correctAnswer
    };

    // Increment question counter
    questionCounter++;

    // Add new question to the list
    var questionListDiv = document.getElementById('question-list');
    var questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `
        <div class="question bg-light mt-2 p-2">
            <div class="d-flex justify-content-between align-items-center">
                <h6 class="question-id">${newQuestion.id}</h6>
                <div>
                    <a href="#"  data-question-id="${newQuestion.id}"><i class="bi bi-pencil-square"></i></a>
                    <a href="#" data-question-id="${newQuestion.id}"><i class="bi bi-trash"></i></a>
                </div>
            </div>
            <p class="question-content">${newQuestion.content}</p>
            <div class="options">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="question-${newQuestion.id}" id="option-${newQuestion.id}-0" value="0">
                    <label class="form-check-label" for="option-${newQuestion.id}-0">${newQuestion.options[0]}</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="question-${newQuestion.id}" id="option-${newQuestion.id}-1" value="1">
                    <label class="form-check-label" for="option-${newQuestion.id}-1">${newQuestion.options[1]}</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="question-${newQuestion.id}" id="option-${newQuestion.id}-2" value="2">
                    <label class="form-check-label" for="option-${newQuestion.id}-2">${newQuestion.options[2]}</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="question-${newQuestion.id}" id="option-${newQuestion.id}-3" value="3">
                    <label class="form-check-label" for="option-${newQuestion.id}-3">${newQuestion.options[3]}</label>
                </div>
            </div>
            <p>Correct Answer: ${newQuestion.options[newQuestion.correctAnswer]}</p>
  
        </div>
    `;

    questionListDiv.appendChild(questionDiv);
    // Close modal
    var addQuestionModal = bootstrap.Modal.getInstance(document.getElementById('add-question-modal'));
    addQuestionModal.hide();
}

// Event listener for Add Question button
var addQuestionButton = document.getElementById('add-questions-button');
addQuestionButton.addEventListener('click', function(event) {
    event.preventDefault();
    openAddQuestionModal();
});

var saveQuestionModalButton = document.getElementById('save-question-modal-button');
saveQuestionModalButton.addEventListener('click', function(event) {
    event.preventDefault();
    saveQuestion(); 
});

// Event delegation for editing and deleting questions
document.getElementById('question-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-question')) {
        var questionId = event.target.getAttribute('data-question-id');
        // Implement edit functionality here
        console.log('Edit question:', questionId);
    } else if (event.target.classList.contains('delete-question')) {
        var questionId = event.target.getAttribute('data-question-id');
        // Implement delete functionality here
        console.log('Delete question:', questionId);
        event.target.parentElement.remove();
    }
});



