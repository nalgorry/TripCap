class vNewCard {

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

        var c = new vBattleCard(this.scene, 0, -20, this.createCard(), false);
        this.cont.add(c.cont);
        var c = new vBattleCard(this.scene, 210, -20, this.createCard(), false);
        this.cont.add(c.cont);
        var c = new vBattleCard(this.scene, -210, -20, this.createCard(), false);
        this.cont.add(c.cont);

        this.createCard();

    }

    private createCard():cBattleCard {

        console.log(enBattleAbilities)
        console.log()
        
        var ability1:cBattleAbility = this.createAbility();
        var ability2:cBattleAbility = this.createAbility();

        var card = new cBattleCard(this.boat.arrayCardsData.length, [ability1, ability2]);

        return card;
    }

    private createAbility():cBattleAbility {

        var lvl = Phaser.Math.Between(1, 5);

        //lets define the ability that cant be no atack no def
        var posibleAbi = Object.keys(enBattleAbilities).length / 2;

        do {
            var id = Phaser.Math.Between(0, posibleAbi - 1);
        } while (id == enBattleAbilities.noAtack || id == enBattleAbilities.noDefense);

        var ability = new cBattleAbility(id, lvl,100, 0);

        return ability
    }

    private cardSelected(card:vBattleCard) {
        
        //lets add the card to the colection
        this.boat.addNewCard(card.cCard);
        this.hide();

    }

    private finishClick() {
        this.hide();
    }

    private startClick() {
        this.button.setTint(0x15536b);
    }

    private hide() {
        
        this.scene.tweens.add({
            targets: this.cont,
            alpha: 0,
            duration: 400,
            ease: 'Linear',
        });

        this.scene.time.delayedCall(400, this.destroyUpdate, [], this);
    }

    private destroyUpdate() {
        this.cont.destroy(false);
    }

}