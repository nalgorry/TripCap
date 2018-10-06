class cBattleCard {

    public id:number ;
    public atackAbilities:cBattleAbility[] = [];
    public defendAbilities:cBattleAbility[] = [];
    public numAbilities:number; 
    public hasAtack:boolean = false;
    public hasDef:boolean = false;

    constructor(data:any) {

        this.id = data.id;

        data.abilities.forEach(e => {

            var ability = new cBattleAbility(e.id, e.lvl, 100, 10)

            if (ability.isAtack == true) {
                this.atackAbilities.push(ability);
                this.hasAtack = true;
            } else if (ability.isDef == true) {
                this.defendAbilities.push(ability);
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