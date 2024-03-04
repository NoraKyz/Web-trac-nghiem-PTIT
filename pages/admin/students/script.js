logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', function () {
    window.location.href = "../login_admin/index.html";
});
dashboard = document.getElementById('dashboard');
dashboard.addEventListener('click', function () {
    window.location.href = "../dashboard/index.html";
});
var students = [
    {
        id: 1,
        name: 'John Doe',
        email: 'alexcao194@gmail.com',
        phone: '1234567890',
        dob: '01/01/2000',
        address: '123 Main St, Springfield'
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'Jane@gmail.com',
        phone: '1234567890',
        dob: '01/01/2000',
        address: '123 Main St, Springfield'
    },
    {
        id: 3,
        name: 'Alex Cao',
        email: 'alex@gmail.com',
        phone: '1234567890',
        dob: '01/01/2000',
        address: '123 Main St, Springfield'
    },
]

function genTable() {
    holder_container = document.getElementById('holder');
    holder_container.innerHTML = '';

// use tr, th, td to create a table
let table = document.createElement('table');
table.className = 'table table-striped table-hover';
let thead = document.createElement('thead');
let tr = document.createElement('tr');
let th = document.createElement('th');
th.scope = 'col';
th.innerHTML = '#';
tr.appendChild(th);
th = document.createElement('th');
th.scope = 'col';
th.innerHTML = 'Name';
tr.appendChild(th);
th = document.createElement('th');
th.scope = 'col';
th.innerHTML = 'Email';
tr.appendChild(th);
th = document.createElement('th');
th.scope = 'col';
th.innerHTML = 'Phone';
tr.appendChild(th);
th = document.createElement('th');
th.scope = 'col';
th.innerHTML = 'DOB';
tr.appendChild(th);
th = document.createElement('th');
th.scope = 'col';
th.innerHTML = 'Address';
tr.appendChild(th);
th = document.createElement('th');
th.scope = 'col';
th.innerHTML = 'xlsx';
tr.appendChild(th);
th = document.createElement('th');
th.scope = 'col';
th.innerHTML = 'Delete';
tr.appendChild(th);


thead.appendChild(tr);
table.appendChild(thead);
let tbody = document.createElement('tbody');

students.forEach((student, i) => {
    tr = document.createElement('tr');
    let td = document.createElement('td');
    td.innerHTML = i + 1;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = student.name;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = student.email;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = student.phone;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = student.dob;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = student.address;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = `<button class="btn btn-primary" id="download-xlsx-${student.id}">Download</button>`;    
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = `<button class="btn btn-danger" id="delete-student-${student.id}">Delete</button>`;
    tr.appendChild(td);

    tbody.appendChild(tr);
});


table.appendChild(tbody);
holder_container.appendChild(table);

toXLSX = document.getElementById('to-xlsx');

toXLSX.addEventListener('click', function () {
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "students.xlsx");
});

students.forEach((student) => {
    downloadBtn = document.getElementById(`download-xlsx-${student.id}`);
    downloadBtn.addEventListener('click', function () {
        const ws = XLSX.utils.json_to_sheet([student]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `student-${student.id}.xlsx`);
    });

    deleteBtn = document.getElementById(`delete-student-${student.id}`);
    deleteBtn.addEventListener('click', function () {
        students = students.filter(s => s.id !== student.id);
        genTable();
    });
});
}

genTable();


// <!-- model with name, email, phone, dob, address -->
// <div class="modal fade" id="studentModal" tabindex="-1" aria-labelledby="studentModalLabel" aria-hidden="true">
//     <div class="modal-dialog">
//         <div class="modal-content">
//             <div class="modal-header">
//                 <h5 class="modal-title" id="studentModalLabel">Thông tin sinh viên</h5>
//                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div class="modal-body">
//                 <form>
//                     <div class="mb-3">
//                         <label for="name" class="form-label">Họ và tên</label>
//                         <input type="text" class="form-control" id="name" required>
//                     </div>
//                     <div class="mb-3">
//                         <label for="email" class="form-label">Email</label>
//                         <input type="email" class="form-control" id="email" required>
//                     </div>
//                     <div class="mb-3">
//                         <label for="phone" class="form-label">Số điện thoại</label>
//                         <input type="text" class="form-control" id="phone" required>
//                     </div>
//                     <div class="mb-3">
//                         <label for="dob" class="form-label">Ngày sinh</label>
//                         <input type="date" class="form-control" id="dob" required>
//                     </div>
//                     <div class="mb-3">
//                         <label for="address" class="form-label">Địa chỉ</label>
//                         <input type="text" class="form-control" id="address" required>
//                     </div>
//                 </form>
//             </div>
//             <div class="modal-footer">
//                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
//                 <button type="button" class="btn btn-primary" id="add-student">Lưu</button>
//             </div>
//         </div>
//     </div>
// </div>

addButton = document.getElementById('add-student');
addButton.addEventListener('click', function () {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let dob = document.getElementById('dob').value;
    let address = document.getElementById('address').value;
    if(name === '' || email === '' || phone === '' || dob === '' || address === '') {
        alert('Please fill in all fields');
        return;
    }
    let newStudent = {
        id: students.length + 1,
        name: name,
        email: email,
        phone: phone,
        dob: dob,
        address: address
    }
    students.push(newStudent);
    genTable();
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('dob').value = '';
});

editButton = document.getElementById('edit-student');
editButton.addEventListener('click', function () {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let dob = document.getElementById('dob').value;
    let address = document.getElementById('address').value;
    if(name === '' || email === '' || phone === '' || dob === '' || address === '') {
        alert('Please fill in all fields');
        return;
    }
    let newStudent = {
        id: students.length + 1,
        name: name,
        email: email,
        phone: phone,
        dob: dob,
        address: address
    }
    students.push(newStudent);
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.innerHTML = students.length;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = newStudent.name;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = newStudent.email;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = newStudent.phone;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = newStudent.dob;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = newStudent.address;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerHTML = `<button class="btn btn-primary" id="download-xlsx-${newStudent.id}">Download</button>`;
    tr.appendChild(td);
    tbody.appendChild(tr);
    downloadBtn = document.getElementById(`download-xlsx-${newStudent.id}`);
    downloadBtn.addEventListener('click', function () {
        const ws = XLSX.utils.json_to_sheet([newStudent]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `student-${newStudent.id}.xlsx`);
    });
    // clear form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('dob').value = '';
});