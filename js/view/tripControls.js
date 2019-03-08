var crewControls = /** @class */ (function () {
    function crewControls(trip, scene) {
        this.trip = trip;
        this.scene = scene;
        this.crewButtons = new Array();
        this.createCrewButtons();
    }
    crewControls.prototype.updateCrewText = function () {
        this.textHealtyCrew.text = this.trip.healtyCrew.toString();
        this.textSickCrew.text = this.trip.sickCrew.toString();
        //check if there is still avaible crew
        var hideUpArrow = false;
        if (this.trip.healtyCrew == 0)
            hideUpArrow = true;
        //lets update all the used crew
        for (var i = 0; i < 5; i++) {
            this.crewButtons[i].updateText(this.trip.usedCrew[i]);
            this.crewButtons[i].hideUpArrow(hideUpArrow);
        }
    };
    crewControls.prototype.createCrewButtons = function () {
        //lets show the avaible crew
        this.textHealtyCrew = this.scene.add.bitmapText(87, 720 - 30, 'Pfont', this.trip.healtyCrew.toString(), 80);
        this.textHealtyCrew.setOrigin(0.5);
        this.textSickCrew = this.scene.add.bitmapText(190, 777 - 25, 'Pfont', this.trip.sickCrew.toString(), 60);
        this.textSickCrew.setOrigin(0.5);
        //lets create all the options for the crew
        this.crewButtons[2 /* maintenance */] = new tripButton(this.scene, 251, 968, 2 /* maintenance */, true, false);
        this.crewButtons[3 /* clean */] = new tripButton(this.scene, 251, 1159, 3 /* clean */, true, false);
        this.crewButtons[1 /* leadership */] = new tripButton(this.scene, 468, 968, 1 /* leadership */, true, true);
        this.crewButtons[4 /* fish */] = new tripButton(this.scene, 468, 1159, 4 /* fish */, true, true);
        this.crewButtons[0 /* navigation */] = new tripButton(this.scene, 360, 784, 0 /* navigation */, false, false);
        //lets check if they click a button
        this.scene.events.on('clickUp', this.buttonClick, this);
        this.scene.events.on('dragCrew', this.dragCrew, this);
        this.scene.events.on('dragCrewEnd', this.dragCrewEnd, this);
        //lets update the values
        this.updateCrewText();
    };
    crewControls.prototype.dragCrew = function (data) {
        var mouseRect = new Phaser.Geom.Rectangle(this.scene.input.x, this.scene.input.y, 2, 2);
        this.crewButtons.forEach(function (b) {
            var buttonRect = b.sDrag.getBounds();
            if (Phaser.Geom.Intersects.RectangleToRectangle(buttonRect, mouseRect)) {
                //console.log(b)
            }
        });
    };
    crewControls.prototype.dragCrewEnd = function (button) {
        var _this = this;
        var mouseRect = new Phaser.Geom.Rectangle(this.scene.input.x, this.scene.input.y, 2, 2);
        var avaibleCircle = new Phaser.Geom.Circle(88, 724, 170 / 2);
        //lets check if it drop it in avaible crew
        if (Phaser.Geom.Intersects.CircleToRectangle(avaibleCircle, mouseRect)) {
            this.trip.updateCrew(button.task, 1 /* down */); //remove a crew from the origin
        }
        //lets check if it move the crew
        this.crewButtons.forEach(function (b) {
            var buttonRect = b.sDrag.getBounds();
            if (Phaser.Geom.Intersects.RectangleToRectangle(buttonRect, mouseRect)) {
                if (button.task != b.task) {
                    _this.trip.updateCrew(button.task, 1 /* down */); //remove a crew from the origin
                }
                _this.trip.updateCrew(b.task, 0 /* up */); //increment where i drop the crew
            }
        });
    };
    crewControls.prototype.buttonClick = function (task, upDown) {
        //update the logic of the game
        this.trip.updateCrew(task, upDown);
    };
    return crewControls;
}());
