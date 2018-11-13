var vEventCards = /** @class */ (function () {
    function vEventCards(scene, x, y, idOption, text, descText) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.idOption = idOption;
        this.text = text;
        this.descText = descText;
        this.initCard();
    }
    vEventCards.prototype.initCard = function () {
        var _this = this;
        this.card = this.scene.add.container(this.x, this.y);
        var cardBack = this.scene.add.sprite(0, 0, "eventCard").setInteractive();
        this.card.add(cardBack);
        cardBack.on('pointerdown', this.clickDown, this);
        //lets add the desc of the card, we need to take all the lines separated to be able to aling "center"
        var fontData = this.scene.cache.bitmapFont.entries.entries["Pfont"].data;
        var linesText = textWrapper.linesText(fontData, 60 / 90, this.text, 160);
        var yLine = 0;
        linesText.forEach(function (line) {
            var desc = _this.scene.add.bitmapText(0, -110 + yLine, 'Pfont', line, 40);
            desc.setOrigin(0.5);
            _this.card.add(desc);
            yLine += 40;
        });
    };
    vEventCards.prototype.clickDown = function () {
        this.scene.events.emit('clickUp', this.idOption, this.card, this.descText);
    };
    return vEventCards;
}());
