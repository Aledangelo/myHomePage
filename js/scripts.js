var currentPage = "content";

function getData() {
    var req = new XMLHttpRequest();
    req.open('GET', '/dXBkYXRlVGFibGUK', true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                console.log(req.response);
                result = req.response.split("&");
                document.getElementById('pcv').textContent = result[0].split("cv_p=")[1];
                document.getElementById('dcv').textContent = result[1].split("cv_d=")[1];
                document.getElementById('ie').textContent = result[2].split("ie=")[1];
                document.getElementById('ssd').textContent = result[3].split("ssd=")[1];
                document.getElementById('csd').textContent = result[4].split("csd=")[1];
            } else {
                alert("Qualcosa è andato storto");
            }
        }
    }
    req.send();
}

function downloadCV() {
    var req = new XMLHttpRequest();
    req.responseType = "blob";
    req.open('GET', '/cvz', true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var fileName = "CV_" + new Date().getTime() + ".zip";
                var blob = req.response;
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
            } else {
                alert("Qualcosa è andato storto!");
            }
        }
    }
    req.send();
}

function printCV() {
    var req = new XMLHttpRequest();
    req.responseType = "blob";
    req.open('GET', '/cv', true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var fileName = "CV_ALESSANDRO_DANGELO_" + new Date().getTime() + ".pdf";
                var blob = req.response;
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
            } else {
                alert("Qualcosa è andato storto!");
            }
        }
    }
    req.send();
}

function downloadPPT() {
    var req = new XMLHttpRequest();
    req.responseType = "blob";
    req.open('GET', '/slides', true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var fileName = "Archivio" + new Date().getTime() + ".zip";
                var blob = req.response;
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
            } else {
                alert("Qualcosa è andato storto!");
            }
        }
    }
    req.send();
}

function downloadSE() {
    var req = new XMLHttpRequest();
    req.responseType = "blob";
    req.open('GET', '/se', true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var fileName = "SystemEvaluation" + new Date().getTime() + ".zip";
                var blob = req.response;
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
            } else {
                alert("Qualcosa è andato storto!");
            }
        }
    }
    req.send();
}

function downloadCSD() {
    var req = new XMLHttpRequest();
    req.responseType = "blob";
    req.open('GET', '/csd', true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var fileName = "ComputerSystemDesign" + new Date().getTime() + ".zip";
                var blob = req.response;
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
            } else {
                alert("Qualcosa è andato storto!");
            }
        }
    }
    req.send();
}

function changeVisibility(newPage) {
    var currentDiv = currentPage + '_container';
    var newDiv = newPage + '_container';

    document.getElementById(currentPage).className = 'none';
    document.getElementById(currentDiv).style.display = 'none';

    document.getElementById(newPage).className = 'no_border purple';
    document.getElementById(newDiv).style.display = 'inline';

    currentPage = newPage;
}