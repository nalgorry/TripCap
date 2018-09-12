class cTrip {

    public healtyCrew:number;
    public sickCrew:number;

    public boatSpeed:number = 0;

    public windSpeed:number = 0;
    private finalWindSpeed:number = 0;
    private windIncrement:number = 0;

    //Escala de Beaufort
    private windMinSpeed = 1; //nudos
    private windMaxSpeed = 22; //nudos - tormenta muy fuerte 64
    private windMod = 0; //some events change the wind

    //remos
    private rowsMaxSpeed = 8;
    private rowsEff = 0.25; //number that makes the exponetial grow

    private probSick = 1;

    private porcLostMant:number;
    private porcLostClean:number;
    private porcLostFood:number;
    private porcLostLeader:number;

        
    private maxCeroMant:integer = 8 * 1000 / 83.33; //el primer numero son la cantidad de segundos
    private maxCeroLeader:integer = 8 * 1000 / 83.33;
    private maxCeroClean:integer = 8 * 1000 / 83.33;
    private maxCeroFood:integer = 8 * 1000 / 83.33;
    private ceroFood:boolean = false;

    private numberOfAlert:integer = 0;
    private activeAlerts:boolean[] = [false, false, false, false];
    private alertsCounter:number[] = [0, 0, 0, 0];

    public tripEndGold:number;
    public tripTotalDist:number; //en nudos nauticos 
    public currentDistance:number = 0;
    public tripDistancePorc:number = 0;

    public eventMinTime:number = 15; //en segundos 
    public eventMaxTime:number = 22;

    public usedCrew = new Array();

    public currentStatus:number[] = new Array();
    public barPorc:number[] = new Array();

    private windTimer:Phaser.Time.TimerEvent;

    private leadershipAcumIncrement:number = 0.01;

    private eventsPosible:number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    private tripEnd:boolean = false; //flag to activate when the trip ends

    public startTime = new Date();

    public numOfEvents:number = 0;

    public boatStartStats:cBoat;

    constructor(public boat:cBoat, 
        public scene:Phaser.Scene) {

        this.tripTotalDist = boat.tripData.tripDistance;
        this.tripEndGold = boat.tripData.tripGold;
        this.healtyCrew = boat.crewman;
        this.sickCrew = 0;

        this.porcLostMant = boat.tripData.porcLostMant;
        this.porcLostClean = boat.tripData.porcLostClean;
        this.porcLostFood = boat.tripData.porcLostFood;
        this.porcLostLeader = boat.tripData.porcLostLeader;
        
        var a = this.boat
        this.boatStartStats = (<any>Object).assign({}, this.boat); //lets copy the object

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

        if (this.boat.numberOfTrips == 0) {
            //lets init the first event 
            this.scene.time.delayedCall(5000, this.startFirstEvent, [], this);    
        } else {
            this.startEventTimer();
        }
        
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
            this.finalWindSpeed = 1;
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

        this.numOfEvents += 1;
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
                   this.updateAvaibleCrew(value);
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
                    this.reduceAvaibleCrew(value);
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
                    break;
                case enumEffectType.ProbEnfermos:
                    this.probSick += value / 100;
                    break;
                case enumEffectType.PorcPerdidaMant:
                    this.porcLostMant += value / 100;
                    break;      
                case enumEffectType.Enfermos:
                    this.addSickCrew(value)
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

    public updateAvaibleCrew(value:number) {
        this.boat.crewman += value;
        if (value < 0) {
            this.reduceAvaibleCrew(-value);
        } else {
            this.healtyCrew += value;
        }   
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

        this.updateFood();

        this.updateMant();

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

        this.eventsPosible.splice(n , 1);

    }

    private crewSick() {

        var baseProbSick:number = 2; //probabilidad en 1000
        var cleanSick:number = 8;
        //depende de la limpieza si se enferman o no 
        var probSick = baseProbSick + cleanSick * (1 - this.currentStatus[enumStatus.clean]/ this.boat.cleanSystem );
        probSick = probSick * this.probSick;

        var rnd = Phaser.Math.Between(0, 1000);

        if (this.sickCrew == this.boat.crewman) return //if all are sick, there is nothing to do here

        if (probSick >= rnd) {
            this.oneCrewSick();
        }
    }

    private oneCrewSick() {
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

    private reduceAvaibleCrew(q: number) {

        for (var i=0; i<q ; i++ ) {

            if (this.healtyCrew > 0) {
                this.healtyCrew -=1;
            } else {
                var usedTask:number[] = new Array();
                //lets find where is the crew asigned
                for (var j=0; j < 6; j++ ) {
                    if (this.usedCrew[j] > 0) {
                        usedTask.push(j);
                    }
                }
                //we reduce a random one by one
                var rnd = Phaser.Math.Between(0,usedTask.length -1);
                this.usedCrew[usedTask[rnd]] -= 1;
            }
        }
    }

    public addSickCrew(value:integer) {
        for (var i=0; i<value ; i++ ) {
            this.oneCrewSick();
        }
    }

    private recoverSick() {

        this.sickCrew -= 1;
        this.healtyCrew += 1;

        this.scene.events.emit('updateCrew');

    }

    private alertCeroBar(status:enumStatus, maxValue:number ) {
        //lets check if the variable is in cero to a lert the capitan!!
        if (this.currentStatus[status]  <= 0) {
            this.alertsCounter[status] += 1;

            //increment the number of alerts
            if (this.activeAlerts[status] == false) {
                this.activeAlerts[status] = true;
                this.numberOfAlert += 1;
            }

            var data = {
                status:status, 
                value:this.alertsCounter[status], 
                maxValue:maxValue,
                numAlerts:this.numberOfAlert
            }

            //check if we are in cero 
            if (this.alertsCounter[status] >= maxValue) {

                switch (status) {
                    case enumStatus.clean:
                        this.probSick = 2;
                    break;
                    case enumStatus.food:
                        this.ceroFood = true;
                    break;
                    case enumStatus.leadership:
                    case enumStatus.maintenance:
                        this.scene.events.emit('gameEnd');
                    break;
                }

                
            }

            this.scene.events.emit('barInCero', data);

        }

        //lets check if we have to desactivate a alert
        if (this.currentStatus[status] > 0 && this.activeAlerts[status] == true) {
            
            this.activeAlerts[status] = false;
            this.scene.events.emit('barRecoverFromCero', status);
            this.numberOfAlert -= 1;

            //recover the status if needed
            switch (status) {
                case enumStatus.clean:
                    this.probSick = 1;
                break;
                case enumStatus.food:
                    this.ceroFood = false;
                break;
                case enumStatus.leadership:
                case enumStatus.maintenance:
                break;
            }
        }



    }

    private updateFood(value:number = 0) {

        var crewEfficiency = 0.018;
        var maxIncrement = 0.4;

        var baseLost = this.boat.crewman * 0.005; //we need to feed all the crew we have
        var baseLost = baseLost * this.porcLostFood;

        var increment = crewEfficiency * this.usedCrew[enumTask.fish] - baseLost;
        if (increment > maxIncrement) {increment = maxIncrement}

        this.currentStatus[enumStatus.food] += increment + value;

        this.checkLimitsStatus(enumStatus.food, this.boat.foodSystem);

        //check if we have to do an alert
        this.alertCeroBar(enumStatus.food, this.maxCeroFood);


    }

    private updateLeadership(value:number = 0) {

        var crewEfficiency = 0.07;
        var maxIncrement = 0.4;
        var acumIncrement = 0.02 / 100;

        //if we have no food, we have no creEfficiency
        if (this.ceroFood == true) {
            crewEfficiency = 0;
        }

        this.leadershipAcumIncrement += acumIncrement;

        var lost = this.leadershipAcumIncrement * this.porcLostLeader;

        var increment = crewEfficiency * this.usedCrew[enumTask.leadership] - lost;

        if (increment > maxIncrement) {increment = maxIncrement}

        this.currentStatus[enumStatus.leadership] += increment + value;

        this.checkLimitsStatus(enumStatus.leadership, this.boat.leaderSystem);

        //check if we have to do an alert
        this.alertCeroBar(enumStatus.leadership, this.maxCeroLeader);

    }

    public updateMant(value:number = 0) {
        
        var crewEfficiency = 0.04;
        var maxIncrement = 0.2;
        var baseLostMin = 0.05;
        var baseLost = 0.04 * 1.75; //need 1.75 trip in base case
        var incremLost = 0.035 * 3  //need 5 in worst case                                                                   

        //here when the sheep is more damaged it lost more 
        var lost = baseLost + incremLost * (1 - this.currentStatus[enumStatus.maintenance] / this.boat.mantSystem );
        lost = lost * this.porcLostMant //modif to the lost of mant

        if (lost < baseLostMin) {lost = baseLostMin}

        var increment = crewEfficiency * this.usedCrew[enumTask.maintenance] - lost;

        if (increment > maxIncrement) {increment = maxIncrement}

        this.currentStatus[enumStatus.maintenance] += increment + value;

        this.checkLimitsStatus(enumStatus.maintenance, this.boat.mantSystem);

        //check if we have to do an alert and increment the counter
        this.alertCeroBar(enumStatus.maintenance, this.maxCeroMant);

    }

    private updateClean(value:number = 0) {

        var cleanLostBase = 0.2 / 2;
        var crewEfficiency = 0.07 / 2;
        var maxIncrement = 0.4;

        var lost = cleanLostBase * this.porcLostClean;

        var increment = crewEfficiency * this.usedCrew[enumTask.clean] - lost;

        if (increment > maxIncrement) {increment = maxIncrement}

        this.currentStatus[enumStatus.clean] += increment + value;

        this.checkLimitsStatus(enumStatus.clean, this.boat.cleanSystem);

        //check if we have to do an alert
        this.alertCeroBar(enumStatus.clean, this.maxCeroClean);
    
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

            this.boat.nextTrip();

        }

    }

    public updateBoatSpeed(){

        //wind speed
        var boatMaxSpeed = this.windSpeed * this.boat.maxUsedWind;

        //lets calculate the efficiency of the crew, more wind speed needs more people
        if( boatMaxSpeed != 0) {
            var crewEfficiency = ( this.usedCrew[enumTask.navigation] * 4 ) / this.windSpeed

            if (crewEfficiency > 1) crewEfficiency = 1;

            var boatFinalSpeed = boatMaxSpeed * crewEfficiency;
        } else {
            boatFinalSpeed = 0;
        }

        //rows speed
        var boatRowsSpeed = this.rowsMaxSpeed * (1 - Math.exp(-this.rowsEff * this.usedCrew[enumTask.navigation]));

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