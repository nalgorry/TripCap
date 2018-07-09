var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sTrip = (function (_super) {
    __extends(sTrip, _super);
    function sTrip() {
        _super.apply(this, arguments);
        this.distShipStartx = 44;
        this.distShipEndx = 640;
        this.crewButtons = new Array();
        this.statusBars = new Array();
        this.interval = 5;
        this.t = 0;
    }
    sTrip.prototype.create = function () {
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
        this.statusBars[0 /* food */] = new cStatusBar(this, 60, 62);
        this.statusBars[1 /* maintenance */] = new cStatusBar(this, 236, 62);
        this.statusBars[2 /* clean */] = new cStatusBar(this, 412, 62);
        this.statusBars[3 /* leadership */] = new cStatusBar(this, 588, 62);
        //lets add the trip boat
        this.distShip = this.add.sprite(this.distShipStartx, 796, 'distanceShip');
        //lets init the event controler to control the evets.
        var eventData = this.cache.json.get('eventData');
        var eventOptions = this.cache.json.get('eventOption');
        var eventResult = this.cache.json.get('eventResult');
        var eventEffect = this.cache.json.get('eventEffect');
        this.eventControler = new cEventsControler(eventData, eventOptions, eventResult, eventEffect);
    };
    sTrip.prototype.tripEnd = function () {
        this.cameras.main.fadeOut(500, 255, 255, 255);
        // start the tripEnd scene
        this.time.delayedCall(500, function () {
            this.scene.start('tripEnd');
        }, [], this);
    };
    sTrip.prototype.updateTripText = function () {
        //wind and ship speed
        this.textBoatSpeed.text = Phaser.Math.RoundTo(this.trip.boatSpeed, 0).toString();
        this.textWindSpeed.text = Phaser.Math.RoundTo(this.trip.windSpeed, 0).toString();
        this.statusBars[0 /* food */].updateBar(this.trip.barPorc[0 /* food */]);
        this.statusBars[2 /* clean */].updateBar(this.trip.barPorc[2 /* clean */]);
        this.statusBars[1 /* maintenance */].updateBar(this.trip.barPorc[1 /* maintenance */]);
        this.statusBars[3 /* leadership */].updateBar(this.trip.barPorc[3 /* leadership */]);
        //lets update the position of the ship
        this.distShip.x = (this.distShipEndx - this.distShipStartx) * this.trip.tripDistancePorc + this.distShipStartx;
    };
    sTrip.prototype.initScene = function () {
        //lets add the back of the game 
        this.back = this.add.sprite(0, 0, 'tripBack');
        this.back.setOrigin(0);
        this.cameras.main.fadeIn(500, 255, 255, 255);
    };
    sTrip.prototype.createButtons = function () {
        //lets show the avaible crew
        this.textHealtyCrew = this.add.bitmapText(120, 822, 'Pfont', this.trip.healtyCrew.toString(), 60);
        this.textHealtyCrew.setOrigin(0);
        this.textSickCrew = this.add.bitmapText(640, 822, 'Pfont', this.trip.sickCrew.toString(), 60);
        this.textSickCrew.setOrigin(0);
        //speed and wind
        this.textBoatSpeed = this.add.bitmapText(125, 715, 'Pfont', Phaser.Math.RoundTo(this.trip.boatSpeed, 1).toString(), 60);
        this.textBoatSpeed.setOrigin(0.5);
        this.textWindSpeed = this.add.bitmapText(515, 715, 'Pfont', Phaser.Math.RoundTo(this.trip.windSpeed, 1).toString(), 60);
        this.textWindSpeed.setOrigin(0.5);
        //lets create all the options for the crew
        this.crewButtons[0 /* sails */] = new tripButton(this, 5, 896, 0 /* sails */);
        this.crewButtons[1 /* rows */] = new tripButton(this, 244, 896, 1 /* rows */);
        this.crewButtons[2 /* leadership */] = new tripButton(this, 481, 896, 2 /* leadership */);
        this.crewButtons[3 /* maintenance */] = new tripButton(this, 5, 1073, 3 /* maintenance */);
        this.crewButtons[4 /* clean */] = new tripButton(this, 244, 1073, 4 /* clean */);
        this.crewButtons[5 /* fish */] = new tripButton(this, 481, 1073, 5 /* fish */);
        //lets check if they click a button
        this.events.on('clickUp', this.buttonClick, this);
    };
    sTrip.prototype.buttonClick = function (task, upDown) {
        //update the logic of the game
        this.trip.updateCrew(task, upDown);
    };
    sTrip.prototype.startEvent = function (eventNumber) {
        // shake the camera
        this.cameras.main.shake(500, 0.001);
        this.time.delayedCall(600, function () {
            this.cameras.main.fade(400, 255, 255, 255);
        }, [], this);
        // start the event scene
        this.time.delayedCall(1100, function () {
            this.scene.pause();
            var event = this.eventControler.getEvent(eventNumber);
            var trip = this.trip;
            var data = { event: event, trip: trip };
            this.scene.launch('tripEvent', data);
        }, [], this);
        //lets mark the event in the traker
        var circle = this.add.graphics();
        circle.fillStyle(0xb1160d, 1);
        circle.fillCircle(this.distShip.x, this.distShip.y, 5);
        circle.fillPath();
    };
    sTrip.prototype.updateCrewText = function () {
        this.textHealtyCrew.text = this.trip.healtyCrew.toString();
        this.textSickCrew.text = this.trip.sickCrew.toString();
        //check if there is still avaible crew
        var hideUpArrow = false;
        if (this.trip.healtyCrew == 0)
            hideUpArrow = true;
        //lets update all the used crew
        for (var i = 0; i < 6; i++) {
            this.crewButtons[i].updateText(this.trip.usedCrew[i]);
            this.crewButtons[i].hideUpArrow(hideUpArrow);
        }
    };
    sTrip.prototype.update = function () {
        //there is no need to update everything all the time
        if (this.t == this.interval) {
            //lets make the magic of the game happen
            this.trip.updateTrip();
            this.t = 0;
        }
        else {
            this.t++;
        }
    };
    return sTrip;
}(Phaser.Scene));
