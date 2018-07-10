
class Enemy {
    constructor(x=0,y=50,speed=256){
        this.x=x;
        this.y=y;
        this.speed=speed;
        this.sprite='images/enemy-bug.png';
    }
    update(dt){
        this.x+=this.speed*dt;
        if(this.x>=505)
            this.x=0;
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        displayScore();
    }
}

class Player {
    
    constructor(x=0,y=0){
        this.x=x;
        this.y=y;
        this.sprite='images/char-boy.png';
    }
    update(x=this.x,y=this.y) {
        if(x>=400)x=400;
        else if(x<=0)x=0;
        if(y<=-25)y=-25;
        else if(y>=400)y=400;
        this.x=x;
        this.y=y;
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(direction){
        if(direction=='right') {
            this.update(this.x+100,this.y);
        }
        if(direction=='left') {
            this.update(this.x-100,this.y);
        }
        if(direction=='up') {
            this.update(this.x,this.y-85);
        }
        if(direction=='down')
        {
            this.update(this.x,this.y+85);   
        }
    }
    win() {
        if (this.y<=-25) {        
            this.x = 200;
            this.y = 400;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 505, 171);
            score += 1;
        }
    }
}

let score = 0;
let allEnemies=[];
let scoreDiv = document.querySelector('.score');
let player = new Player(200,400);

let displayScore = function() {
    scoreDiv.innerHTML = 'Your Score: ' + score;
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

for(let i=0;i<4;i++) {
    let enemy=new Enemy(0,Math.random()*184+50,Math.random()*256);
    allEnemies.push(enemy);
}
