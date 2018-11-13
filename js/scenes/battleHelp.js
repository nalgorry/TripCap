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
var battleHelp = /** @class */ (function (_super) {
    __extends(battleHelp, _super);
    function battleHelp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.helpNumber = 1;
        _this.totalHelpNumber = 6;
        return _this;
    }
    battleHelp.prototype.create = function () {
        this.initButtons();
        this.initScene();
    };
    battleHelp.prototype.initScene = function () {
        this.cameras.main.fadeIn(500, 255, 255, 255);
        this.nextHelp();
    };
    battleHelp.prototype.initButtons = function () {
        //lets create the helpButton button
        this.button = this.add.sprite(540, 1200, 'helpNextButton').setInteractive();
        this.button.on('pointerdown', this.buttonDown, this);
        this.button.on('pointerout', this.buttonOut, this);
        this.button.on('pointerup', this.nextHelp, this);
    };
    battleHelp.prototype.buttonDown = function () {
        this.button.setTint(0x15536b);
    };
    battleHelp.prototype.buttonOut = function () {
        this.button.clearTint();
    };
    battleHelp.prototype.nextHelp = function () {
        if (this.helpNumber <= this.totalHelpNumber) {
            var back = this.add.image(0, 0, 'battlehelp_' + this.helpNumber);
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
                this.scene.get('battle').cameras.main.fadeIn(500, 255, 255, 255);
                this.scene.stop();
            }, [], this);
        }
    };
    return battleHelp;
}(Phaser.Scene));
