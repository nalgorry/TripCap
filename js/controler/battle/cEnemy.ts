class cEnemy{

    public mant:number = 100;
    public crew:number = 10;
    public x:number;
    public y:number;
    public selRect:Phaser.Geom.Rectangle;
    public spriteName:string;
    public atackAbilities:cBattleAbility[] = [];
    public defendAbilities:cBattleAbility[] = [];

    constructor(data:any) {

        this.mant = data.mant;
        this.crew = data.crew;
        this.x  = data.x ;
        this.y = data.y;
        this.selRect = new Phaser.Geom.Rectangle(data.rectX, data.rectY, data.rectWidth, data.rectHeight);
        this.spriteName = "enemy_1";

        this.defendAbilities.push(new cBattleAbility(enBattleAbilities.defendBoat, 2))

    }


}