class cEvent {

    public id:number;
    public title:string;
    public difficulty:number;
    public desc:string;

    private option:cEventOption[] = [];
    private result:cEventResult[] = [];

    constructor (JSONdata:any) {

        this.id = JSONdata.id;
        this.title = JSONdata.title;
        this.difficulty = JSONdata.difficulty;
        this.desc = JSONdata.desc;

    }

    public addOption(JSONOptionData:any) {
        
        var option = new cEventOption(JSONOptionData);

        this.option['id' + option.id] = option;

    }

    public addResult(JSONData:any) {

        var result = new cEventResult(JSONData);

        this.result['id' + result.id] = result;

        this.option['id' + result.idOption].result['id' + result.id] = result;

    }

    public addEffect(JSONData:any) {

        var effect = new cEventEffect(JSONData);

        var result:cEventResult = this.result['id' + effect.idResult];

        result.effect['id' + effect.id] = effect;

    }

    public getOption(id:number):cEventOption {
        return this.option['id' + id];
    }

    public getResult(idOption: integer) {

        var option:cEventOption = this.option['id' + idOption]
        var idResult = Object.keys(this.option['id' + idOption].result)[0]

        var posibleResult:cEventResult[] = [];

        for (var r in option.result) { 
            posibleResult.push(option.result[r]);
        }

        //lets check if we have more than one option
        if (posibleResult.length == 1) {

            return posibleResult[0]

        } else { //we chosse rand with the prob defineded for each result

            var rand = Phaser.Math.Between(0, 100);
            var probAcum:number = 0;
            var selectedResult:cEventResult;
            
            posibleResult.some(function(element) {
                probAcum += element.prob;
                
                if (rand  <= probAcum  ) {
                    selectedResult = element;
                    return true //this stop the loop
                }
            });

            return selectedResult;
        }

    }



}