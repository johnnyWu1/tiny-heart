var babyObj = function() {
    this.x;
    this.y;
    this.angle;
    this.babyEye = [];
    this.babyBody = [];
    this.babyTail = [];

    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
    this.babyBodyInterval = 300;
}

babyObj.prototype.init = function() {
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;

    for (var i = 0; i < 8; i++) {
        var pic = new Image();
        pic.src = './images/babyTail' + i + '.png'
        this.babyTail[i] = pic;
    }
    for (var i = 0; i < 2; i++) {
        var pic = new Image();
        pic.src = './images/babyEye' + i + '.png'
        this.babyEye[i] = pic;
    }
    for (var i = 0; i < 20; i++) {
        var pic = new Image();
        pic.src = './images/babyFade' + i + '.png'
        this.babyBody[i] = pic;
    }
}

babyObj.prototype.draw = function() {

    this.x = lerpDistance(mom.x, this.x, 0.99);
    this.y = lerpDistance(mom.y, this.y, 0.99);



    //delta angle
    //Math.atan2(y,x)
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;

    //lerp angle
    this.angle = lerpAngle(beta, this.angle, 0.8);

    //baby tail count
    this.babyTailTimer += deltaTime;
    if (this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 6;
        this.babyTailTimer %= 50;
    }

    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval){
    	this.babyEyeCount = (this.babyEyeCount + 1) % 2;
    	this.babyEyeTimer %= this.babyEyeInterval;

    	if(this.babyEyeCount == 0){
    		this.babyEyeInterval = Math.random() * 1500 + 1000;
    	}else{
    		this.babyEyeInterval = Math.random() * 100 + 150;
    	}
    }

    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer > 200){
    	this.babyBodyCount++;
    	this.babyBodyTimer %= 200;
    	if(this.babyBodyCount > 19){
    		this.babyBodyCount = 19;
    		// game over
    	}
    }


    ctx1.save();

    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);

    var babyTail = this.babyTail[this.babyTailCount];
    ctx1.drawImage(babyTail, -babyTail.width * 0.5 + 24, -babyTail.height * 0.5);

    var babyBody = this.babyBody[this.babyBodyCount];
    ctx1.drawImage(babyBody, -babyBody.width * 0.5, -babyBody.height * 0.5);

    var babyEye = this.babyEye[this.babyEyeCount];
    ctx1.drawImage(babyEye, -babyEye.width * 0.5, -babyEye.height * 0.5);

    ctx1.restore();
}
