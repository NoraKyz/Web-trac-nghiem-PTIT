document.addEventListener('DOMContentLoaded', async function () {
    await displayResults();
});

async function displayResults() {
    const questions = await getQuestionData();
    const userAnswers = getUserAnswers();
    let correctCount = 0;
    questions.forEach((question, index) => {
        const userAnswerIndex = userAnswers[index];
        const isCorrect = userAnswerIndex === question.correctAnswer;
        if (isCorrect) correctCount++;

        const questionElement = document.createElement('div');
        questionElement.className = isCorrect ? 'question correct-answer' : 'question incorrect-answer';
        questionElement.innerHTML = createQuestionHTML(question, index, userAnswerIndex, isCorrect);
        document.getElementById('container-question').appendChild(questionElement);
    });

    const totalQuestions = questions.length;
    const grade = (correctCount / totalQuestions) * 10;
    document.getElementById('score-total').textContent = `Score: ${correctCount}/${totalQuestions}`;
    document.getElementById('grade').textContent = `Grade: ${grade.toFixed(1)}/10.0`;
}

function onClickExit(){
    window.location.replace("../../user/dashboard/index.html");
}

function createQuestionHTML(question, index, userAnswerIndex, isCorrect) {
    let html = `<h6 class="question-id ms-3">Question ${index + 1}:</h6>
                <p class="question-content ms-3">${question.content}</p>
                <div class="container-option ms-3">`;

    question.answers.forEach((answer, i) => {
        let iconHtml = '';
        if (i === question.correctAnswer) {
            iconHtml = '<img src="correct-icon.svg" class="answer-icon" />';
        }
        if (userAnswerIndex === i) {
            iconHtml = userAnswerIndex === question.correctAnswer ?
                       '<img src="correct-icon.svg" class="answer-icon" />' :
                       '<img src="incorrect-icon.svg" class="answer-icon" />';
        }

        html += `<div class="form-check">
                    <label class="form-check-label">${answer} ${iconHtml}</label>
                </div>`;
    });

    html += `</div>`;
    return html;
}


async function getQuestionData() {
    return [
        {
            "content": "Thủ đô nước Pháp là thành phố nào?",
            "answers": [
                "Berlin",
                "Paris",
                "Rome",
                "Madrid"
            ],
            "correctAnswer": 1
        },
        {
            "content": "Ai là nhà văn nổi tiếng của tác phẩm 'Tôi thấy hoa vàng trên cỏ xanh'?",
            "answers": [
                "Nguyễn Nhật Ánh",
                "Ngô Tất Tố",
                "Nguyễn Du",
                "Trích Thanh"
            ],
            "correctAnswer": 1
        },
        {
            "content": "Quốc gia nào là đất nước có diện tích lớn nhất thế giới?",
            "answers": [
                "Nga",
                "Mỹ",
                "Trung Quốc",
                "Ấn Độ"
            ],
            "correctAnswer": 0
        },
        {
            "content": "Bộ phận nào của cơ thể chịu trách nhiệm giữ thăng bằng?",
            "answers": [
                "Mắt",
                "Tai",
                "Tay",
                "Chân"
            ],
            "correctAnswer": 3
        },
        {
            "content": "Nhân vật nào nổi tiếng trong truyện 'Harry Potter' của J.K. Rowling?",
            "answers": [
                "Frodo Baggins",
                "Hermione Granger",
                "Katniss Everdeen",
                "Luke Skywalker"
            ],
            "correctAnswer": 1
        },
        {
            "content": "Thành phố nào được gọi là 'Thủ đô của thế giới'?",
            "answers": [
                "New York",
                "Paris",
                "London",
                "Tokyo"
            ],
            "correctAnswer": 2
        },
        {
            "content": "Ai là người sáng lập Microsoft?",
            "answers": [
                "Bill Gates",
                "Steve Jobs",
                "Mark Zuckerberg",
                "Elon Musk"
            ],
            "correctAnswer": 0
        },
        {
            "content": "Quốc gia nào nằm ở bán đảo Ấn Độ?",
            "answers": [
                "Thái Lan",
                "Việt Nam",
                "Ấn Độ",
                "Malaysia"
            ],
            "correctAnswer": 2
        },
        {
            "content": "Thung lũng nổi tiếng với ngành công nghiệp công nghệ ở Mỹ là gì?",
            "answers": [
                "Silicon Valley",
                "Green Valley",
                "Tech Valley",
                "Innovation Valley"
            ],
            "correctAnswer": 0
        },
        {
            "content": "Ai là nhà khoa học nổi tiếng với lý thuyết tương đối?",
            "answers": [
                "Isaac Newton",
                "Galileo Galilei",
                "Albert Einstein",
                "Stephen Hawking"
            ],
            "correctAnswer": 2
        }
    ]
    const questionDataUrl = '../../../data/data.json';

    try {
        const response = await fetch(questionDataUrl);
        let data = await response.json();
        return data.exams[0].questions;
    } catch (error) {
        console.error('Error fetching question data:', error);
        return null;
    }
}

function getUserAnswers() {
    return [1, 2, 3, null, 1, 2, 3, null, 1, 2];
}