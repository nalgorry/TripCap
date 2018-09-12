class vBattleIcons {

    public container:Phaser.GameObjects.Container;
    public arraySprite:Phaser.GameObjects.Sprite[];

    private moveTween:Phaser.Tweens.Tween;

    constructor(public scene:Phaser.Scene,
    public enemySprite:Phaser.GameObjects.Sprite,
    public enemyContainer:Phaser.GameObjects.Container) {

    }

    public loadIddleIcon(data:cBattleAbility[]) {
        this.container = this.scene.add.container(this.enemyContainer.x, this.enemyContainer.y - this.enemySprite.height/2 - 30);

        this.arraySprite = [];

        //lets create one icon for each iconNumber
        data.forEach(e => {
            var sprite = this.scene.add.sprite(0, 0, 'battle_icons', e.id)
            this.arraySprite.push(sprite);
            this.container.add(sprite);

            //lets add some animation to the icon
            this.moveTween = this.scene.tweens.add({
            targets: sprite,
            y: -10,
            duration: 1000,
            ease: 'Power2',
            yoyo: true,
            repeat: -1
            });
        });

        //lets put the icons in the right place
        if (data.length == 2) {
            this.arraySprite[0].x -= this.arraySprite[0].width/2 + 15;
            this.arraySprite[1].x += this.arraySprite[0].width/2 + 15;
        } else if (data.length == 3) {

        }

        

    }

    public activateIcon(data:cBattleAbility[]) {

        this.loadIddleIcon(data);

        this.scene.time.delayedCall(1000, this.animateIcon, [], this);
        
    }

    public hideIddleIcon() {

        var t = this.scene.tweens.add({
            targets: this.container,
            alpha: 0,
            duration: 200,
            ease: 'Power2'
        });

    }

    private  animateIcon() {

        this.moveTween.pause();

        var t = this.scene.tweens.add({
            targets: this.container,
            alpha: 1,
            duration: 500,
            ease: 'Power2'
        });

        this.arraySprite.forEach(sprite => {

        var t = this.scene.tweens.add({
            targets: sprite,
            scaleX: 1.5,
            scaleY: 1.5,
            duration: 600,
            ease: 'Linear',
        });

        var t = this.scene.tweens.add({
            targets: sprite,
            alpha: 0,
            duration: 300,
            ease: 'Linear',
            delay: 900
        });

        });

    }

    public killIcons() {
        var t = this.scene.tweens.add({
            targets: this.container,
            alpha: 0,
            duration: 1500,
            ease: 'Power2',
        });
    }



}