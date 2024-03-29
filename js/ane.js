var aneObj = function() {
    this.x = [];
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    this.amp = [];
}

aneObj.prototype.num = 50;
aneObj.prototype.alpha = 0;
aneObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.headx[i] = this.rootx[i] = i * 16 + Math.random() * 20;
        this.heady[i] = canHeight - 250 + Math.random() * 50;
        this.amp[i] = Math.random()*50 + 70;
    }
};

aneObj.prototype.draw = function() {
    this.alpha += deltaTime * 0.001;
    var l = Math.sin(this.alpha);
    ctx2.save();
    ctx2.lineWidth = 20;
    ctx2.strokeStyle = '#3b154e';
    ctx2.lineCap = 'round';
    ctx2.globalAlpha = 0.6;
    for (var i = 0; i < this.num; i++) {
        //beginPath, moveTO , lineTo,stroke,strokeStyle,
        // this.headx( );
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i], canHeight);
        this.headx[i] = this.rootx[i]+l*this.amp[i]
        ctx2.quadraticCurveTo(this.rootx[i], canHeight - 150, this.headx[i]  , this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();
};
