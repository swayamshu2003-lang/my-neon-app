const express = require('express');
const xlsx = require('xlsx');
const path = require('path');
const cors = require('cors');

const app = express();
// This ensures the server uses Render's assigned port
const PORT = process.env.PORT || 10000; 

app.use(cors());

// This tells the server to find your index.html and style.css
app.use(express.static(path.join(__dirname)));

// This tells the server to open your login page immediately
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// This provides the Excel data to your phone
app.get('/api/data', (req, res) => {
    try {
        const workbook = xlsx.readFile('myData.xlsx');
        const data = {};
        workbook.SheetNames.forEach(sheet => {
            data[sheet] = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Excel file connection failed" });
    }
});

app.listen(PORT, () => {
    console.log(`Neon Server Restore Complete on Port ${PORT}`);
});
