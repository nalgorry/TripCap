var cStatusBar = (function () {
    function cStatusBar(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.redColor = 0xb1160d;
        this.yellowColor = 0xc3b500;
        this.greenColor = 0x1ab500;
        this.redPorc = 0.25;
        this.yellowPorc = 0.5;
        this.value = 0.8; //the actual value of the bar
        //lets create the bar
        this.bar = this.scene.add.graphics();
        this.bar.fillStyle(this.greenColor);
        this.bar.fillRect(x, y, 68, 91);
        this.bar.fillPath();
        //lets create the bar arrows
        this.barLeft = this.scene.add.sprite(x - 20, y, 'barArrow');
        this.barLeft.setOrigin(0, 0.5);
        this.barRight = this.scene.add.sprite(x + 84, y, 'barArrow');
        this.barRight.setOrigin(0.5, 0.5);
        this.barRight.setAngle(180);
        //lets update to the initial position
        this.updateBar(this.value);
    }
    cStatusBar.prototype.updateBar = function (newValue) {
        if (newValue < 0) {
            newValue = 0;
        }
        //lets check the result color of the bar.
        var color;
        if (newValue <= this.redPorc) {
            color = this.redColor;
            //lets also activate the red indicator
            if (this.alertTimer == undefined) {
                this.alertTimer = this.scene.time.addEvent({
                    delay: 500,
                    callback: this.redAlert,
                    callbackScope: this,
                    loop: true,
                });
            }
        }
        else {
            //lets reset the alert red warnings
            if (this.alertTimer != undefined) {
                this.alertTimer.destroy();
                this.barLeft.alpha = 1;
                this.barRight.alpha = 1;
            }
            if (newValue <= this.yellowPorc) {
                color = this.yellowColor;
            }
            else {
                color = this.greenColor;
            }
        }
        //update the bar
        this.bar.clear();
        this.bar.fillStyle(color);
        this.bar.fillRect(this.x, this.y + 91 * (1 - newValue), 68, 91 * newValue);
        //move the max indicator
        this.barLeft.y = this.y + 91 * (1 - newValue);
        this.barRight.y = this.y + 91 * (1 - newValue);
        //rotate the arrows 
        console.log(this.value);
        console.log(newValue);
        if (newValue > this.value) {
            this.barLeft.setAngle(-90);
            this.barRight.setAngle(-90);
        }
        else if (newValue < this.value) {
            this.barLeft.setAngle(90);
            this.barRight.setAngle(90);
        }
        else {
            this.barLeft.setAngle(0);
            this.barRight.setAngle(180);
        }
        this.value = newValue;
    };
    cStatusBar.prototype.redAlert = function () {
        if (this.barLeft.alpha == 1) {
            this.barLeft.alpha = 0;
            this.barRight.alpha = 0;
        }
        else {
            this.barLeft.alpha = 1;
            this.barRight.alpha = 1;
        }
    };
    return cStatusBar;
}());
