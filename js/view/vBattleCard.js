var vBattleCard = (function () {
    function vBattleCard(scene, x, y, cCard, isDragable) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.cCard = cCard;
        this.isDragable = isDragable;
        this.initCard();
        this.showCard();
    }
    vBattleCard.prototype.hideCard = function () {
        var t = this.scene.tweens.add({
            targets: this.cont,
            alpha: 0,
            duration: 500,
            ease: 'Power2'
        });
    };
    vBattleCard.prototype.showCard = function () {
        var t = this.scene.tweens.add({
            targets: this.cont,
            alpha: 1,
            duration: 600,
            ease: 'Power2'
        });
    };
    vBattleCard.prototype.initCard = function () {
        var _this = this;
        this.cont = this.scene.add.container(this.x, this.y);
        this.cont.alpha = 0;
        this.back = this.scene.add.sprite(0, 0, 'battleCardBack');
        this.back.setInteractive({ pixelPerfect: true, draggable: true });
        this.cont.add(this.back);
        //lets create the card elements
        switch (this.cCard.numAbilities) {
            case 1:
                if (this.cCard.hasDef == true) {
                    this.cCard.defendAbilities.forEach(function (e) {
                        var abi = new vBattleAbility(_this.scene, 0, 0, 'battle_icons_size_1', e);
                        _this.cont.add(abi.cont);
                    });
                }
                if (this.cCard.hasAtack == true) {
                    this.cCard.atackAbilities.forEach(function (e) {
                        var abi = new vBattleAbility(_this.scene, 0, 0, 'battle_icons_size_1', e);
                        _this.cont.add(abi.cont);
                    });
                }
                break;
            case 2:
                var sumY = 110;
                var initY = -60;
                if (this.cCard.hasDef == true) {
                    this.cCard.defendAbilities.forEach(function (e) {
                        var abi = new vBattleAbility(_this.scene, 0, initY, 'battle_icons_size_2', e);
                        _this.cont.add(abi.cont);
                        initY += sumY;
                    });
                }
                if (this.cCard.hasAtack == true) {
                    this.cCard.atackAbilities.forEach(function (e) {
                        var abi = new vBattleAbility(_this.scene, 0, initY, 'battle_icons_size_2', e);
                        _this.cont.add(abi.cont);
                        initY += sumY;
                    });
                }
            default:
                break;
        }
        //event to control the card
        if (this.isDragable == true) {
            this.back.on('dragstart', this.onDragStart, this);
            this.back.on('drag', this.onDrag, this);
            this.back.on('dragend', this.onDragEnd, this);
        }
        else {
            this.back.on('pointerup', this.onClick, this);
        }
    };
    vBattleCard.prototype.onClick = function () {
        this.scene.events.emit('click', this);
    };
    vBattleCard.prototype.onDragStart = function () {
        this.scene.events.emit('dragStart', this);
    };
    vBattleCard.prototype.onDrag = function (pointer, dragX, dragY) {
        //here we have to sum because we are dragint the back and not the cont because of a bug with cont
        this.cont.x = this.x + dragX;
        this.cont.y = this.y + dragY;
        this.cont.alpha = 0.5;
        this.scene.events.emit('dragCard', this);
    };
    vBattleCard.prototype.onDragEnd = function () {
        //this.scene.events.emit('cardClick', this, this);
        this.cont.x = this.x;
        this.cont.y = this.y;
        this.cont.alpha = 1;
        this.scene.events.emit('dragEnd', this);
    };
    vBattleCard.prototype.destroy = function () {
        this.cont.destroy();
    };
    return vBattleCard;
}());
