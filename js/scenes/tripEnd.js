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
    tripEnd.prototype.create = function (data) {
        this.initScene();
    };
    tripEnd.prototype.update = function () {
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
            this.scene.start('city');
        }, [], this);
        this.button.setTint(0xffffff);
    };
    tripEnd.prototype.finishClick = function () {
        this.button.setTint(0x15536b);
    };
    return tripEnd;
}(Phaser.Scene));
