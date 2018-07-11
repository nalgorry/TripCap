var crewControls = (function () {
    function crewControls(trip, scene) {
        this.trip = trip;
        this.scene = scene;
        this.crewButtons = new Array();
        this.statusBars = new Array();
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
        for (var i = 0; i < 6; i++) {
            this.crewButtons[i].updateText(this.trip.usedCrew[i]);
            this.crewButtons[i].hideUpArrow(hideUpArrow);
        }
    };
    crewControls.prototype.createCrewButtons = function () {
        //lets show the avaible crew
        this.textHealtyCrew = this.scene.add.bitmapText(120, 822, 'Pfont', this.trip.healtyCrew.toString(), 60);
        this.textHealtyCrew.setOrigin(0);
        this.textSickCrew = this.scene.add.bitmapText(640, 822, 'Pfont', this.trip.sickCrew.toString(), 60);
        this.textSickCrew.setOrigin(0);
        //lets create all the options for the crew
        this.crewButtons[0 /* sails */] = new tripButton(this.scene, 5, 896, 0 /* sails */);
        this.crewButtons[1 /* rows */] = new tripButton(this.scene, 244, 896, 1 /* rows */);
        this.crewButtons[2 /* leadership */] = new tripButton(this.scene, 481, 896, 2 /* leadership */);
        this.crewButtons[3 /* maintenance */] = new tripButton(this.scene, 5, 1073, 3 /* maintenance */);
        this.crewButtons[4 /* clean */] = new tripButton(this.scene, 244, 1073, 4 /* clean */);
        this.crewButtons[5 /* fish */] = new tripButton(this.scene, 481, 1073, 5 /* fish */);
        //lets check if they click a button
        this.scene.events.on('clickUp', this.buttonClick, this);
        //lets update the values
        this.updateCrewText();
    };
    crewControls.prototype.buttonClick = function (task, upDown) {
        //update the logic of the game
        this.trip.updateCrew(task, upDown);
    };
    return crewControls;
}());
