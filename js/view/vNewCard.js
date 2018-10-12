var vNewCard = (function () {
    function vNewCard(scene, x, y, boat) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.boat = boat;
        this.arrayAvaibleCards = [];
        this.init();
    }
    vNewCard.prototype.init = function () {
        this.cont = this.scene.add.container(this.x, this.y);
        var back = this.scene.add.sprite(0, 0, 'new_card_back');
        this.cont.add(back);
        //lets create the skip button
        this.button = this.scene.add.sprite(0, 210, 'skip_card');
        this.button.setInteractive();
        this.button.on('pointerdown', this.startClick, this);
        this.button.on('pointerup', this.finishClick, this);
        this.cont.add(this.button);
        //lets create the vector of posible card to be able to select them
        for (var i = 0; i < this.boat.arrayCardsData.length; i++) {
            this.arrayAvaibleCards.push(i);
        }
        //lets create three diferent cards 
        this.scene.events.removeAllListeners('click');
        this.scene.events.on('click', this.cardSelected, this);
        var c = new vBattleCard(this.scene, 0, -20, this.createCard(), false);
        this.cont.add(c.cont);
        var c = new vBattleCard(this.scene, 210, -20, this.createCard(), false);
        this.cont.add(c.cont);
        var c = new vBattleCard(this.scene, -210, -20, this.createCard(), false);
        this.cont.add(c.cont);
        this.createCard();
    };
    vNewCard.prototype.createCard = function () {
        console.log(enBattleAbilities);
        console.log();
        var ability1 = this.createAbility();
        var ability2 = this.createAbility();
        var card = new cBattleCard(this.boat.arrayCardsData.length, [ability1, ability2]);
        return card;
    };
    vNewCard.prototype.createAbility = function () {
        //to control the new abilities power
        var max = 0;
        if (this.boat.numBattles < 3) {
            max = 2;
        }
        else if (this.boat.numBattles < 5) {
            max = 3;
        }
        else if (this.boat.numBattles < 5) {
            max = 4;
        }
        else if (this.boat.numBattles < 10) {
            max = 6;
        }
        var lvl = Phaser.Math.Between(1, max);
        //lets define the ability that cant be no atack no def
        var posibleAbi = Object.keys(enBattleAbilities).length / 2;
        do {
            var id = Phaser.Math.Between(0, posibleAbi - 1);
        } while (id == enBattleAbilities.noAtack || id == enBattleAbilities.noDefense);
        var ability = new cBattleAbility(id, lvl, 100, 0);
        return ability;
    };
    vNewCard.prototype.cardSelected = function (card) {
        //lets add the card to the colection
        this.boat.addNewCard(card.cCard);
        this.hide();
    };
    vNewCard.prototype.finishClick = function () {
        this.hide();
    };
    vNewCard.prototype.startClick = function () {
        this.button.setTint(0x15536b);
    };
    vNewCard.prototype.hide = function () {
        this.scene.tweens.add({
            targets: this.cont,
            alpha: 0,
            duration: 400,
            ease: 'Linear',
        });
        this.scene.time.delayedCall(400, this.destroyUpdate, [], this);
    };
    vNewCard.prototype.destroyUpdate = function () {
        this.cont.destroy(false);
    };
    return vNewCard;
}());
