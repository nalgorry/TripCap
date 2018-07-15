var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var city = (function (_super) {
    __extends(city, _super);
    function city() {
        _super.apply(this, arguments);
    }
    city.prototype.create = function (boat) {
        this.initScene();
        this.boat = boat;
    };
    city.prototype.update = function () {
    };
    city.prototype.initScene = function () {
        //lets apear slowly
        this.cameras.main.fadeIn(500, 255, 255, 255);
        //lets add the back of the game 
        this.back = this.add.image(0, 0, 'backCity');
        this.back.setOrigin(0);
        //lets add the next trip button
        this.button = this.add.sprite(360, 1090, 'nextTripButton');
        this.button.setInteractive();
        this.button.on('pointerup', this.goToTrip, this);
        this.button.on('pointerdown', this.finishClick, this);
    };
    city.prototype.goToTrip = function () {
        this.cameras.main.fadeOut(500, 255, 255, 255);
        // start the tripEnd scene
        this.time.delayedCall(500, function () {
            this.scene.stop('sTrip');
            this.scene.start('sTrip');
        }, [], this);
        this.button.setTint(0xffffff);
        this.button.setTint(0xffffff);
    };
    city.prototype.finishClick = function () {
        this.button.setTint(0x15536b);
    };
    return city;
}(Phaser.Scene));
