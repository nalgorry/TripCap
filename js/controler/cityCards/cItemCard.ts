enum enItemCard {
    binoculars = 0,
    skull = 1,
    map = 2,
    parrot = 3,
    pipe = 4,
    gold = 5,
}

class cItemCard {

    public gold:number = 0;

    public cardType:string = "objectCard";

    public isAvaible = true;//when buy, this changes to false

    public idObject:enItemCard;

    public desc:string;


    constructor (idObject:number, public boat:cBoat) {

        this.idObject = idObject

        this.initCard();
    }

    private initCard() {

        switch (this.idObject) {
            case enItemCard.binoculars:
                this.gold = 300;
                this.desc = "Te permite ver más lejos, mejorando tu capacidad de pesca";
                break;
            case enItemCard.skull:
                this.gold = 400;
                this.desc = "Hace que seas más temido, aumentando tu autoridad";
                break;
            case enItemCard.map:
                this.gold = 500;
                this.desc = "Con este mapa todos tus viajes son un 10% más cortos";
            break;
            case enItemCard.parrot:
                this.gold = 600;
                this.desc = "Este loro te avisa si tus tripulantes no estan haciendo sus tareas, haciendolos a todos más eficientes";
            break;
            case enItemCard.pipe:
                this.gold = 700;
                this.desc = "Con esta pipa parece ser que tus marineros entienden mejor tus ordenes para navegar. Aumenta eficiencia velas y remos.";
            break;
            case enItemCard.gold:
                this.gold = 800;
                this.desc = "Obtienes más oro al terminar todos tus viajes";
            break;
            default:
                break;
        }

    }

    public buy() {
        
    }

}