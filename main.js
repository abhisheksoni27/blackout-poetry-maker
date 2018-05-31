window.onload = () => {

    var mouseIsDown = false;
    var startX;
    var startY;
    var endX;
    var endY;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    }

    image.src = "page.png"

    window.onmousedown = function (e) {
        console.log(e)
        mouseIsDown = true;
        startX = e.pageX - canvas.offsetLeft;
        startY = e.pageY - canvas.offsetTop;
        canvas.style.cursor = "crosshair";
    }

    window.onmouseup = function (e) {
        endX = e.pageX - canvas.offsetLeft;
        endY = e.pageY - canvas.offsetTop;
        ctx.strokeStyle = 'red';
        ctx.rect(startX, startY, endX - startX, endY - startY);
        ctx.stroke();
        canvas.style.cursor = "default";
    }

}