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
    vBattleIcons.prototype.loadIntention = function (data) {
        this.loadIddleIcon(data);
    };
    vBattleIcons.prototype.loadIddleIcon = function (data) {
        var _this = this;
        var iconSprites = [];
        //lets create one icon for each iconNumber
        data.forEach(function (e) {
            var sprite = _this.scene.add.sprite(0, 0, 'battle_icons', e.id);
            if (e.isDef == true) {
                _this.arrayDefSprite.push(sprite);
            }
            else if (e.isAtack == true) {
                _this.arrayOffSprite.push(sprite);
            }
            _this.arrayIdAbility[e.id] = sprite;
            iconSprites.push(sprite);
            _this.container.add(sprite);
        });
        //lets put the icons in the right place
        if (data.length == 2) {
            iconSprites[0].x -= iconSprites[0].width / 2 + 15;
            iconSprites[1].x += iconSprites[1].width / 2 + 15;
        }
        else if (data.length == 3) {
        }
    };
    vBattleIcons.prototype.checkDefIconAnim = function (damageData) {
        if (damageData != undefined) {
            //lets check if we have to animate the defence icons (if the do something)
            if (damageData.boatDefended == true) {
                this.activateDefIcon(enBattleAbilities.defendBoat);
            }
            if (damageData.crewDefended == true) {
                this.activateDefIcon(enBattleAbilities.defendCrew);
            }
            if (damageData.missAtack == true) {
                this.activateDefIcon(enBattleAbilities.dodge);
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
        if (data === void 0) { data = undefined; }
        if (data != undefined) {
            this.loadIddleIcon(data);
        }
        this.scene.time.delayedCall(500, this.animateOffIcon, [], this);
    };
    vBattleIcons.prototype.activateDefensiveIcons = function (data) {
        if (data === void 0) { data = undefined; }
        if (data != undefined) {
            this.loadIddleIcon(data);
        }
        this.scene.time.delayedCall(100, this.animateDefIcon, [], this);
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
    vBattleIcons.prototype.activateDefIcon = function (id) {
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
