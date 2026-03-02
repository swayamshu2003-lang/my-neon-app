const express = require('express');
const xlsx = require('xlsx');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000; 

app.use(cors());

// Serve your HTML, CSS, and JS files
app.use(express.static(path.join(__dirname)));

// Serve index.html as the home page (Fixes "Cannot GET /")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Route for Excel data
app.get('/api/data', (req, res) => {
    try {
        const workbook = xlsx.readFile('myData.xlsx');
        const data = {};
        workbook.SheetNames.forEach(sheet => {
            data[sheet] = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
        });
        res.json(data);
    } catch (err) {
        console.error("Excel Error:", err);
        res.status(500).json({ error: "Excel file not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
});
