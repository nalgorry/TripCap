var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tripPause = (function (_super) {
    __extends(tripPause, _super);
    function tripPause() {
        _super.apply(this, arguments);
    }
    tripPause.prototype.create = function (trip) {
        this.initScene();
        this.trip = trip;
        this.crewControls = new crewControls(this.trip, this);
        this.scene.get('sTrip').events.on('updateCrew', this.updateCrewText, this);
    };
    tripPause.prototype.initScene = function () {
        //lets add the back of the game 
        this.back = this.add.sprite(0, 0, 'tripPauseBack');
        this.back.setOrigin(0);
        this.cameras.main.fadeIn(500, 255, 255, 255);
        //create the play button
        var button = this.add.sprite(360, 856, 'tripPlayButton');
        button.setInteractive();
        button.on('pointerdown', this.startPress, this);
    };
    tripPause.prototype.updateCrewText = function () {
        this.crewControls.updateCrewText();
    };
    tripPause.prototype.startPress = function () {
        this.scene.get('sTrip').events.removeListener('updateCrew', this.updateCrewText, this, true);
        this.events.removeAllListeners('clickUp');
        //restart the trip
        this.scene.resume('sTrip');
        this.scene.get('sTrip').cameras.main.fadeIn(500, 255, 255, 255);
        this.scene.stop();
    };
    return tripPause;
}(Phaser.Scene));
