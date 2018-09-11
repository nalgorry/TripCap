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
            var enemyData = undefined;
            if (this.selEnemy != undefined) {
                enemyData = this.selEnemy.data;
            }
            this.cBattle.doTurn(card.cCard, enemyData); //calculate the logic of the atack 
            this.showTurnResults();
            this.selCard = card;
        }
    };
    battle.prototype.showTurnResults = function () {
        this.initTurnHideElements();
        this.showDefensiveSkills();
        this.time.delayedCall(2000, this.showOwnAtackSkills, [], this);
        this.time.delayedCall(4000, this.showEnemyAtackSkills, [], this);
        this.time.delayedCall(6000, this.endTurnShowElements, [], this);
    };
    battle.prototype.endTurnShowElements = function () {
        this.cBattle.endTurn();
        //lets select three new cards
        this.initCards();
        //show iddle icons
        this.arrayEnemy.forEach(function (e) {
            e.actionIcon.loadIddleIcon(e.data.atackAbilities);
        });
    };
    battle.prototype.initTurnHideElements = function () {
        //hide the cards
        this.cards.forEach(function (e) {
            e.hideCard();
        });
        //hide the intensions icons
        this.arrayEnemy.forEach(function (e) {
            e.actionIcon.hideIddleIcon();
        });
    };
    battle.prototype.showEnemyAtackSkills = function () {
        //activate the atack icons
        this.arrayEnemy.forEach(function (e) {
            e.actionIcon.activateIcon(e.data.atackAbilities);
        });
    };
    battle.prototype.showOwnAtackSkills = function () {
        var cardData = this.selCard.cCard;
        this.ownActionIcon.activateIcon(cardData.atackAbilities);
        this.time.delayedCall(2000, this.updateEnemies, [], this);
    };
    battle.prototype.updateEnemies = function () {
        this.arrayEnemy.forEach(function (e) {
            e.updateBars();
        });
    };
    battle.prototype.showDefensiveSkills = function () {
        var cardData = this.selCard.cCard;
        //show defensive skills first
        if (cardData.defendAbilities[0] != undefined) {
            this.ownActionIcon.activateIcon(cardData.defendAbilities);
        }
        //activate the atack icons
        this.arrayEnemy.forEach(function (e) {
            e.actionIcon.activateIcon(e.data.defenceAbilities);
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
        if (this.selCard.cCard.atackAbilities[0].id == enBattleAbilities.noAtack) {
            this.ownRect = new Phaser.Geom.Rectangle(0, 365, 760, 460);
            //this boat rectangle
            var ownGreenRect = this.add.graphics();
            ownGreenRect.fillStyle(0x008000);
            ownGreenRect.fillRect(this.ownRect.x, this.ownRect.y, this.ownRect.width, this.ownRect.height);
            ownGreenRect.fillPath();
            ownGreenRect.alpha = 0.2;
            this.rectContainer.add(ownGreenRect);
        }
        else {
            //enemy rectangles
            this.cBattle.arrayEnemy.forEach(function (enemy) {
                var rect = _this.add.graphics();
                rect.fillStyle(0xFF0000);
                rect.fillRect(enemy.selRect.x, enemy.selRect.y, enemy.selRect.width, enemy.selRect.height);
                rect.fillPath();
                rect.alpha = 0.2;
                _this.rectContainer.add(rect);
            });
        }
    };
    battle.prototype.cardDrag = function () {
        var _this = this;
        this.targetAllowed = false;
        this.selEnemy = undefined;
        var mouseRect = new Phaser.Geom.Rectangle(this.input.x, this.input.y, 2, 2);
        if (this.selCard.cCard.atackAbilities.length == 0) {
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.ownRect, mouseRect)) {
                console.log("carta en cuadro verde");
                this.targetAllowed = true;
            }
        }
        else {
            this.arrayEnemy.forEach(function (enemy) {
                if (Phaser.Geom.Intersects.RectangleToRectangle(enemy.data.selRect, mouseRect)) {
                    _this.targetAllowed = true;
                    _this.selEnemy = enemy;
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
