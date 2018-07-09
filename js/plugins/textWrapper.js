var textWrapper = (function () {
    function textWrapper() {
    }
    textWrapper.wrapText = function (fontData, scale, text, maxWidth) {
        var newText = "";
        do {
            var line = this.scanLine(fontData, scale, text, maxWidth);
            newText += line.text + "\n";
            text = text.substr(line.text.length + 1);
        } while (line.end === false);
        return newText;
    };
    textWrapper.linesText = function (fontData, scale, text, maxWidth) {
        var lines = [];
        do {
            var line = this.scanLine(fontData, scale, text, maxWidth);
            lines.push(line.text);
            text = text.substr(line.text.length + 1);
        } while (line.end === false);
        return lines;
    };
    /**
    * Given the input text this will scan the characters until either a newline is encountered,
    * or the line exceeds maxWidth, taking into account kerning, character widths and scaling.
    *
    * @method Phaser.BitmapText.prototype.scanLine
    * @private
    * @param {object} data - A reference to the font object in the Phaser.Cache.
    * @param {float} scale - The scale of the font in relation to the texture.
    * @param {string} text - The text to parse.
    * @return {object} An object containing the parsed characters, total pixel width and x offsets.
    */
    textWrapper.scanLine = function (data, scale, text, maxWidth) {
        var x = 0;
        var w = 0;
        var lastSpace = -1;
        var wrappedWidth = 0;
        var prevCharCode = null;
        var chars = [];
        //  Let's scan the text and work out if any of the lines are > maxWidth
        for (var i = 0; i < text.length; i++) {
            var end = (i === text.length - 1) ? true : false;
            if (/(?:\r\n|\r|\n)/.test(text.charAt(i))) {
                return { width: w, text: text.substr(0, i), end: end, chars: chars };
            }
            else {
                var charCode = text.charCodeAt(i);
                var charData = data.chars[charCode];
                var c = 0;
                //  If the character data isn't found in the data array 
                //  then we replace it with a blank space
                if (charData === undefined) {
                    charCode = 32;
                    charData = data.chars[charCode];
                }
                //  Adjust for kerning from previous character to this one
                var kerning = (prevCharCode && charData.kerning[prevCharCode]) ? charData.kerning[prevCharCode] : 0;
                //  Record the last space in the string and the current width
                if (/(\s)/.test(text.charAt(i))) {
                    lastSpace = i;
                    wrappedWidth = w;
                }
                //  What will the line width be if we add this character to it?
                c = (kerning + charData.width + charData.xOffset) * scale;
                //  Do we need to line-wrap?
                if (maxWidth && ((w + c) >= maxWidth) && lastSpace > -1) {
                    //  The last space was at "lastSpace" which was "i - lastSpace" characters ago
                    return { width: wrappedWidth || w, text: text.substr(0, i - (i - lastSpace)), end: end, chars: chars };
                }
                else {
                    w += (charData.xAdvance + kerning) * scale;
                    chars.push(x + (charData.xOffset + kerning) * scale);
                    x += (charData.xAdvance + kerning) * scale;
                    prevCharCode = charCode;
                }
            }
        }
        return { width: w, text: text, end: end, chars: chars };
    };
    ;
    return textWrapper;
}());
