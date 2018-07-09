class cTrip {

    public healtyCrew:number;
    public sickCrew:number;

    public boatSpeed:number = 0;

    public windSpeed:number = 0;
    private finalWindSpeed:number = 0;
    private windIncrement:number = 0;

    //Escala de Beaufort
    private windMinSpeed = 0; //nudos
    private windMaxSpeed = 30; //nudos - tormenta muy fuerte 64
    private windMod = 0; //some events change the wind

    //remos
    private rowsMaxSpeed = 8;
    private rowsEff = 0.25; //number that makes the exponetial grow

    public tripTotalDist:number = 100; //en nudos nauticos 
    public currentDistance:number = 0;
    public tripDistancePorc:number = 0;

    public eventMinTime:number = 15; //en segundos 
    public eventMaxTime:number = 45;

    private tripTime:number;

    public usedCrew = new Array();

    private currentStatus:number[] = new Array();

    public barPorc:number[] = new Array();

    private windTimer:Phaser.Time.TimerEvent;

    private eventsPosible:number[] = [2, 3, 4, 5, 6];

    private tripEnd:boolean = false; //flag to activate when the trip ends

    constructor(public boat:cBoat, 
        public scene:Phaser.Scene) {

        this.healtyCrew = boat.crewman;
        this.sickCrew = 0;

        //lets put in cero all the usedCrew
        for (var i = 0; i <= 6; i++) {
            this.usedCrew[i] = 0;
        }

        this.initTrip();

        //change the wind 
        this.windTimer = this.scene.time.addEvent({
            delay:500,
            callback: this.changeWind, 
            callbackScope: this
        })

        //lets init the first event 
        this.scene.time.delayedCall(5, this.startFirstEvent, [], this);    

        //this.startEventTimer();

    }

    private startEventTimer() {
        //timer to get a new event
        var time = Phaser.Math.Between(this.eventMinTime, this.eventMaxTime) * 1000;
        this.scene.time.delayedCall(time, this.startEvent, [], this);        
    }

    private changeWind() {

        //the new objetive speed
        if (this.windMod <= this.windMaxSpeed) {
            this.finalWindSpeed = Phaser.Math.Between(this.windMinSpeed, this.windMaxSpeed - this.windMod);
        } else {
            this.finalWindSpeed = 0;
        }

        //the number of cicles to chance the speed
        var cycles:number = Phaser.Math.Between(30,50);

        this.windIncrement = (this.finalWindSpeed - this.windSpeed) / cycles

        //timer to increment the speed of the wind slowly
        var timer = this.scene.time.addEvent({ 
            delay: 50, 
            callback: this.updateWind, 
            callbackScope: this, 
            repeat: cycles - 1});

        //timer to update the wind speed again
        this.windTimer.reset({ 
            delay: Phaser.Math.Between(5000,30000), 
            callback: this.changeWind, 
            callbackScope: this, 
            repeat: 1});

        console.log("wind:" + this.finalWindSpeed);

    }

    private updateWind() {
        this.windSpeed += this.windIncrement;
    }

    private initTrip() {

        this.currentStatus[enumStatus.food] = 0.8 * this.boat.foodSystem;
        this.currentStatus[enumStatus.maintenance] = 0.8 * this.boat.mantSystem;
        this.currentStatus[enumStatus.clean] = 0.8 * this.boat.cleanSystem;
        this.currentStatus[enumStatus.leadership] = 0.8 * this.boat.leaderSystem;

    }

    private startFirstEvent() {
        this.scene.events.emit('eventStart', 1);
    }


    public updateAfterEvent(result:cEventResult) {

        //lets check what we have to change in the trip

        for (var r in result.effect) { 
            
            var effect = result.effect[r];
            var value = effect.getValue();

            switch (effect.effectType) {
                case enumEffectType.Autoridad:
                    this.updateLeadership(value);
                    break;
                case enumEffectType.Comida:
                    this.updateFood(value);
                    break;
                case enumEffectType.Limpieza:
                this.updateClean(value);
                    break;
                case enumEffectType.Mantenimiento:
                    this.updateMant(value);
                    break;
                case enumEffectType.Marineros:
                    this.boat.crewman += value;
                    this.reduceAvaibleCrew(1);
                    break;
                case enumEffectType.Oro:
                    this.boat.gold += value;
                    break;
                case enumEffectType.Reputacion_Justiciero:
                    this.boat.reputationHeroe += value;
                    if (this.boat.reputationHeroe < 0) this.boat.reputationHeroe = 0;
                    break;
                case enumEffectType.Reputacion_Pirata:
                    this.boat.reputationPirate += value;
                    if (this.boat.reputationPirate < 0) this.boat.reputationPirate = 0;
                    break;
                case enumEffectType.Marineros_Ocupados:
                    this.reduceAvaibleCrew(1);
                    break;
                case enumEffectType.Viento:
                    this.windMod += value;
                    break;
                case enumEffectType.PorcOro:
                    this.boat.gold = Math.round(this.boat.gold * value);
                    break;
                case enumEffectType.Item:
                    
                    break;
                case enumEffectType.PorcLargoViaje:
                    this.tripTotalDist = this.tripTotalDist * (1 + value / 100);
                    console.log( this.tripTotalDist);
                    break;
                default:
                    break;
            }
            
        }

        //lets update all the variables
        this.scene.events.emit('updateCrew');
        this.scene.events.emit('updateTrip');

        //lets prepare for then ext event 
        this.startEventTimer();

    }

    public updateCrew(task:enumTask, upDown:enumUpDown) {

        var addValue:number;
        switch (upDown) {
            case enumUpDown.down:
                addValue = -1;
                break;
            case enumUpDown.up:
                addValue = 1;
                break;
            default:
                break;
        }

        //lets check if we can assing the crew
        if (this.healtyCrew - addValue >= 0 && 
            this.usedCrew[task] + addValue >= 0) {

            this.healtyCrew -= addValue;
            this.usedCrew[task] += addValue;

            this.scene.events.emit('updateCrew');
        }
        
    }

    public updateTrip() {

        this.updateBoatSpeed();

        this.updateTripDistance();

        this.updateClean();

        this.updateMant();

        this.updateFood();

        this.updateLeadership();

        this.crewSick();

        //lets update the bars %
        this.barPorc[enumStatus.food] = this.currentStatus[enumStatus.food] / this.boat.foodSystem;
        this.barPorc[enumStatus.maintenance] = this.currentStatus[enumStatus.maintenance] / this.boat.mantSystem;
        this.barPorc[enumStatus.clean] = this.currentStatus[enumStatus.clean] / this.boat.cleanSystem;
        this.barPorc[enumStatus.leadership] = this.currentStatus[enumStatus.leadership] / this.boat.leaderSystem;

        this.scene.events.emit('updateTrip');

    }

    private startEvent() {
        var n = Phaser.Math.Between(0,this.eventsPosible.length -1); //we chosse one of the possible events for this trip

        this.scene.events.emit('eventStart', this.eventsPosible[n]);

        console.log(n);

        this.eventsPosible.splice(n , 1);

        console.log(this.eventsPosible);
    }



    private crewSick() {

        var maxProbSick:number = 12; //probabilidad en 1000
        //depende de la limpieza si se enferman o no 
        var probSick = maxProbSick * this.currentStatus[enumStatus.clean] / this.boat.cleanSystem 

        var rnd = Phaser.Math.Between(0, 1000);

        if (this.sickCrew == this.boat.crewman) return //if all are sick, there is nothing to do here

        if (probSick >= rnd) {
            //se enfermo uno 
            this.sickCrew += 1;

            this.reduceAvaibleCrew(1)

            //lets start a timer to see how much time they will be sick
            var time = Phaser.Math.Between(20, 60) * 1000; //time in mili seconds

            var timer = this.scene.time.addEvent({ 
                delay: time, 
                callback: this.recoverSick, 
                callbackScope: this, 
                repeat: 0});
            
            this.scene.events.emit('updateCrew');
        }
    }

    private reduceAvaibleCrew(q: number) {

        for (var i=0; i<q ; i++ ) {

            if (this.healtyCrew > 0) {
                this.healtyCrew -=1;
            } else {
                var usedTask:number[] = new Array();
                //lets find where is the crew asigned
                for (var i=0; i < 6; i++ ) {
                    if (this.usedCrew[i] > 0) {
                        usedTask.push(i);
                    }
                }
                //we reduce a random one by one
                var rnd = Phaser.Math.Between(0,usedTask.length -1);
                this.usedCrew[usedTask[rnd]] -= 1;
            }
        }
    }

    private recoverSick() {

        this.sickCrew -= 1;
        this.healtyCrew += 1;

        this.scene.events.emit('updateCrew');

    }

    private updateFood(value:number = 0) {

        var crewEfficiency = 0.015;
        var maxIncrement = 0.4;

        var baseLost = this.boat.crewman * 0.005; //we need to feed all the crew we have

        var increment = crewEfficiency * this.usedCrew[enumTask.fish] - baseLost;
        if (increment > maxIncrement) {increment = maxIncrement}

        this.currentStatus[enumStatus.food] += increment + value;

        this.checkLimitsStatus(enumStatus.food, this.boat.foodSystem);

    }

    private updateLeadership(value:number = 0) {

        var crewEfficiency = 0.07;
        var maxIncrement = 0.4;
        var baseLostMin = 0.1;

        var limitTime = 500 //tiempo limite para que el barco entre en lio barbaro :P

        //here when the sheep is more damaged it lost more 
        var baseLost = 0.8 * this.scene.time.now / 1000 / limitTime;
        if (baseLost < baseLostMin) {baseLost = baseLostMin}

        var increment = crewEfficiency * this.usedCrew[enumTask.leadership] - baseLost;

        if (increment > maxIncrement) {increment = maxIncrement}

        this.currentStatus[enumStatus.leadership] += increment + value;

        this.checkLimitsStatus(enumStatus.leadership, this.boat.leaderSystem);
    }

    private updateMant(value:number = 0) {
        
        var crewEfficiency = 0.07;
        var maxIncrement = 0.4;
        var baseLostMin = 0.1;

        //here when the sheep is more damaged it lost more 
        var baseLost = 0.3 * this.currentStatus[enumStatus.maintenance] / this.boat.mantSystem;
        if (baseLost < baseLostMin) {baseLost = baseLostMin}

        var increment = crewEfficiency * this.usedCrew[enumTask.maintenance] - baseLost;

        if (increment > maxIncrement) {increment = maxIncrement}

        this.currentStatus[enumStatus.maintenance] += increment + value;

        this.checkLimitsStatus(enumStatus.maintenance, this.boat.mantSystem);
    }

    private updateClean(value:number = 0) {

        var cleanLostBase = 0.2;
        var crewEfficiency = 0.07;
        var maxIncrement = 0.4;

        var increment = crewEfficiency * this.usedCrew[enumTask.clean] - cleanLostBase;

        if (increment > maxIncrement) {increment = maxIncrement}

        this.currentStatus[enumStatus.clean] += increment + value;

        this.checkLimitsStatus(enumStatus.clean, this.boat.cleanSystem);
    
    }

    private checkLimitsStatus(status:enumStatus, max:number) {
        if (this.currentStatus[status] > max) {
            this.currentStatus[status] = max
        } else if (this.currentStatus[status] < 0) {
            this.currentStatus[status] = 0;
        }
    }

    private updateTripDistance() {
        this.currentDistance += this.boatSpeed * 0.01;

        this.tripDistancePorc = this.currentDistance / this.tripTotalDist;

        if (this.tripDistancePorc >= 1 && this.tripEnd == false) {
            this.scene.events.emit("tripEnd");
            this.tripEnd = true;

        }

    }

    public updateBoatSpeed(){

        //wind speed
        var boatMaxSpeed = this.windSpeed * this.boat.maxUsedWind;

        //lets calculate the efficiency of the crew, more wind speed needs more people
        if( boatMaxSpeed != 0) {
            var crewEfficiency = ( this.usedCrew[enumTask.sails] * 5 ) / this.windSpeed

            if (crewEfficiency > 1) crewEfficiency = 1;

            var boatFinalSpeed = boatMaxSpeed * crewEfficiency;
        } else {
            boatFinalSpeed = 0;
        }

        //rows speed
        var boatRowsSpeed = this.rowsMaxSpeed * (1 - Math.exp(-this.rowsEff * this.usedCrew[enumTask.rows]));

        if (boatRowsSpeed > boatFinalSpeed) {
            boatFinalSpeed = boatRowsSpeed;
        }

        var boatIncrementSpeed = 0.2;

        if (this.boatSpeed != boatFinalSpeed) {

            if ( (boatFinalSpeed- this.boatSpeed) <= boatIncrementSpeed) {
                this.boatSpeed = boatFinalSpeed;
            } else if (boatFinalSpeed > this.boatSpeed) {
                this.boatSpeed += boatIncrementSpeed;
            } else {
                this.boatSpeed -= boatIncrementSpeed;
            }

        }

    }

    

    
}