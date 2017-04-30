//dec./ini. canvas from .html and gets graphics context(i.e. where the graphics go) 
var canvas = document.getElementById("game");
var c = canvas.getContext("2d");
var score = 0;
var scoreDisplay = function () {
    var scoreCard = document.getElementById("score");
    scoreCard.innerHTML = "Score: " + score;
};

var lose = false;
var reverse = false;

var yPosEnemy = 5;
var yVelEnemy = 0;
var enemyMove = function () {

    yPosEnemy += yVelEnemy;
    if (ballPosY < yPosEnemy + 5 && yPosEnemy > 5) {
        yVelEnemy = -5;
    }
    else if (ballPosY > yPosEnemy + 35 && yPosEnemy < canvas.height - 5) {
        yVelEnemy = 5;
    }
    else yVelEnemy = 0;
};

var ballPosX = 100;
var ballPosY = 50;
var ballVelX = 2;
var ballVelY = 0;

var ballMove = function () {

    ballPosX += ballVelX;
    ballPosY += ballVelY;

    if(ballPosY > canvas.height - 5)
    {
        ballVelY *= -1;
    }
    if(ballPosY < 5)
    {
        ballVelY *= -1;
    }
    if(ballPosX < 5)
    {
        lose = true;
    }
    if(ballPosX > canvas.width - 5)
    {
        createBall();
        score += 25;
    }
    
};

var createBall = function()
{
    ballPosX = 25;
    ballPosY = 25;
    ballVelX = 2;
    ballVelY = 0;
}




var yPosPlayer = 5;
document.addEventListener('keydown', function (event)
{
    if (event.keyCode === 38 && yPosPlayer > 5) {
        yPosPlayer -= 3;
    }
    if (event.keyCode === 40 && yPosPlayer < 105) {
        yPosPlayer += 3;
    }
});

/* 
the y dimension of all graphics are twice as long as the x;
therefore, when drawing graphics, you must use even numbers for all dimensions
and set y = (x / 2) for 'perfect' squares
*/
var player = function ()
{
    c.beginPath();
    c.fillStyle = "white";
    c.rect(5,  yPosPlayer, 15, 40);
    c.fill();  
};

var enemy = function ()
{
    c.beginPath();
    c.fillStyle = "white";
    c.rect(275, yPosEnemy, 15, 40);
    c.fill();
    enemyMove();
};

var ball = function ()
{
    c.beginPath();
    c.fillStyle = "white";
    c.rect(ballPosX, ballPosY, 10, 5);
    c.fill();
    ballMove();
    collsion();
   
};

var play = function ()
{
    c.clearRect(0, 0, canvas.width, canvas.height);
    player();
    enemy();
    ball();
    scoreDisplay();
    if (lose) {
        clearInterval(ID);
        alert("YOU LOSE! Score: " + score);
        this.close();
    }
    
};

var collsion = function ()
{
    
    if((ballPosY < yPosPlayer  + 40 && ballPosY > yPosPlayer) && 
        ballPosX  === 20)
    {
        ballVelX *= -1;
        score += 5;
        reverse = !reverse;
    }

    if((ballPosY < yPosEnemy + 40 && ballPosY > yPosEnemy) &&
        ballPosX === canvas.width - 30)
    {
        ballVelX *= -1;
        if (reverse) ballVelY = 1;
    }
  

};

var ID = setInterval(play, 1000 / 60);



