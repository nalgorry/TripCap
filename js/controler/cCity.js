var cCity = (function () {
    function cCity(boat) {
        this.boat = boat;
        this.arrayUpdateCards = Array();
        var arrayPosibleEffects = new Array();
        for (var i = 0; i < Object.keys(enUpdate).length / 2; i++) {
            arrayPosibleEffects.push(i);
        }
        //init the update cards, all uniques
        var rnd;
        rnd = Phaser.Math.Between(0, arrayPosibleEffects.length - 1);
        this.arrayUpdateCards.push(new cUpdateShipCard(arrayPosibleEffects[rnd]));
        arrayPosibleEffects.splice(rnd, 1);
        rnd = Phaser.Math.Between(0, arrayPosibleEffects.length - 1);
        this.arrayUpdateCards.push(new cUpdateShipCard(arrayPosibleEffects[rnd]));
        arrayPosibleEffects.splice(rnd, 1);
        rnd = Phaser.Math.Between(0, arrayPosibleEffects.length - 1);
        this.arrayUpdateCards.push(new cUpdateShipCard(arrayPosibleEffects[rnd]));
        arrayPosibleEffects.splice(rnd, 1);
    }
    return cCity;
}());
