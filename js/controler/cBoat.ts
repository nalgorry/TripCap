class cBoat {

    //data of the trips
    private tripNumber = 1;
    private arrayTripData:cTripData[] = new Array(); //data de todos los viajes
    public arrayEnemyData:mEnemy[] = new Array(); //data de todos los posibles enemigos
    public numberOfTrips:number = 0; //cantidad de viajes que hizo el barco
    public tripData:cTripData

    public arrayCardsData:cBattleCard[] = []; //battle cards data!

    // por ahorar las  ponemos aca, luego deberian venir de algun archivo o db
    public sails = 100 //velas
    public rows = 100//remos
    public leaderSystem = 100 //decorado
    public cleanSystem = 100//Sistema Limpieza
    public foodSystem = 100//Sistema Comida
    public mantSystem = 100//Protección
    public crewman = 16//tripulantes
    public gold = 300//oro
    public kg_capacity = 200 //capacidad barco
    public attack = 1//ataque barco
    public reputationPirate = 0 //reputación pirata
    public reputationHeroe = 0 //reputación heroe

    public maxUsedWind:number = 0.8; //maxima eficacia de las velas, items la van a poder mejoraor despues

    constructor(data:any) {

        //load the event data
        data["TripData"].forEach(element => {

            var event = new cTripData(element);
            this.arrayTripData.push(event);

        });

        this.tripData = this.arrayTripData[0];

    }

    public nextTrip() {
        this.tripNumber += 1;
        this.numberOfTrips += 1;
        this.tripData = this.arrayTripData[this.tripNumber - 1]
    }

    public loadEnemyData(data:any) {

        data["enemys"].forEach(element => {

            var enemy = new mEnemy(element);
            this.arrayEnemyData.push(enemy);

        });

    }

    public initBattleCards(data:any) {

        //load the event data
        data["battleCards"].forEach(element => {

        var card = new cBattleCard(element);
        this.arrayCardsData.push(card);

    });
    }
    
}