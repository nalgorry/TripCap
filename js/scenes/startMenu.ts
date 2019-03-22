class startMenu extends Phaser.Scene {

    private startButton:Phaser.GameObjects.GameObject;
    private helpButton:Phaser.GameObjects.GameObject;
    private back:Phaser.GameObjects.Sprite;

    private textFps:Phaser.GameObjects.BitmapText;
 
    create() {

        this.back = this.add.sprite(0, 0,'startBack');
        this.back.setOrigin(0);

        //lets create the start button
        this.startButton =  this.add.sprite(720/2,1000,'startButton').setInteractive();
                
        this.startButton.on('pointerdown', function (pointer) {

            this.startButton.setTint(0x15536b);
    
        }, this);

        this.startButton.on('pointerout', function (pointer) {

            this.startButton.clearTint();
    
        }, this);

        this.startButton.on('pointerup', function (pointer) {

            var data = this.cache.json.get('tripData'); 

            var boat:cBoat = new cBoat(data);

            var enemyData = this.cache.json.get('enemys');

            boat.loadEnemyData(enemyData);

            var data = this.cache.json.get('battleCards'); 

            boat.initBattleCards(data);

            this.scene.start('tripGlobal', boat);

            //to the the city faster
            //this.scene.start("city", boat)

        }, this);

        //lets create the helpButton button
        this.helpButton =  this.add.sprite(720/2,1200,'howToPlayButton').setInteractive();
        
        this.helpButton.on('pointerdown', function (pointer) {

            this.helpButton.setTint(0x15536b);
    
        }, this);

        this.helpButton.on('pointerout', function (pointer) {

            this.helpButton.clearTint();
    
        }, this);

        this.helpButton.on('pointerup', function (pointer) {

            this.changeScene('tripHelp');

        }, this);

        //help battle button 
        var helpBattle =  this.add.sprite(720/2,1100,'battleHelpMain').setInteractive();
        
        helpBattle.on('pointerdown', function (pointer) {
            this.setTint(0x15536b);
        }, helpBattle);

        helpBattle.on('pointerout', function (pointer) {
            this.clearTint();
        }, helpBattle);

        helpBattle.on('pointerup', function (pointer) {
            this.changeScene('battleHelp');
        }, this);

        //this.changeScene(); //lo hago aca para saltearme el menu de inicio al dope
        this.textFps = this.add.bitmapText(10, 10, 'Pfont', "0", 30);
        this.textFps.setOrigin(0);
        this.textFps.alpha = 0;


        window.addEventListener('resize', this.resize);
        this.resize();

        this.cameras.main.fadeIn(500,255,255,255);

        var a = new vMap(this, []);

    }

    resize() {
        
        var canvas = document.getElementById("content").getElementsByTagName("canvas")[0];
;
        var width = window.innerWidth;
        var height = window.innerHeight + 5;
        
        var wratio = width / height, ratio = canvas.width / canvas.height;
     
        if (wratio < ratio) {
            canvas.style.width = width + "px";
            canvas.style.height = (width / ratio) + "px";
        } else {
            canvas.style.width = (height * ratio) + "px";
            canvas.style.height = height + "px";
        }
    }
 
    changeScene(sceneName:string) {

        this.cameras.main.fade(500, 255, 255, 255);

        this.time.delayedCall(500, function() {

            this.scene.start(sceneName);

        }, [], this);
        

    }


    update() {
        this.textFps.setText("canvas" + this.sys.game.loop.actualFps.toString());
    }


    render() {

    }
 
}