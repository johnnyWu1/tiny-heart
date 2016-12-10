var dustObj = function () {
	this.x = [];
	this.y = [];
	this.amp = [];
	this.NO = [];

}

dustObj.prototype.dustpic=[];
dustObj.prototype.num = 30;
dustObj.prototype.alpha = 0;

dustObj.prototype.init = function () {

	for (var i = 0; i < 7; i++) {
 		var pic = new Image();
        pic.src = './images/dust' + i + '.png'
        this.dustpic[i] = pic;
  	}
  	for(var i = 0; i< this.num;i++){
  		this.x[i] = Math.random()* canWidth;
        this.y[i] = Math.random() * canHeight;
        this.amp[i] = Math.random() * 25;
        this.NO[i] = Math.floor(Math.random() * 7);
  	}
	
}

dustObj.prototype.draw = function () {
	this.alpha += deltaTime * 0.001;
    var l = Math.sin(this.alpha);

	for(var i = 0; i< this.num;i++){
		var pic = this.dustpic[this.NO[i]];
    	ctx2.drawImage(pic, this.x[i]-pic.width * 0.5 + this.amp[i]* l, this.y[i]-pic.height * 0.5);
	}
	
}