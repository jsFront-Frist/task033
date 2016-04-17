
window.onload = function() {
    block.prototype.update = function(dir) {
        this.oldPositon = this.newPositon;
        this.currentDegree = dir;
    }
    block.prototype.animate = function(nowPos) {
        var self = this;
        if(self.oldPosition.y<600.5 && self.oldPosition.y>-0.5)
        self.oldPosition.y += (self.newPosition.y - nowPos.y) / 100;
        if(self.oldPosition.x<600.5 && self.oldPosition.x>-0.5)
        self.oldPosition.x += (self.newPosition.x - nowPos.x) / 100;
        self.target.style.top = self.oldPosition.y + "px";
        self.target.style.left = self.oldPosition.x + "px";
        
    }
    block.prototype.changeDir = function(degree) {
        var range = null;

        range = degree + this.currentDegree;
        this.target.style.transform = "rotateZ(" + range + "deg)";
        
        this.update( range);


    }
    block.prototype.getPos = function() {
        return {
            x: this.oldPosition.x,
            y: this.oldPosition.y
        };
    }
    block.prototype.setPos = function(pos) {
        this.newPosition = pos;
    }
    block.prototype.init = function() {
        this.target.style.top = this.oldPosition.x + "px";
        this.target.style.left = this.oldPosition.y + "px";
    }
    function block(target, position, degree, width) {
        var self = this;
        this.width = width;
        this.target = target;
        this.oldPosition = position;
        this.newPosition = null;
        this.currentDegree = degree;
    }
    var direction = {
        "up": 1,
        "right": 2,
        "down": 3,
        "left": 4
    }
    var blo = new block(document.getElementById("block"), {
        x: 120,
        y: 120
    }, 0, 60);
    blo.init();
    document.getElementById("submit").onclick = function() {
        var order = document.getElementById("order").value;
        var left = /TUN\sLEFT/;
        var right = /TUN\sRIGHT/;
        var go = /GO$/;
        var oppo = /TUN\sBAC/;
        var pos = blo.getPos();
        if (left.test(order)) {
            blo.changeDir(-90);
        } else if (right.test(order)) {
            blo.changeDir(90);
        } else if (oppo.test(order)) {
            blo.changeDir(180);
        } else if (go.test(order)) {
            if(Math.abs(blo.currentDegree+360)%360 === 0) {
                pos.y -= blo.width;
                blo.setPos(pos);
            } else if(Math.abs(blo.currentDegree+360)%360 === 90) {
                 pos.x += blo.width;
                blo.setPos(pos);
            }else if(Math.abs(blo.currentDegree+360)%360 === 180) {
                 pos.y += blo.width;
                blo.setPos(pos);
            }else if(Math.abs(blo.currentDegree+360)%360 === 270) {
                 pos.x -= blo.width;
                blo.setPos(pos);
            }
            blo.update(blo.currentDegree);
              timer = setInterval(function() {
            blo.animate(blo.oldPosition);
        }, 10);
            
        }
      
    }
}
