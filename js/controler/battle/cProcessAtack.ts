class cProcessAtack {

    //atack results
    public boatDamage:number = 0;
    public crewDamage:number = 0;
    public missAtack:boolean = false;
    public boatDefended:boolean = false;
    public crewDefended:boolean = false;
    public nextTurnAtackMult = 1;

    private boatDefense:number = 0;
    private crewDefense:number = 0;
    private missPorc:number = 0;

    public constructor(atackerAbilites:cBattleAbility[], defenderAbilites:cBattleAbility[], lastTurnData:cNextTurnAbilities) {

        //process the defense abilities
        defenderAbilites.forEach(e => {
            switch (e.id) {
                case enBattleAbilities.dodge:
                this.activateDodge(e);
                    break;
                case enBattleAbilities.defendBoat:
                this.activateBoatDeff(e);
                    break;
                case enBattleAbilities.defendCrew:
                this.activateCrewDeff(e);
                    break;
            
                default:
                    break;
            }

        });
     
        //process the atack abilities
        atackerAbilites.forEach( e => {
            switch (e.id) {
                case enBattleAbilities.cannons:
                    this.activateCannons(e);
                    break;
                case enBattleAbilities.arrows:
                    this.activateArrows(e);
                    break;
                case enBattleAbilities.axes:
                    this.activateAxes(e);
                    break;
                case enBattleAbilities.updateAtack:
                    this.updateAtack(e);
                    break;
            
                default:
                    break;
            }
        })

        //lets process all the last atack abilitys
        this.processLastTurnAbilities(lastTurnData);

        this.calculateDefense();

        //lets check the miss 
        if (this.missPorc != 0) {

            var rnd = Phaser.Math.Between(0, 100);

            //lets check if the miss is done
            if (this.missPorc * 100 >= rnd) {
                this.missAtack = true;
                this.crewDamage = 0;
                this.boatDamage = 0;
            }

        } 

        //lets correct the crew atack 
        this.crewDamage = this.crewDamage / 10;

    }

    private processLastTurnAbilities(lastTurnData:cNextTurnAbilities) {
        this.crewDamage = this.crewDamage * lastTurnData.atackMult;
        this.boatDamage = this.boatDamage * lastTurnData.atackMult;
    }

    private updateAtack(data:cBattleAbility) {
        this.nextTurnAtackMult += 1 + 0.2 * (data.lvl - 1);
    }

    private calculateDefense() {

        //lets process the boat defense 
        if (this.boatDefense > 0 && this.boatDamage > 0) {
            this.boatDefended = true;
            this.boatDamage -= this.boatDefense;
            if (this.boatDamage < 0) {this.boatDamage = 0}
        }

        //lets process the crew defense 
        if (this.crewDefense > 0 && this.crewDamage > 0) {
            this.crewDefended = true;
            this.crewDamage -= this.crewDefense;
            if (this.crewDamage < 0) {this.crewDamage = 0}
        }
    }

    private activateCannons(data:cBattleAbility) {

        this.boatDamage += data.lvl * 10;
        
    }

    private activateArrows(data:cBattleAbility) {

        this.crewDamage += data.lvl * 10;
        
    }

    private activateAxes(data:cBattleAbility) {

        this.crewDamage += data.lvl * 5;
        this.boatDamage += data.lvl * 5;

    }

    private activateDodge(data:cBattleAbility) {

        this.missPorc += 0.2 + data.lvl * 0.05;

    }

    private activateCrewDeff(data:cBattleAbility) {

        this.crewDefense += data.lvl * 8;

    }

    private activateBoatDeff(data:cBattleAbility) {

        this.boatDefense += data.lvl * 8;

    }


}