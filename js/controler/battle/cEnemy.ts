class cEnemy{

    public mant:number = 100;
    public crew:number = 10;
    public poss:Phaser.Geom.Point;
    public selRect:Phaser.Geom.Rectangle;

    constructor(data:any) {

        this.mant = data.mant;
        this.crew = data.crew;
        this.poss = new Phaser.Geom.Point(data.x, data.y);
        this.selRect = new Phaser.Geom.Rectangle(data.rectX, data.rectY, data.rectWidth, data.rectHeight);

    }


}