var enCrewAbily;
(function (enCrewAbily) {
    enCrewAbily[enCrewAbily["sickCrew"] = 0] = "sickCrew";
    enCrewAbily[enCrewAbily["rowsEff"] = 1] = "rowsEff";
    enCrewAbily[enCrewAbily["sailsEff"] = 2] = "sailsEff";
})(enCrewAbily || (enCrewAbily = {}));
var cCrewCard = (function () {
    function cCrewCard(boat) {
        this.boat = boat;
        this.cardType = "updateCrew";
        this.isAvaible = true; //when buy, this changes to false
        this.minValue = 1;
        this.maxValue = 5;
        this.minGold = 150;
        this.maxGold = 350;
        this.minAbilityGold = 50;
        this.maxAbilityGold = 50;
        this.initCard();
    }
    cCrewCard.prototype.initCard = function () {
        var arrayPosibleEffects = new Array();
        //to select the ability
        for (var i = 0; i < Object.keys(enCrewAbily).length / 2; i++) {
            arrayPosibleEffects.push(i);
        }
        var hasAbility = Phaser.Math.Between(0, 1);
        if (hasAbility == 1) {
            //init the update cards, all uniques
            var rnd;
            rnd = Phaser.Math.Between(0, arrayPosibleEffects.length - 1);
            this.abilityOne = arrayPosibleEffects[rnd];
            this.abilityOneValue = Phaser.Math.Between(this.minValue, this.maxValue);
            arrayPosibleEffects.splice(rnd, 1);
            var hasAbilityTwo = Phaser.Math.Between(0, 3);
            if (hasAbilityTwo == 0) {
                var rnd;
                rnd = Phaser.Math.Between(0, arrayPosibleEffects.length - 1);
                this.abilityTwo = arrayPosibleEffects[rnd];
                this.abilityTwoValue = Phaser.Math.Between(this.minValue, this.maxValue);
            }
        }
        this.gold = Phaser.Math.Between(this.minGold, this.maxGold);
        if (this.abilityOne != undefined) {
            this.gold += this.abilityOneValue * Phaser.Math.Between(this.minAbilityGold, this.maxAbilityGold);
        }
        if (this.abilityTwo != undefined) {
            this.gold += this.abilityTwoValue * Phaser.Math.Between(this.minAbilityGold, this.maxAbilityGold);
        }
    };
    cCrewCard.prototype.getAbilityName = function (abilityNumber) {
        var variable;
        if (abilityNumber == 1) {
            variable = this.abilityOne;
        }
        else {
            variable = this.abilityTwo;
        }
        switch (variable) {
            case enCrewAbily.sickCrew:
                return "- Enfermos";
            case enCrewAbily.sailsEff:
                return "Efic. Velas";
            case enCrewAbily.rowsEff:
                return "Efic. Remos";
            default:
                break;
        }
    };
    cCrewCard.prototype.buy = function () {
        this.isAvaible = false;
        this.boat.gold -= this.gold;
        this.boat.crewman += 1;
        //lets add the efect of the buy if needed
    };
    return cCrewCard;
}());
