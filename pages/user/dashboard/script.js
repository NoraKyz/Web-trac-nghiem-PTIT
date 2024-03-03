document.addEventListener('DOMContentLoaded', async function () {
    initSearchLogic();
    initFilterByStatusLogic();
    await initExamList();
});

function onClickStartExam(){
    window.location.href = "../../user/exam/index.html";
}

function initSearchLogic() {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('keyup', function () {
        const searchTerm = searchInput.value.toLowerCase();
        
        const examContainers = document.querySelectorAll('.exam-card');

        examContainers.forEach(function (container) {
            const examName = container.querySelector('.card-header').textContent.toLowerCase();
            const isVisible = examName.includes(searchTerm);
            container.style.display = isVisible ? '' : 'none';
        });
    });
}

function initFilterByStatusLogic() {
    const statusFilter = document.getElementById('statusFilter');

    statusFilter.addEventListener('change', function() {
        const selectedStatus = statusFilter.value;
        const examContainers = document.querySelectorAll('.exam-card');

        examContainers.forEach(function (container) {
            const examStatus = container.querySelector('.list-group-item').textContent.toLowerCase();
            let isVisible = true;
            switch (selectedStatus) {
                case 'freely_accessible':
                    if (!examStatus.includes('Always open'.toLowerCase())) isVisible = false;
                    break;
                case 'specific_time':
                    if (examStatus.includes('Always open'.toLowerCase())) isVisible = false;
                    break;
                default:
                    break;
            }
            container.style.display = isVisible ? '' : 'none';
        });
    });
}

async function initExamList(){
    const examListDiv = document.getElementById('examList');

    let examsData = await getExamData();

    examsData.forEach(exam => {
        const examElement = document.createElement('div');
        examElement.classList.add('card', 'exam-card', 'mb-3');
        
        const now = new Date().getTime();
        let examAvailability = "Always open";
        let buttonDisabled = '';
        const startTime = exam.start;
        const endTime = startTime + exam.duration * 60_000; // Convert minutes to milliseconds

        if (exam.start) {
            const startDate = new Date(startTime);
            examAvailability = `Start from: ${startDate.toLocaleString('vi')}`;
            buttonDisabled = (now < startTime || now > endTime) ? 'disabled' : '';
        }

        examElement.innerHTML = `
            <div class="card-header">${exam.name}</div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    Start Time: ${examAvailability}<br>
                    Duration: ${exam.duration} minutes
                    <button class="btn float-end" onclick="onClickStartExam()" ${buttonDisabled}>Start</button>
                </li>
            </ul>
        `;

        examListDiv.appendChild(examElement);
    });
}

async function getExamData() {
    const examDataUrl = '../../../data/data.json';

    try {
        const response = await fetch(examDataUrl);
        let data = await response.json();
        return data.exams;
    } catch (error) {
        console.error('Error fetching exam data:', error);
        return null;
    }
}
