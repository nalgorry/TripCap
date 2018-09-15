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

        if (this.data.damageData != undefined) {

            //lets check if we have to animate the defence icons (if the do something)
            if (this.data.damageData.boatDefended == true) {
                console.log("boat def");
                this.actionIcon.animationDefIcon(enBattleAbilities.defendBoat);
            }

            if (this.data.damageData.crewDefended == true) {
                console.log("crew def");
                this.actionIcon.animationDefIcon(enBattleAbilities.defendCrew);
            }

            if (this.data.damageData.missAtack == true) {
                console.log("crew def");
                this.actionIcon.animationDefIcon(enBattleAbilities.dodge);
            }

            //lets put the hit animation 
            if (this.data.damageData.crewDamage > 0) {
                this.animateHit('battle_crewHit');
            }

            if (this.data.damageData.boatDamage > 0) {
                this.animateHit('battle_boatHit');
            }

        }
    }

    private animateHit(animName:string) {
        var config = {
            key: animName,
            frames: this.scene.anims.generateFrameNumbers(animName, {start: 0}),
            frameRate: 20
        };

        this.scene.anims.create(config);
    
        var boom = this.scene.add.sprite(0, 0, animName);

        boom.anims.play(animName);

        this.container.add(boom);

    }

    private showAtackIcon() {

        this.actionIcon = new vBattleIcons(this.scene, this.sprite, this.container, true);
        this.actionIcon.loadAtackIntention(this.data.atackAbilities);

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