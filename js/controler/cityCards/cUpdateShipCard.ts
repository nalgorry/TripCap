
    enum enUpdate {
        Mant= 0,
        Clean = 1,
        Leader = 2, 
        Food = 3,
        Sails = 4,
        Rows = 5
    }


class cUpdateShipCard {

    public gold:number;
    public updateValue:number;
    public effectName:string;

    public cardType:string = "updateCard";

    public isAvaible = true;//when buy, this changes to false

    public desc:string;

    private minValue:number = 5;
    private maxValue:number = 25;

    private minGold = 10;
    private maxGold = 20;

    constructor(public updateTipe:enUpdate, public boat:cBoat) {
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
            case enUpdate.Sails:
                this.effectName = 'Velas';
            break;
            default:
                break;
        }

    }

    public buy() {

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


    }



}