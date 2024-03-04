viewExamsBtn = document.getElementById('view-exams');
viewExamsBtn.addEventListener('click', function () {
    window.location.href = "../exams/index.html";
});
viewAnalyticsBtn = document.getElementById('view-analytics');
viewAnalyticsBtn.addEventListener('click', function () {
    window.location.href = "../analytics/index.html";
});

viewStudentsBtn = document.getElementById('view-students');
viewStudentsBtn.addEventListener('click', function () {
    window.location.href = "../students/index.html";
});
logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', function () {
    window.location.href = "../login_admin/index.html";
});
// xử lý sự kiện khi ấn logo ptit
dashboard = document.getElementById('dashboard');
dashboard.addEventListener('click', function () {
    window.location.href = "../dashboard/index.html";
});