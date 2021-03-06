var mEnemy = /** @class */ (function () {
    function mEnemy(JSONdata) {
        var _this = this;
        this.offAbilities = [];
        this.defAbilities = [];
        this.id = JSONdata.id;
        this.spriteName = JSONdata.spriteName;
        this.maxMant = JSONdata.maxMant;
        this.maxCrew = JSONdata.maxCrew;
        this.minMant = JSONdata.minMant;
        this.minCrew = JSONdata.minCrew;
        JSONdata.offAbilities.forEach(function (e) {
            _this.offAbilities.push(new cBattleAbility(e.id, e.lvl, e.prob, e.value));
        });
        JSONdata.defAbilities.forEach(function (e) {
            _this.defAbilities.push(new cBattleAbility(e.id, e.lvl, e.prob, e.value));
        });
    }
    return mEnemy;
}());
