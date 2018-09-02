class vBattleCard {

    private back:Phaser.GameObjects.Sprite;

    constructor(public scene:Phaser.Scene,
        public x:number, 
        public y:number,
        public cCard:cBattleCard) {

            this.initCard();


        }

        private initCard() {
            this.back = this.scene.add.sprite(this.x, this.y, 'battle_cards', this.cCard.id);
            this.back.setInteractive({ pixelPerfect: true, draggable: true });

            this.back.on('dragstart', this.onDragStart,this);

            this.back.on('drag', this.onDrag, this);


            this.back.on('dragend', this.onDragEnd , this);
        }

        private onDragStart() {
            this.scene.events.emit('dragStart', this);
        }

        private onDrag(pointer, dragX, dragY) {
            this.back.x = dragX;
            this.back.y = dragY;
            
            this.back.alpha = 0.5;

            this.scene.events.emit('dragCard', this);

        }

        private onDragEnd() {
            //this.scene.events.emit('cardClick', this, this);
            this.back.x = this.x;
            this.back.y = this.y;

            this.back.alpha = 1;

            this.scene.events.emit('dragEnd', this);

        }

        public destroy() {
            this.back.destroy();
        }

}