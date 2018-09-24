var vBattleIcons = (function () {
    function vBattleIcons(scene, actorSprite, actorContainer, isEnemy) {
        this.scene = scene;
        this.actorSprite = actorSprite;
        this.actorContainer = actorContainer;
        this.isEnemy = isEnemy;
        this.arrayDefSprite = [];
        this.arrayOffSprite = [];
        this.arrayIdAbility = [];
        this.container = this.scene.add.container(this.actorContainer.x, this.actorContainer.y - this.actorSprite.height / 2 - 30);
        //lets add some animation to the container
        this.moveTween = this.scene.tweens.add({
            targets: this.container,
            y: this.container.y - 10,
            duration: 1000,
            ease: 'Power2',
            yoyo: true,
            repeat: -1
        });
        this.initHitAnim('battle_crewHit');
        this.initHitAnim('battle_boatHit');
    }
    vBattleIcons.prototype.initHitAnim = function (animName) {
        var config = {
            key: animName,
            frames: this.scene.anims.generateFrameNumbers(animName, { start: 0 }),
            frameRate: 20
        };
        this.scene.anims.create(config);
    };
    vBattleIcons.prototype.loadAtackIntention = function (data) {
        this.loadIddleIcon(data, this.arrayOffSprite);
    };
    vBattleIcons.prototype.loadIddleIcon = function (data, toArray) {
        var _this = this;
        //lets create one icon for each iconNumber
        data.forEach(function (e) {
            var sprite = _this.scene.add.sprite(0, 0, 'battle_icons', e.id);
            toArray.push(sprite);
            _this.arrayIdAbility[e.id] = sprite;
            _this.container.add(sprite);
        });
        //lets put the icons in the right place
        if (data.length == 2) {
            toArray[0].x -= toArray[0].width / 2 + 15;
            toArray[1].x += toArray[1].width / 2 + 15;
        }
        else if (data.length == 3) {
        }
    };
    vBattleIcons.prototype.checkDefIconAnim = function (damageData) {
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
    };
    vBattleIcons.prototype.animateHit = function (animName) {
        var boom = this.scene.add.sprite(0, 0, animName);
        boom.anims.play(animName);
        this.actorContainer.add(boom);
    };
    vBattleIcons.prototype.activateAtackIcon = function (data) {
        this.loadIddleIcon(data, this.arrayOffSprite);
        this.scene.time.delayedCall(1000, this.animateOffIcon, [], this);
    };
    vBattleIcons.prototype.activateDefensiveIcons = function (data) {
        this.loadIddleIcon(data, this.arrayDefSprite);
        this.scene.time.delayedCall(1000, this.animateDefIcon, [], this);
    };
    vBattleIcons.prototype.hideIddleIcon = function () {
        var _this = this;
        this.arrayOffSprite.forEach(function (e) {
            _this.scene.tweens.add({
                targets: e,
                alpha: 0,
                duration: 200,
                ease: 'Power2'
            });
        });
    };
    vBattleIcons.prototype.animationDefIcon = function (id) {
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
    };
    vBattleIcons.prototype.animateDefIcon = function () {
        var _this = this;
        var xActor = 0;
        //to move to the right size
        if (this.isEnemy == true) {
            xActor = -this.actorSprite.width / 2;
        }
        else {
            xActor = +this.actorSprite.width / 2;
        }
        console.log(xActor);
        this.arrayDefSprite.forEach(function (e) {
            var t = _this.scene.tweens.add({
                targets: _this.arrayDefSprite,
                x: xActor,
                duration: 500,
                ease: 'Power2'
            });
        });
    };
    vBattleIcons.prototype.animateOffIcon = function () {
        var _this = this;
        this.arrayOffSprite.forEach(function (sprite) {
            var t = _this.scene.tweens.add({
                targets: sprite,
                scaleX: 1.5,
                scaleY: 1.5,
                duration: 400,
                ease: 'Linear',
            });
            var t = _this.scene.tweens.add({
                targets: sprite,
                alpha: 0,
                duration: 300,
                ease: 'Linear',
                delay: 600
            });
        });
    };
    vBattleIcons.prototype.killIcons = function () {
        var _this = this;
        this.arrayOffSprite.forEach(function (e) {
            _this.scene.tweens.add({
                targets: e,
                alpha: 0,
                duration: 300,
                ease: 'Linear',
                delay: 900
            });
        });
        this.arrayDefSprite.forEach(function (e) {
            _this.scene.tweens.add({
                targets: e,
                alpha: 0,
                duration: 300,
                ease: 'Linear',
                delay: 900
            });
        });
        this.scene.time.delayedCall(400, this.destroyIcons, [], this);
    };
    vBattleIcons.prototype.destroyIcons = function () {
        this.arrayOffSprite.forEach(function (e) {
            e.destroy();
        });
        this.arrayDefSprite.forEach(function (e) {
            e.destroy();
        });
        this.arrayDefSprite = [];
        this.arrayOffSprite = [];
        this.arrayIdAbility = [];
    };
    return vBattleIcons;
}());
