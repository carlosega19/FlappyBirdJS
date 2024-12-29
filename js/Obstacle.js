class Obstacle {
    constructor(canvas, adder) {
        this.speed = 1 + adder;
        this.spaceBetween = 150;
        this.x = canvas.width;
        this.y = (Math.random()*(canvas.height-this.spaceBetween))+20;
        this.width = 60;
        this.height = canvas.height;
        this.passed = false;

        this.image = new Image();
        this.image.src = "./assets/pipe-green.png";
    }

    update() {
        this.x -= this.speed;
    }

    draw(ctx) {
        // Top
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y);
        ctx.scale(1, -1);
        ctx.drawImage(
            this.image,
            -this.width / 2, // Center the image
            0,               
            this.width,
            this.height
        );
        ctx.restore();
    
        // Bottom
        ctx.drawImage(
            this.image,
            this.x,
            this.y + this.spaceBetween,
            this.width,
            this.height
        );
    }
}