var vBattleCard = (function () {
    function vBattleCard(scene, x, y, cCard) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.cCard = cCard;
        this.initCard();
    }
    vBattleCard.prototype.initCard = function () {
        this.back = this.scene.add.sprite(this.x, this.y, 'battle_cards', this.cCard.id);
        this.back.setInteractive({ pixelPerfect: true, draggable: true });
        this.back.on('dragstart', this.onDragStart, this);
        this.back.on('drag', this.onDrag, this);
        this.back.on('dragend', this.onDragEnd, this);
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
