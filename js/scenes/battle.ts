class battle extends Phaser.Scene{

    public trip:cTrip;
    public boat:cBoat;

    private textHealtyCrew:Phaser.GameObjects.BitmapText;
    private textSickCrew:Phaser.GameObjects.BitmapText;

    private cards:vBattleCard[] = Array();
    private rectContainer:Phaser.GameObjects.Container;

    private arrayEnemy:vEnemy[] = [];

    private cBattle:cBattle;

    private ownRect:Phaser.Geom.Rectangle;

    private selCard:vBattleCard;
    private targetAllowed:boolean;
    private selEnemy:vEnemy;

    private statusBars:cStatusBar[] = [];

    private ownActionIcon:vBattleIcons;

    private refreshButton:Phaser.GameObjects.Sprite;
    private refreshText:Phaser.GameObjects.BitmapText;
    private refreshTurns:number = 3; //turns to have the refresh avaible again
    private refreshCount:number = 0; //actual turns

    create(trip:cTrip) {

        this.trip = trip;
        this.boat = trip.boat;
        this.cBattle = new cBattle(this.trip, this.boat, this);

        this.initScene();
        this.initCards();
        this.initEnemies();

        var rnd = Phaser.Math.Between(0,1);
        if (rnd == 0) {
            var b = new vUpdateCard(this, 360, 500, this.boat); //to test the update card
        } else {
            var a = new vNewCard(this, 360, 500, this.boat); //to test the new card
        }
        
        this.events.removeAllListeners('dragCard');
        this.events.removeAllListeners('dragEnd');
        this.events.removeAllListeners('dragStart');

        this.events.on('dragCard', this.cardDrag, this);
        this.events.on('dragEnd', this.dragEnd, this);
        this.events.on('dragStart',this.dragStart, this);

        this.updateBoatDamage(); //to update the bars of our boat
        
    }

    private dragStart(card:vBattleCard) {

        this.selCard = card;

        this.initDragRect();
    }

    private dragEnd(card:vBattleCard) {

        
        //destroy the rectangles
        this.rectContainer.destroy();

        if (this.targetAllowed == true) {
            //lets do some magic!
            
            var enemyData = undefined
            if (this.selEnemy != undefined) {
                enemyData = this.selEnemy.enemy;
            }

            this.cBattle.doTurn(card.cCard, enemyData); //calculate the logic of the atack 

            this.showTurnResults();

            this.selCard = card;

        }

    }

    private showTurnResults() {

        this.initTurnHideElements();

        this.showDefensiveSkills();

        var time = 0 


        time += 500;
        this.time.delayedCall(time, this.showOwnAtackSkills, [], this);

        time += 1000;
        this.time.delayedCall(time, this.updateEnemies, [], this);

        time += 500;
        this.time.delayedCall(time, this.showEnemyAtackSkills, [], this);

        time += 500;
        this.time.delayedCall(time, this.updateBoatDamage, [], this);

        time += 500;
        this.time.delayedCall(time, this.hideIcons, [], this);

        time += 500;
        this.time.delayedCall(time, this.endTurnShowElements, [], this);
        
    }

    private hideIcons() {

        this.ownActionIcon.hideIddleIcon();

        this.ownActionIcon.killIcons();

        this.arrayEnemy.forEach(e => {
            e.actionIcon.killIcons();
        })


    }

    private endTurnShowElements() {

        this.cBattle.endTurn();
  
        //lets select three new cards
        this.initCards();

        //show iddle icons
        this.arrayEnemy.forEach(e => {
            e.showAtackIcon();
        })

        //lets check if we have to end the battle
        if (this.cBattle.battleEnd == true) {
            this.battleEnd();
        }

        //update the refresh cards button
        if (this.refreshCount != 0) {
            
            var turns:number = this.refreshTurns - this.refreshCount;
            this.refreshText.text = turns.toString();

            if (this.refreshTurns == this.refreshCount) {
                this.refreshText.alpha = 0;
                this.refreshButton.alpha = 1;
                this.refreshCount = 0;
            } else {
                this.refreshCount += 1;
            }
            
        }

        //lets check if we are still alive
        if (this.trip.currentStatus[enumStatus.maintenance] <= 0 || this.trip.healtyCrew <= 0) {
            console.log("llega");
            this.scene.start('gameEnd');
        }

    }

    private battleEnd() {
        //lets continue or trip

        this.trip.numOfBattles += 1;

        var numBattle:number = this.trip.numOfBattles + 1;

        //for test, we reset the fight now
        var a  = this.add.bitmapText(360, 600, 'Pfont', "Batalla Numero: " + numBattle, 60);
        a.setOrigin(0.5);

        this.add.tween(
        {
            targets: a,
            scaleX: 1.5,
            scaleY: 1.5,
            duration: 1500,
            ease: 'Linear', 
        })

        this.time.delayedCall(2000, this.newBattle, [], this);
        
    }

    private newBattle() {
        
        this.scene.start('battle', this.trip);
    }

    private initTurnHideElements() {

        //hide the cards
        this.cards.forEach(e => {
            e.hideCard();
        })

        //hide the intensions icons
        this.arrayEnemy.forEach(e => {
            //e.actionIcon.hideIddleIcon();
        })



    }

    private showEnemyAtackSkills() {

        //activate the atack icons
        this.arrayEnemy.forEach(e => {
            e.actionIcon.activateAtackIcon();
        })


    }

    private updateBoatDamage() {
        
        this.statusBars[enumStatus.food].updateBar(this.trip.currentStatus[enumStatus.food], this.boat.foodSystem);
        this.statusBars[enumStatus.clean].updateBar(this.trip.currentStatus[enumStatus.clean], this.boat.cleanSystem);
        this.statusBars[enumStatus.maintenance].updateBar(this.trip.currentStatus[enumStatus.maintenance], this.boat.mantSystem);
        this.statusBars[enumStatus.leadership].updateBar(this.trip.currentStatus[enumStatus.leadership], this.boat.leaderSystem);

        this.textHealtyCrew.text = this.trip.healtyCrew.toString();
        this.textSickCrew.text = this.trip.sickCrew.toString();

        //show the defense if used 
        this.arrayEnemy.forEach(e => {
            this.ownActionIcon.checkDefIconAnim(e.enemy.atackData);
        });

    }

    private showOwnAtackSkills() {

        var cardData = this.selCard.cCard;
        
        this.ownActionIcon.activateAtackIcon(cardData.atackAbilities);

    }

    private updateEnemies() {
        this.arrayEnemy.forEach(e => {
            e.updateBars();

            if (e.enemy.isDead == true) {
                
                e.killEnemy();

                //remove the enemy from the array
                var idx = this.arrayEnemy.indexOf(e);
                    if (idx != -1) {
                        this.arrayEnemy.splice(idx, 1); 
                }

            }

        })
    }



    private showDefensiveSkills() {

        var cardData = this.selCard.cCard;

        //show defensive skills first
        if (cardData.defendAbilities[0] != undefined) {
            this.ownActionIcon.activateDefensiveIcons(cardData.defendAbilities);
        } 
        //activate the atack icons
        this.arrayEnemy.forEach(e => {
            e.actionIcon.activateDefensiveIcons();
        })

    }

    private initEnemies() {

        //lets create the visualization for each enemy
        this.cBattle.arrayEnemy.forEach(e => {

            var enemy = new vEnemy(this, e)

            this.arrayEnemy.push(enemy);

        })

    }

    private initDragRect() {

        this.rectContainer = this.add.container(0, 0);

        if (this.selCard.cCard.atackAbilities[0].id == enBattleAbilities.noAtack) { //no need to get a target
            this.ownRect = new Phaser.Geom.Rectangle(0, 365, 760, 460);

            //this boat rectangle
            var ownGreenRect = this.add.graphics();
            ownGreenRect.fillStyle(0x008000);
            ownGreenRect.fillRect(this.ownRect.x , this.ownRect.y, this.ownRect.width, this.ownRect.height);
            ownGreenRect.fillPath();
            ownGreenRect.alpha = 0.2;

            this.rectContainer.add(ownGreenRect);

        } else {
            //enemy rectangles
            this.arrayEnemy.forEach (enemy => {
                var rect = this.add.graphics();

                rect.fillStyle(0xFF0000);
                rect.fillRect(enemy.selRect.x , enemy.selRect.y, enemy.selRect.width, enemy.selRect.height);
                rect.fillPath();
                rect.alpha = 0.2;

                this.rectContainer.add(rect);

        })

        }
    
    }

    private cardDrag() {

        this.targetAllowed = false;
        this.selEnemy = undefined;

        var mouseRect = new Phaser.Geom.Rectangle(this.input.x, this.input.y, 2, 2);

        if (this.selCard.cCard.atackAbilities[0].id == enBattleAbilities.noAtack) { //no need to get a target

            if (Phaser.Geom.Intersects.RectangleToRectangle(this.ownRect, mouseRect)) {
                console.log("carta en cuadro verde")
                this.targetAllowed = true;
            }

        } else { //need a target

            this.arrayEnemy.forEach(enemy => {

                if (Phaser.Geom.Intersects.RectangleToRectangle(enemy.selRect, mouseRect)) {
                    this.targetAllowed = true;
                    this.selEnemy = enemy;
                }
            });
    }

    }

    private initCards() {

        //lests destroy all the previus cards
        this.cards.forEach(card => {
            card.destroy();
            i += 1;
        });

        this.cards = new Array();
        var selCards = this.cBattle.getSelectedCards();

        var i = 0;
        selCards.forEach(card => {
            console.log(card);
            this.cards.push(new vBattleCard(this, 140 + 214 * i, 1076, card, true));
            i += 1;
        });


    }

    private initScene() {

        var back = this.add.image(0, 0, 'battle_back');
        back.setOrigin(0);

        this.showStats();

        var c = this.add.container(154, 582);
        var s = this.add.sprite(0, 0,'ownShip');
        c.add(s);

        this.ownActionIcon = new vBattleIcons(this, s, c, false);

        //lets add the refresh button

        this.refreshButton = this.add.sprite(600, 880, 'battle_refresh');
        this.refreshButton.setOrigin(0.5);
        this.refreshButton.setInteractive();
        this.refreshButton.on('pointerup', this.refreshCards, this);

        this.refreshText = this.add.bitmapText(600, 880 - 8, 'Pfont', '3', 40);
        this.refreshText.setOrigin(0.5);
        this.refreshText.alpha = 0;

        //lets add the help button
        //lets create the helpButton button
        var helpButton:Phaser.GameObjects.Sprite
        helpButton =  this.add.sprite(100, 880,'battlehelpButton').setInteractive();
        helpButton.setOrigin(0.5);
        
        helpButton.on('pointerup', this.changeScene, this);

    }

    changeScene() {

        this.cameras.main.fade(500, 255, 255, 255);

        this.time.delayedCall(500, function() {

            this.scene.launch('battleHelp', this.trip);

        }, [], this);
        

    }

    private refreshCards() {

        console.log(this.refreshCount);

        if (this.refreshCount == 0) {
            this.initCards();
            this.refreshText.alpha = 1;
            this.refreshText.text = "3";
            this.refreshButton.alpha = 0.5;
            this.refreshCount += 1;
        }
        
    }

    public updateValues() {

        this.textHealtyCrew.text = this.trip.healtyCrew.toString();
        this.textSickCrew.text = this.trip.sickCrew.toString();

    }

    private showStats() {

        //complete the bars
        this.statusBars[enumStatus.maintenance]  = new cStatusBar(this, 208, 210, true);
        this.statusBars[enumStatus.food] = new cStatusBar(this, 208 + 132 * 1, 210, true);
        this.statusBars[enumStatus.clean] = new cStatusBar(this, 208 + 132 * 2, 210, true);
        this.statusBars[enumStatus.leadership] = new cStatusBar(this, 208 + 132 * 3, 210, true);

        //lets show the avaible crew
        this.textHealtyCrew = this.add.bitmapText(66, 230-20, 'Pfont', this.trip.healtyCrew.toString(), 40);
        this.textHealtyCrew.setOrigin(0.5);

        this.textSickCrew = this.add.bitmapText(132, 266-15, 'PfontRed', this.trip.sickCrew.toString(), 35);
        this.textSickCrew.setOrigin(0.5);

    }


}