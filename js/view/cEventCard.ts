class cEventCards {

    private card:Phaser.GameObjects.Container;

    constructor(public scene:Phaser.Scene,
        public x:number, 
        public y:number,
        private idOption,
        private text:string,
        private descText:string) {

            this.initCard();

        }

    private initCard() {

        this.card = this.scene.add.container(this.x, this.y);

        var cardBack = this.scene.add.sprite(0, 0, "eventCard").setInteractive();

        this.card.add(cardBack);

        cardBack.on('pointerdown', this.clickDown , this);

        //lets add the desc of the card, we need to take all the lines separated to be able to aling "center"
        var fontData = this.scene.cache.bitmapFont.entries.entries["Pfont"].data;
        var linesText = textWrapper.linesText(fontData, 60 / 90 , this.text, 160);
        var yLine:number = 0

        linesText.forEach(line => {
            var desc = this.scene.add.bitmapText(0, -110 + yLine, 'Pfont', line, 40);
            desc.setOrigin(0.5);
    
            this.card.add(desc);
            yLine += 40;
            
        });


    }

    private clickDown() {
        
        this.scene.events.emit('clickUp', this.idOption, this.card, this.descText);

    }

}
