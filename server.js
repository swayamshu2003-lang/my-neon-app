const express = require('express');
const xlsx = require('xlsx');
const cors = require('cors');
const fs = require('fs');
const path = require('path'); // Added for path handling

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/data', (req, res) => {
    // This looks for 'myData.xlsx' in the EXACT folder where this server.js sits
    const filePath = path.join(__dirname, 'myData.xlsx');

    console.log("-------------------------------------------");
    console.log("🔍 Browser request received.");
    console.log("📂 Looking for file at:", filePath);

    if (!fs.existsSync(filePath)) {
        console.log("❌ ERROR: File not found!");
        return res.status(404).json({ 
            error: "File not found", 
            searchedPath: filePath 
        });
    }

    try {
        const workbook = xlsx.readFile(filePath);
        const allData = {};

        workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            allData[sheetName] = xlsx.utils.sheet_to_json(worksheet);
        });

        console.log("✅ SUCCESS: Data sent to Frontend.");
        res.json(allData);
    } catch (err) {
        console.log("❌ CRASH: Error reading Excel:", err.message);
        res.status(500).json({ error: "Failed to read Excel file" });
    }
});

app.listen(PORT, () => {
    console.log(`\n===========================================`);
    console.log(`🚀 BACKEND ACTIVE: http://localhost:${PORT}`);
    console.log(`📂 Folder: ${__dirname}`);
    console.log(`🛑 Press Ctrl + C to stop`);
    console.log(`===========================================\n`);
});