var waveObj = function () {
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
}

waveObj.prototype.num = 10;

waveObj.prototype.init = function () {
	for(var i=0; i< this.num;i++){
		this.alive[i] = 0;
		this.x[i] = 0;
		this.y[i] = 0;
		this.r[i] = 0;
	}
}

waveObj.prototype.draw = function () {
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = 'white';
	for(var i=0; i< this.num;i++){
		if(!this.alive[i]) continue;
		if(this.alive[i]===1){
			if(this.r[i]>50){
				this.alive[i] = 0;
				continue;
			}
			this.r[i] += deltaTime * 0.04;
			var alpha = 1 - this.r[i] / 50;
			ctx1.beginPath();
			ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
			ctx1.closePath();
			ctx1.strokeStyle = 'rgba(255, 255, 255,'+ alpha + ')';
			ctx1.stroke();
		}else if(this.alive[i]===2){
			if(this.r[i]>80){
				this.alive[i] = 0;
				continue;
			}
			this.r[i] += deltaTime * 0.05;
			var alpha = 1 - this.r[i] / 80;
			ctx1.beginPath();
			ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
			ctx1.closePath();
			ctx1.strokeStyle = randomColor()+ alpha + ')';
			ctx1.stroke();
		}
		
	}
	ctx1.restore();
}

waveObj.prototype.born = function (x,y,type) {
	for(var i=0; i< this.num;i++){
		if(!this.alive[i]){
			if(type === 0){
				this.alive[i] = 1;
				this.r[i] = 20;
			}else if(type===1) {
				this.alive[i] = 2;	
				this.r[i] = 10;	
			}
			
			this.x[i] = x;
			this.y[i] = y;
			return;	
		}
	}
}