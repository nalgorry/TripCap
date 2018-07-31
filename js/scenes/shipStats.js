var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var shipStats = (function (_super) {
    __extends(shipStats, _super);
    function shipStats() {
        _super.apply(this, arguments);
    }
    shipStats.prototype.create = function (data) {
        this.trip = data.trip;
        this.boat = data.boat;
        this.currentScene = data.currentScene;
        this.initScene();
        this.showStats();
        this.cameras.main.fadeIn(500, 255, 255, 255);
    };
    shipStats.prototype.showStats = function () {
        //ship stats
        var stat = this.add.bitmapText(502, 170, 'PfontRed', this.boat.crewman.toString(), 60);
        stat.setOrigin(0.5, 0.5);
        var stat = this.add.bitmapText(502, 288, 'PfontRed', this.boat.gold.toString(), 60);
        stat.setOrigin(0.5, 0.5);
        var stat = this.add.bitmapText(502, 388, 'PfontRed', this.boat.rows.toString(), 60);
        stat.setOrigin(0.5, 0.5);
        var stat = this.add.bitmapText(502, 505, 'PfontRed', this.boat.sails.toString(), 60);
        stat.setOrigin(0.5, 0.5);
        //complete the bars
        var mant = new cStatusBar(this, 63, 670);
        var food = new cStatusBar(this, 63 + 176, 670);
        var clean = new cStatusBar(this, 63 + 176 * 2, 670);
        var leadership = new cStatusBar(this, 63 + 176 * 3, 670);
        //trip stats if needed
        if (this.trip != undefined) {
            var textMant = Math.round(this.trip.currentStatus[1 /* maintenance */]).toString() + "/" +
                this.boat.mantSystem.toString();
            var textFood = Math.round(this.trip.currentStatus[0 /* food */]).toString() + "/" +
                this.boat.foodSystem.toString();
            var textClean = Math.round(this.trip.currentStatus[2 /* clean */]).toString() + "/" +
                this.boat.cleanSystem.toString();
            var textLeader = Math.round(this.trip.currentStatus[3 /* leadership */]).toString() + "/" +
                this.boat.leaderSystem.toString();
            food.updateBar(this.trip.barPorc[0 /* food */]);
            clean.updateBar(this.trip.barPorc[2 /* clean */]);
            mant.updateBar(this.trip.barPorc[1 /* maintenance */]);
            leadership.updateBar(this.trip.barPorc[3 /* leadership */]);
        }
        else {
            var textMant = Math.round(this.boat.mantSystem * 0.8).toString() + "/" +
                this.boat.mantSystem.toString();
            var textFood = Math.round(this.boat.foodSystem * 0.8).toString() + "/" +
                this.boat.foodSystem.toString();
            var textClean = Math.round(this.boat.cleanSystem * 0.8).toString() + "/" +
                this.boat.cleanSystem.toString();
            var textLeader = Math.round(this.boat.leaderSystem * 0.8).toString() + "/" +
                this.boat.leaderSystem.toString();
            food.updateBar(0.8);
            clean.updateBar(0.8);
            mant.updateBar(0.8);
            leadership.updateBar(0.8);
        }
        var stat = this.add.bitmapText(95, 635, 'PfontRed', textMant, 40);
        stat.setOrigin(0.5, 0.5);
        var stat = this.add.bitmapText(268, 635, 'PfontRed', textFood, 40);
        stat.setOrigin(0.5, 0.5);
        var stat = this.add.bitmapText(444, 635, 'PfontRed', textClean, 40);
        stat.setOrigin(0.5, 0.5);
        var stat = this.add.bitmapText(626, 635, 'PfontRed', textLeader, 40);
        stat.setOrigin(0.5, 0.5);
    };
    shipStats.prototype.initScene = function () {
        //lest add the back
        this.back = this.add.image(0, 0, 'backShipStats');
        this.back.setOrigin(0);
        //lets add the back button 
        var b = this.add.sprite(360, 1180, 'backButton');
        b.setInteractive();
        b.on('pointerdown', this.returnShip, this);
    };
    shipStats.prototype.returnShip = function () {
        this.cameras.main.fadeOut(250, 255, 255, 255);
        this.time.delayedCall(250, function () {
            //restart the trip
            this.currentScene.resume();
            this.scene.stop();
        }, [], this);
    };
    return shipStats;
}(Phaser.Scene));