var enUpdate;
(function (enUpdate) {
    enUpdate[enUpdate["Mant"] = 1] = "Mant";
    enUpdate[enUpdate["Clean"] = 2] = "Clean";
    enUpdate[enUpdate["Leader"] = 3] = "Leader";
    enUpdate[enUpdate["Food"] = 4] = "Food";
    enUpdate[enUpdate["Seals"] = 5] = "Seals";
    enUpdate[enUpdate["Rows"] = 6] = "Rows";
})(enUpdate || (enUpdate = {}));
var cUpdateShipCard = (function () {
    function cUpdateShipCard(updateTipe) {
        this.updateTipe = updateTipe;
        this.minValue = 5;
        this.maxValue = 25;
        this.minGold = 10;
        this.maxGold = 20;
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
            case enUpdate.Seals:
                this.effectName = 'Velas';
                break;
            default:
                break;
        }
    };
    return cUpdateShipCard;
}());
