class cBattle {

    private arrayAvaibleCards:number[] = Array();
    private allPosibleCards:number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    public arrayEnemy:cEnemy[] = [];
    private arrayCardsData:cBattleCard[] = [];
  
    constructor(public trip:cTrip,
        public boat:cBoat, 
        public scene:Phaser.Scene) {

            this.arrayAvaibleCards = this.allPosibleCards.slice();
            this.initEnemy();
            this.initCardsTypes();

    }

    public doTurn(card:cBattleCard, target:cEnemy) {

        //Own atack first
        if (target != undefined) {
            var a = new cProcessAtack(card.atackAbilities, target.defenceAbilities);
            
            if (a.missAtack != true) {
                target.crew -= a.crewDamage;
                target.mant -= a.boatDamage;
            } else {
                console.log("erraste el golpe! UPS");
            }

            console.log(target.mant);

            if (target.crew <= 0 || target.mant <= 0) {
                target.isDead = true;
            }

        }

        this.arrayEnemy.forEach(e => {
            // Enemy Atack abilities    
            var a = new cProcessAtack(e.atackAbilities, card.defendAbilities);

        });




    }

    public endTurn() {
        //define next turn enemy abilities
        this.arrayEnemy.forEach(e => {
            e.defineAbilities();
        });

        //next turn needed?
        
    }

    private initCardsTypes() {

        var data = this.scene.cache.json.get('battleCards'); 

        //load the event data
        data["battleCards"].forEach(element => {

        var card = new cBattleCard(element);
        this.arrayCardsData.push(card);

    });
    }

    private initEnemy() {

        var data:any = {};

        data.x = 570;
        data.y = 490;
        data.rectX = 420;
        data.rectY = 440;
        data.rectWidth = 360;
        data.rectHeight = 600 - 440;

        this.arrayEnemy.push(new cEnemy(data));

        data.x = 570;
        data.y = 730;
        data.rectX = 420;
        data.rectY = 672;
        data.rectWidth = 360;
        data.rectHeight = 840 - 672;

        this.arrayEnemy.push(new cEnemy(data));

    }

    public getSelectedCards():cBattleCard[] {

        var arrayCards:cBattleCard[] = new Array();

        //select three free cards
        arrayCards.push(this.arrayCardsData[this.selectCard()]);
        arrayCards.push(this.arrayCardsData[this.selectCard()]);
        arrayCards.push(this.arrayCardsData[this.selectCard()]);

        //lets reset the avaible cards if necesary
        if (this.arrayAvaibleCards.length == 0) {
            this.arrayAvaibleCards = this.allPosibleCards.slice();
        }
        
        return arrayCards;

    }

    //select a free card
    private selectCard():number {

        var rnd = Phaser.Math.Between(0, this.arrayAvaibleCards.length -1);

        var cardId =this.arrayAvaibleCards[rnd];

        this.arrayAvaibleCards.splice(rnd, 1);
        
        return cardId

    }



}