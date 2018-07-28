class city extends Phaser.Scene {

    private back:Phaser.GameObjects.Image;
    private nextTripbutton: Phaser.GameObjects.Image;
    private boat:cBoat;

    private buyButton:Phaser.GameObjects.Sprite;
    private backButton:Phaser.GameObjects.Sprite;

    private cityButtons:Phaser.GameObjects.Sprite[] = new Array();

    private selCity:number;
    private initPoss:Phaser.Geom.Point;

    private city:cCity;

    create(boat:cBoat) {

        this.initScene();

        this.city = new cCity(boat);
        this.boat = boat;
    }

    update() {
    }

    private initScene() {

        //lets apear slowly
        this.cameras.main.fadeIn(500, 255, 255, 255);

        //lets add the back of the game 
        this.back = this.add.image(0, 0,'backCity');
        this.back.setOrigin(0);
           
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

        x += this.cityButtons[0].width ;
        this.cityButtons[2] = this.add.sprite(x, y, 'cityImage', 2);


        //second line
        y += this.cityButtons[0].height ;
        x = 125;

        this.cityButtons[3] = this.add.sprite(x, y, 'cityImage', 3);
        this.cityButtons[3].setInteractive();
        this.cityButtons[3].on('pointerdown', this.buyObject, this);

        x += this.cityButtons[0].width ;
        this.cityButtons[4] = this.add.sprite(x, y, 'cityImage', 4);

        x += this.cityButtons[0].width ;
        this.cityButtons[5] = this.add.sprite(x, y, 'cityImage', 5);
        this.cityButtons[5].setInteractive();
        this.cityButtons[5].on('pointerdown', this.updateShip, this);

        //lets add the buttons to buy
        this.buyButton = this.add.sprite(200, 1090, 'backButton');
        this.buyButton.setInteractive();
        this.buyButton.on('pointerdown', this.returnToCity, this);
        this.buyButton.alpha = 0;

        this.backButton = this.add.sprite(534, 1090, 'buyButton');
        this.backButton.setInteractive();
        this.backButton.on('pointerdown', this.buySelItem, this);
        this.backButton.alpha = 0;
        
    }

    private buyObject() {

        this.selCity = 3;

        this.hideCity(3);
    }

    private updateShip() {

        this.selCity = 5;

        this.hideCity(5);


    }

    private hideCity(selCity:number) {

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
            targets: this.cityButtons[selCity], x: 250 + this.cityButtons[0].width/2, duration: moveTime, ease: 'Power2', delay: time 
        });

        this.tweens.add({
            targets: this.cityButtons[selCity], y: 250 , duration: moveTime, ease: 'Power2', delay: time 
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
    
    }

    private buySelItem() {

    }

    private goToTrip() {

        this.cameras.main.fadeOut(500, 255, 255, 255);
        
        // start the tripEnd scene
        this.time.delayedCall(500, function() {
            this.scene.start('tripGlobal', this.boat);
        }, [], this);

        this.nextTripbutton.setTint(0xffffff);
        

        this.nextTripbutton.setTint(0xffffff);
        
    }

    private finishClick() {
        this.nextTripbutton.setTint(0x15536b);
    }


}