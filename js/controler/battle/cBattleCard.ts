class cBattleCard {

    public id:number ;
    public atackAbilities:cBattleAbility[] = [];
    public defendAbilities:cBattleAbility[] = [];

    constructor(data:any) {

        this.id = data.id;

        data.abilities.forEach(e => {

            switch (e.id) {
                case 0:
                case 1:
                case 2:
                    this.defendAbilities.push(new cBattleAbility(e.id, e.lvl));
                break;
                default:
                    this.atackAbilities.push(new cBattleAbility(e.id, e.lvl));
                break;
            }

        });

    }

}