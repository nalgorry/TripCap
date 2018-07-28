
    enum enUpdate {
        Mant= 1,
        Clean = 2,
        Leader = 3, 
        Food = 4,
        Seals = 5,
        Rows = 6
    }


class cUpdateShipCard {

    public gold:number;
    public updateValue;
    public effectName:string;

    private minValue:number = 5;
    private maxValue:number = 25;

    private minGold = 10;
    private maxGold = 20;

    constructor(public updateTipe:enUpdate) {
        this.initCard();
    }

    private initCard() {

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

    }



}