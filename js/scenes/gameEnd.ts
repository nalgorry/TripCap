class gameEnd extends Phaser.Scene{

    create(boat:cBoat) {

        this.init();
    }

    private init() {

        var back = this.add.image(0, 0, 'backGameEnd')
        back.setOrigin(0);

    }


}