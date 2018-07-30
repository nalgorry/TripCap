enum enCrewAbily {
    sickCrew = 0,
    rowsEff = 1,
    sailsEff = 2,
}

class cCrewCard {

    public gold:number;

    public abilityOne:enCrewAbily;
    public abilityOneValue:number;

    public abilityTwo:enCrewAbily;
    public abilityTwoValue:number;

    public cardType:string = "updateCrew";

    public isAvaible = true;//when buy, this changes to false

    public desc:string;

    private minValue:number = 1;
    private maxValue:number = 5;

    private minGold = 150;
    private maxGold = 350;
    private minAbilityGold = 50;
    private maxAbilityGold = 50;

    constructor (public boat:cBoat) {
        this.initCard();
    }

    private initCard() {

        var arrayPosibleEffects = new Array();

        //to select the ability
        for(var i =0; i< Object.keys(enCrewAbily).length / 2;i++) {
            arrayPosibleEffects.push(i);
        }

        var hasAbility = Phaser.Math.Between(0,1);

        if (hasAbility == 1 ) {

            //init the update cards, all uniques
            var rnd:number;    
            rnd = Phaser.Math.Between(0, arrayPosibleEffects.length - 1);

            this.abilityOne = arrayPosibleEffects[rnd];
            this.abilityOneValue = Phaser.Math.Between(this.minValue, this.maxValue);

            arrayPosibleEffects.splice(rnd , 1);

            var hasAbilityTwo = Phaser.Math.Between(0,3); 

            if (hasAbilityTwo == 0) {

                var rnd:number;    
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

    }

    public getAbilityName(abilityNumber:number) {

        var variable:number;

        if (abilityNumber == 1) {
            variable = this.abilityOne;
        } else {
            variable = this.abilityTwo;
        }

        switch (variable) {
            case enCrewAbily.sickCrew:
                return "- Enfermos";
            case enCrewAbily.sailsEff:
                return "Efic. Velas"
            case enCrewAbily.rowsEff:
                return "Efic. Remos"
            default:
                break;
        }

    }

    public buy() {

        this.isAvaible = false;

        this.boat.gold -= this.gold;

        this.boat.crewman += 1;

        //lets add the efect of the buy if needed
    }


}