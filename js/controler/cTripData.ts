class cTripData {

    public id:number;
    public tripDistance:number;
    public eventsPosible:number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    public tripTip:string;
    public tripGold:number;
    public arrow1:{x:number, y:number};
    public arrow2:{x:number, y:number};


    constructor(data:any) {

        this.id = data.id;
        this.tripDistance = data.tripDistance;
        this.tripTip = data.tripTip;
        this.tripGold = data.tripGold;
        this.arrow1 = data.arrow1;
        this.arrow2 = data.arrow2;

    }


}