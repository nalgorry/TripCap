var vEnemyBar = /** @class */ (function () {
    function vEnemyBar(scene, x, y, color, enemyContainer, maxValue, value) {
        this.scene = scene;
        this.barWidth = 76;
        this.maxValue = maxValue;
        this.value = value;
        this.barColor = color;
        this.containter = this.scene.add.container(x, y);
        enemyContainer.add(this.containter);
        this.barBack = this.scene.add.graphics();
        this.barBack.fillStyle(0x9d9d9d);
        this.barBack.fillRect(0, 0, this.barWidth, 18);
        this.barBack.fillPath();
        this.containter.add(this.barBack);
        this.bar = this.scene.add.graphics();
        this.bar.fillStyle(color);
        this.bar.fillRect(0, 0, this.barWidth, 18);
        this.bar.fillPath();
        this.containter.add(this.bar);
        this.updateBar(this.value);
    }
    vEnemyBar.prototype.updateBar = function (newValue) {
        this.bar.clear();
        this.value = newValue;
        if (this.value < 0) {
            this.value = 0;
        }
        this.bar.fillStyle(this.barColor);
        this.bar.fillRect(0, 0, this.barWidth * this.value / this.maxValue, 18);
        this.bar.fillPath();
    };
    return vEnemyBar;
}());
