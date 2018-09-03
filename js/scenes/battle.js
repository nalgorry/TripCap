var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var battle = (function (_super) {
    __extends(battle, _super);
    function battle() {
        _super.apply(this, arguments);
        this.cards = Array();
        this.arrayEnemy = [];
    }
    battle.prototype.create = function (trip) {
        this.trip = trip;
        this.boat = trip.boat;
        this.cBattle = new cBattle(this.trip, this.boat, this);
        this.initScene();
        this.initCards();
        this.initEnemies();
        this.events.removeAllListeners('dragCard');
        this.events.removeAllListeners('dragEnd');
        this.events.on('dragCard', this.cardDrag, this);
        this.events.on('dragEnd', this.dragEnd, this);
        this.events.on('dragStart', this.dragStart, this);
    };
    battle.prototype.dragStart = function (card) {
        this.selCard = card;
        this.initDragRect();
    };
    battle.prototype.dragEnd = function (card) {
        //destroy the rectangles
        this.rectContainer.destroy();
        if (this.targetAllowed == true) {
            //lets do some magic!
            this.cBattle.doTurn(card.cCard); //calculate the logic of the atack 
            this.showTurnResults(card.cCard);
            //lets select three new cards
            this.initCards();
        }
    };
    battle.prototype.showTurnResults = function (card) {
        //show defensive skills first
        if (card.defendAbilities[0] != undefined) {
            this.ownActionIcon.activateIcon(card.defendAbilities[0].id);
        }
        //activate the atack icons
        this.arrayEnemy.forEach(function (e) {
            e.actionIcon.activateIcon(e.data.defendAbilities[0].id);
        });
    };
    battle.prototype.initEnemies = function () {
        var _this = this;
        //lets create the visualization for each enemy
        this.cBattle.arrayEnemy.forEach(function (e) {
            var enemy = new vEnemy(_this, e);
            _this.arrayEnemy.push(enemy);
        });
    };
    battle.prototype.initDragRect = function () {
        var _this = this;
        this.rectContainer = this.add.container(0, 0);
        if (this.selCard.cCard.atackAbilities.length == 0) {
            this.ownRect = new Phaser.Geom.Rectangle(0, 365, 760, 460);
            //this boat rectangle
            var ownGreenRect = this.add.graphics();
            ownGreenRect.fillStyle(0x008000);
            ownGreenRect.fillRect(this.ownRect.x, this.ownRect.y, this.ownRect.width, this.ownRect.height);
            ownGreenRect.fillPath();
            ownGreenRect.alpha = 0.5;
            this.rectContainer.add(ownGreenRect);
        }
        else {
            //enemy rectangles
            this.cBattle.arrayEnemy.forEach(function (enemy) {
                var rect = _this.add.graphics();
                rect.fillStyle(0xFF0000);
                rect.fillRect(enemy.selRect.x, enemy.selRect.y, enemy.selRect.width, enemy.selRect.height);
                rect.fillPath();
                rect.alpha = 0.5;
                _this.rectContainer.add(rect);
            });
        }
    };
    battle.prototype.cardDrag = function () {
        var _this = this;
        this.targetAllowed = false;
        var mouseRect = new Phaser.Geom.Rectangle(this.input.x, this.input.y, 2, 2);
        if (this.selCard.cCard.atackAbilities.length == 0) {
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.ownRect, mouseRect)) {
                console.log("carta en cuadro verde");
                this.targetAllowed = true;
            }
        }
        else {
            this.cBattle.arrayEnemy.forEach(function (enemy) {
                if (Phaser.Geom.Intersects.RectangleToRectangle(enemy.selRect, mouseRect)) {
                    _this.targetAllowed = true;
                }
            });
        }
    };
    battle.prototype.initCards = function () {
        var _this = this;
        //lests destroy all the previus cards
        this.cards.forEach(function (card) {
            card.destroy();
            i += 1;
        });
        this.cards = new Array();
        var selCards = this.cBattle.getSelectedCards();
        var i = 0;
        selCards.forEach(function (card) {
            _this.cards.push(new vBattleCard(_this, 140 + 214 * i, 1076, card));
            i += 1;
        });
    };
    battle.prototype.initScene = function () {
        var back = this.add.image(0, 0, 'battle_back');
        back.setOrigin(0);
        this.showStats();
        var c = this.add.container(154, 582);
        var s = this.add.sprite(0, 0, 'ownShip');
        c.add(s);
        this.ownActionIcon = new vBattleIcons(this, s, c);
    };
    battle.prototype.updateValues = function () {
        this.textHealtyCrew.text = this.trip.healtyCrew.toString();
        this.textSickCrew.text = this.trip.sickCrew.toString();
    };
    battle.prototype.showStats = function () {
        //complete the bars
        var mant = new cStatusBar(this, 208, 210, true);
        var food = new cStatusBar(this, 208 + 132 * 1, 210, true);
        var clean = new cStatusBar(this, 208 + 132 * 2, 210, true);
        var leadership = new cStatusBar(this, 208 + 132 * 3, 210, true);
        //lets show the avaible crew
        this.textHealtyCrew = this.add.bitmapText(66, 230 - 20, 'Pfont', this.trip.healtyCrew.toString(), 40);
        this.textHealtyCrew.setOrigin(0.5);
        this.textSickCrew = this.add.bitmapText(132, 266 - 15, 'PfontRed', this.trip.sickCrew.toString(), 35);
        this.textSickCrew.setOrigin(0.5);
    };
    return battle;
}(Phaser.Scene));
