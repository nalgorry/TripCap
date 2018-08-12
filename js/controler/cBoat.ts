class cBoat {

    //data of the trips
    private tripNumber = 1;
    private arrayTripData:cTripData[] = new Array();
    public numberOfTrips:number = 0; //cantidad de viajes que hizo el barco
    public tripData:cTripData

    // por ahorar las  ponemos aca, luego deberian venir de algun archivo o db
    public sails = 100 //velas
    public rows = 100//remos
    public leaderSystem = 10 //decorado
    public fishSystem = 10 //sistema de pesca
    public cleanSystem = 10//Sistema Limpieza
    public foodSystem = 10//Sistema Comida
    public mantSystem = 10//Protección
    public crewman = 16//tripulantes
    public gold = 250//oro
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

        console.log(this.arrayTripData);

    }

    public nextTrip() {
        this.tripNumber += 1;
        this.numberOfTrips += 1;
        this.tripData = this.arrayTripData[this.tripNumber - 1]
    }
    
}