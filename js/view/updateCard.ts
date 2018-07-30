class updateCard {

    private card:Phaser.GameObjects.Container;
    
    constructor(public scene:Phaser.Scene, 
        public cardData:cUpdateShipCard|cCrewCard|cItemCard,
        public x:number, 
        public y:number) {

        this.initCard();
    }

    private initCard() {

        this.card = this.scene.add.container( this.x,  this.y);
        this.card.alpha = 0;

        if (this.cardData.isAvaible == true) {

            switch (this.cardData.cardType) {
                case "updateCard":

                var cardUpdateData:cUpdateShipCard = <any>this.cardData;
            
                var back = this.scene.add.image(0, 0, 'updateShipCard')
                back.setInteractive();
                this.card.add(back);
                back.setOrigin(0.5, 0);
                back.on('pointerdown', this.clickDown , this);
    
                var text = this.scene.add.bitmapText(0, 88, 'Pfont', cardUpdateData.effectName, 40);
                text.setOrigin(0.5 , 0);
                this.card.add(text);
                
                var text = this.scene.add.bitmapText(0, 136, 'PfontRed', '+' + cardUpdateData.updateValue.toString(), 40);
                text.setOrigin(0.5 , 0);
                this.card.add(text);
    
                break;

                case "updateCrew":
                    var cardCrewData:cCrewCard = <any>this.cardData;

                    var back = this.scene.add.image(0, 0, 'crewCard');
                    back.setInteractive();
                    this.card.add(back);
                    back.setOrigin(0.5, 0);
                    back.on('pointerdown', this.clickDown , this);

                    if (cardCrewData.abilityOne != undefined) {
                        
                        var text = this.scene.add.bitmapText(-85, 145, 'PfontRed', '+' + cardCrewData.abilityOneValue.toString() + "%", 30);
                        text.setOrigin(0 , 0.5);
                        this.card.add(text);

                        var text = this.scene.add.bitmapText(-35, 145 - 5, 'Pfont', cardCrewData.getAbilityName(1), 30);
                        text.setOrigin(0 , 0.5);
                        this.card.add(text);
                    }

                    if (cardCrewData.abilityTwo != undefined) {
                        var text = this.scene.add.bitmapText(-85, 182, 'PfontRed', '+' + cardCrewData.abilityTwoValue.toString() + "%", 30);
                        text.setOrigin(0 , 0.5);
                        this.card.add(text);

                        var text = this.scene.add.bitmapText(-35, 182 - 5, 'Pfont', cardCrewData.getAbilityName(2), 30);
                        text.setOrigin(0 , 0.5);
                        this.card.add(text);
                    }

                break;

                case "objectCard":
                    var itemCard:cItemCard = <any>this.cardData;

                    var back = this.scene.add.image(0, 0, 'itemCards', itemCard.idObject );
                    back.setInteractive();
                    this.card.add(back);
                    back.setOrigin(0.5, 0);
                    back.on('pointerdown', this.clickDown , this);

                    
                break;
                
                default:
                    break;
            }

            //gold is common to all the cards
            var text = this.scene.add.bitmapText(10, 226, 'PfontRed', this.cardData.gold.toString(), 40);
            text.setOrigin(0.5 , 0);
            this.card.add(text);

            this.scene.time.delayedCall(1200, this.showCard, [], this);

        }

    }

    private showCard() {
        this.scene.tweens.add({
            targets: this.card, alpha: 1, duration: 500, ease: 'Power2'
        });
    }

    public buy() {

        //lets make it desapear
        this.scene.tweens.add({
            targets: this.card, alpha: 0, duration: 500, ease: 'Power2'
        });

        this.scene.time.delayedCall(500, this.destroyCard, [], this);

        this.cardData.buy();
        
    }

    private clickDown() {
        
        this.scene.events.emit('updateClick', this);

    }

    public hideCard() {
        this.scene.tweens.add({
            targets: this.card, alpha: 0, duration: 500, ease: 'Power2'
        });

        this.scene.time.delayedCall(500, this.destroyCard, [], this);
    }

    public destroyCard() {
        if (this.card != undefined) {
            this.card.destroy();
        }
    }

}