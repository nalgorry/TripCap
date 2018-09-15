class cProcessAtack {

    //atack results
    public boatDamage:number = 0;
    public crewDamage:number = 0;
    public missAtack:boolean = false;
    public boatDefended:boolean = false;
    public crewDefended:boolean = false;

    private boatDefense:number = 0;
    private crewDefense:number = 0;
    private missPorc:number = 0;

    public constructor(atackerAbilites:cBattleAbility[], defenderAbilites:cBattleAbility[]) {

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
        
        if (this.missAtack == false) {
            //if not miss we continue
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
                        
                        break;
                
                    default:
                        break;
                }
            })

            this.processDefense();

            console.log(this);
        }

        //lets correct the crew atack 
        this.crewDamage = this.crewDamage / 10;

    }

    private processDefense() {

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
        switch (data.lvl) {
            case 1:
            this.boatDamage = 12; 
                break;
            case 2:
            this.boatDamage = 18;
                break;
            case 3:
            this.boatDamage = 22;
                break;

            default:
                break;
        }

        
    }

    private activateArrows(data:cBattleAbility) {
        switch (data.lvl) {
            case 1:
            this.crewDamage = 12; 
                break;
            case 2:
            this.crewDamage = 18;
                break;
            case 3:
            this.crewDamage = 22;
                break;

            default:
                break;
        }

        
    }

    private activateAxes(data:cBattleAbility) {
        switch (data.lvl) {
            case 1:
            this.boatDamage = 8; 
            this.crewDamage = 8; 
                break;
            case 2:
            this.boatDamage = 12; 
            this.crewDamage = 12; 
                break;
            case 3:
            this.boatDamage = 16; 
            this.crewDamage = 16; 
                break;

            default:
                break;
        }
    }

    private activateDodge(data:cBattleAbility) {

        switch (data.lvl) {
            case 1:
            this.missPorc = 0.2; 
                break;
            case 2:
            this.missPorc = 0.3; 
                break;
            case 3:
            this.missPorc = 0.4; 
                break;

            default:
                break;
        }

    }

    private activateCrewDeff(data:cBattleAbility) {

        switch (data.lvl) {
            case 1:
            this.crewDefense = 10;
                break;
            case 2:
            this.crewDefense = 15;
                break;
            case 3:
            this.crewDefense = 20;
                break;

            default:
                break;
        }

    }

    private activateBoatDeff(data:cBattleAbility) {

        switch (data.lvl) {
            case 1:
                this.boatDefense = 10;
                break;
            case 2:
                this.boatDefense = 15;
                break;
            case 3:
                this.boatDefense = 20;
                break;

            default:
                break;
        }

    }


}