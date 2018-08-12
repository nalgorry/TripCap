class preloader extends Phaser.Scene {

    preload() {

        console.log(this);

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(720/2 - 320/2, 1280/2 - 80, 320, 50);
        
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
        
        this.load.on('progress', function (value:number) {
            percentText.setText(Math.round(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x000000, 1);
            progressBar.fillRect(720/2 - 320/2 + 10 , 1280/2 - 80 + 10 , 300 * value, 30);
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
        this.load.spritesheet('cityImage', 'assets/cityImage.png', {frameHeight:291, frameWidth:227});    
        this.load.image('cityName', 'assets/cityName.png');    
        this.load.image('buyButton', 'assets/buyButton.png');    
        this.load.image('updateShipCard', 'assets/updateShipCard.png');  
        this.load.image('crewCard', 'assets/crewCard.png');  
        this.load.spritesheet('itemCards', 'assets/itemCards.png', {frameHeight:277, frameWidth:194});    
        
        this.load.image('backTripGlobal', 'assets/backTripGlobal.png');    
        this.load.spritesheet('lineGlobal', 'assets/lineGlobal.png', {frameHeight:1200, frameWidth:720});    
        this.load.spritesheet('ceroBarBack', 'assets/ceroBarBack.png', {frameHeight:74, frameWidth:386});    
        this.load.image('tripShip', 'assets/tripShip.png');    
        this.load.image('backGameEnd', 'assets/backGameEnd.png');    
        
        
        //help sprites
        this.load.image('help1', 'assets/help1.png');  
        this.load.image('help2', 'assets/help2.png');    
        this.load.image('help3', 'assets/help3.png');    
        this.load.image('helpNextButton', 'assets/helpNextButton.png');      
        this.load.image('howToPlayButton', 'assets/howToPlayButton.png');      
 
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

        
        
               
    }

    create() {

        this.scene.start('startMenu');

    }

}

