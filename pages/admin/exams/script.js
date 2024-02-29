var listExam = [
    {
        id: 1,
        name: "Exam 1",
        start: "2021-05-01 08:00:00",
        duration: 60,
        questions: [
            {
                id: 1,
                content: "Question 1",
                options: [
                    { id: 1, content: "Option 1" },
                    { id: 2, content: "Option 2" },
                    { id: 3, content: "Option 3" },
                    { id: 4, content: "Option 4" }
                ],
                answer: 1
            },
            {
                id: 2,
                content: "Question 2",
                options: [
                    { id: 1, content: "Option 1" },
                    { id: 2, content: "Option 2" },
                    { id: 3, content: "Option 3" },
                    { id: 4, content: "Option 4" }
                ],
                answer: 1
            },
            {
                id: 3,
                content: "Question 3",
                options: [
                    { id: 1, content: "Option 1" },
                    { id: 2, content: "Option 2" },
                    { id: 3, content: "Option 3" },
                    { id: 4, content: "Option 4" }
                ],
                answer: 1
            }
        ]
    },

    {
        id: 2,
        name: "Exam 2",
        start: "2021-05-01 08:00:00",
        duration: 60,
        questions: [
            {
                id: 1,
                content: "Question 1",
                options: [
                    { id: 1, content: "Option 1" },
                    { id: 2, content: "Option 2" },
                    { id: 3, content: "Option 3" },
                    { id: 4, content: "Option 4" }
                ],
                answer: 1
            },
            {
                id: 2,
                content: "Question 2",
                options: [
                    { id: 1, content: "Option 1" },
                    { id: 2, content: "Option 2" },
                    { id: 3, content: "Option 3" },
                    { id: 4, content: "Option 4" }
                ],
                answer: 1
            },
            {
                id: 3,
                content: "Question 3",
                options: [
                    { id: 1, content: "Option 1" },
                    { id: 2, content: "Option 2" },
                    { id: 3, content: "Option 3" },
                    { id: 4, content: "Option 4" }
                ],
                answer: 1
            }
        ]
    },
    
        {
            id: 3,
            name: "Exam 3",
            start: "2021-05-01 08:00:00",
            duration: 60,
            questions: [
                {
                    id: 1,
                    content: "Question 1",
                    options: [
                        { id: 1, content: "Option 1" },
                        { id: 2, content: "Option 2" },
                        { id: 3, content: "Option 3" },
                        { id: 4, content: "Option 4" }
                    ],
                    answer: 1
                },
                {
                    id: 2,
                    content: "Question 2",
                    options: [
                        { id: 1, content: "Option 1" },
                        { id: 2, content: "Option 2" },
                        { id: 3, content: "Option 3" },
                        { id: 4, content: "Option 4" }
                    ],
                    answer: 1
                },
                {
                    id: 3,
                    content: "Question 3",
                    options: [
                        { id: 1, content: "Option 1" },
                        { id: 2, content: "Option 2" },
                        { id: 3, content: "Option 3" },
                        { id: 4, content: "Option 4" }
                    ],
                    answer: 1
                }
            ]
        },
        
                {
                    id: 4,
                    name: "Exam 4",
                    start: "2021-05-01 08:00:00",
                    duration: 60,
                    questions: [
                        {
                            id: 1,
                            content: "Question 1",
                            options: [
                                { id: 1, content: "Option 1" },
                                { id: 2, content: "Option 2" },
                                { id: 3, content: "Option 3" },
                                { id: 4, content: "Option 4" }
                            ],
                            answer: 1
                        },
                        {
                            id: 2,
                            content: "Question 2",
                            options: [
                                { id: 1, content: "Option 1" },
                                { id: 2, content: "Option 2" },
                                { id: 3, content: "Option 3" },
                                { id: 4, content: "Option 4" }
                            ],
                            answer: 1
                        },
                        {
                            id: 3,
                            content: "Question 3",
                            options: [
                                { id: 1, content: "Option 1" },
                                { id: 2, content: "Option 2" },
                                { id: 3, content: "Option 3" },
                                { id: 4, content: "Option 4" }
                            ],
                            answer: 1
                        }
                    ]
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
            <div class="card-body">
                <h5 class="card-title">${exam.name}</h5>
                <p class="card-text">Start: ${exam.start}</p>
                <p class="card-text">Duration: ${exam.duration} minutes</p>
                <a href="#" class="btn btn-primary">Edit</a>
                <a href="#" class="btn btn-danger">Delete</a>
                <div class="mt-4">
                <a href="/admin/exams/start?id=${exam.id}" class="btn btn-success">Start</a>
            </div>
            <div class="mt-4">
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

    var newExam = {
        id: listExam.length + 1,
        name: examName,
        start: `${examDate} ${examTime}`,
        duration: examDuration,
        questions: []
    };

    listExam.push(newExam);
    generateList();

    // dismiss modal
    var modal = bootstrap.Modal.getInstance(document.getElementById("add-exam-modal"));
    modal.hide();
});

