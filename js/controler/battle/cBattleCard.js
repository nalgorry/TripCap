var cBattleCard = (function () {
    function cBattleCard(id, abilities) {
        var _this = this;
        this.atackAbilities = [];
        this.defendAbilities = [];
        this.hasAtack = false;
        this.hasDef = false;
        this.id = id;
        abilities.forEach(function (e) {
            if (e.isAtack == true) {
                _this.atackAbilities.push(e);
                _this.hasAtack = true;
            }
            else if (e.isDef == true) {
                _this.defendAbilities.push(e);
                _this.hasDef = true;
            }
        });
        this.numAbilities = this.atackAbilities.length + this.defendAbilities.length;
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
