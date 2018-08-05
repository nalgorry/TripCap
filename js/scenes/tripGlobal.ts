class tripGlobal extends Phaser.Scene {

    private back:Phaser.GameObjects.Image;
    public boat:cBoat;

 
    create(boat:cBoat) {

        console.log(boat);

        this.boat = boat;

        this.initScene();

        //to skip it 
        this.input.on('pointerdown', this.hurryUp, this)

    }

    private hurryUp() {
        
        this.cameras.main.fadeOut(100, 255, 255, 255);

        this.time.delayedCall(100, function() {

            this.scene.start('sTrip', this.boat);

        }, [], this);

    }

    private initScene() {

        //lest add the back
        this.back = this.add.image(0, 0, 'backTripGlobal');
        this.back.setOrigin(0);

        var line = this.add.image(0, 0, 'lineGlobal', this.boat.tripData.id - 1);
        line.setOrigin(0);

        this.cameras.main.fadeIn(1500, 255, 255, 255);

        this.time.delayedCall(4500, function() {

            this.cameras.main.fadeOut(1500, 255, 255, 255);

        }, [], this);

        this.time.delayedCall(6000, function() {

            this.scene.start('sTrip', this.boat);

        }, [], this);

        this.initArrows(this.boat.tripData.id);

        //init the title 
        var title = this.add.bitmapText(360, 80, 'Pfont', "Viaje " + this.boat.tripData.id, 90);
        title.setOrigin(0.5);

        //init the tip
        var fontData = this.scene.scene.cache.bitmapFont.entries.entries["FreeFont"].data; 
        var textTip = "Tip: " + this.boat.tripData.tripTip;
        var wrapText = textWrapper.wrapText(fontData, 60 / 90 , textTip, 650);
  
        var text =  this.add.bitmapText(360, 1050,'FreeFont', wrapText, 60)
        text.setOrigin(0.5);

      
    }

    private initArrows(tripNumber:number) {

        var arrow1 = this.add.sprite(this.boat.tripData.arrow1.x,
            this.boat.tripData.arrow1.y , 
            'tripGlobalArrow');

        this.tweens.add({
            targets: arrow1,
            y: arrow1.y - 15,
            duration: 600,
            ease: 'Power2',
            yoyo: true,
            repeat: 200
        });

        var arrow2 = this.add.sprite(this.boat.tripData.arrow2.x, 
            this.boat.tripData.arrow2.y, 
            'tripGlobalArrow');

        this.tweens.add({
            targets: arrow2,
            y: arrow2.y - 20,
            duration: 600,
            ease: 'Power2',
            yoyo: true,
            repeat: 200
        });

    }




}