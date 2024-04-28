const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let CANVAS_WIDTH = canvas.width = window.innerWidth ;
let CANVAS_HEIGHT = canvas.height = window.innerHeight ;
ctx.font = '50px Impact';
let score = 0;

let gameOver = false;

const CollissionCanvas = document.getElementById("collissionDect");
const collissionCtx = CollissionCanvas.getContext('2d');
let COLLISSION_WIDTH =  CollissionCanvas.width = window.innerWidth;
let COLLISSION_HEIGHT = CollissionCanvas.height = window.innerHeight; 


class raven {
    constructor(){
        this.delete = false;
        this.sizeModifier = Math.random()*0.6+0.4;
        this.xSpeed=Math.random()*3+1;
        this.ySpeed=Math.random()*5-2.5;
        this.image = new Image();
        this.image.src = "raven.png";
        this.frame=0;
        this.spriteWidth=271;
        this.spriteHeight=194;
        this.width=this.spriteWidth*this.sizeModifier;
        this.height=this.spriteHeight*this.sizeModifier;
        this.x =window.innerWidth-this.width;
        this.y =Math.random()*(window.innerHeight-this.height);
        this.colorVal = [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)];
        this.color="rgb("+this.colorVal[0]+","+this.colorVal[1]+","+this.colorVal[2]+")";
    }
    draw(){
        // ctx.strokeRect(this.x,this.y,this.width,this.height);
        collissionCtx.fillStyle=this.color;
        collissionCtx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.spriteWidth*this.frame,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
    update(){
        this.x -= this.xSpeed;
        this.y -= this.ySpeed;
        // if(this.x< -(this.width)) this.delete = true
        if(this.x <= -(this.width)) gameOver = true
        if(this.y<=0 || this.y >= CANVAS_HEIGHT-this.height) this.ySpeed = -(this.ySpeed);
        if(this.frame>=5)this.frame=0;
        else this.frame++;
    }
}

const updateScore = () => {
    ctx.fillStyle  = 'red';
    ctx.fillText('Score : ' + score, 50, 75);
}

let x=30;

let ravens = [];

window.addEventListener('click', (e)=>{
    const pixelVal = collissionCtx.getImageData(e.x,e.y,1,1);
    console.log(pixelVal);
    console.log(pixelVal.data);
    console.log(pixelVal.data[0]);
    console.log(pixelVal.data[1]);
    console.log(pixelVal.data[2]);
    ravens.forEach(rav =>{
        if(pixelVal.data[0]===rav.colorVal[0] && pixelVal.data[1]===rav.colorVal[1] && pixelVal.data[2]===rav.colorVal[2]){
            rav.delete=true;
            score++;
        }
    })
})

const animate = () => {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    collissionCtx.clearRect(0,0,COLLISSION_WIDTH,COLLISSION_HEIGHT);
    if(x%30==0)ravens.push(new raven());
    ravens = ravens.filter(r=>r.delete==false);
    //console.log(ravens);
    updateScore();
    for(let i=0; i<ravens.length;i++){
        ravens[i].draw();
        ravens[i].update();
    }
    x++;
    //console.log(ravens);
    if(!gameOver){
        requestAnimationFrame(animate);
    }else{
        ctx.fillText("Game Over",10,10)
    }
}

animate();