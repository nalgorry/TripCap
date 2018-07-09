var cEvent = (function () {
    function cEvent(JSONdata) {
        this.option = [];
        this.result = [];
        this.id = JSONdata.id;
        this.title = JSONdata.title;
        this.difficulty = JSONdata.difficulty;
        this.desc = JSONdata.desc;
    }
    cEvent.prototype.addOption = function (JSONOptionData) {
        var option = new cEventOption(JSONOptionData);
        this.option['id' + option.id] = option;
    };
    cEvent.prototype.addResult = function (JSONData) {
        var result = new cEventResult(JSONData);
        this.result['id' + result.id] = result;
        this.option['id' + result.idOption].result['id' + result.id] = result;
    };
    cEvent.prototype.addEffect = function (JSONData) {
        var effect = new cEventEffect(JSONData);
        var result = this.result['id' + effect.idResult];
        result.effect['id' + effect.id] = effect;
    };
    cEvent.prototype.getOption = function (id) {
        return this.option['id' + id];
    };
    cEvent.prototype.getResult = function (idOption) {
        var option = this.option['id' + idOption];
        var idResult = Object.keys(this.option['id' + idOption].result)[0];
        var posibleResult = [];
        for (var r in option.result) {
            posibleResult.push(option.result[r]);
        }
        //lets check if we have more than one option
        if (posibleResult.length == 1) {
            return posibleResult[0];
        }
        else {
            var rand = Phaser.Math.Between(0, 100);
            var probAcum = 0;
            var selectedResult;
            posibleResult.some(function (element) {
                probAcum += element.prob;
                if (rand <= probAcum) {
                    selectedResult = element;
                    return true; //this stop the loop
                }
            });
            return selectedResult;
        }
    };
    return cEvent;
}());
