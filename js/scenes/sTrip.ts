
class sTrip extends Phaser.Scene {

    private boat:cBoat;
    private trip:cTrip;

    private back:Phaser.GameObjects.Sprite;
    private barTest:cStatusBar;

    private distShip:Phaser.GameObjects.Sprite;
    private distShipStartx:number = 44;
    private distShipEndx:number = 640;

    private textHealtyCrew:Phaser.GameObjects.BitmapText;
    private textSickCrew:Phaser.GameObjects.BitmapText;
    private crewButtons:tripButton[] = new Array();
    private textWindSpeed:Phaser.GameObjects.BitmapText;
    private textBoatSpeed:Phaser.GameObjects.BitmapText

    private statusBars:cStatusBar[] = new Array();

    private interval:number = 5;
    private t:number = 0;

    private eventControler:cEventsControler;

    create() {

        //lets check the boat and trip variables
        this.boat = new cBoat();
        this.trip = new cTrip(this.boat, this); //i send the scene to be able to generate events

        //lets add the events we need to conect the view to the controler
        this.events.on('updateCrew', this.updateCrewText, this);
        this.events.on('updateTrip', this.updateTripText, this);
        this.events.on('tripEnd', this.tripEnd, this);
        this.events.on('eventStart', this.startEvent, this);

        this.initScene();

        this.createButtons();

        this.statusBars[enumStatus.food] = new cStatusBar(this, 60, 62);
        this.statusBars[enumStatus.maintenance] = new cStatusBar(this, 236, 62);
        this.statusBars[enumStatus.clean] = new cStatusBar(this, 412, 62);
        this.statusBars[enumStatus.leadership] = new cStatusBar(this, 588, 62);

        //lets add the trip boat
        this.distShip = this.add.sprite(this.distShipStartx, 796, 'distanceShip');

        //lets init the event controler to control the evets.
        var eventData = this.cache.json.get('eventData');
        var eventOptions = this.cache.json.get('eventOption');
        var eventResult = this.cache.json.get('eventResult');
        var eventEffect = this.cache.json.get('eventEffect');    

        this.eventControler = new cEventsControler(eventData, eventOptions, eventResult, eventEffect);

    }

    private tripEnd() {

        this.cameras.main.fadeOut(500, 255, 255, 255);
        
        // start the tripEnd scene
        this.time.delayedCall(500, function() {
            this.scene.start('tripEnd');
        }, [], this);

    }

    private updateTripText() {

        //wind and ship speed
        this.textBoatSpeed.text = Phaser.Math.RoundTo(this.trip.boatSpeed, 0).toString();
        this.textWindSpeed.text = Phaser.Math.RoundTo(this.trip.windSpeed, 0).toString();

        this.statusBars[enumStatus.food].updateBar(this.trip.barPorc[enumStatus.food]);
        this.statusBars[enumStatus.clean].updateBar(this.trip.barPorc[enumStatus.clean]);
        this.statusBars[enumStatus.maintenance].updateBar(this.trip.barPorc[enumStatus.maintenance]);
        this.statusBars[enumStatus.leadership].updateBar(this.trip.barPorc[enumStatus.leadership]);

        //lets update the position of the ship
        this.distShip.x = (this.distShipEndx - this.distShipStartx) * this.trip.tripDistancePorc + this.distShipStartx;

    }

    private initScene() {

        //lets add the back of the game 
        this.back = this.add.sprite(0, 0,'tripBack');
        this.back.setOrigin(0);

        this.cameras.main.fadeIn(500, 255, 255, 255);

    }

    private createButtons() {

        //lets show the avaible crew
        this.textHealtyCrew = this.add.bitmapText(120, 822, 'Pfont', this.trip.healtyCrew.toString(), 60);
        this.textHealtyCrew.setOrigin(0);

        this.textSickCrew = this.add.bitmapText(640, 822, 'Pfont', this.trip.sickCrew.toString(), 60);
        this.textSickCrew.setOrigin(0);

        //speed and wind
        this.textBoatSpeed = this.add.bitmapText(125, 715, 'Pfont', Phaser.Math.RoundTo(this.trip.boatSpeed,1).toString(), 60);
        this.textBoatSpeed.setOrigin(0.5);

        this.textWindSpeed = this.add.bitmapText(515, 715, 'Pfont', Phaser.Math.RoundTo(this.trip.windSpeed,1).toString(), 60);
        this.textWindSpeed.setOrigin(0.5);


        //lets create all the options for the crew
        this.crewButtons[enumTask.sails] = new tripButton(this, 5, 896, enumTask.sails);
        this.crewButtons[enumTask.rows] = new tripButton(this, 244, 896, enumTask.rows);
        this.crewButtons[enumTask.leadership] = new tripButton(this, 481, 896, enumTask.leadership);
        this.crewButtons[enumTask.maintenance] = new tripButton(this, 5, 1073, enumTask.maintenance);
        this.crewButtons[enumTask.clean] = new tripButton(this, 244, 1073, enumTask.clean);
        this.crewButtons[enumTask.fish] = new tripButton(this, 481, 1073, enumTask.fish);

        //lets check if they click a button
        this.events.on('clickUp',this.buttonClick, this);

    }

    private buttonClick(task:enumTask, upDown:enumUpDown) {

        //update the logic of the game
        this.trip.updateCrew(task, upDown);

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

        //lets mark the event in the traker
        var circle = this.add.graphics();
   
        circle.fillStyle(0xb1160d, 1);
        circle.fillCircle(this.distShip.x, this.distShip.y, 5);
        circle.fillPath();

    }

    private updateCrewText() {

        this.textHealtyCrew.text = this.trip.healtyCrew.toString();
        this.textSickCrew.text = this.trip.sickCrew.toString();

        //check if there is still avaible crew
        var hideUpArrow:boolean = false;
        if (this.trip.healtyCrew == 0) hideUpArrow = true;

        //lets update all the used crew
        for (var i=0; i<6; i++) {
            this.crewButtons[i].updateText(this.trip.usedCrew[i]);
            this.crewButtons[i].hideUpArrow(hideUpArrow);
        }

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
        
    }




}