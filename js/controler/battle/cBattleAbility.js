var enBattleAbilities;
(function (enBattleAbilities) {
    enBattleAbilities[enBattleAbilities["dodge"] = 0] = "dodge";
    enBattleAbilities[enBattleAbilities["defendBoat"] = 1] = "defendBoat";
    enBattleAbilities[enBattleAbilities["defendCrew"] = 2] = "defendCrew";
    enBattleAbilities[enBattleAbilities["arrows"] = 3] = "arrows";
    enBattleAbilities[enBattleAbilities["cannons"] = 4] = "cannons";
    enBattleAbilities[enBattleAbilities["axes"] = 5] = "axes";
    enBattleAbilities[enBattleAbilities["updateAtack"] = 6] = "updateAtack";
    enBattleAbilities[enBattleAbilities["noAtack"] = 7] = "noAtack";
    enBattleAbilities[enBattleAbilities["noDefense"] = 8] = "noDefense";
})(enBattleAbilities || (enBattleAbilities = {}));
var cBattleAbility = (function () {
    function cBattleAbility(id, lvl, prob, value) {
        this.id = id;
        this.lvl = lvl;
        this.prob = prob;
        this.value = value;
        this.isAtack = false;
        this.isDef = false;
        this.defineAbilityType();
    }
    cBattleAbility.prototype.defineAbilityType = function () {
        switch (this.id) {
            case enBattleAbilities.dodge:
            case enBattleAbilities.defendCrew:
            case enBattleAbilities.defendBoat:
            case enBattleAbilities.noDefense:
                this.isDef = true;
                break;
            case enBattleAbilities.arrows:
            case enBattleAbilities.cannons:
            case enBattleAbilities.axes:
            case enBattleAbilities.updateAtack:
            case enBattleAbilities.noAtack:
                this.isAtack = true;
                break;
        }
    };
    return cBattleAbility;
}());
