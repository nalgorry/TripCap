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
        this.statusBars = new Array();
        this.interval = 5;
        this.t = 0;
    }
    sTrip.prototype.create = function (boat) {
        this.boat = boat;
        this.trip = new cTrip(this.boat, this); //i send the scene to be able to generate events
        //init the comon controls
        this.crewControl = new crewControls(this.trip, this);
        //remove all the posible old events
        this.events.removeAllListeners('tripEnd');
        this.events.removeAllListeners('eventStart');
        this.events.removeAllListeners('updateTrip');
        this.events.removeAllListeners('updateCrew');
        //init all the event to conect with the controler of the trip
        this.events.on('tripEnd', this.tripEnd, this);
        this.events.on('eventStart', this.startEvent, this);
        this.events.on('updateTrip', this.updateTripText, this);
        this.events.on('updateCrew', this.crewControl.updateCrewText, this.crewControl);
        this.initScene();
        this.createWindAndSpeedButtons();
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
        //lets add the pause button (super great!)
        var button = this.add.sprite(360, 860, 'tripPauseButton');
        button.setInteractive();
        button.on('pointerdown', this.pauseTrip, this);
        //lets pause the trip
        this.pauseTrip();
        //to test the end of the trip
        //this.tripEnd(); 
        //to shop fps
        this.textFps = this.add.bitmapText(10, 10, 'Pfont', this.trip.healtyCrew.toString(), 20);
        this.textFps.setOrigin(0);
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
    sTrip.prototype.tripEnd = function () {
        this.cameras.main.fadeOut(500, 255, 255, 255);
        // start the tripEnd scene
        this.time.delayedCall(500, function () {
            this.scene.start('tripEnd', this.trip);
        }, [], this);
    };
    sTrip.prototype.initScene = function () {
        //lets add the back of the game 
        this.back = this.add.sprite(0, 0, 'tripBack');
        this.back.setOrigin(0);
    };
    sTrip.prototype.createWindAndSpeedButtons = function () {
        //speed and wind
        this.textBoatSpeed = this.add.bitmapText(125, 715, 'Pfont', Phaser.Math.RoundTo(this.trip.boatSpeed, 1).toString(), 60);
        this.textBoatSpeed.setOrigin(0.5);
        this.textWindSpeed = this.add.bitmapText(515, 715, 'Pfont', Phaser.Math.RoundTo(this.trip.windSpeed, 1).toString(), 60);
        this.textWindSpeed.setOrigin(0.5);
    };
    sTrip.prototype.pauseTrip = function () {
        //i must do it with a timer if not the scene will not pause
        this.time.delayedCall(20, function () {
            this.scene.pause();
            this.scene.launch('tripPause', this.trip);
            this.firstPause = false;
        }, [], this);
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
        this.textFps.setText("fps" + this.sys.game.loop.actualFps.toString());
    };
    return sTrip;
}(Phaser.Scene));
