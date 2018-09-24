class vEnemy {

    public container:Phaser.GameObjects.Container;
    public sprite:Phaser.GameObjects.Sprite;

    public selRect:Phaser.Geom.Rectangle;

    public mantBar:vEnemyBar;
    public crewBar:vEnemyBar;

    public actionIcon:vBattleIcons;
   

    constructor(public scene:Phaser.Scene, 
        public enemy:cEnemy ) {

            this.initEnemy();

            console.log(this);


    }

    private initEnemy() { 

        this.container = this.scene.add.container(this.enemy.x, this.enemy.y);
        this.sprite = this.scene.add.sprite(0, 0, this.enemy.data.spriteName);
        this.container.add(this.sprite);

        this.showAtackIcon();

        //lest define the bars to show the health of the enemies
        this.mantBar = new vEnemyBar(this.scene, 
            -76 - 10,
            this.sprite.height / 2 + 10,
            0x1ab500, 
            this.container,
            this.enemy.data.maxMant,
            this.enemy.mant);

        this.crewBar = new vEnemyBar(this.scene, 
            10 , 
            this.sprite.height / 2 + 10,
            0x005cb5,
            this.container,
            this.enemy.data.maxCrew,
            this.enemy.crew);

        //lets define the rect to use the cards, we have to define it in cBattle
        var marginX = 30;
        var marginY = 30;
        this.selRect = new Phaser.Geom.Rectangle(
            this.container.x - this.sprite.width / 2 - marginX, 
            this.container.y - this.sprite.height / 2 - marginY, 
            this.sprite.width + marginX * 2,
            this.sprite.height + marginY * 2);

    }

    public updateBars() {
        
        this.mantBar.updateBar(this.enemy.mant);
        this.crewBar.updateBar(this.enemy.crew);
        this.actionIcon.checkDefIconAnim(this.enemy.damageData);

    }

    private showAtackIcon() {

        this.actionIcon = new vBattleIcons(this.scene, this.sprite, this.container, true);
        this.actionIcon.loadAtackIntention(this.enemy.turnAtackAbilities);

    }

    public killEnemy() {
        var t = this.scene.tweens.add({
            targets: this.container,
            alpha: 0,
            duration: 1500,
            ease: 'Power2',
        });

        this.actionIcon.killIcons();

    }

    

    

}