const menuButtonExams = document.getElementById('menuButtonExams');
const menuListExams = document.getElementById('menuListExams');

const menuButtonStudents = document.getElementById('menuButtonStudents');
const menuListStudents = document.getElementById('menuListStudents');

const menuButtonStatistics = document.getElementById('menuButtonStatistics');
const menuListStatistics = document.getElementById('menuListStatistics');

menuButtonExams.addEventListener('click', function() {
    if (menuListExams.style.display === 'none') {
        menuListExams.style.display = 'block';
    } else {
        menuListExams.style.display = 'none';
    }
});

menuButtonStudents.addEventListener('click', function() {
    if (menuListStudents.style.display === 'none') {
        menuListStudents.style.display = 'block';
    } else {
        menuListStudents.style.display = 'none';
    }
});

menuButtonStatistics.addEventListener('click', function() {
    if (menuListStatistics.style.display === 'none') {
        menuListStatistics.style.display = 'block';
    } else {
        menuListStatistics.style.display = 'none';
    }
});


