class tripEvent extends Phaser.Scene {

    private back:Phaser.GameObjects.Image;
    private backResult:Phaser.GameObjects.Image;
    private cardBorder:Phaser.GameObjects.Sprite;
    private cardTextDesc:Phaser.GameObjects.BitmapText;
    private button:Phaser.GameObjects.Sprite;
    private idOptionSelected:number = 0; 

    private eventData:cEvent;
    private trip:cTrip;
    private result:cEventResult;

    private cards:cEventCards[] = [];

    create(data:any) {

        this.eventData = data.event;
        this.trip = data.trip;
        this.initScene();

        console.log(this.trip);

    }

    update() {

    }

    private initScene() {

        //lets apear slowly
        this.cameras.main.fadeIn(500, 255, 255, 255);

        //lets add the back of the game 
        this.back = this.add.image(0, 0,'eventBack');
        this.back.setOrigin(0);
        this.back.alpha = 1;

        //lets set the font for the wraptext
        var fontData = this.scene.scene.cache.bitmapFont.entries.entries["FreeFont"].data;      

        //lets add the title
        var title = this.add.bitmapText(360, 190, 'Pfont', this.eventData.title, 60);
        title.setOrigin(0.5);

        //lets add the desc of the event
        var text:String = this.eventData.desc;
        var wrapText = textWrapper.wrapText(fontData, 60 / 90 , text, 650);
  
        var desc = this.add.bitmapText(360, 235, 'FreeFont', wrapText, 60);
        desc.setOrigin(0.5, 0);

        //lets add the border of the selected option
        this.cardBorder = this.add.sprite(0, 0, "cardBorder");
        this.cardBorder.alpha = 0;

        this.cards.push(new cEventCards(this, 126, 730, 1, this.eventData.getOption(1).title,this.eventData.getOption(1).desc));
        //the third opcion is not always present
        if (this.eventData.getOption(3) != undefined) {
            this.cards.push(new cEventCards(this, 352, 730, 3,this.eventData.getOption(3).title,this.eventData.getOption(3).desc));
        }
        this.cards.push(new cEventCards(this, 579, 730, 2, this.eventData.getOption(2).title, this.eventData.getOption(2).desc));

        //lets check if they click a button
        this.events.on('clickUp',this.cardClick, this);

        //lets add a text to show the desc of the card 
        this.cardTextDesc = this.add.bitmapText(365, 900, "FreeFont" ,"Seleciona una opción para ver la descripción", 60);
        this.cardTextDesc.setOrigin(0.5, 0);

        //lets add the button
        //lets create the start button
        this.button =  this.add.sprite(590,1180,'eventButton')
        this.button.setInteractive();

        this.button.on('pointerup', this.goToResult, this);

    }

    private goToResult() {

        if (this.idOptionSelected != 0) {
            this.button.setTint(0x15536b);

            this.result = this.eventData.getResult(this.idOptionSelected);
            this.initResult(this.result);
        }

    }

    //show the result of the selected option
    private initResult(result:cEventResult) {

        this.backResult = this.add.sprite(0, 0, 'backEventResult');
        this.backResult.setOrigin(0);
        this.backResult.alpha = 0;

        this.add.tween({
            targets: this.backResult,
            props: {
                alpha: { value: 1, duration: 200, ease: 'Phaser.Easing.Out' },
            }
        })


        //lets add the desc of the event
        var fontData = this.scene.scene.cache.bitmapFont.entries.entries["FreeFont"].data;
        var text:String = result.desc;
        var wrapText = textWrapper.wrapText(fontData, 60 / 90 , text, 650);
        
        var desc = this.add.bitmapText(360, 315, 'FreeFont', wrapText, 60);
        desc.setOrigin(0.5, 0);

        var sep = 50;
        var line:number = 0;
        var column:number = 0;
        for (var r in result.effect) { 
            
            var effectData:cEventEffect = result.effect[r];
            var efect = new cEventEffectText(70 + 350 * column, 840 + sep * line, this, effectData.getValue(), effectData.getText() );

            line += 1;

            if (line == 3) {
                line = 0;
                column += 1;
            }
            
        }

        
        //lets create the acepept button
        this.button =  this.add.sprite(360,1092,'resultButton');
        this.button.setInteractive();

        this.button.on('pointerup', this.eventFinish, this);
        this.button.on('pointerdown', this.finishClick, this);

        
    }

    private finishClick() {
        this.button.setTint(0x15536b);
    }


    private eventFinish() {

        this.trip.updateAfterEvent(this.result)

        this.scene.resume('sTrip');
        this.scene.get('sTrip').cameras.main.fadeIn(500, 255, 255, 255);
        this.scene.stop();

    }

    private cardClick(cardId:number, card:Phaser.GameObjects.Container, text:string) {
        
        this.cardBorder.setPosition(card.x, card.y);
        this.cardBorder.alpha = 1;

        var fontData = this.scene.scene.cache.bitmapFont.entries.entries["FreeFont"].data; 
        var wrapText = textWrapper.wrapText(fontData, 60 / 90 , text, 650);
  
        this.cardTextDesc.setText(wrapText);
        this.idOptionSelected = cardId;

        this.sliceShowText(this.cardTextDesc);
  
    }

    private sliceShowText(text:Phaser.GameObjects.BitmapText) {

        var container = this.add.container(text.x, text.y);

        var lineTime:number = 400;

        for (var i = 0 ;i<3; i++) {

            var row = this.addRow(text, container, 80 * i);

            this.tweens.add({
                targets: row,
                x: { value: text.width + 20, duration: lineTime * 2, ease: 'linear', delay: lineTime * i},
                scaleX: { value: 0, duration: lineTime, ease: 'linear', delay: lineTime * i}
            })

        }

        var destroySprites = this.time.delayedCall(lineTime * 3, this.destroySliceText, [container], this);

    }

    private destroySliceText(container:Phaser.GameObjects.Container) {
        container.destroy();
    }

    private addRow(text:Phaser.GameObjects.BitmapText, container:Phaser.GameObjects.Container, offsetY:number) {

        var row = this.add.graphics();

        row.fillStyle(0xffffff, 1);
        row.fillRect(- text.width/2 - 10, offsetY, text.width + 20, 80);
        row.fillPath();

        container.add(row);

        return row;

    }

}
