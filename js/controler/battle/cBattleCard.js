var cBattleCard = (function () {
    function cBattleCard(data) {
        var _this = this;
        this.atackAbilities = [];
        this.defendAbilities = [];
        this.id = data.id;
        data.abilities.forEach(function (e) {
            var ability = new cBattleAbility(e.id, e.lvl, 100, 10);
            if (ability.isAtack == true) {
                _this.atackAbilities.push(ability);
            }
            else if (ability.isDef == true) {
                _this.defendAbilities.push(ability);
            }
        });
        //lets put the no atack if needed
        if (this.atackAbilities.length == 0) {
            this.atackAbilities.push(new cBattleAbility(enBattleAbilities.noAtack, 1, 100, 0));
        }
        if (this.defendAbilities.length == 0) {
            this.defendAbilities.push(new cBattleAbility(enBattleAbilities.noDefense, 1, 100, 0));
        }
    }
    return cBattleCard;
}());
