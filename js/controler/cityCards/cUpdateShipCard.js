var enUpdate;
(function (enUpdate) {
    enUpdate[enUpdate["Mant"] = 0] = "Mant";
    enUpdate[enUpdate["Clean"] = 1] = "Clean";
    enUpdate[enUpdate["Leader"] = 2] = "Leader";
    enUpdate[enUpdate["Food"] = 3] = "Food";
    enUpdate[enUpdate["Sails"] = 4] = "Sails";
    enUpdate[enUpdate["Rows"] = 5] = "Rows";
})(enUpdate || (enUpdate = {}));
var cUpdateShipCard = (function () {
    function cUpdateShipCard(updateTipe, boat) {
        this.updateTipe = updateTipe;
        this.boat = boat;
        this.cardType = "updateCard";
        this.isAvaible = true; //when buy, this changes to false
        this.minValue = 5;
        this.maxValue = 25;
        this.minGold = 5;
        this.maxGold = 10;
        this.initCard();
    }
    cUpdateShipCard.prototype.initCard = function () {
        this.updateValue = Phaser.Math.Between(this.minValue, this.maxValue);
        var goldPerValue = Phaser.Math.Between(this.minGold, this.maxGold);
        this.gold = goldPerValue * this.updateValue;
        switch (this.updateTipe) {
            case enUpdate.Food:
                this.effectName = 'Comida';
                break;
            case enUpdate.Leader:
                this.effectName = 'Autoridad';
                break;
            case enUpdate.Clean:
                this.effectName = 'Limpieza';
                break;
            case enUpdate.Mant:
                this.effectName = 'Mant.';
                break;
            case enUpdate.Rows:
                this.effectName = 'Remos';
                break;
            case enUpdate.Sails:
                this.effectName = 'Velas';
                break;
            default:
                break;
        }
    };
    cUpdateShipCard.prototype.buy = function () {
        this.isAvaible = false;
        this.boat.gold -= this.gold;
        //lets add the efect of the buy
        switch (this.updateTipe) {
            case enUpdate.Food:
                this.boat.foodSystem += this.updateValue;
                break;
            case enUpdate.Leader:
                this.boat.leaderSystem += this.updateValue;
                break;
            case enUpdate.Clean:
                this.boat.cleanSystem += this.updateValue;
                break;
            case enUpdate.Mant:
                this.boat.mantSystem += this.updateValue;
                break;
            case enUpdate.Rows:
                this.boat.rows += this.updateValue;
                break;
            case enUpdate.Sails:
                this.boat.sails += this.updateValue;
                break;
            default:
                break;
        }
    };
    return cUpdateShipCard;
}());
