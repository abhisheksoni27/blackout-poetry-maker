let mouseIsDown = false;
let startX;
let startY;
let endX;
let endY;
let image = new Image();
let rectangles = [];
let imageExists = false;
let ctx;
const reader = new FileReader();

window.onload = () => {
    const fileElem = document.getElementById("image-file");
    // Setup canvas and expose context via ctx variable

    fileSelect.addEventListener("click", function (e) {
        if (fileElem) {
            fileElem.click();
        }
    }, false);

    setupListeners();
    create.onclick = makeBlackoutPoetry;
    clear.onclick = clearCanvas;
    download.onclick = downloadImage;
    ctx = canvas.getContext('2d');
}

function makeBlackoutPoetry() {
    if (!imageExists) {
        return;
    }

    let canvasTemp;
    let ctxTemp;

    if (document.querySelector('#canvasTemp')) {
        canvasTemp = document.querySelector('#canvasTemp');
    } else {
        canvasTemp = document.createElement('canvas');
        canvasTemp.id = "canvasTemp";
        canvasTemp.width = canvas.width;
        canvasTemp.height = canvas.height;
    }

    ctxTemp = canvasTemp.getContext('2d');
    ctxTemp.clearRect(0, 0, canvas.width, canvas.height)
    ctxTemp.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";

    for (let i = 0; i < rectangles.length; i++) {
        const rect = rectangles[i];
        let imgData = ctxTemp.getImageData(rect.x, rect.y, rect.width, rect.height);
        ctx.putImageData(imgData, rect.x, rect.y);
    }
    rectangles = [];
}

function drawRectangle(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.rect(x, y, width, height);
    ctx.stroke();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.stroke();
}

function loadImageHandler(files) {
    const selectedFile = files[0];

    reader.onload = function (event) {
        image.onload = () => {
            imageExists = true;

            if (navigator.userAgent.match(/Android/i)) {
                canvas.width = "100%";
                canvas.height = window.innerHeight * 0.75;
                ctx.drawImage(image, 0, 0, 0.3 * image.width, 0.3 * image.height);
            } else {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
            }
        }
        image.src = event.target.result;
    }

    reader.readAsDataURL(selectedFile);
}

function start(e) {
    e.preventDefault();

    // Ignore Outside canvas clicks
    if (e.srcElement == document.querySelector('#canvas')) {
        canvas.style.cursor = "crosshair";
        mouseIsDown = true;
        startX = e.pageX - canvas.offsetLeft;
        startY = e.pageY - canvas.offsetTop;
    }
}

function end(e) {
    e.preventDefault();
    // Ignore Outside canvas clicks
    if (e.srcElement == document.querySelector('#canvas')) {

        canvas.style.cursor = "default";
        mouseIsDown = false;
        endX = e.pageX - canvas.offsetLeft
        endY = e.pageY - canvas.offsetTop;
        const rect = {
            x: startX,
            y: startY,
            width: endX - startX,
            height: endY - startY
        }
        drawRectangle(ctx, rect.x, rect.y, rect.width, rect.height);
        rectangles.push(rect);
    }
}

function setupListeners() {
    window.onmousedown = start;
    window.ontouchstart = start;
    window.onmouseup = end;
    window.ontouchend = end;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);
}

function downloadImage() {
    const dataURL = canvas.toDataURL();
    download.href = dataURL;
}