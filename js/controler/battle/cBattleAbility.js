var enBattleAbilities;
(function (enBattleAbilities) {
    enBattleAbilities[enBattleAbilities["dodge"] = 0] = "dodge";
    enBattleAbilities[enBattleAbilities["defendBoat"] = 1] = "defendBoat";
    enBattleAbilities[enBattleAbilities["defendCrew"] = 2] = "defendCrew";
    enBattleAbilities[enBattleAbilities["arrows"] = 3] = "arrows";
    enBattleAbilities[enBattleAbilities["cannons"] = 4] = "cannons";
    enBattleAbilities[enBattleAbilities["axes"] = 5] = "axes";
    enBattleAbilities[enBattleAbilities["updateAtack"] = 6] = "updateAtack";
})(enBattleAbilities || (enBattleAbilities = {}));
var cBattleAbility = (function () {
    function cBattleAbility(id, lvl) {
        this.id = id;
        this.lvl = lvl;
    }
    return cBattleAbility;
}());
