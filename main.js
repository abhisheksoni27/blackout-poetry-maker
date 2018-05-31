window.onload = () => {
    canvas.width = window.innerWidth; //horizontal resolution (?) - increase for better looking text
    canvas.height = window.innerHeight; //vertical resolution (?) - increase for better looking text

    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.onload = ()=>{
        ctx.drawImage(image, 0, 0)
    }

    image.src = "page.png"
        
}