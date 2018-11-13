var cProcessAtack = /** @class */ (function () {
    function cProcessAtack(atackerAbilites, defenderAbilites, lastTurnData) {
        var _this = this;
        //atack results
        this.boatDamage = 0;
        this.crewDamage = 0;
        this.missAtack = false;
        this.boatDefended = false;
        this.crewDefended = false;
        this.nextTurnAtackMult = 1;
        this.boatDefense = 0;
        this.crewDefense = 0;
        this.missPorc = 0;
        //process the defense abilities
        defenderAbilites.forEach(function (e) {
            switch (e.id) {
                case enBattleAbilities.dodge:
                    _this.activateDodge(e);
                    break;
                case enBattleAbilities.defendBoat:
                    _this.activateBoatDeff(e);
                    break;
                case enBattleAbilities.defendCrew:
                    _this.activateCrewDeff(e);
                    break;
                default:
                    break;
            }
        });
        //process the atack abilities
        atackerAbilites.forEach(function (e) {
            switch (e.id) {
                case enBattleAbilities.cannons:
                    _this.activateCannons(e);
                    break;
                case enBattleAbilities.arrows:
                    _this.activateArrows(e);
                    break;
                case enBattleAbilities.axes:
                    _this.activateAxes(e);
                    break;
                case enBattleAbilities.updateAtack:
                    _this.updateAtack(e);
                    break;
                default:
                    break;
            }
        });
        //lets process all the last atack abilitys
        this.processLastTurnAbilities(lastTurnData);
        this.calculateDefense();
        //lets check the miss 
        if (this.missPorc != 0) {
            var rnd = Phaser.Math.Between(0, 100);
            //lets check if the miss is done
            if (this.missPorc * 100 >= rnd) {
                this.missAtack = true;
                this.crewDamage = 0;
                this.boatDamage = 0;
            }
        }
        //lets correct the crew atack 
        this.crewDamage = this.crewDamage / 10;
    }
    cProcessAtack.prototype.processLastTurnAbilities = function (lastTurnData) {
        this.crewDamage = this.crewDamage * lastTurnData.atackMult;
        this.boatDamage = this.boatDamage * lastTurnData.atackMult;
    };
    cProcessAtack.prototype.updateAtack = function (data) {
        this.nextTurnAtackMult += 1 + 0.2 * (data.lvl - 1);
    };
    cProcessAtack.prototype.calculateDefense = function () {
        //lets process the boat defense 
        if (this.boatDefense > 0 && this.boatDamage > 0) {
            this.boatDefended = true;
            this.boatDamage -= this.boatDefense;
            if (this.boatDamage < 0) {
                this.boatDamage = 0;
            }
        }
        //lets process the crew defense 
        if (this.crewDefense > 0 && this.crewDamage > 0) {
            this.crewDefended = true;
            this.crewDamage -= this.crewDefense;
            if (this.crewDamage < 0) {
                this.crewDamage = 0;
            }
        }
    };
    cProcessAtack.prototype.activateCannons = function (data) {
        this.boatDamage += data.lvl * 10;
    };
    cProcessAtack.prototype.activateArrows = function (data) {
        this.crewDamage += data.lvl * 10;
    };
    cProcessAtack.prototype.activateAxes = function (data) {
        this.crewDamage += data.lvl * 5;
        this.boatDamage += data.lvl * 5;
    };
    cProcessAtack.prototype.activateDodge = function (data) {
        this.missPorc += 0.2 + data.lvl * 0.05;
    };
    cProcessAtack.prototype.activateCrewDeff = function (data) {
        this.crewDefense += data.lvl * 8;
    };
    cProcessAtack.prototype.activateBoatDeff = function (data) {
        this.boatDefense += data.lvl * 8;
    };
    return cProcessAtack;
}());
