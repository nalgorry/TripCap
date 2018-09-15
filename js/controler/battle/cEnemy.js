var cEnemy = (function () {
    function cEnemy(data) {
        this.maxMant = 100;
        this.maxCrew = 10;
        this.mant = 10;
        this.crew = 4;
        this.avaibleAtackAbilities = [];
        this.avaibleDefenceAbilities = [];
        this.atackAbilities = [];
        this.defenceAbilities = [];
        this.isDead = false;
        this.x = data.x;
        this.y = data.y;
        this.selRect = new Phaser.Geom.Rectangle(data.rectX, data.rectY, data.rectWidth, data.rectHeight);
        this.spriteName = "enemy_1";
        this.mant = Phaser.Math.Between(10, 50);
        this.crew = Phaser.Math.Between(2, 10);
        this.defineAvaibleAbilities();
        this.defineAbilities();
    }
    cEnemy.prototype.defineAvaibleAbilities = function () {
        this.avaibleAtackAbilities.push(new cBattleAbility(enBattleAbilities.arrows, 1));
        this.avaibleAtackAbilities.push(new cBattleAbility(enBattleAbilities.cannons, 1));
        this.avaibleAtackAbilities.push(new cBattleAbility(enBattleAbilities.axes, 1));
        this.avaibleAtackAbilities.push(new cBattleAbility(enBattleAbilities.noAtack, 1));
        this.avaibleDefenceAbilities.push(new cBattleAbility(enBattleAbilities.defendBoat, 1));
        this.avaibleDefenceAbilities.push(new cBattleAbility(enBattleAbilities.defendCrew, 1));
        this.avaibleDefenceAbilities.push(new cBattleAbility(enBattleAbilities.defendBoat, 1));
        this.avaibleDefenceAbilities.push(new cBattleAbility(enBattleAbilities.noDefense, 1));
    };
    cEnemy.prototype.defineAbilities = function () {
        this.atackAbilities = [];
        this.defenceAbilities = [];
        this.atackData = undefined;
        this.damageData = undefined;
        var rnd = Phaser.Math.Between(0, this.avaibleAtackAbilities.length - 1);
        this.atackAbilities.push(this.avaibleAtackAbilities[rnd]);
        var rnd = Phaser.Math.Between(0, this.avaibleDefenceAbilities.length - 1);
        this.defenceAbilities.push(this.avaibleDefenceAbilities[rnd]);
    };
    return cEnemy;
}());
