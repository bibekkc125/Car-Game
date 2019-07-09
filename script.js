let ctx;
let animation;
let dimension = {
    width: 450,
    height: window.innerHeight
};
let wL = 150;
let wC = 75;
let score = 0;
let scoreStatus = false;
let enemyCars = [];
let numEnemyCars = randomNum(100,400);

function init(){
    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    
    canvas.height = dimension.height;
    canvas.width = dimension.width;
    ctx = canvas.getContext("2d");
}

function road(){
    ctx.fillStyle ="black";
    ctx.fillRect(0,0,454, dimension.height);
    ctx.fillStyle = "white";
    ctx.fillRect(150,0,2,dimension.height);
    ctx.fillRect(302,0,2,dimension.height);
}
init();
road();

function randomNum(min,max){
    max = Math.floor(max);
    min = Math.ceil(min);
    return min+Math.floor(Math.random() * (max-min));
}

class Car{

    constructor(x, y, w, h, gamer){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.gamer = gamer;
        this.position = 1;
        this.color =`rgb(${randomNum(0,255)},${randomNum(0,255)},${randomNum(0,255)})`;
    }

    generate(){
        if (!this.gamer){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        }
        else{
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
    }
    
    checkPosition(){
        return this.position;
    }

    moveLeft(){
        this.position -= 1;
        this.x = this.x - wL;
    }

    moveRight(){
        this.position += 1;
        this.x = this.x + wL;
    }

}

let user = new Car( wL/2 + wL - wC/2 , window.innerHeight-wC , 75 , 75 , true );

document.onkeydown = function(e){

        if (e.keyCode == 65){
            if(user.position > 0){
            user.moveLeft();
            player();
            }
        }
        else if(e.keyCode == 68){
            if(user.position<2){
            user.moveRight();
            player();
            }

        }
    
};

// enemyCars.forEach(item=>{item.checkAccident(user)});
function enemyCarsMotion(){
    for (let i = 0; i<enemyCars.length; i++){
        enemyCars[i].y = enemyCars[i].y + 5; 
        enemyCars[i].generate();
    }
}

function player(){
        user.generate();
    }

function isCollision(){
    for (let i =0 ; i<enemyCars.length; i++){
        if ((user.position == enemyCars[i].position) && (enemyCars[i].y+wC >= user.y)){
            window.cancelAnimationFrame(animation);
            console.log("COllided !");
            return true;
        }
        else if((user.position != enemyCars[i].position) && (enemyCars[i].y >= user.y)){
            return false;
        }
    }
}

function scoreCount(){
    for (let i =0 ; i<enemyCars.length; i++){
        if (!isCollision){
            if(enemyCars[i].y > dimension.height){
                scoreStatus = true;
            }
        }
    }
}



function removeCars(){
    enemyCars.forEach((item)=>{
        if (item.y >= dimension.height){
            enemyCars.splice(0,1);
        }
    })
        
}
function generateAtRandomLane(){
        let index = randomNum(0,3);
        let temp = new Car( wL / 2 + index *wL - wC / 2 , -75, 75, 75,false);
        temp.position = index;
        enemyCars.push(temp);
    }
    // scoreCount();
function draw(){
        road();     
        player();
        enemyCarsMotion();
        removeCars();
        
        scoreCount();
        animation = window.requestAnimationFrame(draw);
        isCollision();
    }
animation = window.requestAnimationFrame(draw);

setInterval( ()=>{
    generateAtRandomLane();
    if (scoreStatus == true){
        score = score + 1;
    }
    console.log(score);} , 1000);



