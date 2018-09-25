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
        this.statusBars = [];
        this.refreshTurns = 3; //turns to have the refresh avaible again
        this.refreshCount = 0; //actual turns
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
        this.events.removeAllListeners('dragStart');
        this.events.on('dragCard', this.cardDrag, this);
        this.events.on('dragEnd', this.dragEnd, this);
        this.events.on('dragStart', this.dragStart, this);
        this.updateBoatDamage(); //to update the bars of our boat
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
                enemyData = this.selEnemy.enemy;
            }
            this.cBattle.doTurn(card.cCard, enemyData); //calculate the logic of the atack 
            this.showTurnResults();
            this.selCard = card;
        }
    };
    battle.prototype.showTurnResults = function () {
        this.initTurnHideElements();
        this.showDefensiveSkills();
        var time = 0;
        time += 1000;
        this.time.delayedCall(time, this.showOwnAtackSkills, [], this);
        time += 1000;
        this.time.delayedCall(time, this.updateEnemies, [], this);
        time += 500;
        this.time.delayedCall(time, this.showEnemyAtackSkills, [], this);
        time += 500;
        this.time.delayedCall(time, this.updateBoatDamage, [], this);
        time += 500;
        this.time.delayedCall(time, this.hideIcons, [], this);
        time += 500;
        this.time.delayedCall(time, this.endTurnShowElements, [], this);
    };
    battle.prototype.hideIcons = function () {
        this.ownActionIcon.hideIddleIcon();
        this.ownActionIcon.killIcons();
        this.arrayEnemy.forEach(function (e) {
            e.actionIcon.killIcons();
        });
    };
    battle.prototype.endTurnShowElements = function () {
        this.cBattle.endTurn();
        //lets select three new cards
        this.initCards();
        //show iddle icons
        this.arrayEnemy.forEach(function (e) {
            e.showAtackIcon();
        });
        //lets check if we have to end the battle
        if (this.cBattle.battleEnd == true) {
            this.battleEnd();
        }
        //update the refresh cards button
        if (this.refreshCount != 0) {
            var turns = this.refreshTurns - this.refreshCount;
            this.refreshText.text = turns.toString();
            if (this.refreshTurns == this.refreshCount) {
                this.refreshText.alpha = 0;
                this.refreshButton.alpha = 1;
                this.refreshCount = 0;
            }
            else {
                this.refreshCount += 1;
            }
        }
    };
    battle.prototype.battleEnd = function () {
        //lets continue or trip
        this.trip.numOfBattles += 1;
        var numBattle = this.trip.numOfBattles + 1;
        //for test, we reset the fight now
        var a = this.add.bitmapText(360, 600, 'Pfont', "Batalla Numero: " + numBattle, 60);
        a.setOrigin(0.5);
        this.add.tween({
            targets: a,
            scaleX: 1.5,
            scaleY: 1.5,
            duration: 1500,
            ease: 'Linear',
        });
        this.time.delayedCall(2000, this.newBattle, [], this);
    };
    battle.prototype.newBattle = function () {
        this.scene.start('battle', this.trip);
    };
    battle.prototype.initTurnHideElements = function () {
        //hide the cards
        this.cards.forEach(function (e) {
            e.hideCard();
        });
        //hide the intensions icons
        this.arrayEnemy.forEach(function (e) {
            //e.actionIcon.hideIddleIcon();
        });
    };
    battle.prototype.showEnemyAtackSkills = function () {
        //activate the atack icons
        this.arrayEnemy.forEach(function (e) {
            e.actionIcon.activateAtackIcon();
        });
    };
    battle.prototype.updateBoatDamage = function () {
        var _this = this;
        this.statusBars[0 /* food */].updateBar(this.trip.currentStatus[0 /* food */], this.boat.foodSystem);
        this.statusBars[2 /* clean */].updateBar(this.trip.currentStatus[2 /* clean */], this.boat.cleanSystem);
        this.statusBars[1 /* maintenance */].updateBar(this.trip.currentStatus[1 /* maintenance */], this.boat.mantSystem);
        this.statusBars[3 /* leadership */].updateBar(this.trip.currentStatus[3 /* leadership */], this.boat.leaderSystem);
        this.textHealtyCrew.text = this.trip.healtyCrew.toString();
        this.textSickCrew.text = this.trip.sickCrew.toString();
        //show the defense if used 
        this.arrayEnemy.forEach(function (e) {
            _this.ownActionIcon.checkDefIconAnim(e.enemy.atackData);
        });
    };
    battle.prototype.showOwnAtackSkills = function () {
        var cardData = this.selCard.cCard;
        this.ownActionIcon.activateAtackIcon(cardData.atackAbilities);
    };
    battle.prototype.updateEnemies = function () {
        var _this = this;
        this.arrayEnemy.forEach(function (e) {
            e.updateBars();
            if (e.enemy.isDead == true) {
                e.killEnemy();
                //remove the enemy from the array
                var idx = _this.arrayEnemy.indexOf(e);
                if (idx != -1) {
                    _this.arrayEnemy.splice(idx, 1);
                }
            }
        });
    };
    battle.prototype.showDefensiveSkills = function () {
        var cardData = this.selCard.cCard;
        //show defensive skills first
        if (cardData.defendAbilities[0] != undefined) {
            this.ownActionIcon.activateDefensiveIcons(cardData.defendAbilities);
        }
        //activate the atack icons
        this.arrayEnemy.forEach(function (e) {
            e.actionIcon.activateDefensiveIcons();
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
            this.arrayEnemy.forEach(function (enemy) {
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
        if (this.selCard.cCard.atackAbilities[0].id == enBattleAbilities.noAtack) {
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.ownRect, mouseRect)) {
                console.log("carta en cuadro verde");
                this.targetAllowed = true;
            }
        }
        else {
            this.arrayEnemy.forEach(function (enemy) {
                if (Phaser.Geom.Intersects.RectangleToRectangle(enemy.selRect, mouseRect)) {
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
        this.ownActionIcon = new vBattleIcons(this, s, c, false);
        //lets add the refresh button
        this.refreshButton = this.add.sprite(600, 880, 'battle_refresh');
        this.refreshButton.setOrigin(0.5);
        this.refreshButton.setInteractive();
        this.refreshButton.on('pointerup', this.refreshCards, this);
        this.refreshText = this.add.bitmapText(600, 880 - 8, 'Pfont', '3', 40);
        this.refreshText.setOrigin(0.5);
        this.refreshText.alpha = 0;
    };
    battle.prototype.refreshCards = function () {
        console.log(this.refreshCount);
        if (this.refreshCount == 0) {
            this.initCards();
            this.refreshText.alpha = 1;
            this.refreshText.text = "3";
            this.refreshButton.alpha = 0.5;
            this.refreshCount += 1;
        }
    };
    battle.prototype.updateValues = function () {
        this.textHealtyCrew.text = this.trip.healtyCrew.toString();
        this.textSickCrew.text = this.trip.sickCrew.toString();
    };
    battle.prototype.showStats = function () {
        //complete the bars
        this.statusBars[1 /* maintenance */] = new cStatusBar(this, 208, 210, true);
        this.statusBars[0 /* food */] = new cStatusBar(this, 208 + 132 * 1, 210, true);
        this.statusBars[2 /* clean */] = new cStatusBar(this, 208 + 132 * 2, 210, true);
        this.statusBars[3 /* leadership */] = new cStatusBar(this, 208 + 132 * 3, 210, true);
        //lets show the avaible crew
        this.textHealtyCrew = this.add.bitmapText(66, 230 - 20, 'Pfont', this.trip.healtyCrew.toString(), 40);
        this.textHealtyCrew.setOrigin(0.5);
        this.textSickCrew = this.add.bitmapText(132, 266 - 15, 'PfontRed', this.trip.sickCrew.toString(), 35);
        this.textSickCrew.setOrigin(0.5);
    };
    return battle;
}(Phaser.Scene));
