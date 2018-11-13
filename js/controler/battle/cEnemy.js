var cEnemy = /** @class */ (function () {
    function cEnemy(data, x, y) {
        this.data = data;
        this.x = x;
        this.y = y;
        this.turnAtackAbilities = [];
        this.turnDefenceAbilities = [];
        this.isDead = false;
        this.mant = Phaser.Math.Between(data.minMant, data.maxMant);
        this.crew = Phaser.Math.Between(data.minCrew, data.maxCrew);
        this.defineTurnAbilities();
    }
    cEnemy.prototype.defineTurnAbilities = function () {
        //TODO this should use the % of each ability to chose
        this.turnAtackAbilities = [];
        this.turnDefenceAbilities = [];
        this.atackData = undefined;
        this.damageData = undefined;
        //lets define the new abilites
        this.turnAtackAbilities.push(this.selectRandomAbility(this.data.offAbilities));
        this.turnDefenceAbilities.push(this.selectRandomAbility(this.data.defAbilities));
    };
    cEnemy.prototype.selectRandomAbility = function (array) {
        var selectedResult;
        var rand = Phaser.Math.Between(0, 100);
        var probAcum = 0;
        array.some(function (element) {
            probAcum += element.prob;
            if (rand <= probAcum) {
                selectedResult = element;
                return true; //this stop the loop
            }
        });
        return selectedResult;
    };
    return cEnemy;
}());
