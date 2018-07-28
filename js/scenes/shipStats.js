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
        //trip stats if needed
        if (this.trip != undefined) {
            var text = Math.round(this.trip.currentStatus[1 /* maintenance */]).toString() + "/" +
                this.boat.mantSystem.toString();
            var stat = this.add.bitmapText(95, 635, 'PfontRed', text, 40);
            stat.setOrigin(0.5, 0.5);
            var text = Math.round(this.trip.currentStatus[0 /* food */]).toString() + "/" +
                this.boat.foodSystem.toString();
            var stat = this.add.bitmapText(268, 635, 'PfontRed', text, 40);
            stat.setOrigin(0.5, 0.5);
            var text = Math.round(this.trip.currentStatus[2 /* clean */]).toString() + "/" +
                this.boat.cleanSystem.toString();
            var stat = this.add.bitmapText(444, 635, 'PfontRed', text, 40);
            stat.setOrigin(0.5, 0.5);
            var text = Math.round(this.trip.currentStatus[3 /* leadership */]).toString() + "/" +
                this.boat.leaderSystem.toString();
            var stat = this.add.bitmapText(626, 635, 'PfontRed', text, 40);
            stat.setOrigin(0.5, 0.5);
            //complete the bars
            var mant = new cStatusBar(this, 63, 670);
            var food = new cStatusBar(this, 63 + 176, 670);
            var clean = new cStatusBar(this, 63 + 176 * 2, 670);
            var leadership = new cStatusBar(this, 63 + 176 * 3, 670);
            food.updateBar(this.trip.barPorc[0 /* food */]);
            clean.updateBar(this.trip.barPorc[2 /* clean */]);
            mant.updateBar(this.trip.barPorc[1 /* maintenance */]);
            leadership.updateBar(this.trip.barPorc[3 /* leadership */]);
        }
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
            this.scene.resume('sTrip');
            this.scene.get('sTrip').cameras.main.fadeIn(200, 255, 255, 255);
            this.scene.stop();
        }, [], this);
    };
    return shipStats;
}(Phaser.Scene));
