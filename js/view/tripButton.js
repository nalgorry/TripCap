var tripButton = (function () {
    function tripButton(scene, x, y, task) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.task = task;
        this.value = "0";
        var container = this.scene.add.container(x, y);
        //boton to go up 
        var buttonUp = this.scene.add.graphics();
        container.add(buttonUp);
        buttonUp.fillStyle(0x222222, 0.5);
        buttonUp.fillRect(170, 1, 63, 83);
        buttonUp.fillPath();
        buttonUp.setInteractive(new Phaser.Geom.Rectangle(170, 1, 63, 83), Phaser.Geom.Rectangle.Contains);
        //back when up
        this.backUp = this.scene.add.graphics();
        container.add(this.backUp);
        this.backUp.fillStyle(0x1ab500, 1);
        this.backUp.fillRect(0, 0, 166, 172);
        this.backUp.fillPath();
        this.backUp.alpha = 0;
        //back when down
        this.backDown = this.scene.add.graphics();
        container.add(this.backDown);
        this.backDown.fillStyle(0xb1160d, 1);
        this.backDown.fillRect(0, 0, 166, 172);
        this.backDown.fillPath();
        this.backDown.alpha = 0;
        this.arrowUp = this.scene.add.sprite(201, 40, 'buttonArrow');
        container.add(this.arrowUp);
        buttonUp.on('pointerdown', this.clickUp, this);
        //boton to go down 
        var buttonDown = this.scene.add.graphics();
        container.add(buttonDown);
        buttonDown.fillStyle(0x222222, 0.5);
        buttonDown.fillRect(170, 89, 63, 83);
        buttonDown.fillPath();
        buttonDown.setInteractive(new Phaser.Geom.Rectangle(170, 89, 63, 83), Phaser.Geom.Rectangle.Contains);
        this.arrowDown = this.scene.add.sprite(201, 128, 'buttonArrow');
        this.arrowDown.setAngle(180);
        container.add(this.arrowDown);
        buttonDown.on('pointerdown', this.clickDown, this);
        //the text we show with the number
        this.text = this.scene.add.bitmapText(80, 20, 'Pfont', '0', 110);
        this.text.setOrigin(0.5);
        container.add(this.text);
        //lets update the visibility
        this.hideDownArrow();
        //lets make the up animation arrow
        this.hideUpArrow(false);
    }
    tripButton.prototype.clickUp = function () {
        this.scene.events.emit('clickUp', this.task, 0 /* up */);
    };
    tripButton.prototype.clickDown = function () {
        this.scene.events.emit('clickUp', this.task, 1 /* down */);
    };
    tripButton.prototype.updateText = function (newText) {
        this.animateBack(newText);
        this.text.setText(newText);
        this.value = newText;
        this.hideDownArrow();
    };
    tripButton.prototype.animateBack = function (newValue) {
        //lets see if it goes up, down or nothing
        var target;
        if (parseInt(newValue) > parseInt(this.value)) {
            target = this.backUp;
        }
        else if (parseInt(newValue) < parseInt(this.value)) {
            target = this.backDown;
        }
        else {
            return;
        }
        var time = 300;
        var a1 = this.scene.add.tween({
            targets: target,
            props: {
                alpha: { value: 0.5, duration: time, ease: 'Phaser.Easing.Out' },
            },
        });
        var a2 = this.scene.add.tween({
            targets: target,
            props: {
                alpha: { value: 0, duration: time, ease: 'Phaser.Easing.Out', delay: time },
            }
        });
    };
    tripButton.prototype.hideDownArrow = function () {
        if (this.value == "0") {
            this.arrowDown.visible = false;
        }
        else {
            this.arrowDown.visible = true;
        }
    };
    //this one needs to be call from the parent
    tripButton.prototype.hideUpArrow = function (hide) {
        if (hide == true) {
            this.arrowUp.visible = false;
        }
        else {
            this.arrowUp.visible = true;
            if (this.arrowAnim == undefined) {
                this.arrowAnim = this.scene.tweens.add({
                    targets: this.arrowUp,
                    y: 30,
                    duration: 600,
                    ease: 'Power2',
                    yoyo: true,
                    repeat: 200
                });
            }
        }
    };
    return tripButton;
}());
