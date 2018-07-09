var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var startMenu = (function (_super) {
    __extends(startMenu, _super);
    function startMenu() {
        _super.apply(this, arguments);
    }
    startMenu.prototype.create = function () {
        this.back = this.add.sprite(0, 0, 'startBack');
        this.back.setOrigin(0);
        //lets create the start button
        this.button = this.add.sprite(720 / 2, 1100, 'startButton').setInteractive();
        this.button.on('pointerdown', function (pointer) {
            this.button.setTint(0x15536b);
        }, this);
        this.button.on('pointerout', function (pointer) {
            this.button.clearTint();
        }, this);
        this.button.on('pointerup', function (pointer) {
            this.changeScene();
        }, this);
        //this.changeScene(); //lo hago aca para saltearme el menu de inicio al dope
    };
    startMenu.prototype.changeScene = function () {
        this.cameras.main.fade(500, 255, 255, 255);
        this.time.delayedCall(500, function () {
            this.scene.start('sTrip');
        }, [], this);
    };
    startMenu.prototype.update = function () {
    };
    startMenu.prototype.render = function () {
    };
    return startMenu;
}(Phaser.Scene));
