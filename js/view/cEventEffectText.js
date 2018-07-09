var cEventEffectText = (function () {
    function cEventEffectText(x, y, scene, value, text) {
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.value = value;
        this.text = text;
        this.initResult();
    }
    cEventEffectText.prototype.initResult = function () {
        var value = this.scene.add.bitmapText(this.x, this.y, 'PfontRed', this.value.toString(), 40);
        value.setOrigin(0.5, 0);
        var text = this.scene.add.bitmapText(this.x + 45, this.y - 5, 'Pfont', this.text, 40);
    };
    return cEventEffectText;
}());
