class mEnemy {

    public id:number;
    public spriteName:string;
    public maxMant:number;
    public maxCrew:number;
    public offAbilities:cBattleAbility[] = [];
    public defAbilities:cBattleAbility[] = [];


    constructor(JSONdata:any) {

        this.id = JSONdata.id;
        this.spriteName = JSONdata.spriteName;
        this.maxMant = JSONdata.maxMant;
        this.maxCrew = JSONdata.maxCrew;

        console.log(JSONdata.offAbilities);

        JSONdata.offAbilities.forEach(e => {
            this.offAbilities.push(new cBattleAbility(e.id, e.lvl, e.prob, e.value))
        });

        JSONdata.defAbilities.forEach(e => {
            this.defAbilities.push(new cBattleAbility(e.id, e.lvl, e.prob, e.value))
        });


    }


}