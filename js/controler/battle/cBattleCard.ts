class cBattleCard {

    public id:number ;
    public atackAbilities:cBattleAbility[] = [];
    public defendAbilities:cBattleAbility[] = [];
    public numAbilities:number; 
    public hasAtack:boolean = false;
    public hasDef:boolean = false;

    constructor(id:number, abilities:cBattleAbility[]) {

        this.id = id;

        abilities.forEach(e => {

            if (e.isAtack == true) {
                this.atackAbilities.push(e);
                this.hasAtack = true;
            } else if (e.isDef == true) {
                this.defendAbilities.push(e);
                this.hasDef = true;
            }
            
        });

        this.numAbilities = this.atackAbilities.length + this.defendAbilities.length;

        //lets put the no atack if needed
        if (this.atackAbilities.length == 0) {
            this.atackAbilities.push(new cBattleAbility(enBattleAbilities.noAtack,1, 100, 0))
        }

        if (this.defendAbilities.length == 0) {
            this.defendAbilities.push(new cBattleAbility(enBattleAbilities.noDefense,1, 100, 0))
        }

    }

}