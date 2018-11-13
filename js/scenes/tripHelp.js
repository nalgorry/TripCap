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
var tripHelp = /** @class */ (function (_super) {
    __extends(tripHelp, _super);
    function tripHelp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.helpNumber = 1;
        return _this;
    }
    tripHelp.prototype.create = function () {
        this.initButtons();
        this.initScene();
    };
    tripHelp.prototype.initScene = function () {
        this.cameras.main.fadeIn(500, 255, 255, 255);
        this.nextHelp();
    };
    tripHelp.prototype.initButtons = function () {
        //lets create the helpButton button
        this.button = this.add.sprite(568, 252, 'helpNextButton').setInteractive();
        this.button.on('pointerdown', this.buttonDown, this);
        this.button.on('pointerout', this.buttonOut, this);
        this.button.on('pointerup', this.nextHelp, this);
    };
    tripHelp.prototype.buttonDown = function () {
        this.button.setTint(0x15536b);
    };
    tripHelp.prototype.buttonOut = function () {
        this.button.clearTint();
    };
    tripHelp.prototype.nextHelp = function () {
        if (this.helpNumber <= 3) {
            var back = this.add.image(0, 0, 'help' + this.helpNumber);
            back.setOrigin(0);
            back.alpha = 0;
            var a2 = this.add.tween({
                targets: back,
                props: {
                    alpha: { value: 1, duration: 500, ease: 'Phaser.Easing.Out' },
                }
            });
            this.helpNumber++;
            this.button.setDepth(1000);
        }
        else {
            this.cameras.main.fade(500, 255, 255, 255);
            this.time.delayedCall(500, function () {
                this.scene.start('startMenu');
            }, [], this);
        }
    };
    return tripHelp;
}(Phaser.Scene));
