class tripEnd extends Phaser.Scene {

    private back:Phaser.GameObjects.Image;
    private button: Phaser.GameObjects.Image;

    create(data:any) {
        this.initScene()
    }

    update() {
    }

    private initScene() {

        //lets apear slowly
        this.cameras.main.fadeIn(500, 255, 255, 255);

        //lets add the back of the game 
        this.back = this.add.image(0, 0,'backTripEnd');
        this.back.setOrigin(0);
           //lets add the button
        //lets create the start button
        this.button =  this.add.sprite(360,1090,'cityButton')
        this.button.setInteractive();

        this.button.on('pointerup', this.goToCity, this);

        this.button.on('pointerdown', this.finishClick, this);

        
    }

    private goToCity() {

        this.cameras.main.fadeOut(500, 255, 255, 255);
        
        // start the tripEnd scene
        this.time.delayedCall(500, function() {
            this.scene.start('city');
        }, [], this);

        this.button.setTint(0xffffff);
        
    }

    private finishClick() {
        this.button.setTint(0x15536b);
    }


}