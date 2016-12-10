var momObj = function() {
    this.x;
    this.y;
    this.angle;
    this.bigEye = [];
    this.momBodyOrange = [];
    this.momBodyBlue = [];
    this.bigTail = [];

    this.momTailTimer = 0;
    this.momTailCount = 0;

    this.momEyeTimer = 0;
    this.momEyeInterval = 2000;
    this.momEyeCount = 0;

    this.momBodyTimer = 0;
    this.momBodyCount = 0;
}

momObj.prototype.init = function() {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;

    for (var i = 0; i < 8; i++) {
 		var pic = new Image();
        pic.src = './images/bigTail' + i + '.png'
        this.bigTail[i] = pic;
  	}

  	for (var i = 0; i < 2; i++) {
 		var pic = new Image();
        pic.src = './images/bigEye' + i + '.png'
        this.bigEye[i] = pic;
  	}

  	for (var i = 0; i < 8; i++) {
 		var opic = new Image();
        opic.src = './images/bigSwim' + i + '.png'
        this.momBodyOrange[i] = opic;
        var bpic = new Image();
        bpic.src = './images/bigSwimBlue' + i + '.png'
        this.momBodyBlue[i] = bpic;
  	}


}

momObj.prototype.draw = function() {

	this.x = lerpDistance(mx,this.x,0.95);
	this.y = lerpDistance(my,this.y,0.95);



	//delta angle
	//Math.atan2(y,x)
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;
	
	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6);

	this.momTailTimer += deltaTime;
	if(this.momTailTimer > 50){
		this.momTailCount = (this.momTailCount+1)%8;
		this.momTailTimer %=50;
	}

	this.momEyeTimer += deltaTime;
	if(this.momEyeTimer> this.momEyeInterval){
		this.momEyeCount = (this.momEyeCount+1) %2;
		this.momEyeTimer %= this.momEyeInterval;

		this.momEyeInterval = (this.momEyeCount===0) ? Math.random() * 1500 + 1000 : Math.random() * 100 + 150;;

	}

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);


    if(data.double==1){
    	var momBody = this.momBodyOrange[this.momBodyCount];
    }else{
    	var momBody = this.momBodyBlue[this.momBodyCount];
    }
    
    ctx1.drawImage(momBody, -momBody.width * 0.5, -momBody.height * 0.5);

    var bigTail = this.bigTail[this.momTailCount];
    ctx1.drawImage(bigTail, -bigTail.width * 0.5+ 30, -bigTail.height * 0.5);

    var momEye = this.bigEye[this.momEyeCount];
    ctx1.drawImage(momEye, -momEye.width * 0.5, -momEye.height * 0.5);

    ctx1.restore();
}
