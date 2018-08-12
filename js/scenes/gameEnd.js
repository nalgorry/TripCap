var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameEnd = (function (_super) {
    __extends(gameEnd, _super);
    function gameEnd() {
        _super.apply(this, arguments);
    }
    gameEnd.prototype.create = function (boat) {
        this.init();
    };
    gameEnd.prototype.init = function () {
        var back = this.add.image(0, 0, 'backGameEnd');
        back.setOrigin(0);
    };
    return gameEnd;
}(Phaser.Scene));
