var cCeroBarAlert = (function () {
    function cCeroBarAlert(scene, data) {
        this.scene = scene;
        this.data = data;
        this.init();
    }
    cCeroBarAlert.prototype.init = function () {
        this.ceroBarContainer = this.scene.add.container(360, 260 + 78 * (this.data.numAlerts - 1));
        this.ceroBarContainer.alpha = 0;
        this.scene.tweens.add({
            targets: this.ceroBarContainer,
            alpha: 1, duration: 600, ease: 'Power2'
        });
        //fondo
        var back = this.scene.add.image(0, 0, 'ceroBarBack', this.data.status);
        this.ceroBarContainer.add(back);
        //circulo fijo
        this.circleCeroBarBack = this.scene.add.graphics({ x: -145 });
        this.circleCeroBarBack.lineStyle(2, 0xa34848, 1);
        this.circleCeroBarBack.fillStyle(0xa34848);
        this.circleCeroBarBack.alpha = 0.5;
        this.circleCeroBarBack.fillCircle(0, 0, 30);
        this.circleCeroBarBack.visible = false;
        this.ceroBarContainer.add(this.circleCeroBarBack);
        //circulo interior
        this.circleCeroBar = this.scene.add.graphics({ x: -145 });
        this.circleCeroBar.lineStyle(2, 0xFFFFFF, 1);
        this.circleCeroBar.fillStyle(0xFFFFFF);
        this.circleCeroBar.alpha = 1;
        this.circleCeroBar.fillCircle(0, 0, 30);
        this.circleCeroBar.visible = false;
        this.ceroBarContainer.add(this.circleCeroBar);
        this.textCeroBarTime = this.scene.add.bitmapText(-145, 0, 'PfontRed', "5", 45);
        this.textCeroBarTime.setOrigin(0.5);
        this.ceroBarContainer.add(this.textCeroBarTime);
        this.circleCeroBar.visible = true;
        this.circleCeroBarBack.visible = true;
        this.circleCeroBar.scale(1, 1);
    };
    cCeroBarAlert.prototype.refresh = function (data) {
        var value = Math.floor((data.maxValue - data.value) * 83.33 / 1000 + 1);
        if (value < 0) {
            value = 0;
        }
        this.textCeroBarTime.text = value.toString();
        if (this.circleTween == undefined) {
            this.circleTween = this.scene.add.tween({
                targets: this.circleCeroBar,
                props: {
                    scaleX: { value: 0, duration: (data.maxValue - data.value) * 83.33, ease: 'Phaser.Linear.None' },
                    scaleY: { value: 0, duration: (data.maxValue - data.value) * 83.33, ease: 'Phaser.Linear.None' },
                },
            });
        }
    };
    cCeroBarAlert.prototype.hide = function () {
        this.scene.time.delayedCall(800, this.destroyCeroBar, [], this);
        this.scene.tweens.add({
            targets: this.ceroBarContainer,
            alpha: 0, duration: 800, ease: 'Power2'
        });
    };
    cCeroBarAlert.prototype.destroyCeroBar = function () {
        this.ceroBarContainer.destroy();
    };
    return cCeroBarAlert;
}());
