class vEnemy {

    public container:Phaser.GameObjects.Container;
    public sprite:Phaser.GameObjects.Sprite;

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

    }

    private showAtackIcon() {

        this.actionIcon = new vBattleIcons(this.scene, this.sprite, this.container);
        this.actionIcon.loadIddleIcon(enBattleAbilities.arrows);

    }

}