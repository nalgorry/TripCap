var cProcessAtack = (function () {
    function cProcessAtack(atackerAbilites, defenderAbilites) {
        var _this = this;
        //atack results
        this.boatDamage = 0;
        this.crewDamage = 0;
        this.missAtack = false;
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
                        break;
                    default:
                        break;
                }
            });
        });
        //lets correct the crew atack 
        this.crewDamage = this.crewDamage / 10;
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
    }
    cProcessAtack.prototype.activateCannons = function (data) {
        switch (data.lvl) {
            case 1:
                this.boatDamage = 12;
                break;
            case 2:
                this.boatDamage = 18;
                break;
            case 3:
                this.boatDamage = 22;
                break;
            default:
                break;
        }
    };
    cProcessAtack.prototype.activateArrows = function (data) {
        switch (data.lvl) {
            case 1:
                this.crewDamage = 12;
                break;
            case 2:
                this.crewDamage = 18;
                break;
            case 3:
                this.crewDamage = 22;
                break;
            default:
                break;
        }
    };
    cProcessAtack.prototype.activateAxes = function (data) {
        switch (data.lvl) {
            case 1:
                this.boatDamage = 8;
                this.crewDamage = 8;
                break;
            case 2:
                this.boatDamage = 12;
                this.crewDamage = 12;
                break;
            case 3:
                this.boatDamage = 16;
                this.crewDamage = 16;
                break;
            default:
                break;
        }
    };
    cProcessAtack.prototype.activateDodge = function (data) {
        switch (data.lvl) {
            case 1:
                this.missPorc = 0.2;
                break;
            case 2:
                this.missPorc = 0.3;
                break;
            case 3:
                this.missPorc = 0.4;
                break;
            default:
                break;
        }
    };
    cProcessAtack.prototype.activateCrewDeff = function (data) {
        switch (data.lvl) {
            case 1:
                this.crewDefense = 10;
                break;
            case 2:
                this.crewDefense = 15;
                break;
            case 3:
                this.crewDefense = 20;
                break;
            default:
                break;
        }
    };
    cProcessAtack.prototype.activateBoatDeff = function (data) {
        switch (data.lvl) {
            case 1:
                this.boatDefense = 10;
                break;
            case 2:
                this.boatDefense = 15;
                break;
            case 3:
                this.boatDefense = 20;
                break;
            default:
                break;
        }
    };
    return cProcessAtack;
}());
