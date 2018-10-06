var vBattleAbility = (function () {
    function vBattleAbility(scene, x, y, spriteName, ability) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.spriteName = spriteName;
        this.ability = ability;
        this.init();
        this.initLvl();
    }
    vBattleAbility.prototype.initLvl = function () {
        //lets avoid the noAtack for this
        if (this.ability.id == enBattleAbilities.noAtack)
            return;
        if (this.ability.id == enBattleAbilities.noDefense)
            return;
        //lets define the color
        var color;
        if (this.ability.isAtack == true) {
            color = 0x540505;
        }
        if (this.ability.isDef == true) {
            color = 0x035003;
        }
        //lest create the circles acording the lvl of the ability
        var sep = 15;
        var lvl = this.ability.lvl;
        //tree circles = 1 star
        var starsNum = Math.floor(lvl / 3);
        var circleNum = lvl - starsNum * 3;
        var numPoints = starsNum + circleNum;
        for (var i = 0; i < numPoints; i++) {
            var x = sep / 2 * (i * 2 + 1 - numPoints);
            if (i < starsNum) {
                var star = this.scene.add.star(x, this.sprite.height / 2 + 8, 5, 4, 10, color);
                star.setOrigin(0.5);
                this.cont.add(star);
            }
            else {
                var circle = this.scene.add.circle(x, this.sprite.height / 2 + 8, 5, color);
                circle.setOrigin(0.5);
                this.cont.add(circle);
            }
        }
    };
    vBattleAbility.prototype.init = function () {
        this.cont = this.scene.add.container(this.x, this.y);
        this.sprite = this.scene.add.sprite(0, 0, this.spriteName, this.ability.id);
        this.cont.add(this.sprite);
    };
    vBattleAbility.prototype.destroy = function () {
        this.sprite.destroy();
        this.cont.destroy();
    };
    return vBattleAbility;
}());
