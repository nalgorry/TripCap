class InitGame {

    public game: Phaser.Game;
    

    constructor() {

        var conf = {
            width: 720,
            height: 1280,
            renderer: Phaser.AUTO,
            parent: 'content',
            state: null,
            backgroundColor: '#FFFFFF',
            //enableDebug: false,
        };

        this.game = new Phaser.Game(conf);

        this.game.scene.add('boot', boot, false);
        this.game.scene.add('preloader', preloader, false);
        this.game.scene.add('startMenu', startMenu, false);
        this.game.scene.add('sTrip', sTrip, false);
        this.game.scene.add('tripEvent', tripEvent, false);
        this.game.scene.add('tripEnd', tripEnd, false);
        this.game.scene.add('city', city, false);
        this.game.scene.add('tripPause', tripPause, false);
        

        this.game.scene.start('boot');

    }


} //fin
window.onload = () => {

    var game = new InitGame();

};

