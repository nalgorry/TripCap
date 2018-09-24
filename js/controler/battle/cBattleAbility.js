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
    }
    return cBattleAbility;
}());
