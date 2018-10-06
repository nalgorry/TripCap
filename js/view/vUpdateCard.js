var vUpdateCard = (function () {
    function vUpdateCard(scene, x, y, boat) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.boat = boat;
        this.arrayAvaibleCards = [];
        this.init();
    }
    vUpdateCard.prototype.init = function () {
        this.cont = this.scene.add.container(this.x, this.y);
        var back = this.scene.add.sprite(0, 0, 'update_card_back');
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
        var c = new vBattleCard(this.scene, 0, -20, this.boat.arrayCardsData[this.selectCard()], false);
        this.cont.add(c.cont);
        var c = new vBattleCard(this.scene, 210, -20, this.boat.arrayCardsData[this.selectCard()], false);
        this.cont.add(c.cont);
        var c = new vBattleCard(this.scene, -210, -20, this.boat.arrayCardsData[this.selectCard()], false);
        this.cont.add(c.cont);
    };
    vUpdateCard.prototype.cardSelected = function (card) {
        //lets update the card :D
        card.cCard.atackAbilities.forEach(function (a) {
            a.lvl++;
        });
        card.cCard.defendAbilities.forEach(function (a) {
            a.lvl++;
        });
        this.hideUpdate();
    };
    vUpdateCard.prototype.selectCard = function () {
        var rnd = Phaser.Math.Between(0, this.arrayAvaibleCards.length - 1);
        var cardId = this.arrayAvaibleCards[rnd];
        this.arrayAvaibleCards.splice(rnd, 1);
        return cardId;
    };
    vUpdateCard.prototype.finishClick = function () {
        this.hideUpdate();
    };
    vUpdateCard.prototype.startClick = function () {
        this.button.setTint(0x15536b);
    };
    vUpdateCard.prototype.hideUpdate = function () {
        this.scene.tweens.add({
            targets: this.cont,
            alpha: 0,
            duration: 400,
            ease: 'Linear',
        });
        this.scene.time.delayedCall(400, this.destroyUpdate, [], this);
    };
    vUpdateCard.prototype.destroyUpdate = function () {
        this.cont.destroy(false);
    };
    return vUpdateCard;
}());
