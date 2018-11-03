class gameEnd extends Phaser.Scene{

    private button:Phaser.GameObjects.Sprite;

    create(boat:cBoat) {

        this.init();
    }

    private init() {

        var back = this.add.image(0, 0, 'backGameEnd')
        back.setOrigin(0);

        this.initScene()

    }

    private initScene() {
        
        //lets create the  button to restart the game
        this.button =  this.add.sprite(540, 1200, 'helpNextButton').setInteractive();
        
        this.button.on('pointerdown', this.buttonDown, this);

        this.button.on('pointerout', this.buttonOut, this);

        this.button.on('pointerup', this.restartGame, this);

    }

    private buttonDown() {
        this.button.setTint(0x15536b);
    }

    private buttonOut() {
        this.button.clearTint();
    }

    private restartGame() {
        this.scene.start('startMenu');
    }


}