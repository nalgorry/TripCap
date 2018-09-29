class mFights {

    public idEnemy:number[];
    public numberOfEnemys:number

    constructor(idEnemy:number[]) {
        this.idEnemy = idEnemy;
        this.numberOfEnemys = idEnemy.length;
    }

}