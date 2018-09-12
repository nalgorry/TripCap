class cEnemy{

    public maxMant:number = 100;
    public maxCrew:number = 10;
    public mant:number = 10;
    public crew = 4;
    public x:number;
    public y:number;
    public selRect:Phaser.Geom.Rectangle;
    public spriteName:string;
    public avaibleAtackAbilities:cBattleAbility[] = [];
    public avaibleDefenceAbilities:cBattleAbility[] = [];
    public atackAbilities:cBattleAbility[] = [];
    public defenceAbilities:cBattleAbility[] = [];
    public isDead = false;

    constructor(data:any) {

        this.x  = data.x ;
        this.y = data.y;
        this.selRect = new Phaser.Geom.Rectangle(data.rectX, data.rectY, data.rectWidth, data.rectHeight);
        this.spriteName = "enemy_1";

        this.defineAvaibleAbilities();

        this.defineAbilities();
    }

    private defineAvaibleAbilities() {
        this.avaibleAtackAbilities.push(new cBattleAbility(enBattleAbilities.arrows, 1));
        this.avaibleAtackAbilities.push(new cBattleAbility(enBattleAbilities.cannons, 1));
        this.avaibleAtackAbilities.push(new cBattleAbility(enBattleAbilities.axes, 1));
        this.avaibleAtackAbilities.push(new cBattleAbility(enBattleAbilities.noAtack, 1));

        this.avaibleDefenceAbilities.push(new cBattleAbility(enBattleAbilities.defendBoat, 1));
        this.avaibleDefenceAbilities.push(new cBattleAbility(enBattleAbilities.defendCrew, 1));
        this.avaibleDefenceAbilities.push(new cBattleAbility(enBattleAbilities.defendBoat, 1));
        this.avaibleDefenceAbilities.push(new cBattleAbility(enBattleAbilities.noDefense, 1));

    }

    public defineAbilities() {

        this.atackAbilities = [];
        this.defenceAbilities = [];

        var rnd = Phaser.Math.Between(0, this.avaibleAtackAbilities.length - 1);
        this.atackAbilities.push(this.avaibleAtackAbilities[rnd]);

        var rnd = Phaser.Math.Between(0, this.avaibleDefenceAbilities.length - 1);
        this.defenceAbilities.push(this.avaibleDefenceAbilities[rnd]);

    }


}