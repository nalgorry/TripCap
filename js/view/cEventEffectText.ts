class cEventEffectText {


    constructor(private x, 
        private y,
        private scene:Phaser.Scene,
        private value:number,
        private text:string) {

            this.initResult();
    }

    private initResult() {

        var value = this.scene.add.bitmapText(this.x, this.y, 'PfontRed', this.value.toString(), 40);
        value.setOrigin(0.5 , 0);
        var text = this.scene.add.bitmapText(this.x + 45, this.y - 5, 'Pfont', this.text, 40);
        

    }

}