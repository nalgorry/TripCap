class startMenu extends Phaser.Scene {

    private button:Phaser.GameObjects.GameObject;
    private back:Phaser.GameObjects.Sprite;
 
    create() {

        this.back = this.add.sprite(0, 0,'startBack');
        this.back.setOrigin(0);

        //lets create the start button
        this.button =  this.add.sprite(720/2,1100,'startButton').setInteractive();
        
        this.button.on('pointerdown', function (pointer) {

            this.button.setTint(0x15536b);
    
        }, this);

        this.button.on('pointerout', function (pointer) {

            this.button.clearTint();
    
        }, this);

        this.button.on('pointerup', function (pointer) {

            this.changeScene();

        }, this);

        //this.changeScene(); //lo hago aca para saltearme el menu de inicio al dope



    }

    changeScene() {

        this.cameras.main.fade(500, 255, 255, 255);

        this.time.delayedCall(500, function() {
            this.scene.start('sTrip');

        }, [], this);
        

    }


    update() {
               
    }


    render() {

    }
 
}