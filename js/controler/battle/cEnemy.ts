class cEnemy{

    public mant:number;
    public crew;
    public turnAtackAbilities:cBattleAbility[] = [];
    public turnDefenceAbilities:cBattleAbility[] = [];
    public isDead = false;
    public atackData:cProcessAtack; //the atack done but this enemy
    public damageData:cProcessAtack; //the atack done to this enemy
    

    constructor(public data:mEnemy, public x:number, public y:number) {

        this.mant = Phaser.Math.Between(data.minMant, data.maxMant);
        this.crew = Phaser.Math.Between(data.minCrew, data.maxCrew);

        this.defineTurnAbilities();
    }

    public defineTurnAbilities() {

        //TODO this should use the % of each ability to chose

        this.turnAtackAbilities = [];
        this.turnDefenceAbilities = [];

        this.atackData = undefined;
        this.damageData = undefined;

        //lets define the new abilites
        this.turnAtackAbilities.push(this.selectRandomAbility(this.data.offAbilities));
        this.turnDefenceAbilities.push(this.selectRandomAbility(this.data.defAbilities));

    }

    private selectRandomAbility(array:cBattleAbility[]):cBattleAbility {
        var selectedResult:cBattleAbility;
        var rand = Phaser.Math.Between(0, 100);
        var probAcum:number = 0;
        
        array.some(function(element) {
            probAcum += element.prob;
            
            if (rand  <= probAcum  ) {
                selectedResult = element;
                return true //this stop the loop
            }
        });

        return selectedResult
    }


}