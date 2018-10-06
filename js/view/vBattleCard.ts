class vBattleCard {

    public cont:Phaser.GameObjects.Container;
    private back:Phaser.GameObjects.Sprite;

    constructor(public scene:Phaser.Scene,
        public x:number, 
        public y:number,
        public cCard:cBattleCard,
        public isDragable:boolean) {

            this.initCard();

            this.showCard();

        }

        public hideCard() {

            var t = this.scene.tweens.add({
                targets: this.cont,
                alpha: 0,
                duration: 500,
                ease: 'Power2'
            });

        }

        public showCard() {

            var t = this.scene.tweens.add({
                targets: this.cont,
                alpha: 1,
                duration: 600,
                ease: 'Power2'
            });

        }

        private initCard() {

            this.cont = this.scene.add.container(this.x, this.y);
            this.cont.alpha = 0;
            
            this.back = this.scene.add.sprite(0, 0, 'battleCardBack');
            this.back.setInteractive({ pixelPerfect: true, draggable: true });
            this.cont.add(this.back);

            //lets create the card elements
            switch (this.cCard.numAbilities) {
                case 1:

                    if (this.cCard.hasDef == true) {
                        this.cCard.defendAbilities.forEach(e => {
                            var abi = new vBattleAbility(this.scene, 0, 0, 'battle_icons_size_1', e);
                            this.cont.add(abi.cont);
                        });
                    }
        
                    if (this.cCard.hasAtack == true) {
                        this.cCard.atackAbilities.forEach(e => {
                            var abi = new vBattleAbility(this.scene, 0, 0, 'battle_icons_size_1', e);
                            this.cont.add(abi.cont);
                        });
                    }

                    break;

                case 2: 

                 var sumY:number = 110;
                 var initY:number = -60;

                if (this.cCard.hasDef == true) {
                    this.cCard.defendAbilities.forEach(e => {
                        var abi = new vBattleAbility(this.scene, 0, initY, 'battle_icons_size_2', e);
                        this.cont.add(abi.cont);
                        initY += sumY;
                    });
                }
    
                if (this.cCard.hasAtack == true) {
                    this.cCard.atackAbilities.forEach(e => {
                        var abi = new vBattleAbility(this.scene, 0, initY, 'battle_icons_size_2', e);
                        this.cont.add(abi.cont);
                        initY += sumY;
                    });
                }
            
                default:
                    break;
            }

            
            //event to control the card
            if (this.isDragable == true) {
                this.back.on('dragstart', this.onDragStart,this);
                this.back.on('drag', this.onDrag, this);
                this.back.on('dragend', this.onDragEnd , this);
            } else {
                this.back.on('pointerup', this.onClick , this);
            }


            
        }

        private onClick() {
            this.scene.events.emit('click', this);
        }

        private onDragStart() {
            this.scene.events.emit('dragStart', this);
        }

        private onDrag(pointer, dragX, dragY) {
            
            //here we have to sum because we are dragint the back and not the cont because of a bug with cont
            this.cont.x = this.x + dragX;
            this.cont.y = this.y + dragY;
            
            this.cont.alpha = 0.5;

            this.scene.events.emit('dragCard', this);

        }

        private onDragEnd() {
            //this.scene.events.emit('cardClick', this, this);
            this.cont.x = this.x;
            this.cont.y = this.y;

            this.cont.alpha = 1;

            this.scene.events.emit('dragEnd', this);

        }

        public destroy() {
            this.cont.destroy();
        }

}