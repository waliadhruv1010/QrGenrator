const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const qr = require('qr-image');
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post("/generateQR", (req, res) => {
    const url = req.body.url;
    if (!url) {
        res.status(400).send('URL is required');
        return;
    }
    try {
        const qr_png = qr.imageSync(url, { type: 'png' }); // Generate QR code syncronously
        res.setHeader('Content-Type', 'image/png');
        res.send(qr_png);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating QR code');
    }
});

app.listen(5000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("SERVER STARTED AT PORT 5000");
    }
});
