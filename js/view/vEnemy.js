var vEnemy = (function () {
    function vEnemy(scene, data) {
        this.scene = scene;
        this.data = data;
        this.initEnemy();
    }
    vEnemy.prototype.initEnemy = function () {
        this.container = this.scene.add.container(this.data.x, this.data.y);
        this.sprite = this.scene.add.sprite(0, 0, this.data.spriteName);
        this.container.add(this.sprite);
        this.showAtackIcon();
    };
    vEnemy.prototype.showAtackIcon = function () {
        this.actionIcon = new vBattleIcons(this.scene, this.sprite, this.container);
        this.actionIcon.loadIddleIcon(enBattleAbilities.arrows);
    };
    return vEnemy;
}());
