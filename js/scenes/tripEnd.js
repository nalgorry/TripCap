var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tripEnd = (function (_super) {
    __extends(tripEnd, _super);
    function tripEnd() {
        _super.apply(this, arguments);
    }
    tripEnd.prototype.create = function (trip) {
        this.trip = trip;
        console.log(trip);
        this.initScene();
        this.showTripStats();
        this.calculateEndResult();
    };
    tripEnd.prototype.update = function () {
    };
    tripEnd.prototype.calculateEndResult = function () {
        this.trip.boat.gold += this.trip.tripEndGold;
    };
    tripEnd.prototype.showTripStats = function () {
        var efect = new cEventEffectText(105, 380, this, this.calculateTime(), "Tiempo de Viaje");
        var dist = Math.round(this.trip.tripTotalDist).toString();
        var efect = new cEventEffectText(105, 380 + 50, this, dist, "Nudos Recorridos");
        var efect = new cEventEffectText(105, 380 + 50 * 2, this, this.trip.tripEndGold.toString(), "Oro entraga carga");
        var tripGold = this.trip.boat.gold - this.trip.boatStartStats.gold;
        var efect = new cEventEffectText(105, 380 + 50 * 3, this, tripGold.toString(), "Oro Ganado en Viaje");
        var efect = new cEventEffectText(105, 380 + 50 * 4, this, this.trip.numOfEvents.toString(), "Eventos");
    };
    tripEnd.prototype.initScene = function () {
        //lets apear slowly
        this.cameras.main.fadeIn(500, 255, 255, 255);
        //lets add the back of the game 
        this.back = this.add.image(0, 0, 'backTripEnd');
        this.back.setOrigin(0);
        //lets add the button
        //lets create the start button
        this.button = this.add.sprite(360, 1090, 'cityButton');
        this.button.setInteractive();
        this.button.on('pointerup', this.goToCity, this);
        this.button.on('pointerdown', this.finishClick, this);
    };
    tripEnd.prototype.goToCity = function () {
        this.cameras.main.fadeOut(500, 255, 255, 255);
        // start the tripEnd scene
        this.time.delayedCall(500, function () {
            this.scene.start('city', this.trip.boat);
        }, [], this);
        this.button.setTint(0xffffff);
    };
    tripEnd.prototype.finishClick = function () {
        this.button.setTint(0x15536b);
    };
    tripEnd.prototype.calculateTime = function () {
        var currentTime = new Date();
        var timeDifference = this.trip.startTime.getTime() - currentTime.getTime();
        //Time elapsed in seconds
        var timeElapsed = Math.abs(timeDifference / 1000);
        //Convert seconds into minutes and seconds
        var minutes = Math.floor(timeElapsed / 60);
        var seconds = Math.floor(timeElapsed) - (60 * minutes);
        //Display minutes, add a 0 to the start if less than 10
        var result = (minutes < 10) ? "0" + minutes : minutes;
        //Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ":0" + seconds : ":" + seconds;
        console.log(result);
        return result.toString();
    };
    return tripEnd;
}(Phaser.Scene));
