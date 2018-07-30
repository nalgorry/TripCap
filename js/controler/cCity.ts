class cCity {

    public arrayUpdateCards:cUpdateShipCard[] = Array();
    public arrayCrewCards:cCrewCard[] = Array();
    public arrayObjectsCards:cItemCard[] = Array();

    
    constructor(public boat:cBoat) {

        this.initUpdateCards();



    }

    private initUpdateCards() {
        var arrayPosibleEffects = new Array();

        for(var i =0; i< Object.keys(enUpdate).length / 2;i++) {
            arrayPosibleEffects.push(i);
        }

        //init the update cards, all uniques
        var rnd:number;
        
        rnd = Phaser.Math.Between(0,arrayPosibleEffects.length - 1);
        this.arrayUpdateCards.push(new cUpdateShipCard(arrayPosibleEffects[rnd], this.boat));
        arrayPosibleEffects.splice(rnd , 1);

        rnd = Phaser.Math.Between(0,arrayPosibleEffects.length - 1 );
        this.arrayUpdateCards.push(new cUpdateShipCard(arrayPosibleEffects[rnd], this.boat));
        arrayPosibleEffects.splice(rnd , 1);

        rnd = Phaser.Math.Between(0,arrayPosibleEffects.length - 1);
        this.arrayUpdateCards.push(new cUpdateShipCard(arrayPosibleEffects[rnd], this.boat));
        arrayPosibleEffects.splice(rnd , 1);

        //init the crew cards
        this.arrayCrewCards.push(new cCrewCard(this.boat));
        this.arrayCrewCards.push(new cCrewCard(this.boat));
        this.arrayCrewCards.push(new cCrewCard(this.boat));

        //init the objects cards, all unique
        var arrayPosibleEffects = new Array();

        for(var i =0; i< Object.keys(enItemCard).length / 2;i++) {
            arrayPosibleEffects.push(i);
        }

        rnd = Phaser.Math.Between(0,arrayPosibleEffects.length - 1);
        this.arrayObjectsCards.push(new cItemCard(arrayPosibleEffects[rnd], this.boat));
        arrayPosibleEffects.splice(rnd , 1);

        rnd = Phaser.Math.Between(0,arrayPosibleEffects.length - 1 );
        this.arrayObjectsCards.push(new cItemCard(arrayPosibleEffects[rnd], this.boat));
        arrayPosibleEffects.splice(rnd , 1);

        rnd = Phaser.Math.Between(0,arrayPosibleEffects.length - 1);
        this.arrayObjectsCards.push(new cItemCard(arrayPosibleEffects[rnd], this.boat));
        arrayPosibleEffects.splice(rnd , 1);

    }


}