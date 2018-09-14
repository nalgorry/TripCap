class vBattleIcons {

    public container:Phaser.GameObjects.Container;
    public arrayDefSprite:Phaser.GameObjects.Sprite[] = [];
    public arrayOffSprite:Phaser.GameObjects.Sprite[] = [];

    private moveTween:Phaser.Tweens.Tween;

    constructor(public scene:Phaser.Scene,
    public actorSprite:Phaser.GameObjects.Sprite,
    public enemyContainer:Phaser.GameObjects.Container,
    public isEnemy:boolean) {

        this.container = this.scene.add.container(this.enemyContainer.x, this.enemyContainer.y - this.actorSprite.height/2 - 30);

        //lets add some animation to the container
        this.moveTween = this.scene.tweens.add({
            targets: this.container,
            y: this.container.y -10,
            duration: 1000,
            ease: 'Power2',
            yoyo: true,
            repeat: -1
            });

    }

    public loadAtackIntention(data:cBattleAbility[]) {
        this.loadIddleIcon(data, this.arrayOffSprite);
    }

    private loadIddleIcon(data:cBattleAbility[], toArray:Phaser.GameObjects.Sprite[]) {

        //lets create one icon for each iconNumber
        data.forEach(e => {
            var sprite = this.scene.add.sprite(0, 0, 'battle_icons', e.id)

            toArray.push(sprite);
            this.container.add(sprite);

        });

        //lets put the icons in the right place
        if (data.length == 2) {
            toArray[0].x -= toArray[0].width/2 + 15;
            toArray[1].x += toArray[1].width/2 + 15;
        } else if (data.length == 3) {

        }

    }

    public activateAtackIcon(data:cBattleAbility[]) {

        this.loadIddleIcon(data, this.arrayOffSprite);

        this.scene.time.delayedCall(1000, this.animateOffIcon, [], this);
        
    }

    public activateDefensiveIcons(data:cBattleAbility[]) {
        this.loadIddleIcon(data, this.arrayDefSprite);

        this.scene.time.delayedCall(1000, this.animateDefIcon, [], this);
    }

    public hideIddleIcon() {

        this.arrayOffSprite.forEach(e => { 
            this.scene.tweens.add({
                targets: e,
                alpha: 0,
                duration: 200,
                ease: 'Power2'
            });
        });

    }

    private animateDefIcon() {

        var xActor:number = 0;
        
        //to move to the right size
        if (this.isEnemy == true) {
            xActor = - this.actorSprite.width / 2
        } else {
            xActor = + this.actorSprite.width / 2
        }

        console.log(xActor);

        this.arrayDefSprite.forEach(e => {

            var t = this.scene.tweens.add({
                targets: this.arrayDefSprite ,
                x: xActor,
                duration: 500,
                ease: 'Power2'
            });
            
        });

    }

    private  animateOffIcon() {

        this.arrayOffSprite.forEach(sprite => {

            var t = this.scene.tweens.add({
                targets: sprite,
                scaleX: 1.5,
                scaleY: 1.5,
                duration: 400,
                ease: 'Linear',
            });

            var t = this.scene.tweens.add({
                targets: sprite,
                alpha: 0,
                duration: 300,
                ease: 'Linear',
                delay: 600
            });

        });

    }

    public killIcons() {

        this.arrayOffSprite.forEach(e => { 
            this.scene.tweens.add({
                targets: e,
                alpha: 0,
                duration: 300,
                ease: 'Linear',
                delay: 900
            });
        });

        this.arrayDefSprite.forEach(e => { 
            this.scene.tweens.add({
                targets: e,
                alpha: 0,
                duration: 300,
                ease: 'Linear',
                delay: 900
            });
        });

        this.scene.time.delayedCall(400, this.destroyIcons, [], this);
    }

    private destroyIcons() {

        this.arrayOffSprite.forEach(e => { 
            e.destroy();
        });

        this.arrayDefSprite.forEach(e => { 
            e.destroy();
        });

        this.arrayDefSprite = [];
        this.arrayOffSprite = [];
    }



}