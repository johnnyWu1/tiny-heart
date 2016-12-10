//判断大鱼和果实的距离，
function momFruitsCollision() {
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) {
            var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
            if (l < 900) {
                //fruit eaten
                fruit.dead(i);
                data.fruitNum++;
                if (fruit.fruitType[i] == 'blue') { //blue
                    data.double = 2;
                }
            }
        }
    }
}

// mom baby collision
function momBabyCollision() {
    var l = calLength2(mom.x, mom.y, baby.x, baby.y);
    if (l < 900) {
        baby.babyBodyCount = 0;
        data.reset();
    }
}
