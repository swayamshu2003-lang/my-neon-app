
let currentData = [];

// 1. Login Logic
async function attemptLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === "swayamshu" && pass === "bablu") {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        fetchData();
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

// 2. Fetch Data from Render Backend
async function fetchData() {
    try {
        // Using '/api/data' ensures it works on Render and Mobile
        const response = await fetch('/api/data'); 
        const data = await response.json();
        renderSidebar(data);
        
        // Auto-load first sheet
        const firstSheet = Object.keys(data)[0];
        if (firstSheet) {
            currentData = data[firstSheet];
            displayTable(currentData);
        }
    } catch (err) {
        alert("Backend Offline! Please wait for Render to wake up.");
    }
}

// 3. Render Sidebar Menu
function renderSidebar(data) {
    const list = document.getElementById('table-list');
    list.innerHTML = "";
    Object.keys(data).forEach(name => {
        const li = document.createElement('li');
        li.innerHTML = `<span>⚡</span> ${name}`;
        li.onclick = () => {
            currentData = data[name];
            displayTable(currentData);
        };
        list.appendChild(li);
    });
}

// 4. Search Function
function runSearch() {
    const term = document.getElementById('queryInput').value.toLowerCase();
    const filtered = currentData.filter(row => 
        Object.values(row).some(v => String(v).toLowerCase().includes(term))
    );
    displayTable(filtered);
}

// 5. Display Table Logic
function displayTable(data) {
    const header = document.getElementById('table-header');
    const body = document.getElementById('table-body');
    header.innerHTML = "";
    body.innerHTML = "";

    if (data.length > 0) {
        Object.keys(data[0]).forEach(key => {
            header.innerHTML += `<th>${key}</th>`;
        });
        data.forEach(row => {
            const tr = document.createElement('tr');
            Object.values(row).forEach(val => {
                tr.innerHTML += `<td>${val}</td>`;
            });
            body.appendChild(tr);
        });
    }
}

function logout() {
    location.reload();
}
