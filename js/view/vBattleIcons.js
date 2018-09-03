var vBattleIcons = (function () {
    function vBattleIcons(scene, enemySprite, enemyContainer) {
        this.scene = scene;
        this.enemySprite = enemySprite;
        this.enemyContainer = enemyContainer;
    }
    vBattleIcons.prototype.loadIddleIcon = function (iconNumber) {
        this.container = this.scene.add.container(this.enemyContainer.x, this.enemyContainer.y - this.enemySprite.height / 2 - 30);
        console.log(this.enemyContainer.height / 2);
        this.sprite = this.scene.add.sprite(0, 0, 'battle_icons', iconNumber);
        this.container.add(this.sprite);
        //lets add some animation to the icon
        this.moveTween = this.scene.tweens.add({
            targets: this.sprite,
            y: -10,
            duration: 1000,
            ease: 'Power2',
            yoyo: true,
            repeat: -1
        });
    };
    vBattleIcons.prototype.activateIcon = function (iconNumber) {
        this.loadIddleIcon(iconNumber);
        this.scene.time.delayedCall(1000, this.animateIcon, [], this);
    };
    vBattleIcons.prototype.animateIcon = function () {
        this.moveTween.pause();
        var t = this.scene.tweens.add({
            targets: this.sprite,
            scaleX: 1.5,
            scaleY: 1.5,
            duration: 800,
            ease: 'Linear',
        });
        var t = this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0,
            duration: 300,
            ease: 'Linear',
            delay: 900
        });
    };
    return vBattleIcons;
}());
