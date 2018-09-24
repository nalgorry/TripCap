var cEnemy = (function () {
    function cEnemy(data, x, y) {
        this.data = data;
        this.x = x;
        this.y = y;
        this.turnAtackAbilities = [];
        this.turnDefenceAbilities = [];
        this.isDead = false;
        this.spriteName = "enemy_1";
        this.mant = Phaser.Math.Between(1, data.maxMant);
        this.crew = Phaser.Math.Between(1, data.maxCrew);
        this.defineTurnAbilities();
    }
    cEnemy.prototype.defineTurnAbilities = function () {
        //TODO this should use the % of each ability to chose
        this.turnAtackAbilities = [];
        this.turnDefenceAbilities = [];
        this.atackData = undefined;
        this.damageData = undefined;
        var rnd = Phaser.Math.Between(0, this.data.offAbilities.length - 1);
        this.turnAtackAbilities.push(this.data.offAbilities[rnd]);
        var rnd = Phaser.Math.Between(0, this.data.defAbilities.length - 1);
        this.turnDefenceAbilities.push(this.data.defAbilities[rnd]);
    };
    return cEnemy;
}());
