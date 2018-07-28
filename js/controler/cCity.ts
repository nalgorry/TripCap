class cCity {

    public arrayUpdateCards:cUpdateShipCard[] = Array();

    
    constructor(public boat:cBoat) {

        var arrayPosibleEffects = new Array();

        for(var i =0; i< Object.keys(enUpdate).length / 2;i++) {
            arrayPosibleEffects.push(i);
        }

        //init the update cards, all uniques
        var rnd:number;
        
        rnd = Phaser.Math.Between(0,arrayPosibleEffects.length - 1);
        this.arrayUpdateCards.push(new cUpdateShipCard(arrayPosibleEffects[rnd]));
        arrayPosibleEffects.splice(rnd , 1);

        rnd = Phaser.Math.Between(0,arrayPosibleEffects.length - 1 );
        this.arrayUpdateCards.push(new cUpdateShipCard(arrayPosibleEffects[rnd]));
        arrayPosibleEffects.splice(rnd , 1);

        rnd = Phaser.Math.Between(0,arrayPosibleEffects.length - 1);
        this.arrayUpdateCards.push(new cUpdateShipCard(arrayPosibleEffects[rnd]));
        arrayPosibleEffects.splice(rnd , 1);

    }


}