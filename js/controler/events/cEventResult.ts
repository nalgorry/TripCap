class cEventResult {

    public id:number;
    public idEvent:number;
    public idOption:string;
    public prob:number;
    public desc:string;

    public effect:cEventEffect[] = [];

    constructor (JSONdata:any) {

        this.id = JSONdata.id;
        this.idEvent = JSONdata.idEvent;
        this.idOption = JSONdata.idOption;
        this.prob = JSONdata.prob;
        this.desc = JSONdata.desc;

    }

}