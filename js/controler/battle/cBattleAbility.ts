enum enBattleAbilities {
    dodge = 0,
    defendBoat = 1,
    defendCrew = 2,
    arrows = 3,
    cannons = 4,
    axes = 5,
    updateAtack = 6,
    noAtack = 7,
    noDefense = 8
}


class cBattleAbility {

    public isAtack:boolean = false;
    public isDef:boolean = false;

    constructor(
        public id:enBattleAbilities, 
        public lvl:number,
        public prob:number,
        public value:number) {

            this.defineAbilityType();
    }


    private defineAbilityType() {
        switch (this.id) {
            case enBattleAbilities.dodge:
            case enBattleAbilities.defendCrew:
            case enBattleAbilities.defendBoat:
            case enBattleAbilities.noDefense:
                this.isDef = true;
            break;
            case enBattleAbilities.arrows:
            case enBattleAbilities.cannons:
            case enBattleAbilities.axes:
            case enBattleAbilities.updateAtack:
            case enBattleAbilities.noAtack:
                this.isAtack = true;
            break;
        }
    }

    


}