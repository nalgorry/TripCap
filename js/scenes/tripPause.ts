class tripPause extends Phaser.Scene {

    private back:Phaser.GameObjects.Image;
    private crewControls:crewControls;
    private trip:cTrip;

    create (trip:cTrip) {
        
        this.initScene();

        this.trip = trip;

        this.crewControls = new crewControls(this.trip, this);

        this.scene.get('sTrip').events.on('updateCrew', this.updateCrewText, this);    
        
    }

    private initScene() {

        //lets add the back of the game 
        this.back = this.add.sprite(0, 0,'tripPauseBack');
        this.back.setOrigin(0);

        //this.cameras.main.fadeIn(500, 255, 255, 255);

        //create the play button
        var button = this.add.sprite(360, 860, 'tripPlayButton' );
        button.setInteractive();
        button.on('pointerdown', this.startPress , this);

    }

    private updateCrewText () {
        this.crewControls.updateCrewText();
    }

    private startPress() {      

        this.scene.get('sTrip').events.removeListener('updateCrew', this.updateCrewText, this, true);
        this.events.removeAllListeners('clickUp');
        
        //restart the trip
        this.scene.resume('sTrip');
        this.scene.get('sTrip').cameras.main.fadeIn(500, 255, 255, 255);
        this.scene.stop(this.scene.key);
        
    }


}

