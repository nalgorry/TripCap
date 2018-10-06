class vBattleAbility {

    public cont:Phaser.GameObjects.Container;
    public sprite:Phaser.GameObjects.Sprite;

    constructor(
        public scene:Phaser.Scene,
        public x:number,
        public y:number, 
        public spriteName:string,
        public ability:cBattleAbility
    ) {

        this.init();

        this.initLvl()

        

    }

    private initLvl() {

        //lets avoid the noAtack for this
        if (this.ability.id == enBattleAbilities.noAtack) return;
        if (this.ability.id == enBattleAbilities.noDefense) return;

        //lets define the color
        var color:number;
        if (this.ability.isAtack == true) {
            color = 0x540505;
        }

        if (this.ability.isDef == true) {
            color = 0x035003;
        }

        //lest create the circles acording the lvl of the ability

        var sep:number = 15;
        var lvl:number = this.ability.lvl;
        
        //tree circles = 1 star
        var starsNum:number = Math.floor(lvl/3);
        var circleNum:number = lvl - starsNum*3;
        var numPoints:number = starsNum + circleNum;

        for (var i=0;i<numPoints;i++) {

            var x:number = sep/2 * ( i*2 + 1 - numPoints );

            if (i<starsNum) {
                var star = this.scene.add.star(x, this.sprite.height/2 + 8, 5, 4, 10, color);
                star.setOrigin(0.5);
                this.cont.add(star);
            } else {
                var circle = this.scene.add.circle(x, this.sprite.height/2 + 8, 5, color);
                circle.setOrigin(0.5);
                this.cont.add(circle);
            }
            
        }

    }

    private init() {
        this.cont = this.scene.add.container(this.x, this.y);

        this.sprite = this.scene.add.sprite(0, 0, this.spriteName, this.ability.id)

        this.cont.add(this.sprite);
    }

    public destroy() {
        this.sprite.destroy();
        this.cont.destroy();
    }

}