var cBattle = (function () {
    function cBattle(trip, boat, scene) {
        this.trip = trip;
        this.boat = boat;
        this.scene = scene;
        this.arrayAvaibleCards = Array();
        this.allPosibleCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        this.arrayEnemy = [];
        this.arrayFights = [];
        this.arrayCardsData = [];
        this.battleEnd = false;
        this.arrayAvaibleCards = this.allPosibleCards.slice();
        this.initFights();
        this.initEnemy();
        this.initCardsTypes();
        this.avaibleCrew = this.trip.healtyCrew;
    }
    cBattle.prototype.initFights = function () {
        this.arrayFights.push(new mFights([0, 0]));
        this.arrayFights.push(new mFights([1]));
        this.arrayFights.push(new mFights([2]));
    };
    cBattle.prototype.doTurn = function (card, target) {
        //Own atack first
        if (target != undefined) {
            target.damageData = new cProcessAtack(card.atackAbilities, target.turnDefenceAbilities);
            var a = target.damageData;
            if (a.missAtack != true) {
                target.crew -= a.crewDamage;
                target.mant -= a.boatDamage;
            }
            if (target.crew <= 0 || target.mant <= 0) {
                target.isDead = true;
            }
        }
        //Now enemy atacks
        var shipDamage = 0;
        var crewDamage = 0;
        this.arrayEnemy.forEach(function (e) {
            e.atackData = new cProcessAtack(e.turnAtackAbilities, card.defendAbilities);
            var a = e.atackData;
            if (a.missAtack != true && e.isDead == false) {
                shipDamage += a.boatDamage;
                crewDamage += a.crewDamage;
            }
            else {
                console.log("erraste el golpe! UPS");
            }
        });
        this.trip.updateMant(-shipDamage);
        this.avaibleCrew -= crewDamage;
        console.log(Math.round(this.avaibleCrew));
        console.log(this.trip.healtyCrew);
        if (Math.round(this.avaibleCrew) < this.trip.healtyCrew) {
            this.trip.addSickCrew(this.trip.healtyCrew - Math.round(this.avaibleCrew));
        }
    };
    cBattle.prototype.endTurn = function () {
        var _this = this;
        //define next turn enemy abilities
        this.arrayEnemy.forEach(function (e) {
            e.defineTurnAbilities();
        });
        //next turn needed?
        this.battleEnd = true;
        this.arrayEnemy.forEach(function (e) {
            if (e.isDead == false) {
                _this.battleEnd = false;
            }
        });
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
        var enemyData;
        var rnd = Phaser.Math.Between(0, this.arrayFights.length - 1);
        var fight = this.arrayFights[rnd];
        if (fight.numberOfEnemys == 1) {
            //one enemy 
            enemyData = this.boat.arrayEnemyData[fight.idEnemy[0]];
            this.arrayEnemy.push(new cEnemy(enemyData, 570, 610));
        }
        else if (fight.numberOfEnemys == 2) {
            //two enemies
            enemyData = this.boat.arrayEnemyData[fight.idEnemy[0]];
            this.arrayEnemy.push(new cEnemy(enemyData, 570, 490));
            enemyData = this.boat.arrayEnemyData[fight.idEnemy[1]];
            this.arrayEnemy.push(new cEnemy(enemyData, 570, 730));
        }
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
