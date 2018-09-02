class cStatusBar {

    private bar:Phaser.GameObjects.Graphics;
    private barLeft:Phaser.GameObjects.Sprite;
    private barRight:Phaser.GameObjects.Sprite;

    private redColor:number = 0xb1160d;
    private yellowColor:number = 0xc3b500;
    private greenColor:number = 0x1ab500;

    private redPorc:number = 0.25;
    private yellowPorc:number = 0.5;

    private alertTimer:Phaser.Time.TimerEvent;

    private  valueText:Phaser.GameObjects.BitmapText;


    public porcValue:number = 0.8; //the actual value of the bar

    constructor(public scene:Phaser.Scene,
        public x:number, 
        public y:number,
        public showValues:boolean = false) {

        //lets create the bar
        this.bar = this.scene.add.graphics();

        this.bar.fillStyle(this.greenColor);
        this.bar.fillRect(x , y, 68, 91);
        this.bar.fillPath();

        //lets create the bar arrows
        this.barLeft = this.scene.add.sprite(x - 20, y, 'barArrow');
        this.barLeft.setOrigin(0, 0.5);

        this.barRight = this.scene.add.sprite(x + 84 , y, 'barArrow');
        this.barRight.setOrigin(0.5);
        this.barRight.setAngle(180);

        //lets create the text to show value if needed
        if (this.showValues == true) {
            this.valueText = this.scene.add.bitmapText(x + 68/2, y - 18, 'PfontRed', "80/100" , 28);
            this.valueText.setOrigin(0.5);
        }

        //lets update to the initial position
        this.updateBar(80, 100);

    }

    public updateBar(actualValue:number, maxValue:number) {

        var porValue:number = actualValue / maxValue;

        if (porValue < 0) {porValue = 0}

        //lets check the result color of the bar.
        var color:number 

        if (porValue <= this.redPorc) {
            color = this.redColor;
            //lets also activate the red indicator
            if (this.alertTimer == undefined) {
                this.alertTimer = this.scene.time.addEvent({
                    delay: 500,
                    callback: this.redAlert,
                    callbackScope: this,
                    loop: true,
                })
            }
        } else {
         
            //lets reset the alert red warnings
            if (this.alertTimer != undefined) {
                this.alertTimer.destroy();
                this.barLeft.alpha = 1;
                this.barRight.alpha = 1;
            }
    
            if (porValue <= this.yellowPorc) {
                color = this.yellowColor;
            } else {
                color = this.greenColor;    
            }
        }
        
        //update the bar
        this.bar.clear();
        this.bar.fillStyle(color);
        this.bar.fillRect(this.x , this.y + 91 * (1- porValue), 68, 91 * porValue);

        //move the max indicator
        this.barLeft.y = this.y + 91 * (1- porValue);
        this.barRight.y = this.y + 91 * (1- porValue);

        //rotate the arrows 
        if(porValue > this.porcValue) {
            //this.barLeft.setAngle(-90);
            this.barRight.setAngle(-90);
        } else if (porValue < this.porcValue) {
            //this.barLeft.setAngle(90);
            this.barRight.setAngle(90);
        } else {
            //this.barLeft.setAngle(0);
            this.barRight.setAngle(180);
        }

        this.porcValue = porValue;

        if (this.showValues == true) {
            this.valueText.text = Math.round(actualValue).toString() + "/" + maxValue.toString();
        }

    }

    private redAlert() {
        if (this.barLeft.alpha == 1) {
            this.barLeft.alpha = 0;
            this.barRight.alpha = 0;
        } else {
            this.barLeft.alpha = 1;
            this.barRight.alpha = 1;
        }
    }





}
