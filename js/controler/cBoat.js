var cBoat = (function () {
    function cBoat(data) {
        var _this = this;
        //data of the trips
        this.tripNumber = 1;
        this.arrayTripData = new Array();
        this.numberOfTrips = 0; //cantidad de viajes que hizo el barco
        // por ahorar las  ponemos aca, luego deberian venir de algun archivo o db
        this.sails = 100; //velas
        this.rows = 100; //remos
        this.leaderSystem = 10; //decorado
        this.fishSystem = 10; //sistema de pesca
        this.cleanSystem = 10; //Sistema Limpieza
        this.foodSystem = 10; //Sistema Comida
        this.mantSystem = 10; //Protección
        this.crewman = 16; //tripulantes
        this.gold = 250; //oro
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
        console.log(this.arrayTripData);
    }
    cBoat.prototype.nextTrip = function () {
        this.tripNumber += 1;
        this.numberOfTrips += 1;
        this.tripData = this.arrayTripData[this.tripNumber - 1];
    };
    return cBoat;
}());
