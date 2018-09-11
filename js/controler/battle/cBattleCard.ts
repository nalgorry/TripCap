class cBattleCard {

    public id:number ;
    public atackAbilities:cBattleAbility[] = [];
    public defendAbilities:cBattleAbility[] = [];

    constructor(data:any) {

        this.id = data.id;

        data.abilities.forEach(e => {

            switch (e.id) {
                case enBattleAbilities.dodge:
                case enBattleAbilities.defendCrew:
                case enBattleAbilities.defendBoat:
                    this.defendAbilities.push(new cBattleAbility(e.id, e.lvl));
                break;
                case enBattleAbilities.arrows:
                case enBattleAbilities.cannons:
                case enBattleAbilities.axes:
                case enBattleAbilities.updateAtack:
                    this.atackAbilities.push(new cBattleAbility(e.id, e.lvl));
                break;
            }

        });

        //lets put the no atack if needed
        if (this.atackAbilities.length == 0) {
            this.atackAbilities.push(new cBattleAbility(enBattleAbilities.noAtack,1))
        }

        if (this.defendAbilities.length == 0) {
            this.defendAbilities.push(new cBattleAbility(enBattleAbilities.noDefense,1))
        }

    }

}