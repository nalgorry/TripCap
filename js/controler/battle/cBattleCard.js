var cBattleCard = (function () {
    function cBattleCard(data) {
        var _this = this;
        this.atackAbilities = [];
        this.defendAbilities = [];
        this.id = data.id;
        data.abilities.forEach(function (e) {
            switch (e.id) {
                case 0:
                case 1:
                case 2:
                    _this.defendAbilities.push(new cBattleAbility(e.id, e.lvl));
                    break;
                default:
                    _this.atackAbilities.push(new cBattleAbility(e.id, e.lvl));
                    break;
            }
        });
    }
    return cBattleCard;
}());
