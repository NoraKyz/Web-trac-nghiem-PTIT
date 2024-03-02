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
logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', function () {
    window.location.href = "../login_admin/index.html";
});
dashboard = document.getElementById('dashboard');
dashboard.addEventListener('click', function () {
    window.location.href = "../dashboard/index.html";
});
// 
// generate exam list into exam-list element, use bootstrap card, edit and delete button beside and margin each card
function generateList() {
    var examList = document.getElementById("exam-list");
    examList.innerHTML = "";
    listExam.forEach(exam => {
        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class ="card w-75 mx-auto my-3">
                <div class="card-header alert-warning d-flex justify-content-between align-items-center">
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
                    <a href="/admin/exams/start?id=${exam.id}" class="btn btn-success">View</a>
                </div>
            </div>
        `;
            
        examList.appendChild(card);
    });
}

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
            this.parentElement.remove();
        }
    });
});

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

