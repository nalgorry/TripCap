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
        console.log(this.data);
        this.mantBar = new vEnemyBar(this.scene, -76 - 10, this.sprite.height / 2 + 10, 0x1ab500, this.container, this.data.maxMant, this.data.mant);
        this.crewBar = new vEnemyBar(this.scene, 10, this.sprite.height / 2 + 10, 0x005cb5, this.container, this.data.maxCrew, this.data.crew);
    };
    vEnemy.prototype.updateBars = function () {
        this.mantBar.updateBar(this.data.mant);
        this.crewBar.updateBar(this.data.crew);
    };
    vEnemy.prototype.showAtackIcon = function () {
        this.actionIcon = new vBattleIcons(this.scene, this.sprite, this.container);
        this.actionIcon.loadIddleIcon(this.data.atackAbilities);
    };
    return vEnemy;
}());
