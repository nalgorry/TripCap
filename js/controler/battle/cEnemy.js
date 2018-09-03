var cEnemy = (function () {
    function cEnemy(data) {
        this.mant = 100;
        this.crew = 10;
        this.atackAbilities = [];
        this.defendAbilities = [];
        this.mant = data.mant;
        this.crew = data.crew;
        this.x = data.x;
        this.y = data.y;
        this.selRect = new Phaser.Geom.Rectangle(data.rectX, data.rectY, data.rectWidth, data.rectHeight);
        this.spriteName = "enemy_1";
        this.defendAbilities.push(new cBattleAbility(enBattleAbilities.defendBoat, 2));
    }
    return cEnemy;
}());
