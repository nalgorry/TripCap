class tripButton {

    private text:Phaser.GameObjects.BitmapText;
    private arrowUp:Phaser.GameObjects.Sprite;
    private arrowDown:Phaser.GameObjects.Sprite;

    private backUp:Phaser.GameObjects.Graphics;
    private backDown:Phaser.GameObjects.Graphics;

    private arrowAnim:Phaser.Tweens.Tween;

    public sDrag:Phaser.GameObjects.Sprite;


    public value:string = "0";

    constructor(public scene:Phaser.Scene,
        public x:number, 
        public y:number,
        public task:enumTask,
        showBar: boolean, 
        mirrorX: boolean) {

            var container = this.scene.add.container(x, y);


            //the back of the button to show the bar at the size of the button
            if (showBar) {
                var back = this.scene.add.sprite(-74, 0, 'navButtonBack' );
                container.add(back);
            }
            
            //the text we show with the number
            this.text = this.scene.add.bitmapText(0, -30, 'Pfont', '0', 100);
            this.text.setOrigin(0.5);

            container.add(this.text);

            //arrow up!
            this.arrowUp = this.scene.add.sprite(40, 0, 'buttonArrow');
            container.add(this.arrowUp);
            this.arrowUp.setScale(0.6);

            
            if (mirrorX) {
                back.scaleX = -1;
                back.x += 146; //we need to move the bar to the other side (like the song)
            }

            //back when up
            this.backUp = this.scene.add.graphics();

            container.add(this.backUp);
    
            this.backUp.fillStyle(0x12412a, 1);
            this.backUp.fillCircle(0, 0, 170/2);
            this.backUp.fillPath();
            this.backUp.alpha = 0;

            //back when down
            this.backDown = this.scene.add.graphics();

            container.add(this.backDown);
    
            this.backDown.fillStyle(0xb1160d, 1);
            this.backDown.fillCircle(0, 0, 170/2);
            this.backDown.fillPath();
            this.backDown.alpha = 0;

            //drag option
            this.sDrag = this.scene.add.sprite(0 , 0, 'tripDrag')  
            this.sDrag.alpha = 0.001;
            this.sDrag.setOrigin(0.5);
            this.sDrag.setInteractive({ pixelPerfect: true, draggable: true });

            container.add(this.sDrag);

            this.sDrag.on('dragstart', this.onStartDrag,this);

            this.sDrag.on('drag', this.onDrag, this);

            //this.sDrag.on('pointerup', this.clickUp , this);

            this.sDrag.on('dragend', this.onDragEnd , this);
    

            //lets make the up animation arrow
            this.hideUpArrow(false);

    }

    private onDragEnd() {
        this.sDrag.x = 0;
        this.sDrag.y = 0;

        this.sDrag.alpha = 0.001;

        this.scene.events.emit('dragCrewEnd', this);
    }

    private onStartDrag() {
        //this.sDrag.alpha = 0.5;
    }

    private onDrag(pointer, dragX, dragY) {
        this.sDrag.x = dragX;
        this.sDrag.y = dragY;

        this.scene.events.emit('dragCrew', this);

        this.sDrag.alpha = 0.5;

    }

    public updateText(newText:string) {
        
        this.animateBack(newText);

        this.text.setText(newText);
        this.value = newText

    }

    private animateBack(newValue:string) {

        //lets see if it goes up, down or nothing
        var target:Phaser.GameObjects.Graphics;
        if ( parseInt(newValue) > parseInt(this.value)) {
            target = this.backUp;
        } else if ( parseInt(newValue) < parseInt(this.value)) {
            target = this.backDown;
            console.log(newValue);
        } else {
            return
        }

        var time = 150;
        
        var a1 = this.scene.add.tween({
            targets: target,
            props: {
                alpha: { value: 0.5, duration: time, ease: 'Phaser.Easing.Out' },
            },
        })

        var a2 = this.scene.add.tween({
            targets: target,
            props: {
                alpha: { value: 0, duration: time, ease: 'Phaser.Easing.Out', delay: time },
            }
        })
        

    }

    //this one needs to be call from the parent
    public hideUpArrow(hide:boolean) {
        if (hide == true) {
            this.arrowUp.visible = false;
        } else {
            this.arrowUp.visible = true;
            
            if (this.arrowAnim == undefined) {
                this.arrowAnim = this.scene.tweens.add({
                    targets: this.arrowUp,
                    y: -10,
                    duration: 600,
                    ease: 'Power2',
                    yoyo: true,
                    repeat: 200
                });
            }
        }

    }




}