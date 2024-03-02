logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', function () {
    window.location.href = "../login_admin/index.html";
});
dashboard = document.getElementById('dashboard');
dashboard.addEventListener('click', function () {
    window.location.href = "../dashboard/index.html";
});
var data = {
    "exams": [
        {
            "id": "e1",
            "name": "Kiểm tra giữa kỳ I",
            "soLanThi": 30,
            "soLanHoanThanh": 25,
            "diem": [6, 7, 5, 8, 6, 4, 7, 8, 9, 5, 6, 7, 8, 6, 5, 7, 8, 9, 10, 4, 5, 6, 7, 8, 2]
        },
        {
            "id": "e2",
            "name": "Kiểm tra cuối kỳ I",
            "soLanThi": 50,
            "soLanHoanThanh": 48,
            "diem": [6, 3, 5, 8, 6, 4, 7, 2, 9, 5, 6, 7, 8, 6, 5, 7, 2, 9, 10, 4, 5, 6, 7, 8, 6, 7, 5, 8, 6, 4, 7, 8, 9, 5, 6, 7, 8, 6, 5, 7, 8, 9, 10, 4, 5, 6, 7, 8]
            
        },
        {
            "id": "e3",
            "name": "Kiểm tra giữa kỳ II",
            "soLanThi": 30,
            "soLanHoanThanh": 25,
            "diem": [6, 7, 5, 8, 6, 4, 7, 8, 9, 5, 6, 7, 8, 6, 5, 7, 8, 9, 10, 4, 5, 6, 7, 8, 2]
        },
        {
            "id": "e4",
            "name": "Kiểm tra cuối kỳ II",
            "soLanThi": 50,
            "soLanHoanThanh": 48,
            "diem": [6, 3, 5, 8, 6, 4, 7, 2, 9, 5, 6, 7, 8, 6, 5, 7, 2, 9, 10, 4, 5, 6, 7, 8, 6, 7, 5, 8, 6, 4, 7, 8, 9, 5, 6, 7, 8, 6, 5, 7, 8, 9, 10, 4, 5, 6, 7, 8]
            
        }
    ]
}

holder_container = document.getElementById('holder');

data.exams.forEach((exam, i) => {
    let exam_container = document.createElement('div');
    exam_container.classList.add('accordion-item');
    exam_container.innerHTML = `
        <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
            ${exam.name}
            </button>
        </h2>
        <div id="collapse${i}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <div class="d-flex justify-content-between  mb-5">
                    <h2 class="text-center">${exam.name}</h2>
                    <button id="print-button-${i}" type="button" class="print-btn btn btn-sm btn-primary btn-outline-ptit"><span class="material-symbols-outlined">print</span></button>
                </div>
                <div class="row">
                    <div class="my-3 col-4">
                        <canvas id="bieuDoThamGia${i}" height="370" style="display: block; box-sizing: border-box; height: 370px; width: 370px;" width="370"></canvas>
                        <h5 class="text-center my-3">Tỉ lệ hoàn thành bài thi</h5>
                    </div>
                    <div class="my-3 col-8">
                        <canvas id="bieuDoKhoangDiem${i}" height="382" style="display: block; box-sizing: border-box; height: 382px; width: 764px;" width="764"></canvas>
                        <h5 class="text-center my-3">Thống kê khoảng điểm</h5>
                    </div>
                </div>
            </div>
        </div>
    `;
    holder_container.appendChild(exam_container);

    showExamsStatistics(exam, i);
});

printButtons = document.querySelectorAll('.print-btn');
printButtons.forEach((button, i) => {
    button.addEventListener('click', function() {
        printStatistics(i);
    });
});

function printStatistics(index) {
    let printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.close();
    printWindow.print();
}

function showExamsStatistics(examsData, index) {
    const bdThamGia = document.getElementById('bieuDoThamGia' + index);
    new Chart(bdThamGia, {
        type: 'doughnut',
        data: {
            labels: [
                'Hoàn thành',
                'Không hoàn thành',
            ],
            datasets: [{
                label: 'Số lần thi',
                data: [examsData.soLanHoanThanh, examsData.soLanThi - examsData.soLanHoanThanh],
                backgroundColor: [
                    'rgb(120, 162, 235)',
                    'rgb(255, 99, 132)',
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
        }
    });

    let scoreData = examsData.diem;
    let khoangDiem = [0, 0, 0, 0];
    for (let i = 0; i < scoreData.length; i++) {
        if (scoreData[i] >= 0 && scoreData[i] < 4) {
            khoangDiem[0]++;
        } else if (scoreData[i] >= 4 && scoreData[i] < 6) {
            khoangDiem[1]++;
        } else if (scoreData[i] >= 6 && scoreData[i] < 8) {
            khoangDiem[2]++;
        } else if (scoreData[i] >= 8 && scoreData[i] <= 10) {
            khoangDiem[3]++;
        }
    }

    const bdKhoangDiem = document.getElementById('bieuDoKhoangDiem' + index);
    new Chart(bdKhoangDiem, {
        type: 'bar',
        data: {
            labels: ['0-4', '4-6', '6-8', '8-10'],
            datasets: [{
                label: '# số lần thi',
                data: khoangDiem,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}