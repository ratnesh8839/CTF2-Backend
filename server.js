const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// This simulates your valid data (in reality, this would come from a database)
const validData = {
    validRollNumbers: {
        "1": "01101011010010101111111001111010",
        "2": "11110010001110100100101111001010",
        "3": "11101101101100100111011000000001",
        "4": "10101011001101110011001011011100",
        "5": "11011000000001000001011100110001",
        "6": "00111100011011011100100100100011",
        "7": "11001100110101001001100110111010",
        "8": "00100110010010111010010011110001",
        "9": "11010000100001000100010101111110",
        "10": "10100000111010110111010001110101",
        "11": "00111000001101011001000100001000",
        "12": "10011100011100111001101000110010",
        "13": "10010000011001010010111101000101"
    },
    validLink: "https://drive.google.com/drive/folders/1fEUG1aw0GyP_BWSnM9onFETmMva_AtE3?usp=sharing"
};

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for validating roll number and input32
app.post('/validate', (req, res) => {
    const { rollno, input32 } = req.body;

    if (validData.validRollNumbers[rollno] === input32) {
        // If valid, return the link
        res.json({ success: true, link: validData.validLink });
    } else {
        // If invalid, return failure response
        res.json({ success: false });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
