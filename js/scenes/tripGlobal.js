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
    tripGlobal.prototype.create = function () {
        this.initScene();
    };
    tripGlobal.prototype.initScene = function () {
        //lest add the back
        this.back = this.add.image(0, 0, 'backTripGlobal');
        this.back.setOrigin(0);
        this.cameras.main.fadeIn(1000, 255, 255, 255);
        this.time.delayedCall(4500, function () {
            this.cameras.main.fadeOut(1500, 255, 255, 255);
        }, [], this);
        this.time.delayedCall(6000, function () {
            var boat = new cBoat();
            this.scene.start('sTrip', boat);
        }, [], this);
        //lets add the arrows
        var arrow1 = this.add.sprite(124, 452, 'tripGlobalArrow');
        this.tweens.add({
            targets: arrow1,
            y: arrow1.y - 15,
            duration: 600,
            ease: 'Power2',
            yoyo: true,
            repeat: 200
        });
        var arrow2 = this.add.sprite(204, 426, 'tripGlobalArrow');
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
