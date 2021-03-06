class sTrip extends Phaser.Scene {

    public boat:cBoat;
    public trip:cTrip;

    private back:Phaser.GameObjects.Sprite;

    public textWindSpeed:Phaser.GameObjects.BitmapText;
    public textBoatSpeed:Phaser.GameObjects.BitmapText;
    public statusBars:cStatusBar[] = new Array();

    public ceroBarAlerts:cCeroBarAlert[] = new Array();
    public countCeroBarAlerts:number = 0;

    public textFps:Phaser.GameObjects.BitmapText;

    private interval:number = 5;
    private t:number = 0;

    private eventControler:cEventsControler; //TODO esto no va aca... se inicia todas las veces al pedo

    private crewControl:crewControls;

    private map:vMap;

    create(boat:cBoat) {

        this.boat = boat;
        this.trip = new cTrip(this.boat, this); //i send the scene to be able to generate events

        this.initScene();
        
        // init the bars
        this.statusBars[enumStatus.maintenance] = new cStatusBar(this, 149, 899, false, 48 , 136);
        this.statusBars[enumStatus.food] = new cStatusBar(this, 149 + 216 + 156, 899 + 191, false, 48 , 136, 85);
        this.statusBars[enumStatus.clean] = new cStatusBar(this, 149, 899 + 191, false, 48 , 136);
        this.statusBars[enumStatus.leadership] = new cStatusBar(this, 149 + 216 + 156, 899, false, 48 , 136, 85);
        
        //init the comon controls
        this.crewControl = new crewControls(this.trip, this);

        //remove all the posible old events
        this.events.removeAllListeners('tripEnd');
        this.events.removeAllListeners('eventStart');
        this.events.removeAllListeners('updateTrip');
        this.events.removeAllListeners('updateCrew');
        this.events.removeAllListeners('gameEnd');
        this.events.removeAllListeners('barInCero');
        this.events.removeAllListeners('barRecoverFromCero');

        //init all the event to conect with the controler of the trip
        this.events.on('tripEnd', this.tripEnd, this);
        this.events.on('eventStart', this.startEvent, this);
        this.events.on('battleStart', this.startBattle, this);
        this.events.on('updateTrip', this.updateTripText, this);
        this.events.on('updateCrew', this.crewControl.updateCrewText, this.crewControl);
        this.events.on('gameEnd', this.gameEnd, this);
        this.events.on('barInCero', this.barInCero, this);
        this.events.on('barRecoverFromCero', this.barRecoverFromCero, this);

        this.createWindAndSpeedButtons();

        //lets init the event controler to control the evets.
        var eventData = this.cache.json.get('eventData');
        var eventOptions = this.cache.json.get('eventOption');
        var eventResult = this.cache.json.get('eventResult');
        var eventEffect = this.cache.json.get('eventEffect');    

        this.eventControler = new cEventsControler(eventData, eventOptions, eventResult, eventEffect);

        //lets add the pause button (super great!)
        var button = this.add.sprite(360, 650, 'tripPauseButton' );
        button.setInteractive();
        button.on('pointerdown', this.pauseTrip , this);
        
        //lets pause the trip
        this.pauseTrip();

        //to test the end of the trip
        //this.tripEnd(); 

        //to test battles

        // this.time.delayedCall(500, function() {
        //     this.scene.start('battle', this.trip);
        // }, [], this);

        //to shop fps
        this.textFps = this.add.bitmapText(10, 10, 'Pfont', this.trip.healtyCrew.toString(), 25);
        this.textFps.setOrigin(0);

        //lets show the button to show the ship starts
        var a = this.add.sprite(85, 130, 'showShipStatsButton');
        a.setInteractive();
        a.on('pointerdown', this.showShipStats, this);

        //lets add the boat, so great :P
        //this.mainTripShip = this.add.sprite(360, 280, 'tripShip');

        //lets add the new map
        this.map = new vMap(this, []);



    }


    private barInCero(data:{status:enumStatus, value:number, maxValue:number, numAlerts:number}) {

        if (this.ceroBarAlerts["a" + data.status] == undefined) {
            
            var a = new cCeroBarAlert(this, data);
            this.ceroBarAlerts["a" + data.status] = a;

        } else {
            this.ceroBarAlerts["a" + data.status].refresh(data);
        }

    }

    private barRecoverFromCero(status:enumStatus) {
        this.ceroBarAlerts["a" + status].hide(status);
        this.ceroBarAlerts["a" + status] = undefined;
    }

    private gameEnd() {
        this.cameras.main.fadeOut(500, 255, 255, 255);

        //we only need to lister to the end game once to stop the game
        this.events.removeAllListeners('gameEnd');
        
        // start the tripEnd scene
        this.time.delayedCall(500, function() {
            this.scene.start('gameEnd', this.trip);
        }, [], this);
    }

    private showShipStats() {

            this.scene.pause();

            var data = {
                trip:this.trip,
                boat:this.boat,
                currentScene:this.scene,
            }

            this.scene.launch('shipStats', data);
    
    }

    private updateTripText() {

        //wind and ship speed
        this.textBoatSpeed.text = Phaser.Math.RoundTo(this.trip.boatSpeed, 0).toString();
        this.textWindSpeed.text = Phaser.Math.RoundTo(this.trip.windSpeed, 0).toString();

        this.statusBars[enumStatus.food].updateBar(this.trip.currentStatus[enumStatus.food], this.boat.foodSystem);
        this.statusBars[enumStatus.clean].updateBar(this.trip.currentStatus[enumStatus.clean], this.boat.cleanSystem);
        this.statusBars[enumStatus.maintenance].updateBar(this.trip.currentStatus[enumStatus.maintenance], this.boat.mantSystem);
        this.statusBars[enumStatus.leadership].updateBar(this.trip.currentStatus[enumStatus.leadership], this.boat.leaderSystem);

        //lets update the position of the ship
        this.map.updateBoat(this.trip.tripDistancePorc);

    }

    private tripEnd() {

        this.cameras.main.fadeOut(500, 255, 255, 255);
        
        // start the tripEnd scene
        this.time.delayedCall(500, function() {
            this.scene.start('tripEnd', this.trip);
        }, [], this);

    }

    private initScene() {

        //lets add the back of the game 
        this.back = this.add.sprite(0, 0,'tripBack');
        this.back.setOrigin(0);

    }

    private createWindAndSpeedButtons() {
        
        //speed and wind
        this.textBoatSpeed = this.add.bitmapText(601, 702 - 10, 'Pfont', Phaser.Math.RoundTo(this.trip.boatSpeed,1).toString(), 60);
        this.textBoatSpeed.setOrigin(0.5);

        this.textWindSpeed = this.add.bitmapText(601, 765 - 10, 'Pfont', Phaser.Math.RoundTo(this.trip.windSpeed,1).toString(), 60);
        this.textWindSpeed.setOrigin(0.5);

    }

    private pauseTrip() {
        //i must do it with a timer if not the scene will not pause
                
        this.time.delayedCall(100, function() {
            
            this.scene.pause();
            this.scene.launch('tripPause', this.trip);


            this.firstPause = false;
        }, [], this);
    }

    private startEvent(eventNumber:number) {

        // shake the camera
        this.cameras.main.shake(500, 0.001);

        this.time.delayedCall(600, function() {
            this.cameras.main.fade(400, 255, 255, 255);
        }, [], this);

        // start the event scene
        this.time.delayedCall(1100, function() {
            
            this.scene.pause();

            var event = this.eventControler.getEvent(eventNumber);
            var trip = this.trip;

            var data = {event:event, trip:trip}

            this.scene.launch('tripEvent', data);

        }, [], this);


    }

    private startBattle() {

        // shake the camera
        this.cameras.main.shake(500, 0.001);

        this.time.delayedCall(600, function() {
            this.cameras.main.fade(400, 255, 255, 255);
        }, [], this);

        // start the event scene
        this.time.delayedCall(1100, function() {
            
            this.scene.pause();
            this.scene.launch('battle', this.trip);

        }, [], this);

    }


    update() {

        //there is no need to update everything all the time
        if (this.t == this.interval) {
            //lets make the magic of the game happen
            this.trip.updateTrip();

            this.t = 0;
        } else {
            this.t++;
        }

        this.textFps.setText("fps" + this.sys.game.loop.actualFps.toString());
        
    }




}