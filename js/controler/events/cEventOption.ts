class cEventOption {

    public id:number;
    public idEvent:number;
    public title:string;
    public desc:string;
    public result:cEventResult[] = Array();

    constructor (JSONdata:any) {

        this.id = JSONdata.id;
        this.idEvent = JSONdata.idEvent;
        this.title = JSONdata.title;
        this.desc = JSONdata.desc;

    }

}