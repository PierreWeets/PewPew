class Bullet {
    constructor(centerPosX, centerPosY, radius = 14, vY = -5){
        this.centerPosX = Number(centerPosX);
        this.centerPosY = Number(centerPosY);
        this.vX = 0;
        this.vY = Number(vY);
        this.radius = Number(radius);
        this.color = "black";
    };

    draw(){
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.centerPosX, this.centerPosY, this.radius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();
    }

    move(){
        this.centerPosX += this.vX; 
        this.centerPosY += this.vY; 
    }    
};

class Target{
    constructor(centerPosX, centerPosY, radius = 30){ // radius = 30 by default
        this.centerPosX = Number(centerPosX); // position of the center of the target in X
        this.centerPosY = Number(centerPosY);//  position of the center of the target in Y
        this.radius = Number(radius);
        this.circleColor = "red";
        this.targetColor = "grey";
    };
    
    draw(){
        //create a square with :  
        //  corner position X = position of the center of the circles - radius
        //  corner position Y = position of the center of the circles - radius
        // width & heigth = 2 * radius of the external circle
        ctx.fillStyle = this.targetColor  ;
        ctx.beginPath();
        ctx.fillRect(this.centerPosX - this.radius , this.centerPosY - this.radius, 2*this.radius, 2*this.radius)
        ctx.closePath();
        //console.log("this.targetColor : " + this.targetColor);
        ctx.fill();
        
        //concentric circles
        ctx.strokeStyle = this.circleColor;
        for(let i=this.radius; i > 0; i=i-10){
            //draw several circles, with always smaller radius
            ctx.beginPath();
            ctx.arc(this.centerPosX, this.centerPosY, i,0, Math.PI*2, true);
            ctx.closePath();
            ctx.stroke();
        }

        //vertical line
        ctx.strokeStyle = this.circleColor;
        ctx.beginPath(); // begin the drawing
        ctx.moveTo(this.centerPosX, this.centerPosY - this.radius);
        ctx.lineTo(this.centerPosX, this.centerPosY + this.radius);
        ctx.closePath();
        ctx.stroke();
        
        //horizontal line
        ctx.strokeStyle = this.circleColor;
        ctx.beginPath(); // begin the drawing
        ctx.moveTo(this.centerPosX - this.radius, this.centerPosY );
        ctx.lineTo(this.centerPosX + this.radius, this.centerPosY );
        ctx.closePath();
        ctx.stroke();    
    }
}

class Cannon {
    constructor(centerPosX){
        this.length = 80;
        this.width = 30;
        this.color = "black";
        
        this.wheelLenght = 30;
        this.wheelWidth = 10;
        this.wheelColor = "brown";
        
        this.centerPosX = centerPosX;
        this.posX = this.centerPosX - Math.round(this.width/2);
        this.posY = canvas.height - this.length;
        this.VX = 5;
        
        this.leftWheelPosX = this.posX - this.wheelWidth-1;
        this.leftWheelPosY = this.posY + (this.length - this.wheelLenght) - 10;
        this.rightWheelPosX = this.posX + this.width+1;
        this.rightWheelPosY = this.leftWheelPosY ;
    };

    moveLeft(){
        //console.log("move left");
        this.centerPosX -= this.VX ;
        this.posX = this.centerPosX - Math.round(this.width/2);
        this.leftWheelPosX -= this.VX ;
        this.rightWheelPosX -= this.VX ;
    };

    moveRight(){
        //console.log("move right");
        this.centerPosX += this.VX  ;
        this.posX = this.centerPosX - Math.round(this.width/2);
        this.leftWheelPosX += this.VX ;
        this.rightWheelPosX += this.VX ;
    };

    fire(){
        //console.log("fire");
    };

    draw(){
        //this.clear();
        //console.log("draw cannon");
        //draw cannon
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(this.posX , this.posY, this.width, this.length);
        ctx.closePath();
        //ctx.fillStyle = this.color;
        ctx.fill();

        //draw left wheel
        ctx.fillStyle = this.wheelColor;      
        ctx.beginPath();
        ctx.fillRect(this.leftWheelPosX , this.leftWheelPosY, this.wheelWidth, this.wheelLenght);
        ctx.closePath();
//        ctx.fillStyle = this.wheelColor;
        ctx.fill();

        //draw right wheel
        ctx.beginPath();
        ctx.fillRect(this.rightWheelPosX , this.rightWheelPosY, this.wheelWidth, this.wheelLenght);
        ctx.closePath();
        //ctx.fillStyle = this.wheelColor;
        ctx.fill();
    };

};

function clear() {// clear the content of the whole canvas
  ctx.clearRect(0,0, canvas.width, canvas.height);
}

document.addEventListener("keydown", event => {
    //;
    //console.log("key pressed : " + event.keyCode);
    //console.log("running : " + running);
    if (running) {//test if running before taking account the keypresses
        
        if (event.keyCode === 37 ) {
            cannon.moveLeft();// left arrow

        } else if (event.keyCode === 39 ){// right arrow
            cannon.moveRight();

        } else if (event.keyCode === 32 ){ // space bar to shot
            if(!shooting){//if bullet not shooted, then activate the shooting & reset the bullet's position to the cannon mouth position
                shooting = true;
                bullet.centerPosY=cannon.posY+bullet.radius;//set posY at the cannon posY
                bullet.centerPosX=cannon.centerPosX;//set posX at the cannon posX
            }
            
            if(bullet.centerPosY + bullet.radius <= 0){//if bullet exits the screen
                bullet.centerPosY=cannon.posY+bullet.radius;//set posY at the cannon posY
                bullet.centerPosX=cannon.centerPosX;
                // console.log("exit screen & key space : bullet center pos Y:" + bullet.centerPosY);
                // console.log("exit screen & key space : bullet center pos X:" + bullet.centerPosX);
            }
        } 
    }
    
    if (event.keyCode === 27 ){// escape key to stop the game
        window.cancelAnimationFrame(raf); //stop the animation of the canvas
        //clearInterval(myTimer);//stop the timer

        running = false;
        // document.getElementById("start").setAttribute("disabled", false);
        document.getElementById("start").disabled = false;//enable the start button 
        
        return;//exits the event without running the code below
    }
});

function startGame(){
    running = true;
    document.getElementById("start").disabled = true;
    document.getElementById("start").innerHTML = "RESTART";

    //
    startTime = localStorage.getItem('startDate');
    if (startTime) {
        startTime = new Date(startTime);
    } else {
        startTime = new Date();
        localStorage.setItem('startDate', startTime);
    }
    
    console.log("startTime:" + startTime);
    // Update the count down every 1 second
    myTimer = setInterval(function() {
        // Find the distance between now an the start time 
        var distance = new Date().getTime() - startTime.getTime();
    
        // Time calculations for days, hours, minutes and seconds
        //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        minutes = (minutes <= 9) ? "0"+minutes : minutes;
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        seconds = (seconds <= 9) ? "0"+seconds : seconds;
        // Output the result in an element with id="demo"
        //document.getElementById("timeCounter").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        document.getElementById("timeCounter").innerHTML = "ellapsed time since start : " + minutes + "m " + seconds + "s";
        //increase tjhe ellapsed time when timer active
        ellapsedTime ++;
        
    }, 1000);

    canvas.focus();//set focus on canvas to enable the keydown event (document.addEventListener("keydown"))
    raf = window.requestAnimationFrame(canvasDraw);
}

function canvasDraw() {
    //console.log("canvasDraw() - running:" + running);
    if (running){//if game is running => clear the screen & display the objects
        document.getElementById("score").innerHTML="Score = "  + score;
        // clear the canvas before re-display
        clear() 
        //draw the cannon
        cannon.draw();
        // test if bullet is shooted 
        if(shooting){
            //console.log("bullet center pos Y:" + bullet.centerPosY)

            // if bullet inside the canvas
            if (bullet.centerPosY + bullet.radius > 0){
                bullet.move()
                bullet.draw();
            } else {//if bullet exits the screen
                shooting = false;//disabled the shooting
                bullet.centerPosY = canvas.height;//set bullet posY = bottom of the canvas
            }
        } 
        //test if ,at least, the half of the bullet touches the target 
        if(bullet.centerPosY <= target.centerPosY && (bullet.centerPosX > target.centerPosX - target.radius && bullet.centerPosX < target.centerPosX + target.radius ) ){
            //create a new target
            target.centerPosX = target.radius + Math.round(Math.random()*(canvas.width-2*target.radius));
            target.centerPosY = target.radius + Math.round(Math.random()*(100-target.radius));
            score ++; //increment the score
            if(score >= 10){
                clearInterval(myTimer);
                document.getElementById("start").innerHTML = "START";
                document.getElementById("start").disabled = false;
                
                //seconds = Math.floor((distance % (1000 * 60)) / 1000);
                alert(`GAME OVER. \nYour score is ${score} in ${ellapsedTime} seconds.`);
                running = false;
                shooting = false;
                localStorage.clear();
                ellapsedTime=0;
                score=0;
                console.log("score=" + score);
                console.log("ellapsedTime=" + ellapsedTime);
                return;//exit the fct canvasDraw()
            }
        }
        target.draw();
        
        //
        raf = window.requestAnimationFrame(canvasDraw);
    }
}
//--------------------------------------------------------------------
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;
var running = false;
var shooting = false;
//let bulletRadius = 14;
var score = 0;
var ellapsedTime = 0;
var startTime ;

localStorage.clear();

//ball.draw();
var cannon = new Cannon(200);
var target = new Target(100, 70);
var bullet = new Bullet(cannon.centerPosX,cannon.posY);
var myTimer;

document.getElementById("start").innerHTML = "START";
document.getElementById("score").innerHTML = "Score = "  + score;

cannon.draw();
target.draw();
//bullet.draw();
