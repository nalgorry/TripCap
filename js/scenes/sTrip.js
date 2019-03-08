var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var sTrip = /** @class */ (function (_super) {
    __extends(sTrip, _super);
    function sTrip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.distShipStartx = 44;
        _this.distShipEndx = 640;
        _this.statusBars = new Array();
        _this.ceroBarAlerts = new Array();
        _this.countCeroBarAlerts = 0;
        _this.interval = 5;
        _this.t = 0;
        return _this;
    }
    sTrip.prototype.create = function (boat) {
        this.boat = boat;
        this.trip = new cTrip(this.boat, this); //i send the scene to be able to generate events
        this.initScene();
        // init the bars
        this.statusBars[1 /* maintenance */] = new cStatusBar(this, 149, 899, false, 48, 136);
        this.statusBars[0 /* food */] = new cStatusBar(this, 149 + 216 + 156, 899 + 191, false, 48, 136, 85);
        this.statusBars[2 /* clean */] = new cStatusBar(this, 149, 899 + 191, false, 48, 136);
        this.statusBars[3 /* leadership */] = new cStatusBar(this, 149 + 216 + 156, 899, false, 48, 136, 85);
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
        //lets add the trip boat
        this.distShip = this.add.sprite(this.distShipStartx, 585, 'distanceShip');
        //lets init the event controler to control the evets.
        var eventData = this.cache.json.get('eventData');
        var eventOptions = this.cache.json.get('eventOption');
        var eventResult = this.cache.json.get('eventResult');
        var eventEffect = this.cache.json.get('eventEffect');
        this.eventControler = new cEventsControler(eventData, eventOptions, eventResult, eventEffect);
        //lets add the pause button (super great!)
        var button = this.add.sprite(360, 650, 'tripPauseButton');
        button.setInteractive();
        button.on('pointerdown', this.pauseTrip, this);
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
        this.mainTripShip = this.add.sprite(360, 280, 'tripShip');
    };
    sTrip.prototype.barInCero = function (data) {
        if (this.ceroBarAlerts["a" + data.status] == undefined) {
            var a = new cCeroBarAlert(this, data);
            this.ceroBarAlerts["a" + data.status] = a;
        }
        else {
            this.ceroBarAlerts["a" + data.status].refresh(data);
        }
    };
    sTrip.prototype.barRecoverFromCero = function (status) {
        this.ceroBarAlerts["a" + status].hide(status);
        this.ceroBarAlerts["a" + status] = undefined;
    };
    sTrip.prototype.gameEnd = function () {
        this.cameras.main.fadeOut(500, 255, 255, 255);
        //we only need to lister to the end game once to stop the game
        this.events.removeAllListeners('gameEnd');
        // start the tripEnd scene
        this.time.delayedCall(500, function () {
            this.scene.start('gameEnd', this.trip);
        }, [], this);
    };
    sTrip.prototype.showShipStats = function () {
        this.scene.pause();
        var data = {
            trip: this.trip,
            boat: this.boat,
            currentScene: this.scene,
        };
        this.scene.launch('shipStats', data);
    };
    sTrip.prototype.updateTripText = function () {
        //wind and ship speed
        this.textBoatSpeed.text = Phaser.Math.RoundTo(this.trip.boatSpeed, 0).toString();
        this.textWindSpeed.text = Phaser.Math.RoundTo(this.trip.windSpeed, 0).toString();
        this.statusBars[0 /* food */].updateBar(this.trip.currentStatus[0 /* food */], this.boat.foodSystem);
        this.statusBars[2 /* clean */].updateBar(this.trip.currentStatus[2 /* clean */], this.boat.cleanSystem);
        this.statusBars[1 /* maintenance */].updateBar(this.trip.currentStatus[1 /* maintenance */], this.boat.mantSystem);
        this.statusBars[3 /* leadership */].updateBar(this.trip.currentStatus[3 /* leadership */], this.boat.leaderSystem);
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
        this.textBoatSpeed = this.add.bitmapText(601, 702 - 10, 'Pfont', Phaser.Math.RoundTo(this.trip.boatSpeed, 1).toString(), 60);
        this.textBoatSpeed.setOrigin(0.5);
        this.textWindSpeed = this.add.bitmapText(601, 765 - 10, 'Pfont', Phaser.Math.RoundTo(this.trip.windSpeed, 1).toString(), 60);
        this.textWindSpeed.setOrigin(0.5);
    };
    sTrip.prototype.pauseTrip = function () {
        //i must do it with a timer if not the scene will not pause
        this.time.delayedCall(100, function () {
            this.mainTripShip.alpha = 0.3;
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
    sTrip.prototype.startBattle = function () {
        // shake the camera
        this.cameras.main.shake(500, 0.001);
        this.time.delayedCall(600, function () {
            this.cameras.main.fade(400, 255, 255, 255);
        }, [], this);
        // start the event scene
        this.time.delayedCall(1100, function () {
            this.scene.pause();
            this.scene.launch('battle', this.trip);
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
            //lets reset the alpha if we were in a pause before 
            if (this.mainTripShip.alpha == 0.3) {
                this.mainTripShip.alpha = 1;
            }
            this.t = 0;
        }
        else {
            this.t++;
        }
        this.textFps.setText("fps" + this.sys.game.loop.actualFps.toString());
    };
    return sTrip;
}(Phaser.Scene));
