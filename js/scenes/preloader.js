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
var preloader = /** @class */ (function (_super) {
    __extends(preloader, _super);
    function preloader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    preloader.prototype.preload = function () {
        console.log(this);
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(720 / 2 - 320 / 2, 1280 / 2 - 80, 320, 50);
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#000000'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        this.load.on('progress', function (value) {
            percentText.setText(Math.round(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x000000, 1);
            progressBar.fillRect(720 / 2 - 320 / 2 + 10, 1280 / 2 - 80 + 10, 300 * value, 30);
        });
        this.load.on('fileprogress', function (file) {
            assetText.setText('Cargando: ' + file.key);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
        //lets add some assets :)
        this.load.image('tripBack', 'assets/tripBack.png');
        this.load.image('startBack', 'assets/startBack.png');
        this.load.image('eventBack', 'assets/eventBack.png');
        this.load.image('startButton', 'assets/startButton.png');
        this.load.image('barMax', 'assets/barMax.png');
        this.load.image('buttonArrow', 'assets/buttonArrow.png');
        this.load.image('distanceShip', 'assets/distanceShip.png');
        this.load.image('cardBorder', 'assets/cardBorder.png');
        this.load.image('eventCard', 'assets/eventCard.png');
        this.load.image('eventButton', 'assets/eventButton.png');
        this.load.image('backEventResult', 'assets/backEventResult.png');
        this.load.image('resultButton', 'assets/resultButton.png');
        this.load.image('barArrow', 'assets/barArrow.png');
        this.load.image('backTripEnd', 'assets/backTripEnd.png');
        this.load.image('cityButton', 'assets/cityButton.png');
        this.load.image('backCity', 'assets/backCity.png');
        this.load.image('nextTripButton', 'assets/nextTripButton.png');
        this.load.image('tripPauseBack', 'assets/tripPauseBack.png');
        this.load.image('tripPlayButton', 'assets/tripPlayButton.png');
        this.load.image('tripPauseButton', 'assets/tripPauseButton.png');
        this.load.image('tripGlobalArrow', 'assets/tripGlobalArrow.png');
        this.load.image('backShipStats', 'assets/backShipStats.png');
        this.load.image('showShipStatsButton', 'assets/showShipStatsButton.png');
        this.load.image('backButton', 'assets/backButton.png');
        this.load.spritesheet('cityImage', 'assets/cityImage.png', { frameHeight: 291, frameWidth: 227 });
        this.load.image('cityName', 'assets/cityName.png');
        this.load.image('buyButton', 'assets/buyButton.png');
        this.load.image('updateShipCard', 'assets/updateShipCard.png');
        this.load.image('crewCard', 'assets/crewCard.png');
        this.load.spritesheet('itemCards', 'assets/itemCards.png', { frameHeight: 277, frameWidth: 194 });
        this.load.image('backTripGlobal', 'assets/backTripGlobal.png');
        this.load.spritesheet('lineGlobal', 'assets/lineGlobal.png', { frameHeight: 1200, frameWidth: 720 });
        this.load.spritesheet('ceroBarBack', 'assets/ceroBarBack.png', { frameHeight: 74, frameWidth: 386 });
        this.load.image('tripShip', 'assets/tripShip.png');
        this.load.image('backGameEnd', 'assets/backGameEnd.png');
        this.load.image('tripDrag', 'assets/tripDrag.png');
        this.load.image('navButtonBack', 'assets/navButtonBack.png');
        //anim try!
        this.load.atlas('boat_anim', 'assets/anim/boat_anim.png', 'assets/anim/boat_texture.json');
        this.load.json('boat_data', 'assets/animations/boat_anim.json');
        this.load.image('update_card_back', 'assets/update_card_back.png');
        this.load.image('new_card_back', 'assets/new_card_back.png');
        this.load.image('skip_card', 'assets/skip_card.png');
        //all the battle elements
        this.load.image('battle_back', 'assets/battle/back.png');
        this.load.spritesheet('battle_cards', 'assets/battle/cards.png', { frameHeight: 278, frameWidth: 194 });
        this.load.spritesheet('battle_idle_icons', 'assets/battle/idle_icons.png', { frameHeight: 50, frameWidth: 50 });
        this.load.spritesheet('battle_icons_size_1', 'assets/battle/battle_icons_size_1.png', { frameHeight: 110, frameWidth: 110 });
        this.load.spritesheet('battle_icons_size_2', 'assets/battle/battle_icons_size_2.png', { frameHeight: 80, frameWidth: 80 });
        this.load.image('battle_refresh', 'assets/battle/refresh.png');
        this.load.spritesheet('battle_crewHit', 'assets/battle/crewHit.png', { frameHeight: 192, frameWidth: 192 });
        this.load.spritesheet('battle_boatHit', 'assets/battle/boatHit.png', { frameHeight: 192, frameWidth: 192 });
        this.load.image('ownShip', 'assets/battle/ownShip.png');
        this.load.image('enemy_1', 'assets/battle/enemy/enemy_1.png');
        this.load.image('enemy_2', 'assets/battle/enemy/enemy_2.png');
        this.load.image('enemy_3', 'assets/battle/enemy/enemy_3.png');
        this.load.image('boatDamage', 'assets/battle/boatDamage.png');
        this.load.image('crewDamage', 'assets/battle/crewDamage.png');
        this.load.image('battleCardBack', 'assets/battle/card_back.png');
        this.load.image('battlehelpButton', 'assets/battle/helpButton.png');
        this.load.image('battlehelp_1', 'assets/battle/help_1.png');
        this.load.image('battlehelp_2', 'assets/battle/help_2.png');
        this.load.image('battlehelp_3', 'assets/battle/help_3.png');
        this.load.image('battlehelp_4', 'assets/battle/help_4.png');
        this.load.image('battlehelp_5', 'assets/battle/help_5.png');
        this.load.image('battlehelp_6', 'assets/battle/help_6.png');
        //help sprites
        this.load.image('help1', 'assets/help1.png');
        this.load.image('help2', 'assets/help2.png');
        this.load.image('help3', 'assets/help3.png');
        this.load.image('helpNextButton', 'assets/helpNextButton.png');
        this.load.image('howToPlayButton', 'assets/howToPlayButton.png');
        this.load.image('battleHelpMain', 'assets/battleHelp.png');
        //lets add some fonts
        this.load.bitmapFont('Pfont', 'assets/fonts/Pfont.png', 'assets/fonts/Pfont.xml');
        this.load.bitmapFont('FreeFont', 'assets/fonts/freeStyle.png', 'assets/fonts/freeStyle.fnt');
        this.load.bitmapFont('PfontRed', 'assets/fonts/PfontRed.png', 'assets/fonts/PfontRed.fnt');
        //lets read the jsons
        this.load.json('eventData', 'js/json/EventsData.json');
        this.load.json('eventOption', 'js/json/EventsOptions.json');
        this.load.json('eventResult', 'js/json/EventsResult.json');
        this.load.json('eventEffect', 'js/json/EventsEffect.json');
        this.load.json('tripData', 'js/json/TripData.json');
        this.load.json('battleCards', 'js/json/BattleCards.json');
        this.load.json('enemys', 'js/json/Enemys.json');
    };
    preloader.prototype.create = function () {
        this.scene.start('startMenu');
    };
    return preloader;
}(Phaser.Scene));
