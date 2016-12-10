document.body.onload = game;

var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;
var mom;
var baby;

var mx;
var my;

var data;
var wave;

var dust;

function game() {
    init();
    lastTime = Date.now();
    gameloop();
}


function init() {
    can1 = document.getElementById('canvas1'); //fishes, dust, UI, circle
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById('canvas2'); //background, ane, fruits
    ctx2 = can2.getContext('2d');

    can1.addEventListener('mousemove', onMouseMove, false);

    canWidth = can1.width;
    canHeight = can2.height;

    bgPic.src = './images/background.jpg';

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();

    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    data = new dataObj();
    wave = new waveObj();
    wave.init();

    dust = new dustObj();
    dust.init();

    
    ctx1.font = '20px Verdana';
    ctx1.textAlign = 'center';
}

function gameloop() {

    requestAnimFrame(gameloop);
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if (deltaTime > 40) deltaTime = 40;
    drawBackground();
    dust.draw();
    ane.draw();
    fruitMonitor();
    fruit.draw();
    ctx1.clearRect(0, 0, canWidth, canHeight);
    mom.draw();
    baby.draw();
    momFruitsCollision();
    momBabyCollision();
    data.draw();
    wave.draw();

}

function onMouseMove(e) {
	if(data.gameOver){
		return;
	}
    if (e.offSetX || e.layerX) {
        mx = e.offSetX == undefined ? e.layerX : e.offSetX;
        my = e.offSetY == undefined ? e.layerY : e.offSetY;
    }
}
