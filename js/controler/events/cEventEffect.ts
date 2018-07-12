enum enumEffectType {
    Marineros= 1,
    Oro= 2,
    Comida= 3,
    Autoridad= 4,
    Limpieza= 5,
    Mantenimiento= 6,
    Tiempo= 7,
    Reputacion_Pirata= 8,
    Reputacion_Justiciero= 9,
    Marineros_Ocupados = 10,
    Viento = 11,
    PorcOro = 12,
    Item = 13,
    PorcLargoViaje = 14,
    ProbEnfermos = 15,
    
}

class cEventEffect {


    public id:number;
    public idEvent:number;
    public idResult:string;
    public effectType:number;
    public min:number;
    public max:number;
    public value:number;

    constructor (JSONdata:any) {

        this.id = JSONdata.id;
        this.idEvent = JSONdata.idEvent;
        this.idResult = JSONdata.idResult;
        this.effectType = JSONdata.effectType;
        this.min = JSONdata.min;
        this.max = JSONdata.max;
        this.value = Phaser.Math.Between(this.min, this.max);

    }

    public getValue():number {
        return this.value;
    }

    public getText() {

        var text:string = "";
        switch (this.effectType) {
            case enumEffectType.Marineros:
                text = "Marineros";
                break;
            case enumEffectType.Autoridad:
                text = "Autoridad";
                break;
            case enumEffectType.Comida:
                text = "Comida";
                break;
            case enumEffectType.Limpieza:
                text = "Limpieza";
                break;
            case enumEffectType.Mantenimiento:
                text = "Mantenimiento";
                break;
            case enumEffectType.Mantenimiento:
                text = "Mantenimiento";
                break;
            case enumEffectType.Oro:
                text = "Oro";
                break;
            case enumEffectType.Reputacion_Justiciero:
                text = "Reputacion Justiciero";
                break;
            case enumEffectType.Reputacion_Pirata:
                text = "Reputacion Pirata";
                break;
            case enumEffectType.Tiempo:
                text = "Tiempo";
                break;
            case enumEffectType.Marineros_Ocupados:
                text = "Marineros Ocupados";
                break;
            case enumEffectType.Viento:
                text = "Viento";
                break;
            case enumEffectType.PorcOro:
                text = "PorcOro";
                break;
            case enumEffectType.Item:
                text = "Item";
                break;
            case enumEffectType.PorcLargoViaje:
                text = "% Largo Viaje";
                break;
            case enumEffectType.ProbEnfermos:
                text = "% Prob. Enfermos";
                break;
            default:
                break;
        }


        return text;

    }

}
