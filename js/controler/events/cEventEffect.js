var enumEffectType;
(function (enumEffectType) {
    enumEffectType[enumEffectType["Marineros"] = 1] = "Marineros";
    enumEffectType[enumEffectType["Oro"] = 2] = "Oro";
    enumEffectType[enumEffectType["Comida"] = 3] = "Comida";
    enumEffectType[enumEffectType["Autoridad"] = 4] = "Autoridad";
    enumEffectType[enumEffectType["Limpieza"] = 5] = "Limpieza";
    enumEffectType[enumEffectType["Mantenimiento"] = 6] = "Mantenimiento";
    enumEffectType[enumEffectType["Tiempo"] = 7] = "Tiempo";
    enumEffectType[enumEffectType["Reputacion_Pirata"] = 8] = "Reputacion_Pirata";
    enumEffectType[enumEffectType["Reputacion_Justiciero"] = 9] = "Reputacion_Justiciero";
    enumEffectType[enumEffectType["Marineros_Ocupados"] = 10] = "Marineros_Ocupados";
    enumEffectType[enumEffectType["Viento"] = 11] = "Viento";
    enumEffectType[enumEffectType["PorcOro"] = 12] = "PorcOro";
    enumEffectType[enumEffectType["Item"] = 13] = "Item";
    enumEffectType[enumEffectType["PorcLargoViaje"] = 14] = "PorcLargoViaje";
    enumEffectType[enumEffectType["ProbEnfermos"] = 15] = "ProbEnfermos";
})(enumEffectType || (enumEffectType = {}));
var cEventEffect = (function () {
    function cEventEffect(JSONdata) {
        this.id = JSONdata.id;
        this.idEvent = JSONdata.idEvent;
        this.idResult = JSONdata.idResult;
        this.effectType = JSONdata.effectType;
        this.min = JSONdata.min;
        this.max = JSONdata.max;
        this.value = Phaser.Math.Between(this.min, this.max);
    }
    cEventEffect.prototype.getValue = function () {
        return this.value;
    };
    cEventEffect.prototype.getText = function () {
        var text = "";
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
    };
    return cEventEffect;
}());
