var cBattle = (function () {
    function cBattle(trip, boat, scene) {
        this.trip = trip;
        this.boat = boat;
        this.scene = scene;
        this.arrayAvaibleCards = Array();
        this.allPosibleCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        this.arrayEnemy = [];
        this.arrayCardsData = [];
        this.arrayAvaibleCards = this.allPosibleCards.slice();
        this.initEnemy();
        this.initCardsTypes();
    }
    cBattle.prototype.doTurn = function (card, target) {
        //Own atack first
        if (target != undefined) {
            var a = new cProcessAtack(card.atackAbilities, target.defenceAbilities);
            if (a.missAtack != true) {
                target.crew -= a.crewDamage;
                target.mant -= a.boatDamage;
            }
            else {
                console.log("erraste el golpe! UPS");
            }
            console.log(target.mant);
            if (target.crew <= 0 || target.mant <= 0) {
                target.isDead = true;
            }
        }
        this.arrayEnemy.forEach(function (e) {
            // Enemy Atack abilities    
            var a = new cProcessAtack(e.atackAbilities, card.defendAbilities);
        });
    };
    cBattle.prototype.endTurn = function () {
        //define next turn enemy abilities
        this.arrayEnemy.forEach(function (e) {
            e.defineAbilities();
        });
        //next turn needed?
    };
    cBattle.prototype.initCardsTypes = function () {
        var _this = this;
        var data = this.scene.cache.json.get('battleCards');
        //load the event data
        data["battleCards"].forEach(function (element) {
            var card = new cBattleCard(element);
            _this.arrayCardsData.push(card);
        });
    };
    cBattle.prototype.initEnemy = function () {
        var data = {};
        data.x = 570;
        data.y = 490;
        data.rectX = 420;
        data.rectY = 440;
        data.rectWidth = 360;
        data.rectHeight = 600 - 440;
        this.arrayEnemy.push(new cEnemy(data));
        data.x = 570;
        data.y = 730;
        data.rectX = 420;
        data.rectY = 672;
        data.rectWidth = 360;
        data.rectHeight = 840 - 672;
        this.arrayEnemy.push(new cEnemy(data));
    };
    cBattle.prototype.getSelectedCards = function () {
        var arrayCards = new Array();
        //select three free cards
        arrayCards.push(this.arrayCardsData[this.selectCard()]);
        arrayCards.push(this.arrayCardsData[this.selectCard()]);
        arrayCards.push(this.arrayCardsData[this.selectCard()]);
        //lets reset the avaible cards if necesary
        if (this.arrayAvaibleCards.length == 0) {
            this.arrayAvaibleCards = this.allPosibleCards.slice();
        }
        return arrayCards;
    };
    //select a free card
    cBattle.prototype.selectCard = function () {
        var rnd = Phaser.Math.Between(0, this.arrayAvaibleCards.length - 1);
        var cardId = this.arrayAvaibleCards[rnd];
        this.arrayAvaibleCards.splice(rnd, 1);
        return cardId;
    };
    return cBattle;
}());
