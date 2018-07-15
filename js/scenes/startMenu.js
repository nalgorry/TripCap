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
        this.textFps = this.add.bitmapText(10, 10, 'Pfont', "0", 30);
        this.textFps.setOrigin(0);
        window.addEventListener('resize', this.resize);
        this.resize();
        this.cameras.main.fadeIn(500, 255, 255, 255);
    };
    startMenu.prototype.resize = function () {
        var canvas = document.getElementById("content").getElementsByTagName("canvas")[0];
        ;
        var width = window.innerWidth;
        var height = window.innerHeight + 5;
        var wratio = width / height, ratio = canvas.width / canvas.height;
        if (wratio < ratio) {
            canvas.style.width = width + "px";
            canvas.style.height = (width / ratio) + "px";
        }
        else {
            canvas.style.width = (height * ratio) + "px";
            canvas.style.height = height + "px";
        }
    };
    startMenu.prototype.changeScene = function () {
        this.cameras.main.fade(500, 255, 255, 255);
        this.time.delayedCall(500, function () {
            var boat = new cBoat();
            this.scene.start('sTrip', boat);
        }, [], this);
    };
    startMenu.prototype.update = function () {
        this.textFps.setText("canvas" + this.sys.game.loop.actualFps.toString());
    };
    startMenu.prototype.render = function () {
    };
    return startMenu;
}(Phaser.Scene));
