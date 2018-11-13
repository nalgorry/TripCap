var cEventResult = /** @class */ (function () {
    function cEventResult(JSONdata) {
        this.effect = [];
        this.id = JSONdata.id;
        this.idEvent = JSONdata.idEvent;
        this.idOption = JSONdata.idOption;
        this.prob = JSONdata.prob;
        this.desc = JSONdata.desc;
    }
    return cEventResult;
}());
