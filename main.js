let mouseIsDown = false;
let startX;
let startY;
let endX;
let endY;
const image = new Image();
const rectangles = [];
let ctx;

window.onload = () => {
    create.onclick = makeBlackoutPoetry;
    canvas.width = window.innerWidth * 0.45;
    canvas.height = window.innerHeight * 0.95;

    ctx = canvas.getContext('2d');
    image.onload = () => {
        ctx.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);
    }

    image.src = "page.png"

    window.onmousedown = function (e) {
        // Ignore Outside canvas clicks
        if (e.srcElement == canvas) {
            canvas.style.cursor = "crosshair";
            mouseIsDown = true;
            startX = e.pageX - canvas.offsetLeft;
            startY = e.pageY - canvas.offsetTop;
        }
    }

    window.onmouseup = function (e) {
        // Ignore Outside canvas clicks
        if (e.srcElement == canvas) {

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
    const canvasTemp = document.createElement('canvas');
    const ctxTemp = canvasTemp.getContext('2d');
    canvasTemp.width = canvas.width;
    canvasTemp.height = canvas.height;
    ctx.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);
    ctxTemp.fillStyle = "black";
    ctxTemp.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rectangles.length; i++) {
        const rect = rectangles[i];
        let imgData = ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
        ctxTemp.putImageData(imgData, rect.x, rect.y);
    }
    document.body.appendChild(canvasTemp);
}


function drawRectangle(ctx, x, y, width, height) {
    ctx.strokeStyle = 'red';
    ctx.rect(x, y, width, height);
    ctx.stroke();
}