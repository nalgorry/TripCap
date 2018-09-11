var vBattleIcons = (function () {
    function vBattleIcons(scene, enemySprite, enemyContainer) {
        this.scene = scene;
        this.enemySprite = enemySprite;
        this.enemyContainer = enemyContainer;
    }
    vBattleIcons.prototype.loadIddleIcon = function (data) {
        var _this = this;
        this.container = this.scene.add.container(this.enemyContainer.x, this.enemyContainer.y - this.enemySprite.height / 2 - 30);
        this.arraySprite = [];
        //lets create one icon for each iconNumber
        data.forEach(function (e) {
            var sprite = _this.scene.add.sprite(0, 0, 'battle_icons', e.id);
            _this.arraySprite.push(sprite);
            _this.container.add(sprite);
            //lets add some animation to the icon
            _this.moveTween = _this.scene.tweens.add({
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
            this.arraySprite[0].x -= this.arraySprite[0].width / 2 + 15;
            this.arraySprite[1].x += this.arraySprite[0].width / 2 + 15;
        }
        else if (data.length == 3) {
        }
    };
    vBattleIcons.prototype.activateIcon = function (data) {
        this.loadIddleIcon(data);
        this.scene.time.delayedCall(1000, this.animateIcon, [], this);
    };
    vBattleIcons.prototype.hideIddleIcon = function () {
        var t = this.scene.tweens.add({
            targets: this.container,
            alpha: 0,
            duration: 200,
            ease: 'Power2'
        });
    };
    vBattleIcons.prototype.animateIcon = function () {
        var _this = this;
        this.moveTween.pause();
        var t = this.scene.tweens.add({
            targets: this.container,
            alpha: 1,
            duration: 500,
            ease: 'Power2'
        });
        this.arraySprite.forEach(function (sprite) {
            var t = _this.scene.tweens.add({
                targets: sprite,
                scaleX: 1.5,
                scaleY: 1.5,
                duration: 600,
                ease: 'Linear',
            });
            var t = _this.scene.tweens.add({
                targets: sprite,
                alpha: 0,
                duration: 300,
                ease: 'Linear',
                delay: 900
            });
        });
    };
    return vBattleIcons;
}());
