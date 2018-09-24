class cEnemy{

    public mant:number;
    public crew;
    public spriteName:string;
    public turnAtackAbilities:cBattleAbility[] = [];
    public turnDefenceAbilities:cBattleAbility[] = [];
    public isDead = false;
    public atackData:cProcessAtack; //the atack done but this enemy
    public damageData:cProcessAtack; //the atack done to this enemy
    

    constructor(public data:mEnemy, public x:number, public y:number) {

        
        this.spriteName = "enemy_1";


        this.mant = Phaser.Math.Between(1, data.maxMant);
        this.crew = Phaser.Math.Between(1, data.maxCrew);

        this.defineTurnAbilities();
    }

    public defineTurnAbilities() {

        //TODO this should use the % of each ability to chose

        this.turnAtackAbilities = [];
        this.turnDefenceAbilities = [];

        this.atackData = undefined;
        this.damageData = undefined;

        var rnd = Phaser.Math.Between(0, this.data.offAbilities.length - 1);
        this.turnAtackAbilities.push(this.data.offAbilities[rnd]);

        var rnd = Phaser.Math.Between(0, this.data.defAbilities.length - 1);
        this.turnDefenceAbilities.push(this.data.defAbilities[rnd]);

    }


}