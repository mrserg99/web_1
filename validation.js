let YCorrect = false;
let RCorrect = false;
let XCorrect = false;

let x;
let y;
let r;

function validationY(){
    const Y = document.getElementById("Y").value.replace(",",".");
    const resY = document.getElementById("resY");
    if(Y >= -3 && Y <= 5 && Y !== "" ){
        YCorrect = true;
        resY.src = "images/greenCheckMark.png";
        resY.height = "15";
        resY.width = "15";
        y = Y;
    }else {
        YCorrect = false;
        resY.src = "images/redCheckMark.png";
        resY.height = "15";
        resY.width = "15";
    }
}

function validationR(){
    const R = document.getElementById("R").value.replace(",",".");
    const resR = document.getElementById("resR");
    if(R >= 0 && R <= 4 && R !== "" ){
        RCorrect = true;
        resR.src = "images/greenCheckMark.png";
        resR.height = "15";
        resR.width = "15";
        r = R;
    }else {
        RCorrect = false;
        resR.src = "images/redCheckMark.png";
        resR.height = "15";
        resR.width = "15";
    }
}

function validationX(){
    x = document.activeElement.name;
    XCorrect = true;
    document.getElementById("resX").innerHTML = "Вы выбрали " + x;
}

function validation(){
    if(!YCorrect){
        validationY();
    }
    if(!RCorrect){
        validationR();
    }
    if(!XCorrect){
        blinktext();
    }
    if(XCorrect && YCorrect && RCorrect) {
        XCorrect = false;
        YCorrect = false;
        RCorrect = false;
        fetch("Server.php", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: "x=" + encodeURIComponent(x) + "&y=" + encodeURIComponent(y) + "&r=" + encodeURIComponent(r) +
                "&timeZone=" + encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone)
        }).then(response => response.text().then(function (serverAnswer) {
            document.getElementById("outputContainer").innerHTML = serverAnswer;
        })).catch(err => createNotification("Ошибка HTTP. Повторите попытку позже." + err));
    }else {
        XCorrect = false;
        YCorrect = false;
        RCorrect = false;
    }
}

function createNotification(message) {
    let outputContainer = document.getElementById("outputContainer");
    if (outputContainer.contains(document.querySelector(".notification"))) {
        let stub = document.querySelector(".notification");
        stub.textContent = message;
        stub.classList.replace("outputStub", "errorStub");
    } else {
        let notificationTableRow = document.createElement("h4");
        notificationTableRow.innerHTML = "<span class='notification errorStub'></span>";
        outputContainer.prepend(notificationTableRow);
        let span = document.querySelector(".notification");
        span.textContent = message;
    }
}

function blinktext() {
    let f = document.getElementById('resX');

    let interval = setInterval(function() {
        f.style.visibility = (f.style.visibility == 'hidden' ? '' : 'hidden');
    }, 450);
    setTimeout(function (){
        clearInterval(interval);
    },10000);
}
