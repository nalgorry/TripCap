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
var gameEnd = /** @class */ (function (_super) {
    __extends(gameEnd, _super);
    function gameEnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    gameEnd.prototype.create = function (boat) {
        this.init();
    };
    gameEnd.prototype.init = function () {
        var back = this.add.image(0, 0, 'backGameEnd');
        back.setOrigin(0);
        this.initScene();
    };
    gameEnd.prototype.initScene = function () {
        //lets create the  button to restart the game
        this.button = this.add.sprite(540, 1200, 'helpNextButton').setInteractive();
        this.button.on('pointerdown', this.buttonDown, this);
        this.button.on('pointerout', this.buttonOut, this);
        this.button.on('pointerup', this.restartGame, this);
    };
    gameEnd.prototype.buttonDown = function () {
        this.button.setTint(0x15536b);
    };
    gameEnd.prototype.buttonOut = function () {
        this.button.clearTint();
    };
    gameEnd.prototype.restartGame = function () {
        this.scene.start('startMenu');
    };
    return gameEnd;
}(Phaser.Scene));
