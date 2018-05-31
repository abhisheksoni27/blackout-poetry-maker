let mouseIsDown = false;
let startX;
let startY;
let endX;
let endY;
const image = new Image();
const rectangles  = [];

window.onload = () => {
    create.onclick = makeBlackoutPoetry;
    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');

    image.onload = () => {
        ctx.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);
    }

    image.src = "page.png"

    window.onmousedown = function (e) {
        canvas.style.cursor = "crosshair";
        mouseIsDown = true;
        startX = e.pageX - canvas.offsetLeft;
        startY = e.pageY - canvas.offsetTop;
    }

    window.onmouseup = function (e) {
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

function makeBlackoutPoetry(){

}

function drawRectangle(ctx, x, y, width, height) {
    ctx.strokeStyle = 'red';
    ctx.rect(x, y, width, height);
    ctx.stroke();
}