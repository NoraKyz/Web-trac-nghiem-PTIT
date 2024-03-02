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

holder_container = document.getElementById('holder');

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
    tbody.appendChild(tr);
}
);

table.appendChild(tbody);
holder_container.appendChild(table);

toXLSX = document.getElementById('to-xlsx');

toXLSX.addEventListener('click', function () {
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "students.xlsx");
});