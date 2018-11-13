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
var startMenu = /** @class */ (function (_super) {
    __extends(startMenu, _super);
    function startMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    startMenu.prototype.create = function () {
        this.back = this.add.sprite(0, 0, 'startBack');
        this.back.setOrigin(0);
        //lets create the start button
        this.startButton = this.add.sprite(720 / 2, 1150, 'startButton').setInteractive();
        this.startButton.on('pointerdown', function (pointer) {
            this.startButton.setTint(0x15536b);
        }, this);
        this.startButton.on('pointerout', function (pointer) {
            this.startButton.clearTint();
        }, this);
        this.startButton.on('pointerup', function (pointer) {
            var data = this.cache.json.get('tripData');
            var boat = new cBoat(data);
            var enemyData = this.cache.json.get('enemys');
            boat.loadEnemyData(enemyData);
            var data = this.cache.json.get('battleCards');
            boat.initBattleCards(data);
            this.scene.start('tripGlobal', boat);
            //to the the city faster
            //this.scene.start("city", boat)
        }, this);
        //lets create the helpButton button
        this.helpButton = this.add.sprite(720 / 2, 1040, 'howToPlayButton').setInteractive();
        this.helpButton.on('pointerdown', function (pointer) {
            this.helpButton.setTint(0x15536b);
        }, this);
        this.helpButton.on('pointerout', function (pointer) {
            this.helpButton.clearTint('helpTrip');
        }, this);
        this.helpButton.on('pointerup', function (pointer) {
            this.changeScene('tripHelp');
        }, this);
        //this.changeScene(); //lo hago aca para saltearme el menu de inicio al dope
        this.textFps = this.add.bitmapText(10, 10, 'Pfont', "0", 30);
        this.textFps.setOrigin(0);
        this.textFps.alpha = 0;
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
    startMenu.prototype.changeScene = function (sceneName) {
        this.cameras.main.fade(500, 255, 255, 255);
        this.time.delayedCall(500, function () {
            this.scene.start(sceneName);
        }, [], this);
    };
    startMenu.prototype.update = function () {
        this.textFps.setText("canvas" + this.sys.game.loop.actualFps.toString());
    };
    startMenu.prototype.render = function () {
    };
    return startMenu;
}(Phaser.Scene));
