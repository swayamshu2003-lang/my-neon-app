let currentData = [];

// 1. Theme Switcher Function
function setTheme(themeName) {
    document.body.className = themeName;
}

// 2. Login & Backend Fetch
async function attemptLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === "admin" && pass === "1234") {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        
        // Fetch from your Node.js Backend
        try {
            const response = await fetch('http://localhost:3000/api/data');
            const data = await response.json();
            renderSidebar(data);
            
            // Auto-load first sheet
            const firstSheet = Object.keys(data)[0];
            if (firstSheet) {
                currentData = data[firstSheet];
                displayTable(currentData);
            }
        } catch (err) {
            alert("Backend Offline! Start node server.js");
        }
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

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

function displayTable(rows) {
    const header = document.getElementById('table-header');
    const body = document.getElementById('table-body');
    header.innerHTML = ""; body.innerHTML = "";

    if (rows.length === 0) return;

    // Headers
    Object.keys(rows[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        header.appendChild(th);
    });

    // Rows
    rows.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(val => {
            const td = document.createElement('td');
            td.textContent = val;
            tr.appendChild(td);
        });
        body.appendChild(tr);
    });
}

// 3. Live Search Function
function runSearch() {
    const term = document.getElementById('queryInput').value.toLowerCase();
    const filtered = currentData.filter(row => 
        Object.values(row).some(v => String(v).toLowerCase().includes(term))
    );
    displayTable(filtered);
}

function logout() { location.reload(); }