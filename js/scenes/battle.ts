class battle extends Phaser.Scene{

    public trip:cTrip;
    public boat:cBoat;

    private textHealtyCrew:Phaser.GameObjects.BitmapText;
    private textSickCrew:Phaser.GameObjects.BitmapText;

    private cards:vBattleCard[] = Array();
    private rectContainer:Phaser.GameObjects.Container;

    private cBattle:cBattle;

    private ownRect:Phaser.Geom.Rectangle;

    private selCard:vBattleCard;
    private targetAllowed:boolean;

    create(trip:cTrip) {

        this.trip = trip;
        this.boat = trip.boat;
        this.cBattle = new cBattle(this.trip, this.boat, this);

        this.initScene();
        this.initCards();

        this.events.removeAllListeners('dragCard');
        this.events.removeAllListeners('dragEnd');

        this.events.on('dragCard', this.cardDrag, this);
        this.events.on('dragEnd', this.dragEnd, this);
        this.events.on('dragStart',this.dragStart, this);
        
    }

    private dragStart(card:vBattleCard) {

        this.selCard = card;

        console.log(this.selCard);

        this.initDragRect();
    }

    private dragEnd(card:vBattleCard) {

        
        //destroy the rectangles
        this.rectContainer.destroy();

        if (this.targetAllowed == true) {
            //lets do some magic!
            
            //this.cBattle.doTurn();

            
            //lets select three new cards
            this.initCards();
        }


    }

    private initDragRect() {

        this.rectContainer = this.add.container(0, 0);

        if (this.selCard.cCard.atackAbilities.length == 0) { //no need to get a target
            this.ownRect = new Phaser.Geom.Rectangle(0, 365, 760, 460);

            //this boat rectangle
            var ownGreenRect = this.add.graphics();
            ownGreenRect.fillStyle(0x008000);
            ownGreenRect.fillRect(this.ownRect.x , this.ownRect.y, this.ownRect.width, this.ownRect.height);
            ownGreenRect.fillPath();
            ownGreenRect.alpha = 0.5;

            this.rectContainer.add(ownGreenRect);

        } else {
            //enemy rectangles
            this.cBattle.arrayEnemy.forEach (enemy => {
                var rect = this.add.graphics();

                rect.fillStyle(0xFF0000);
                rect.fillRect(enemy.selRect.x , enemy.selRect.y, enemy.selRect.width, enemy.selRect.height);
                rect.fillPath();
                rect.alpha = 0.5;

                this.rectContainer.add(rect);

        })

        }
    
    }

    private cardDrag() {

        this.targetAllowed = false;

        var mouseRect = new Phaser.Geom.Rectangle(this.input.x, this.input.y, 2, 2);

        if (this.selCard.cCard.atackAbilities.length == 0) { //no need to get a target

            if (Phaser.Geom.Intersects.RectangleToRectangle(this.ownRect, mouseRect)) {
                console.log("carta en cuadro verde")
                this.targetAllowed = true;
            }

        } else { //need a target

            this.cBattle.arrayEnemy.forEach(enemy => {

                if (Phaser.Geom.Intersects.RectangleToRectangle(enemy.selRect, mouseRect)) {
                    this.targetAllowed = true;
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
            this.cards.push(new vBattleCard(this, 140 + 214 * i, 1076, card));
            i += 1;
        });


    }

    private initScene() {

        var back = this.add.image(0, 0, 'battle_back');
        back.setOrigin(0);

        this.showStats();

    }

    public updateValues() {

        this.textHealtyCrew.text = this.trip.healtyCrew.toString();
        this.textSickCrew.text = this.trip.sickCrew.toString();

    }

    private showStats() {

        //complete the bars
        var mant  = new cStatusBar(this, 208, 210, true);
        var food = new cStatusBar(this, 208 + 132 * 1, 210, true);
        var clean = new cStatusBar(this, 208 + 132 * 2, 210, true);
        var leadership = new cStatusBar(this, 208 + 132 * 3, 210, true);

        //lets show the avaible crew
        this.textHealtyCrew = this.add.bitmapText(66, 230-20, 'Pfont', this.trip.healtyCrew.toString(), 40);
        this.textHealtyCrew.setOrigin(0.5);

        this.textSickCrew = this.add.bitmapText(132, 266-15, 'PfontRed', this.trip.sickCrew.toString(), 35);
        this.textSickCrew.setOrigin(0.5);

    }


}