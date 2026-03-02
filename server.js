
   const express = require('express');
const xlsx = require('xlsx');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// This line tells the server to serve your HTML/CSS/JS files
app.use(express.static(path.join(__dirname)));

// This line tells the server to open index.html when you visit the link
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/data', (req, res) => {
    try {
        const workbook = xlsx.readFile('myData.xlsx');
        const data = {};
        workbook.SheetNames.forEach(sheet => {
            data[sheet] = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Excel file not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
