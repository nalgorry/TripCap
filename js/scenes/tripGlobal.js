var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tripGlobal = (function (_super) {
    __extends(tripGlobal, _super);
    function tripGlobal() {
        _super.apply(this, arguments);
    }
    tripGlobal.prototype.create = function (boat) {
        console.log(boat);
        this.boat = boat;
        this.initScene();
        //to skip it 
        this.input.on('pointerdown', this.hurryUp, this);
    };
    tripGlobal.prototype.hurryUp = function () {
        this.cameras.main.fadeOut(100, 255, 255, 255);
        this.time.delayedCall(100, function () {
            this.scene.start('sTrip', this.boat);
        }, [], this);
    };
    tripGlobal.prototype.initScene = function () {
        //lest add the back
        this.back = this.add.image(0, 0, 'backTripGlobal', this.boat.tripNumber - 1);
        this.back.setOrigin(0);
        this.cameras.main.fadeIn(1500, 255, 255, 255);
        this.time.delayedCall(4500, function () {
            this.cameras.main.fadeOut(1500, 255, 255, 255);
        }, [], this);
        this.time.delayedCall(6000, function () {
            this.scene.start('sTrip', this.boat);
        }, [], this);
        this.initArrows(this.boat.tripNumber);
    };
    tripGlobal.prototype.initArrows = function (tripNumber) {
        var pos1;
        var pos2;
        switch (tripNumber) {
            case 1:
                pos1 = { x: 124, y: 452 };
                pos2 = { x: 204, y: 426 };
                break;
            case 2:
                pos1 = { x: 124, y: 452 };
                pos2 = { x: 140, y: 515 };
                break;
            default:
                break;
        }
        //lets add the arrows
        var arrow1 = this.add.sprite(pos1.x, pos1.y, 'tripGlobalArrow');
        this.tweens.add({
            targets: arrow1,
            y: arrow1.y - 15,
            duration: 600,
            ease: 'Power2',
            yoyo: true,
            repeat: 200
        });
        var arrow2 = this.add.sprite(pos2.x, pos2.y, 'tripGlobalArrow');
        this.tweens.add({
            targets: arrow2,
            y: arrow2.y - 20,
            duration: 600,
            ease: 'Power2',
            yoyo: true,
            repeat: 200
        });
    };
    return tripGlobal;
}(Phaser.Scene));
