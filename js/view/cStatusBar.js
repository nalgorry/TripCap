var cStatusBar = (function () {
    function cStatusBar(scene, x, y, showValues) {
        if (showValues === void 0) { showValues = false; }
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.showValues = showValues;
        this.redColor = 0xb1160d;
        this.yellowColor = 0xc3b500;
        this.greenColor = 0x1ab500;
        this.redPorc = 0.25;
        this.yellowPorc = 0.5;
        this.porcValue = 0.8; //the actual value of the bar
        //lets create the bar
        this.bar = this.scene.add.graphics();
        this.bar.fillStyle(this.greenColor);
        this.bar.fillRect(x, y, 68, 91);
        this.bar.fillPath();
        //lets create the bar arrows
        this.barLeft = this.scene.add.sprite(x - 20, y, 'barArrow');
        this.barLeft.setOrigin(0, 0.5);
        this.barRight = this.scene.add.sprite(x + 84, y, 'barArrow');
        this.barRight.setOrigin(0.5);
        this.barRight.setAngle(180);
        //lets create the text to show value if needed
        if (this.showValues == true) {
            this.valueText = this.scene.add.bitmapText(x + 68 / 2, y - 18, 'PfontRed', "80/100", 28);
            this.valueText.setOrigin(0.5);
        }
        //lets update to the initial position
        this.updateBar(80, 100);
    }
    cStatusBar.prototype.updateBar = function (actualValue, maxValue) {
        var porValue = actualValue / maxValue;
        if (porValue < 0) {
            porValue = 0;
        }
        //lets check the result color of the bar.
        var color;
        if (porValue <= this.redPorc) {
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
            if (porValue <= this.yellowPorc) {
                color = this.yellowColor;
            }
            else {
                color = this.greenColor;
            }
        }
        //update the bar
        this.bar.clear();
        this.bar.fillStyle(color);
        this.bar.fillRect(this.x, this.y + 91 * (1 - porValue), 68, 91 * porValue);
        //move the max indicator
        this.barLeft.y = this.y + 91 * (1 - porValue);
        this.barRight.y = this.y + 91 * (1 - porValue);
        //rotate the arrows 
        if (porValue > this.porcValue) {
            //this.barLeft.setAngle(-90);
            this.barRight.setAngle(-90);
        }
        else if (porValue < this.porcValue) {
            //this.barLeft.setAngle(90);
            this.barRight.setAngle(90);
        }
        else {
            //this.barLeft.setAngle(0);
            this.barRight.setAngle(180);
        }
        this.porcValue = porValue;
        if (this.showValues == true) {
            this.valueText.text = Math.round(actualValue).toString() + "/" + maxValue.toString();
        }
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
