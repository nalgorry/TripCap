class vUpdateCard {

    public cont:Phaser.GameObjects.Container;
    public button:Phaser.GameObjects.Sprite;

    private arrayAvaibleCards:number[] = [];

    constructor(
        public scene:Phaser.Scene,
        public x:number,
        public y:number,
        public boat:cBoat,
    ) {
        this.init();

    }


    private init() {

        this.cont = this.scene.add.container(this.x, this.y);

        var back = this.scene.add.sprite(0, 0, 'update_card_back');
        this.cont.add(back);

        //lets create the skip button
        this.button =  this.scene.add.sprite(0, 210,'skip_card');
        this.button.setInteractive();

        this.button.on('pointerdown', this.startClick, this);
        this.button.on('pointerup', this.finishClick, this);
        this.cont.add(this.button);

        //lets create the vector of posible card to be able to select them
        for(var i = 0; i < this.boat.arrayCardsData.length; i++) {
            this.arrayAvaibleCards.push(i);
        }

        //lets create three diferent cards 
        this.scene.events.removeAllListeners('click');
        this.scene.events.on('click',this.cardSelected, this);

        var c = new vBattleCard(this.scene, 0, -20, this.boat.arrayCardsData[this.selectCard()], false);
        this.cont.add(c.cont);
        var c = new vBattleCard(this.scene, 210, -20, this.boat.arrayCardsData[this.selectCard()], false);
        this.cont.add(c.cont);
        var c = new vBattleCard(this.scene, -210, -20, this.boat.arrayCardsData[this.selectCard()], false);
        this.cont.add(c.cont);


    }

    private cardSelected(card:vBattleCard) {
        
        //lets update the card :D
        card.cCard.atackAbilities.forEach(a => {
            a.lvl ++;
        });

        card.cCard.defendAbilities.forEach(a => {
            a.lvl ++;
        });

        this.hideUpdate();

    }

    private selectCard():number {

        var rnd = Phaser.Math.Between(0, this.arrayAvaibleCards.length -1);

        var cardId =this.arrayAvaibleCards[rnd];

        this.arrayAvaibleCards.splice(rnd, 1);
        
        return cardId

    }



    private finishClick() {
        this.hideUpdate();
    }

    private startClick() {
        this.button.setTint(0x15536b);
    }

    private hideUpdate() {
        
        this.scene.tweens.add({
            targets: this.cont,
            alpha: 0,
            duration: 400,
            ease: 'Linear',
        });

        this.scene.time.delayedCall(400, this.destroyUpdate, [], this);
    }

    private destroyUpdate() {
        this.scene.events.emit('updateFinish', this);
        this.cont.destroy(false);
    }

}