class vBattleIcons {

    public container:Phaser.GameObjects.Container;
    public arrayDefSprite:Phaser.GameObjects.Sprite[] = [];
    public arrayOffSprite:Phaser.GameObjects.Sprite[] = [];
    public arrayIdAbility:Phaser.GameObjects.Sprite[] = [];

    private moveTween:Phaser.Tweens.Tween;

    constructor(public scene:Phaser.Scene,
    public actorSprite:Phaser.GameObjects.Sprite,
    public actorContainer:Phaser.GameObjects.Container,
    public isEnemy:boolean) {

        this.container = this.scene.add.container(this.actorContainer.x, this.actorContainer.y - this.actorSprite.height/2 - 30);

        //lets add some animation to the container
        this.moveTween = this.scene.tweens.add({
            targets: this.container,
            y: this.container.y -10,
            duration: 1000,
            ease: 'Power2',
            yoyo: true,
            repeat: -1
            });

        this.initHitAnim('battle_crewHit');
        this.initHitAnim('battle_boatHit');
        

    }

    private initHitAnim(animName:string) {
        var config = {
            key: animName,
            frames: this.scene.anims.generateFrameNumbers(animName, {start: 0}),
            frameRate: 20
        };

        this.scene.anims.create(config);
    }

    public loadAtackIntention(data:cBattleAbility[]) {
        this.loadIddleIcon(data, this.arrayOffSprite);
    }

    private loadIddleIcon(data:cBattleAbility[], toArray:Phaser.GameObjects.Sprite[]) {

        //lets create one icon for each iconNumber
        data.forEach(e => {
            var sprite = this.scene.add.sprite(0, 0, 'battle_icons', e.id)
            toArray.push(sprite);

            this.arrayIdAbility[e.id] = sprite;

            this.container.add(sprite);

        });

        //lets put the icons in the right place
        if (data.length == 2) {
            toArray[0].x -= toArray[0].width/2 + 15;
            toArray[1].x += toArray[1].width/2 + 15;
        } else if (data.length == 3) {

        }

    }

    public checkDefIconAnim(damageData:cProcessAtack) {

        if (damageData != undefined) {

            //lets check if we have to animate the defence icons (if the do something)
            if (damageData.boatDefended == true) {
                this.animationDefIcon(enBattleAbilities.defendBoat);
            }

            if (damageData.crewDefended == true) {
                this.animationDefIcon(enBattleAbilities.defendCrew);
            }

            if (damageData.missAtack == true) {
                this.animationDefIcon(enBattleAbilities.dodge);
            }

            //lets put the hit animation 
            if (damageData.crewDamage > 0) {
                this.animateHit('battle_crewHit');
            }

            if (damageData.boatDamage > 0) {
                this.animateHit('battle_boatHit');
            }

        }
    }

    private animateHit(animName:string) {
    
        var boom = this.scene.add.sprite(0, 0, animName);

        boom.anims.play(animName);

        this.actorContainer.add(boom);

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

    public animationDefIcon(id:enBattleAbilities) {

        console.log("llega hasta aca");

        var sprite = this.arrayIdAbility[id];

        var t = this.scene.tweens.add({
            targets: sprite,
            scaleX: 1.5,
            scaleY: 1.5,
            duration: 400,
            ease: 'Power2',
        });

        var t = this.scene.tweens.add({
            targets: sprite,
            scaleX: 1,
            scaleY: 1,
            duration: 400,
            ease: 'Power2',
            delay: 600
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
        this.arrayIdAbility = [];
    }



}