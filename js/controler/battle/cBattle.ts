class cBattle {

    private arrayAvaibleCards:number[] = Array();

    private avaibleCrew:number; //cree with decimals 

    public arrayEnemy:cEnemy[] = [];
    public arrayFights:mFights[] = [];

    public battleEnd:boolean = false;

  
    constructor(public trip:cTrip,
        public boat:cBoat, 
        public scene:Phaser.Scene) {

            this.arrayAvaibleCards = this.boat.allPosibleCards.slice();
            this.initFights();
            this.initEnemy();

            this.avaibleCrew = this.trip.healtyCrew;

    }

    private initFights() {
        this.arrayFights.push(new mFights([0,0]));
        this.arrayFights.push(new mFights([1]));
        this.arrayFights.push(new mFights([2]));
    }

    public doTurn(card:cBattleCard, target:cEnemy) {

        //Own atack first
        if (target != undefined) {
            target.damageData = new cProcessAtack(card.atackAbilities, target.turnDefenceAbilities);
    
            var a = target.damageData;
            
            if (a.missAtack != true) {
                target.crew -= a.crewDamage;
                target.mant -= a.boatDamage;
            }

            if (target.crew <= 0 || target.mant <= 0) {
                target.isDead = true;
            }

        }

        //Now enemy atacks
        var shipDamage:number = 0;
        var crewDamage:number = 0;

        this.arrayEnemy.forEach(e => {

            e.atackData = new cProcessAtack(e.turnAtackAbilities, card.defendAbilities);
            var a = e.atackData;

            if (a.missAtack != true && e.isDead == false) {
                shipDamage += a.boatDamage;
                crewDamage += a.crewDamage;
            } else {
                console.log("erraste el golpe! UPS");
            }

        });

        this.trip.updateMant(-shipDamage);

        this.avaibleCrew -= crewDamage;

        if (Math.round(this.avaibleCrew) < this.trip.healtyCrew) {            
            this.trip.addSickCrew(this.trip.healtyCrew -Math.round(this.avaibleCrew))
        }
        
    }

    public endTurn() {
        //define next turn enemy abilities
        this.arrayEnemy.forEach(e => {
            e.defineTurnAbilities();
        });

        //next turn needed?
        this.battleEnd = true;

        this.arrayEnemy.forEach(e => {
            if (e.isDead == false) {
                this.battleEnd = false;
            }
        });
    }

    private initEnemy() {

        var enemyData:mEnemy;
        
        var rnd = Phaser.Math.Between(0, this.arrayFights.length -1);

        var fight = this.arrayFights[rnd];


        if (fight.numberOfEnemys == 1) {
            //one enemy 
            enemyData = this.boat.arrayEnemyData[fight.idEnemy[0]];
            this.arrayEnemy.push(new cEnemy(enemyData, 570, 610));
        } else if  (fight.numberOfEnemys == 2) {
            //two enemies
            enemyData = this.boat.arrayEnemyData[fight.idEnemy[0]];
            this.arrayEnemy.push(new cEnemy(enemyData, 570, 490));

            enemyData = this.boat.arrayEnemyData[fight.idEnemy[1]];
            this.arrayEnemy.push(new cEnemy(enemyData, 570, 730));

        }

        
    }

    public getSelectedCards():cBattleCard[] {

        var arrayCards:cBattleCard[] = new Array();

        //select three free cards
        arrayCards.push(this.boat.arrayCardsData[this.selectCard()]);
        this.resetCard(arrayCards);
        arrayCards.push(this.boat.arrayCardsData[this.selectCard()]);
        this.resetCard(arrayCards);
        arrayCards.push(this.boat.arrayCardsData[this.selectCard()]);
        this.resetCard(arrayCards);
        
        return arrayCards;

    }

    public resetCard(selectCards:cBattleCard[]) {

        //lets reset the avaible cards if necesary
        if (this.arrayAvaibleCards.length == 0) {
            this.arrayAvaibleCards = this.boat.allPosibleCards.slice();
        }

        //TODO: lets remove the selected cards to avoid duplicated cards

    }

    //select a free card
    private selectCard():number {

        var rnd = Phaser.Math.Between(0, this.arrayAvaibleCards.length -1);

        var cardId =this.arrayAvaibleCards[rnd];

        this.arrayAvaibleCards.splice(rnd, 1);

       
        return cardId

    }



}