var cBoat = (function () {
    function cBoat() {
        // por ahorar las  ponemos aca, luego deberian venir de algun archivo o db
        this.sails = 100; //velas
        this.rows = 100; //remos
        this.leaderSystem = 100; //decorado
        this.fishSystem = 100; //sistema de pesca
        this.cleanSystem = 100; //Sistema Limpieza
        this.foodSystem = 100; //Sistema Comida
        this.mantSystem = 100; //Protección
        this.crewman = 15; //tripulantes
        this.gold = 0; //oro
        this.kg_capacity = 200; //capacidad barco
        this.attack = 1; //ataque barco
        this.reputationPirate = 0; //reputación pirata
        this.reputationHeroe = 0; //reputación heroe
        this.maxUsedWind = 0.7; //maxima eficacia de las velas, items la van a poder mejoraor despues
    }
    return cBoat;
}());
