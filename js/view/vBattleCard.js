var vBattleCard = (function () {
    function vBattleCard(scene, x, y, cCard) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.cCard = cCard;
        this.initCard();
        this.showCard();
    }
    vBattleCard.prototype.hideCard = function () {
        var t = this.scene.tweens.add({
            targets: this.back,
            alpha: 0,
            duration: 500,
            ease: 'Power2'
        });
    };
    vBattleCard.prototype.showCard = function () {
        var t = this.scene.tweens.add({
            targets: this.back,
            alpha: 1,
            duration: 600,
            ease: 'Power2'
        });
    };
    vBattleCard.prototype.initCard = function () {
        this.back = this.scene.add.sprite(this.x, this.y, 'battle_cards', this.cCard.id);
        this.back.setInteractive({ pixelPerfect: true, draggable: true });
        this.back.on('dragstart', this.onDragStart, this);
        this.back.on('drag', this.onDrag, this);
        this.back.on('dragend', this.onDragEnd, this);
        this.back.alpha = 0;
    };
    vBattleCard.prototype.onDragStart = function () {
        this.scene.events.emit('dragStart', this);
    };
    vBattleCard.prototype.onDrag = function (pointer, dragX, dragY) {
        this.back.x = dragX;
        this.back.y = dragY;
        this.back.alpha = 0.5;
        this.scene.events.emit('dragCard', this);
    };
    vBattleCard.prototype.onDragEnd = function () {
        //this.scene.events.emit('cardClick', this, this);
        this.back.x = this.x;
        this.back.y = this.y;
        this.back.alpha = 1;
        this.scene.events.emit('dragEnd', this);
    };
    vBattleCard.prototype.destroy = function () {
        this.back.destroy();
    };
    return vBattleCard;
}());
