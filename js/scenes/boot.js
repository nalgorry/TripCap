var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var boot = (function (_super) {
    __extends(boot, _super);
    function boot() {
        _super.apply(this, arguments);
    }
    boot.prototype.preload = function () {
    };
    boot.prototype.create = function () {
        this.scene.start('preloader');
    };
    return boot;
}(Phaser.Scene));
