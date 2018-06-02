let mouseIsDown = false;
let startX;
let startY;
let endX;
let endY;
const image = new Image();
let rectangles = [];
let ctx;

window.onload = () => {
    create.onclick = makeBlackoutPoetry;
    
    ctx = canvas.getContext('2d');
    
    image.onload = () => {
        canvas.width =  image.width;
        canvas.height = image.height;
        ctx.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);
    }

    image.src = "page1.png"

    window.onmousedown = function (e) {
        // Ignore Outside canvas clicks
        if (e.srcElement == document.querySelector('#canvas')) {
            canvas.style.cursor = "crosshair";
            mouseIsDown = true;
            startX = e.pageX - canvas.offsetLeft;
            startY = e.pageY - canvas.offsetTop;
        }
    }

    window.onmouseup = function (e) {
        // Ignore Outside canvas clicks
        if (e.srcElement == document.querySelector('#canvas')) {

            canvas.style.cursor = "default";
            mouseIsDown = false;
            endX = e.pageX - canvas.offsetLeft;
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
}

function makeBlackoutPoetry() {

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

    // canvasTemp exists here
    ctxTemp = canvasTemp.getContext('2d');

    ctxTemp.fillRect(0, 0, canvas.width, canvas.height);
    ctxTemp.fillStyle = "black";

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);

    for (let i = 0; i < rectangles.length; i++) {
        const rect = rectangles[i];
        let imgData = ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
        ctxTemp.putImageData(imgData, rect.x, rect.y);
    }

    rectangles = [];
    document.querySelector('.container').appendChild(canvasTemp);
}


function drawRectangle(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.rect(x, y, width, height);
    ctx.stroke();
}