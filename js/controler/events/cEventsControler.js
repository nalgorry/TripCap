var cEventsControler = /** @class */ (function () {
    function cEventsControler(eventData, eventOptions, eventResult, eventEffect) {
        var _this = this;
        this.events = Array();
        //load the event data
        eventData["EventsData"].forEach(function (element) {
            var event = new cEvent(element);
            _this.events['id' + event.id.toString()] = event;
        });
        //load the event options
        eventOptions["EventsOption"].forEach(function (element) {
            var event = _this.events['id' + element.idEvent];
            event.addOption(element);
        });
        //load the event results
        eventResult["EventsResult"].forEach(function (element) {
            var event = _this.events['id' + element.idEvent];
            event.addResult(element);
        });
        //load the event effects
        console.log(eventEffect);
        eventEffect["EventsEffect"].forEach(function (element) {
            var event = _this.events['id' + element.idEvent];
            event.addEffect(element);
        });
        console.log(this.events);
    }
    cEventsControler.prototype.getEvent = function (idEvent) {
        return this.events['id' + idEvent];
    };
    return cEventsControler;
}());
