class city extends Phaser.Scene {

    private back:Phaser.GameObjects.Image;
    private button: Phaser.GameObjects.Image;
    private boat:cBoat;

    create(boat:cBoat) {
        this.initScene();

        this.boat = boat;
    }

    update() {
    }

    private initScene() {

        //lets apear slowly
        this.cameras.main.fadeIn(500, 255, 255, 255);

        //lets add the back of the game 
        this.back = this.add.image(0, 0,'backCity');
        this.back.setOrigin(0);
           
        //lets add the next trip button
        this.button =  this.add.sprite(360,1090,'nextTripButton')
        this.button.setInteractive();

        this.button.on('pointerup', this.goToTrip, this);

        this.button.on('pointerdown', this.finishClick, this);

        
    }

    private goToTrip() {

        this.cameras.main.fadeOut(500, 255, 255, 255);
        
        // start the tripEnd scene
        this.time.delayedCall(500, function() {
            this.scene.stop('sTrip');
            this.scene.start('sTrip');
        }, [], this);

        this.button.setTint(0xffffff);
        

        this.button.setTint(0xffffff);
        
    }

    private finishClick() {
        this.button.setTint(0x15536b);
    }


}