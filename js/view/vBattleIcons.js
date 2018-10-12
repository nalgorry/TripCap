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
            var vAbility = new vBattleAbility(_this.scene, 0, 0, 'battle_idle_icons', e);
            vAbility.cont.alpha = 0;
            var t = _this.scene.tweens.add({
                targets: vAbility.cont,
                alpha: 1,
                duration: 500,
                ease: 'Power2',
            });
            if (e.isDef == true) {
                _this.arrayDefSprite.push(vAbility);
            }
            else if (e.isAtack == true) {
                _this.arrayOffSprite.push(vAbility);
            }
            _this.arrayIdAbility[e.id] = vAbility;
            iconSprites.push(vAbility);
            _this.container.add(vAbility.cont);
        });
        //lets put the icons in the right place
        if (data.length == 2) {
            iconSprites[0].cont.x -= iconSprites[0].sprite.width / 2 + 15;
            iconSprites[1].cont.x += iconSprites[1].sprite.width / 2 + 15;
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
                var delay = 0;
                if (damageData.boatDamage > 0) {
                    delay = 600;
                }
                this.animateHit('battle_crewHit', damageData.crewDamage, delay);
            }
            if (damageData.boatDamage > 0) {
                this.animateHit('battle_boatHit', damageData.boatDamage, 0);
            }
        }
    };
    vBattleIcons.prototype.animateHit = function (animName, damage, delay) {
        //create the animation of the hit
        var boom = this.scene.add.sprite(0, 0, animName);
        boom.anims.play(animName);
        this.actorContainer.add(boom);
        //lets show the damage done
        if (animName == 'battle_boatHit') {
            this.showDamage('boatDamage', damage, 60, 0);
        }
        else if (animName == 'battle_crewHit') {
            this.showDamage('crewDamage', damage, -60, delay);
        }
    };
    vBattleIcons.prototype.showDamage = function (spriteName, damage, xOffset, delay) {
        //lets create the container
        var damContainer = this.scene.add.container(xOffset, 20);
        this.actorContainer.add(damContainer);
        //lets add a image of what was damage
        var s = this.scene.add.sprite(0, 0, spriteName);
        damContainer.add(s);
        //lets show the damage value
        var damText = this.scene.add.bitmapText(-40, 0, 'PfontRed', "-" + damage.toString(), 30);
        damText.setOrigin(0.5);
        damContainer.add(damText);
        var t = this.scene.tweens.add({
            targets: damContainer,
            y: s.y - 40,
            duration: 2500,
            ease: 'Power2',
            delay: delay
        });
        this.scene.time.delayedCall(2500 + delay, this.hideDamage, [damContainer], this);
    };
    vBattleIcons.prototype.hideDamage = function (data) {
        var damContainer = data;
        var t = this.scene.tweens.add({
            targets: damContainer,
            alpha: 0,
            duration: 1200,
            ease: 'Power2',
        });
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
                targets: e.cont,
                alpha: 0,
                duration: 200,
                ease: 'Power2'
            });
        });
    };
    vBattleIcons.prototype.activateDefIcon = function (id) {
        var cont = this.arrayIdAbility[id].cont;
        var t = this.scene.tweens.add({
            targets: cont,
            scaleX: 1.5,
            scaleY: 1.5,
            duration: 400,
            ease: 'Power2',
        });
        var t = this.scene.tweens.add({
            targets: cont,
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
        this.arrayDefSprite.forEach(function (e) {
            var t = _this.scene.tweens.add({
                targets: e.cont,
                x: xActor,
                duration: 500,
                ease: 'Power2'
            });
        });
    };
    vBattleIcons.prototype.animateOffIcon = function () {
        var _this = this;
        this.arrayOffSprite.forEach(function (vAbility) {
            var t = _this.scene.tweens.add({
                targets: vAbility.cont,
                scaleX: 1.5,
                scaleY: 1.5,
                duration: 400,
                ease: 'Linear',
            });
            var t = _this.scene.tweens.add({
                targets: vAbility.cont,
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
                targets: e.cont,
                alpha: 0,
                duration: 300,
                ease: 'Linear',
                delay: 900
            });
        });
        this.arrayDefSprite.forEach(function (e) {
            _this.scene.tweens.add({
                targets: e.cont,
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
