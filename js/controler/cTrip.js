var cTrip = (function () {
    function cTrip(boat, scene) {
        this.boat = boat;
        this.scene = scene;
        this.boatSpeed = 0;
        this.windSpeed = 0;
        this.finalWindSpeed = 0;
        this.windIncrement = 0;
        //Escala de Beaufort
        this.windMinSpeed = 1; //nudos
        this.windMaxSpeed = 30; //nudos - tormenta muy fuerte 64
        this.windMod = 0; //some events change the wind
        //remos
        this.rowsMaxSpeed = 8;
        this.rowsEff = 0.25; //number that makes the exponetial grow
        this.probSick = 1;
        this.PorcPerdidaMant = 1;
        this.currentDistance = 0;
        this.tripDistancePorc = 0;
        this.eventMinTime = 18; //en segundos 
        this.eventMaxTime = 30;
        this.usedCrew = new Array();
        this.currentStatus = new Array();
        this.barPorc = new Array();
        this.leadershipAcumIncrement = 0.01;
        this.eventsPosible = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.tripEnd = false; //flag to activate when the trip ends
        this.startTime = new Date();
        this.numOfEvents = 0;
        this.tripTotalDist = boat.tripData.tripDistance;
        this.tripEndGold = boat.tripData.tripGold;
        this.healtyCrew = boat.crewman;
        this.sickCrew = 0;
        var a = this.boat;
        this.boatStartStats = Object.assign({}, this.boat); //lets copy the object
        //lets put in cero all the usedCrew
        for (var i = 0; i <= 6; i++) {
            this.usedCrew[i] = 0;
        }
        this.initTrip();
        //change the wind 
        this.windTimer = this.scene.time.addEvent({
            delay: 500,
            callback: this.changeWind,
            callbackScope: this
        });
        if (this.boat.numberOfTrips == 0) {
            //lets init the first event 
            this.scene.time.delayedCall(5000, this.startFirstEvent, [], this);
        }
        else {
            this.startEventTimer();
        }
    }
    cTrip.prototype.startEventTimer = function () {
        //timer to get a new event
        var time = Phaser.Math.Between(this.eventMinTime, this.eventMaxTime) * 1000;
        this.scene.time.delayedCall(time, this.startEvent, [], this);
    };
    cTrip.prototype.changeWind = function () {
        //the new objetive speed
        if (this.windMod <= this.windMaxSpeed) {
            this.finalWindSpeed = Phaser.Math.Between(this.windMinSpeed, this.windMaxSpeed - this.windMod);
        }
        else {
            this.finalWindSpeed = 1;
        }
        //the number of cicles to chance the speed
        var cycles = Phaser.Math.Between(30, 50);
        this.windIncrement = (this.finalWindSpeed - this.windSpeed) / cycles;
        //timer to increment the speed of the wind slowly
        var timer = this.scene.time.addEvent({
            delay: 50,
            callback: this.updateWind,
            callbackScope: this,
            repeat: cycles - 1 });
        //timer to update the wind speed again
        this.windTimer.reset({
            delay: Phaser.Math.Between(5000, 30000),
            callback: this.changeWind,
            callbackScope: this,
            repeat: 1 });
        console.log("wind:" + this.finalWindSpeed);
    };
    cTrip.prototype.updateWind = function () {
        this.windSpeed += this.windIncrement;
    };
    cTrip.prototype.initTrip = function () {
        this.currentStatus[0 /* food */] = 0.8 * this.boat.foodSystem;
        this.currentStatus[1 /* maintenance */] = 0.8 * this.boat.mantSystem;
        this.currentStatus[2 /* clean */] = 0.8 * this.boat.cleanSystem;
        this.currentStatus[3 /* leadership */] = 0.8 * this.boat.leaderSystem;
    };
    cTrip.prototype.startFirstEvent = function () {
        this.scene.events.emit('eventStart', 1);
    };
    cTrip.prototype.updateAfterEvent = function (result) {
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
                    if (this.boat.reputationHeroe < 0)
                        this.boat.reputationHeroe = 0;
                    break;
                case enumEffectType.Reputacion_Pirata:
                    this.boat.reputationPirate += value;
                    if (this.boat.reputationPirate < 0)
                        this.boat.reputationPirate = 0;
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
                    this.PorcPerdidaMant += value / 100;
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
    };
    cTrip.prototype.updateAvaibleCrew = function (value) {
        this.boat.crewman += value;
        if (value < 0) {
            this.reduceAvaibleCrew(-value);
        }
        else {
            this.healtyCrew += value;
        }
    };
    cTrip.prototype.updateCrew = function (task, upDown) {
        var addValue;
        switch (upDown) {
            case 1 /* down */:
                addValue = -1;
                break;
            case 0 /* up */:
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
    };
    cTrip.prototype.updateTrip = function () {
        this.updateBoatSpeed();
        this.updateTripDistance();
        this.updateClean();
        this.updateMant();
        this.updateFood();
        this.updateLeadership();
        this.crewSick();
        //lets update the bars %
        this.barPorc[0 /* food */] = this.currentStatus[0 /* food */] / this.boat.foodSystem;
        this.barPorc[1 /* maintenance */] = this.currentStatus[1 /* maintenance */] / this.boat.mantSystem;
        this.barPorc[2 /* clean */] = this.currentStatus[2 /* clean */] / this.boat.cleanSystem;
        this.barPorc[3 /* leadership */] = this.currentStatus[3 /* leadership */] / this.boat.leaderSystem;
        this.scene.events.emit('updateTrip');
    };
    cTrip.prototype.startEvent = function () {
        var n = Phaser.Math.Between(0, this.eventsPosible.length - 1); //we chosse one of the possible events for this trip
        this.scene.events.emit('eventStart', this.eventsPosible[n]);
        console.log(n);
        this.eventsPosible.splice(n, 1);
        console.log(this.eventsPosible);
    };
    cTrip.prototype.crewSick = function () {
        var baseProbSick = 2; //probabilidad en 1000
        var cleanSick = 8;
        //depende de la limpieza si se enferman o no 
        var probSick = baseProbSick + cleanSick * (1 - this.currentStatus[2 /* clean */] / this.boat.cleanSystem);
        probSick = probSick * this.probSick;
        var rnd = Phaser.Math.Between(0, 1000);
        if (this.sickCrew == this.boat.crewman)
            return; //if all are sick, there is nothing to do here
        if (probSick >= rnd) {
            //se enfermo uno 
            this.sickCrew += 1;
            this.reduceAvaibleCrew(1);
            //lets start a timer to see how much time they will be sick
            var time = Phaser.Math.Between(20, 60) * 1000; //time in mili seconds
            var timer = this.scene.time.addEvent({
                delay: time,
                callback: this.recoverSick,
                callbackScope: this,
                repeat: 0 });
            this.scene.events.emit('updateCrew');
        }
    };
    cTrip.prototype.reduceAvaibleCrew = function (q) {
        for (var i = 0; i < q; i++) {
            if (this.healtyCrew > 0) {
                this.healtyCrew -= 1;
            }
            else {
                var usedTask = new Array();
                //lets find where is the crew asigned
                for (var j = 0; j < 6; j++) {
                    if (this.usedCrew[j] > 0) {
                        usedTask.push(j);
                    }
                }
                //we reduce a random one by one
                var rnd = Phaser.Math.Between(0, usedTask.length - 1);
                this.usedCrew[usedTask[rnd]] -= 1;
            }
        }
    };
    cTrip.prototype.recoverSick = function () {
        this.sickCrew -= 1;
        this.healtyCrew += 1;
        this.scene.events.emit('updateCrew');
    };
    cTrip.prototype.updateFood = function (value) {
        if (value === void 0) { value = 0; }
        var crewEfficiency = 0.015;
        var maxIncrement = 0.4;
        var baseLost = this.boat.crewman * 0.005; //we need to feed all the crew we have
        var increment = crewEfficiency * this.usedCrew[5 /* fish */] - baseLost;
        if (increment > maxIncrement) {
            increment = maxIncrement;
        }
        this.currentStatus[0 /* food */] += increment + value;
        this.checkLimitsStatus(0 /* food */, this.boat.foodSystem);
    };
    cTrip.prototype.updateLeadership = function (value) {
        if (value === void 0) { value = 0; }
        var crewEfficiency = 0.07;
        var maxIncrement = 0.4;
        var acumIncrement = 0.02 / 100;
        this.leadershipAcumIncrement += acumIncrement;
        var increment = crewEfficiency * this.usedCrew[2 /* leadership */] - this.leadershipAcumIncrement;
        if (increment > maxIncrement) {
            increment = maxIncrement;
        }
        this.currentStatus[3 /* leadership */] += increment + value;
        this.checkLimitsStatus(3 /* leadership */, this.boat.leaderSystem);
    };
    cTrip.prototype.updateMant = function (value) {
        if (value === void 0) { value = 0; }
        var crewEfficiency = 0.04;
        var maxIncrement = 0.2;
        var baseLostMin = 0.05;
        var baseLost = 0.04 * 1.75; //need 1.75 trip in base case
        var incremLost = 0.04 * 3; //need 5 in worst case                                                                   
        //here when the sheep is more damaged it lost more 
        var lost = baseLost + incremLost * (1 - this.currentStatus[1 /* maintenance */] / this.boat.mantSystem);
        lost = lost * this.PorcPerdidaMant; //modif to the lost of mant
        if (lost < baseLostMin) {
            lost = baseLostMin;
        }
        var increment = crewEfficiency * this.usedCrew[3 /* maintenance */] - lost;
        if (increment > maxIncrement) {
            increment = maxIncrement;
        }
        this.currentStatus[1 /* maintenance */] += increment + value;
        this.checkLimitsStatus(1 /* maintenance */, this.boat.mantSystem);
    };
    cTrip.prototype.updateClean = function (value) {
        if (value === void 0) { value = 0; }
        var cleanLostBase = 0.2 / 2;
        var crewEfficiency = 0.07 / 2;
        var maxIncrement = 0.4;
        var increment = crewEfficiency * this.usedCrew[4 /* clean */] - cleanLostBase;
        if (increment > maxIncrement) {
            increment = maxIncrement;
        }
        this.currentStatus[2 /* clean */] += increment + value;
        this.checkLimitsStatus(2 /* clean */, this.boat.cleanSystem);
    };
    cTrip.prototype.checkLimitsStatus = function (status, max) {
        if (this.currentStatus[status] > max) {
            this.currentStatus[status] = max;
        }
        else if (this.currentStatus[status] < 0) {
            this.currentStatus[status] = 0;
        }
    };
    cTrip.prototype.updateTripDistance = function () {
        this.currentDistance += this.boatSpeed * 0.01;
        this.tripDistancePorc = this.currentDistance / this.tripTotalDist;
        if (this.tripDistancePorc >= 1 && this.tripEnd == false) {
            this.scene.events.emit("tripEnd");
            this.tripEnd = true;
            this.boat.nextTrip();
        }
    };
    cTrip.prototype.updateBoatSpeed = function () {
        //wind speed
        var boatMaxSpeed = this.windSpeed * this.boat.maxUsedWind;
        //lets calculate the efficiency of the crew, more wind speed needs more people
        if (boatMaxSpeed != 0) {
            var crewEfficiency = (this.usedCrew[0 /* sails */] * 5) / this.windSpeed;
            if (crewEfficiency > 1)
                crewEfficiency = 1;
            var boatFinalSpeed = boatMaxSpeed * crewEfficiency;
        }
        else {
            boatFinalSpeed = 0;
        }
        //rows speed
        var boatRowsSpeed = this.rowsMaxSpeed * (1 - Math.exp(-this.rowsEff * this.usedCrew[1 /* rows */]));
        if (boatRowsSpeed > boatFinalSpeed) {
            boatFinalSpeed = boatRowsSpeed;
        }
        var boatIncrementSpeed = 0.2;
        if (this.boatSpeed != boatFinalSpeed) {
            if ((boatFinalSpeed - this.boatSpeed) <= boatIncrementSpeed) {
                this.boatSpeed = boatFinalSpeed;
            }
            else if (boatFinalSpeed > this.boatSpeed) {
                this.boatSpeed += boatIncrementSpeed;
            }
            else {
                this.boatSpeed -= boatIncrementSpeed;
            }
        }
    };
    return cTrip;
}());
