
let currentData = [];

// 1. Neon Login Logic
async function attemptLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // Updated credentials as per your screenshot
    if (user === "admin" && pass === "1234") { 
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        fetchData(); // Calls the Render API
    } else {
        const errorMsg = document.getElementById('login-error');
        errorMsg.style.display = 'block';
        errorMsg.innerText = "INVALID NEURAL KEY";
    }
}

// 2. Fetch Data (Fixed for Render)
async function fetchData() {
    try {
        // Changed to relative path to work on the cloud
        const response = await fetch('/api/data'); 
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        renderSidebar(data);
        
        // Auto-load the first sheet available
        const firstSheet = Object.keys(data)[0];
        if (firstSheet) {
            currentData = data[firstSheet];
            displayTable(currentData);
        }
    } catch (err) {
        console.error("Fetch error:", err);
        alert("SYSTEM OFFLINE: Render is waking up, please wait 30 seconds and try again.");
    }
}

// 3. Sidebar Sheet Navigation
function renderSidebar(data) {
    const list = document.getElementById('table-list');
    list.innerHTML = "";
    Object.keys(data).forEach(name => {
        const li = document.createElement('li');
        li.className = "glass-item";
        li.innerHTML = `<span>⚡</span> ${name}`;
        li.onclick = () => {
            currentData = data[name];
            displayTable(currentData);
        };
        list.appendChild(li);
    });
}

// 4. Neon Search Filter
function runSearch() {
    const term = document.getElementById('queryInput').value.toLowerCase();
    const filtered = currentData.filter(row => 
        Object.values(row).some(v => String(v).toLowerCase().includes(term))
    );
    displayTable(filtered);
}

// 5. Table Rendering
function displayTable(data) {
    const header = document.getElementById('table-header');
    const body = document.getElementById('table-body');
    header.innerHTML = "";
    body.innerHTML = "";

    if (data.length > 0) {
        // Build Headers
        Object.keys(data[0]).forEach(key => {
            header.innerHTML += `<th>${key}</th>`;
        });
        // Build Rows
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
