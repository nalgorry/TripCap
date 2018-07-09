class cEventsControler {

    private events:cEvent[] = Array();

    constructor(eventData:any, eventOptions:any, eventResult:any, eventEffect:any) {


        //load the event data
        eventData["EventsData"].forEach(element => {
            
            var event = new cEvent(element);

            this.events['id' + event.id.toString()] = event;

        });

        //load the event options
        eventOptions["EventsOption"].forEach(element => {
            
            var event:cEvent = this.events['id' + element.idEvent];

            event.addOption(element);

        });

        //load the event results
        eventResult["EventsResult"].forEach(element => {

            var event:cEvent = this.events['id' + element.idEvent];

            event.addResult(element);

        });

        //load the event effects
        console.log(eventEffect);
        eventEffect["EventsEffect"].forEach(element => {


            var event:cEvent = this.events['id' + element.idEvent];

            event.addEffect(element);

        });
        
        console.log(this.events);
        
    }

    
    public getEvent(idEvent:number):cEvent{

        return this.events['id'+ idEvent];

    }

}