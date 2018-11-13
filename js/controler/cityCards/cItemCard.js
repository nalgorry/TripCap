var enItemCard;
(function (enItemCard) {
    enItemCard[enItemCard["binoculars"] = 0] = "binoculars";
    enItemCard[enItemCard["skull"] = 1] = "skull";
    enItemCard[enItemCard["map"] = 2] = "map";
    enItemCard[enItemCard["parrot"] = 3] = "parrot";
    enItemCard[enItemCard["pipe"] = 4] = "pipe";
    enItemCard[enItemCard["gold"] = 5] = "gold";
})(enItemCard || (enItemCard = {}));
var cItemCard = /** @class */ (function () {
    function cItemCard(idObject, boat) {
        this.boat = boat;
        this.gold = 0;
        this.cardType = "objectCard";
        this.isAvaible = true; //when buy, this changes to false
        this.idObject = idObject;
        this.initCard();
    }
    cItemCard.prototype.initCard = function () {
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
    };
    cItemCard.prototype.buy = function () {
    };
    return cItemCard;
}());
