document.addEventListener('DOMContentLoaded', async function () {
    initExitButton();
    await displayQuestion();
    initSubmitButton();
    startCountDownTime();
});


async function displayQuestion() {
    const question = await getQuestionData();

    let questionContainer = document.getElementById('container-question');

    for (let i = 0; i < question.length; i++) {
        questionContainer.innerHTML += createQuestionElement(question[i], i + 1);
    }

    questionContainer.innerHTML += `<div class="d-flex justify-content-center mt-5">
        <button type="button" class="btn btn-success" id="submit-button">Nộp bài</button>
         </div>;`
}

async function getQuestionData() {
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

function createQuestionElement(question, id) {
    let html = `<div class="question mt-2 p-2">
        <h6 class="question-id">Câu ${id}:</h6>
        <p class="question-content">${question.content}</p>
        <div class="container-option">`;

    let ophtml = '';
    for (let i = 0; i < question.answers.length; i++) {
        ophtml += `<div class="form-check">
            <input class="form-check-input" type="radio" name="question-${id}" id="q${id}-o${i}" value="${i}">
            <label class="form-check-label" for="q${id}-o${i}">${question.answers[i]}</label>
        </div>`;
    }
    html += ophtml;

    html += `</div></div>`;

    return html;
}

function startCountDownTime(minutes = 60) {
    let time = minutes * 60;
    let timer = setInterval(function () {
        time--;
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        if (time < 0) {
            clearInterval(timer);
            alert('Hết giờ');
        }
        else {
            document.getElementById('time-reamining').innerHTML = `Thời gian còn lại: ${minutes}:${seconds}`;
        }
    }, 1000);
}

function initSubmitButton() {
    let submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', function () {
        alert('Nộp bài thành công');
        window.location.replace("../../user/exam_result/index.html");
    });
}

function initExitButton() {
    let exitButton = document.getElementById('exit-button');
    exitButton.addEventListener('click', function () {
        window.history.back();
    });
}
