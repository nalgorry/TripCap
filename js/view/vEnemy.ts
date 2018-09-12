class vEnemy {

    public container:Phaser.GameObjects.Container;
    public sprite:Phaser.GameObjects.Sprite;

    public mantBar:vEnemyBar;
    public crewBar:vEnemyBar;

    public actionIcon:vBattleIcons;
   

    constructor(public scene:Phaser.Scene, 
        public data:cEnemy ) {

            this.initEnemy();


    }

    private initEnemy() {

        this.container = this.scene.add.container(this.data.x, this.data.y);
        this.sprite = this.scene.add.sprite(0, 0, this.data.spriteName);
        this.container.add(this.sprite);

        this.showAtackIcon()

        console.log(this.data);

        this.mantBar = new vEnemyBar(this.scene, 
            -76 - 10,
            this.sprite.height / 2 + 10,
            0x1ab500, 
            this.container,
            this.data.maxMant,
            this.data.mant);

        this.crewBar = new vEnemyBar(this.scene, 
            10 , 
            this.sprite.height / 2 + 10,
            0x005cb5,
            this.container,
            this.data.maxCrew,
            this.data.crew);


    }

    public updateBars() {
        this.mantBar.updateBar(this.data.mant);
        this.crewBar.updateBar(this.data.crew);
    }

    private showAtackIcon() {

        this.actionIcon = new vBattleIcons(this.scene, this.sprite, this.container);
        this.actionIcon.loadIddleIcon(this.data.atackAbilities);

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