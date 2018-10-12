var cBoat = (function () {
    function cBoat(data) {
        var _this = this;
        //data of the trips
        this.tripNumber = 1;
        this.arrayTripData = new Array(); //data de todos los viajes
        this.arrayEnemyData = new Array(); //data de todos los posibles enemigos
        this.numberOfTrips = 0; //cantidad de viajes que hizo el barco
        this.arrayCardsData = []; //battle cards data!
        this.allPosibleCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; //the card that can be selected
        // por ahorar las  ponemos aca, luego deberian venir de algun archivo o db
        this.sails = 100; //velas
        this.rows = 100; //remos
        this.leaderSystem = 100; //decorado
        this.cleanSystem = 100; //Sistema Limpieza
        this.foodSystem = 100; //Sistema Comida
        this.mantSystem = 100; //Protección
        this.crewman = 16; //tripulantes
        this.gold = 300; //oro
        this.kg_capacity = 200; //capacidad barco
        this.attack = 1; //ataque barco
        this.reputationPirate = 0; //reputación pirata
        this.reputationHeroe = 0; //reputación heroe
        this.maxUsedWind = 0.8; //maxima eficacia de las velas, items la van a poder mejoraor despues
        //load the event data
        data["TripData"].forEach(function (element) {
            var event = new cTripData(element);
            _this.arrayTripData.push(event);
        });
        this.tripData = this.arrayTripData[0];
    }
    cBoat.prototype.nextTrip = function () {
        this.tripNumber += 1;
        this.numberOfTrips += 1;
        this.tripData = this.arrayTripData[this.tripNumber - 1];
    };
    cBoat.prototype.loadEnemyData = function (data) {
        var _this = this;
        data["enemys"].forEach(function (element) {
            var enemy = new mEnemy(element);
            _this.arrayEnemyData.push(enemy);
        });
    };
    cBoat.prototype.addNewCard = function (card) {
        this.arrayCardsData.push(card);
        this.allPosibleCards.push(this.arrayCardsData.length - 1);
        console.log(this.allPosibleCards);
        console.log(this.arrayCardsData);
    };
    cBoat.prototype.initBattleCards = function (data) {
        var _this = this;
        //load the event data
        data["battleCards"].forEach(function (element) {
            var abilities = [];
            element.abilities.forEach(function (e) {
                var ability = new cBattleAbility(e.id, e.lvl, 100, 10);
                abilities.push(ability);
            });
            var card = new cBattleCard(element.id, abilities);
            _this.arrayCardsData.push(card);
        });
    };
    return cBoat;
}());
