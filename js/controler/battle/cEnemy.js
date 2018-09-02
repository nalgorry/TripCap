var cEnemy = (function () {
    function cEnemy(data) {
        this.mant = 100;
        this.crew = 10;
        this.mant = data.mant;
        this.crew = data.crew;
        this.poss = new Phaser.Geom.Point(data.x, data.y);
        this.selRect = new Phaser.Geom.Rectangle(data.rectX, data.rectY, data.rectWidth, data.rectHeight);
    }
    return cEnemy;
}());
