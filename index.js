const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const db = require("./private/mongo");
const vrfy = require("./private/verify");
const cookieParser = require('cookie-parser');
const { response } = require('express');
const port = process.env.PORT || 8787;

var corsOptions = {
    origin: '*'
};

app.use(cookieParser());
app.use(express.static('js'));
app.use(express.static(__dirname + '/public/'));
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));

// Get Methods
app.get('/', (req, res) => {
    console.log(Date.now() + ' - ' + req.hostname + ' - /');
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/cvz', (req, res) => {
    console.log(Date.now() + ' - ' + req.hostname + ' - /cvz');
    db.increment("download");
    var fileName = "CV.zip";
    const directoryPath = __dirname + "/public/zip/";
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file: " + err,
            });
        }
    });
});

app.get('/csd', (req, res) => {
    console.log(Date.now() + ' - ' + req.hostname + ' - /csd');
    db.increment("csd");
    var fileName = "CSD.zip";
    const directoryPath = __dirname + "/public/zip/";
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file: " + err,
            });
        }
    });
});

app.get('/cv', (req, res) => {
    console.log(Date.now() + ' - ' + req.hostname + ' - /cv');
    db.increment("print");
    var fileName = "CV_Alessandro_DAngelo.pdf";
    const directoryPath = __dirname + "/public/pdf/";
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file: " + err,
            });
        }
    });
});

app.get('/se', (req, res) => {
    console.log(Date.now() + ' - ' + req.hostname + ' - /se');
    db.increment("ie");
    var fileName = "SE.zip";
    const directoryPath = __dirname + "/public/zip/";
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file: " + err,
            });
        }
    });
});

app.get('/slides', (req, res) => {
    console.log(Date.now() + ' - ' + req.hostname + ' - /slides');
    db.increment("ssd");
    var fileName = "Archivio.zip";
    const directoryPath = __dirname + "/public/zip/";
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file: " + err,
            });
        }
    });
});

app.get("/c2VjcmV0Cg==", (req, res) => {
    const token = req.cookies["ST_Session"];
    var status_code = vrfy(token);
    if (status_code == 200) {
        res.sendFile(__dirname + '/public/counter.html');
    } else {
        res.sendFile(__dirname + "/public/Y291bnRlcgo=.html");
    }
});

app.get('/dXBkYXRlVGFibGUK', (request, response) => {
    const token = request.cookies["ST_Session"];
    var status_code = vrfy(token);
    if (status_code != 200) {
        response.status(status_code).end();
    }

    db.get_data((body_str, res, status) => {
        switch (status) {
            case 200:
                response.send(200, body_str);
            default:
                response.status(status).end();
        }
    });
});

app.post('/vrfyToken', (req, response) => {
    db.vrfyToken(req.body, (token, res, status) => {
        switch (status) {
            case 200:
                response.status(status);
                response.cookie('ST_Session', token);
                response.redirect("/c2VjcmV0Cg==");
                break;
            default:
                response.status(status).end();
        }
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});