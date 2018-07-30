class city extends Phaser.Scene {

    private back:Phaser.GameObjects.Image;
    private nextTripbutton: Phaser.GameObjects.Image;
    private boat:cBoat;

    private buyButton:Phaser.GameObjects.Sprite;
    private backButton:Phaser.GameObjects.Sprite;

    private cityButtons:Phaser.GameObjects.Sprite[] = new Array();

    private selCity:number;
    private initPoss:Phaser.Geom.Point;

    private cardBorder:Phaser.GameObjects.Sprite;

    private selectCard:any; //the selected card to buy
    private cardsToSelect:any[] = new Array();

    private goldText:Phaser.GameObjects.BitmapText;
    private crewText:Phaser.GameObjects.BitmapText;
    private cardTextDesc:Phaser.GameObjects.BitmapText;

    private animInProgress:boolean = false;

    private city:cCity;

    create(boat:cBoat) {

        this.city = new cCity(boat); //to control the logic of the city
        this.boat = boat;

        this.initScene();
    }

    update() {
    }

    private initScene() {

        //lets apear slowly
        this.cameras.main.fadeIn(500, 255, 255, 255);

        //lets add the back of the game 
        this.back = this.add.image(0, 0,'backCity');
        this.back.setOrigin(0);

        //lets add the border of the selected option
        this.cardBorder = this.add.sprite(0, 0, "cardBorder");
        this.cardBorder.alpha = 0;
        this.cardBorder.setOrigin(0.5, 0);
    
        //lets add the next trip button
        this.nextTripbutton =  this.add.sprite(360,1090,'nextTripButton')
        this.nextTripbutton.setInteractive();

        this.nextTripbutton.on('pointerup', this.goToTrip, this);

        this.nextTripbutton.on('pointerdown', this.finishClick, this);

        //lets create the city
        var x:number = 125;
        var y:number = 380;

        this.cityButtons[0] = this.add.sprite(x, y, 'cityImage', 0);
        
        x += this.cityButtons[0].width ;
        this.cityButtons[1] = this.add.sprite(x, y, 'cityImage', 1);
        this.cityButtons[1].setInteractive();
        this.cityButtons[1].on('pointerdown', this.buyItem, this);

        x += this.cityButtons[0].width ;
        this.cityButtons[2] = this.add.sprite(x, y, 'cityImage', 2);

        //second line
        y += this.cityButtons[0].height ;
        x = 125;

        this.cityButtons[3] = this.add.sprite(x, y, 'cityImage', 3);
        this.cityButtons[3].setInteractive();
        this.cityButtons[3].on('pointerdown', this.hireCreaw, this);

        x += this.cityButtons[0].width ;
        this.cityButtons[4] = this.add.sprite(x, y, 'cityImage', 4);

        x += this.cityButtons[0].width ;
        this.cityButtons[5] = this.add.sprite(x, y, 'cityImage', 5);
        this.cityButtons[5].setInteractive();
        this.cityButtons[5].on('pointerdown', this.updateShip, this);

        //lets add the gold and crew number
        this.goldText = this.add.bitmapText(458, 960, 'PfontRed', this.boat.gold.toString(), 60);
        this.goldText.setOrigin(0.5 , 0.5);

        this.crewText = this.add.bitmapText(100, 960, 'PfontRed', this.boat.crewman.toString(), 60);
        this.crewText.setOrigin(0.5 , 0.5);

        this.cardTextDesc = this.add.bitmapText(50, 750, 'FreeFont', "" ,50);
        this.cardTextDesc.setOrigin(0);

        //lets add the buttons to buy
        this.buyButton = this.add.sprite(200, 1090, 'backButton');
        this.buyButton.setInteractive();
        this.buyButton.on('pointerdown', this.returnToCity, this);
        this.buyButton.alpha = 0;

        this.backButton = this.add.sprite(534, 1090, 'buyButton');
        this.backButton.setInteractive();
        this.backButton.on('pointerdown', this.buySelItem, this);
        this.backButton.alpha = 0;

        //lets register the events to buy
        this.events.removeAllListeners('updateClick');
        this.events.on('updateClick', this.updateClick, this);

        //to show the boat stats
        var a = this.add.sprite(720/2 - 50, 960, 'showShipStatsButton');
        a.setInteractive();
        a.on('pointerdown', this.showShipStats, this);
        
        
    }

    private showShipStats() {

        this.scene.pause();

        var data = {
            trip:undefined,
            boat:this.boat,
            currentScene:this.scene,
        }

        this.scene.launch('shipStats', data);

    }

    private buyItem() {

        if (this.animInProgress == false) {

            this.selCity = 1;

            this.hideCity(1);

            this.cardsToSelect.push(new updateCard(this, this.city.arrayObjectsCards[0], 360 - 215, 460));
            this.cardsToSelect.push(new updateCard(this, this.city.arrayObjectsCards[1], 360, 460));
            this.cardsToSelect.push(new updateCard(this, this.city.arrayObjectsCards[2], 360 + 215 , 460));

        }

    }

    private hireCreaw() {

        if (this.animInProgress == false) {

            this.selCity = 3;

            this.hideCity(3);

            this.cardsToSelect.push(new updateCard(this, this.city.arrayCrewCards[0], 360 - 215, 460));
            this.cardsToSelect.push(new updateCard(this, this.city.arrayCrewCards[1], 360, 460));
            this.cardsToSelect.push(new updateCard(this, this.city.arrayCrewCards[2], 360 + 215 , 460));

        }
    }

    private updateShip() {

        if (this.animInProgress == false) {

            this.selCity = 5;

            this.hideCity(5);

            this.cardsToSelect.push(new updateCard(this, this.city.arrayUpdateCards[0], 360 - 215, 460));
            this.cardsToSelect.push(new updateCard(this, this.city.arrayUpdateCards[1], 360, 460));
            this.cardsToSelect.push(new updateCard(this, this.city.arrayUpdateCards[2], 360 + 215 , 460));
        }

    }

    private updateClick(card:updateCard) {

        this.cardBorder.setPosition(card.x, card.y - 5);
        this.cardBorder.alpha = 1;

        this.selectCard = card;

        if (card.cardData.desc != undefined) {
            var fontData = this.scene.scene.cache.bitmapFont.entries.entries["FreeFont"].data; 
            var wrapText = textWrapper.wrapText(fontData, 50 / 90 , card.cardData.desc, 650);
      
            this.cardTextDesc.setText(wrapText);
        }

    }

    private hideCity(selCity:number) {

        this.animInProgress = true;
        this.time.delayedCall(800, this.animFinish , [], this);

        //to restore the city
        this.initPoss = new Phaser.Geom.Point(this.cityButtons[this.selCity].x, this.cityButtons[this.selCity].y); 

        var alphaTime = 500;
        var incrementTime = 100;
        var time = 0;

        for(var i=0; i<6; i++) {

            if (selCity != i) {
                this.tweens.add({
                    targets: this.cityButtons[i], alpha: 0, duration: alphaTime, ease: 'Power2', delay: time
                });
            }

            time += incrementTime;

        }

        var moveTime = 800;

        time += 100;

        this.tweens.add({
            targets: this.cityButtons[selCity], x: 250 + this.cityButtons[0].width/2, duration: 500, ease: 'Power2', delay: time 
        });

        this.tweens.add({
            targets: this.cityButtons[selCity], y: 250 , duration: 500, ease: 'Power2', delay: time 
        });

        this.tweens.add({
            targets: [this.backButton, this.buyButton],
            alpha: 1 , duration: moveTime, ease: 'Power2', delay: time 
        });

        this.tweens.add({
            targets: [this.nextTripbutton],
            alpha: 0 , duration: moveTime, ease: 'Power2', delay: time 
        });

    }

    private returnToCity() {

        if (this.animInProgress == true) {
            return
        }

        this.animInProgress = true;
        this.time.delayedCall(800, this.animFinish , [], this);

        var time = 0;

        this.tweens.add({
            targets: [this.backButton, this.buyButton],
            alpha: 0 , duration: 500, ease: 'Power2', delay: time 
        });

        //lets move the city back to it poss
        this.tweens.add({
            targets: this.cityButtons[this.selCity], x: this.initPoss.x , duration: 800, ease: 'Power2', delay: time 
        });

        this.tweens.add({
            targets: this.cityButtons[this.selCity], y: this.initPoss.y , duration: 800, ease: 'Power2', delay: time 
        });

        time = time + 500;

        //lets show the rest of the city
        for(var i=0; i<6; i++) {

                this.tweens.add({
                    targets: this.cityButtons[i], alpha: 1, duration: 1000, ease: 'Power2', delay: time
                });

        }

        this.tweens.add({
            targets: [this.nextTripbutton],
            alpha: 1 , duration: 500, ease: 'Power2', delay: time 
        });

        //lets make the cards disapear
        this.cardsToSelect.forEach( card => {
            card.hideCard();
        })

        this.cardsToSelect = new Array();

        //lets hide the border
        this.cardBorder.alpha = 0;
        this.cardTextDesc.setText("");
    
    }

    private animFinish() {
        this.animInProgress = false;
    }

    private buySelItem() {


        if (this.selectCard != undefined) {
            if (this.boat.gold >= this.selectCard.cardData.gold) {
                
                //compramos la carta! wii
                this.selectCard.buy();
                this.cardBorder.alpha = 0;
                this.selectCard = undefined; 
                this.goldText.text = this.boat.gold.toString();
                this.crewText.text = this.boat.crewman.toString();

            } else {
                console.log("necesitas mas oro");
            }
        } else { //need more gold
            console.log("carta no seleccionada");
        }

    }

    private goToTrip() {

        this.cameras.main.fadeOut(500, 255, 255, 255);
        
        // start the tripEnd scene
        this.time.delayedCall(500, function() {
            this.scene.start('tripGlobal', this.boat);
        }, [], this);

        this.nextTripbutton.setTint(0xffffff);
                
    }

    private finishClick() {
        this.nextTripbutton.setTint(0x15536b);
    }


}