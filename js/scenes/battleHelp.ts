class battleHelp extends Phaser.Scene {

    private button:Phaser.GameObjects.Sprite;
    private helpNumber:number = 1;
 
    create() { 

        this.initButtons();
        this.initScene();

    }

    private initScene() {

        this.cameras.main.fadeIn(500, 255, 255, 255);

        this.nextHelp()

    }

    private initButtons() {
        //lets create the helpButton button
        this.button =  this.add.sprite(540, 1200, 'helpNextButton').setInteractive();
        
        this.button.on('pointerdown', this.buttonDown, this);

        this.button.on('pointerout', this.buttonOut, this);

        this.button.on('pointerup', this.nextHelp, this);
    }

    private buttonDown() {
        this.button.setTint(0x15536b);
    }

    private buttonOut() {
        this.button.clearTint();
    }

    private nextHelp() {

    if (this.helpNumber <= 1) {
        var back = this.add.image(0, 0, 'battlehelp_' + this.helpNumber)
        back.setOrigin(0);
        back.alpha = 0;

        var a2 = this.add.tween({
            targets: back,
            props: {
                alpha: { value: 1, duration: 500, ease: 'Phaser.Easing.Out' },
            }
        })

        this.helpNumber++;

        this.button.setDepth(1000);
    }
    else {

        this.cameras.main.fade(500, 255, 255, 255);

        this.time.delayedCall(500, function() {
            this.scene.get('battle').cameras.main.fadeIn(500, 255, 255, 255);
            this.scene.stop();
        }, [], this);
        
        
    }

    }


}
