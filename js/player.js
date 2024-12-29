class Player {
    constructor() {
        this.img = new Image();
        this.img.src = "./assets/yellowbird-midflap.png";
        this.hitBox = 20;
        this.x = 100;
        this.y = 200;

        this.gravity = 0.5;
        this.jumpForce = -7;
        this.speedY = 0;
        
        this.dieSound = new Audio("./sounds/die.ogg");
        this.dieSound.volume = 0.5;
        this.jumpSound = new Audio("./sounds/wing.ogg");
        this.jumpSound.volume = 0.5;
    }


    draw(ctx) {
        if (this.speedY > 0) {
            this.img.src = "./assets/yellowbird-upflap.png"
        }
        else this.img.src = "./assets/yellowbird-downflap.png"
        ctx.drawImage(this.img, this.x - this.hitBox, this.y - this.hitBox, this.hitBox * 2, this.hitBox * 2);
    }


    checkCollisions(obstacle) {
        if ((this.x+this.hitBox >= obstacle.x && this.x <= obstacle.x+obstacle.width) // X
            && (this.y-this.hitBox <= obstacle.y || this.y+this.hitBox >= obstacle.y+obstacle.spaceBetween)) { // Y
            this.dieSound.play();
            return true;
        }
    }

    passObstacle(obstacle) {
        return this.x+this.hitBox > obstacle.x+obstacle.width && obstacle.passed == false;
    }


    update(canvas) {
        this.speedY += this.gravity;
        this.y += this.speedY;
    
        if (this.y > canvas.height - this.hitBox) {
            this.y = canvas.height - this.hitBox;
            this.speedY = 0;
        }
        if (this.y < this.hitBox) {
            this.y = this.hitBox
            this.speedY = 0;
        }
    }

    jump() {
        this.speedY = this.jumpForce;
        this.jumpSound.play();
    }
}
