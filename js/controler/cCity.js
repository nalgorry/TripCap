var cCity = (function () {
    function cCity(boat) {
        this.boat = boat;
        this.arrayUpdateCards = Array();
        this.arrayCrewCards = Array();
        this.arrayObjectsCards = Array();
        this.initUpdateCards();
    }
    cCity.prototype.initUpdateCards = function () {
        var arrayPosibleEffects = new Array();
        for (var i = 0; i < Object.keys(enUpdate).length / 2; i++) {
            arrayPosibleEffects.push(i);
        }
        //init the update cards, all uniques
        var rnd;
        rnd = Phaser.Math.Between(0, arrayPosibleEffects.length - 1);
        this.arrayUpdateCards.push(new cUpdateShipCard(arrayPosibleEffects[rnd], this.boat));
        arrayPosibleEffects.splice(rnd, 1);
        rnd = Phaser.Math.Between(0, arrayPosibleEffects.length - 1);
        this.arrayUpdateCards.push(new cUpdateShipCard(arrayPosibleEffects[rnd], this.boat));
        arrayPosibleEffects.splice(rnd, 1);
        rnd = Phaser.Math.Between(0, arrayPosibleEffects.length - 1);
        this.arrayUpdateCards.push(new cUpdateShipCard(arrayPosibleEffects[rnd], this.boat));
        arrayPosibleEffects.splice(rnd, 1);
        //init the crew cards
        this.arrayCrewCards.push(new cCrewCard(this.boat));
        this.arrayCrewCards.push(new cCrewCard(this.boat));
        this.arrayCrewCards.push(new cCrewCard(this.boat));
        //init the objects cards, all unique
        var arrayPosibleEffects = new Array();
        for (var i = 0; i < Object.keys(enItemCard).length / 2; i++) {
            arrayPosibleEffects.push(i);
        }
        rnd = Phaser.Math.Between(0, arrayPosibleEffects.length - 1);
        this.arrayObjectsCards.push(new cItemCard(arrayPosibleEffects[rnd], this.boat));
        arrayPosibleEffects.splice(rnd, 1);
        rnd = Phaser.Math.Between(0, arrayPosibleEffects.length - 1);
        this.arrayObjectsCards.push(new cItemCard(arrayPosibleEffects[rnd], this.boat));
        arrayPosibleEffects.splice(rnd, 1);
        rnd = Phaser.Math.Between(0, arrayPosibleEffects.length - 1);
        this.arrayObjectsCards.push(new cItemCard(arrayPosibleEffects[rnd], this.boat));
        arrayPosibleEffects.splice(rnd, 1);
    };
    return cCity;
}());
