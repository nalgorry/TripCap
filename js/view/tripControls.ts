class crewControls {

    public textHealtyCrew:Phaser.GameObjects.BitmapText;
    public textSickCrew:Phaser.GameObjects.BitmapText;
    public crewButtons:tripButton[] = new Array();

    public textWindSpeed:Phaser.GameObjects.BitmapText;
    public textBoatSpeed:Phaser.GameObjects.BitmapText;
    public statusBars:cStatusBar[] = new Array();

    constructor(public trip:cTrip, public scene:Phaser.Scene) {
        this.createCrewButtons();
    }

    public updateCrewText() {

        this.textHealtyCrew.text = this.trip.healtyCrew.toString();
        this.textSickCrew.text = this.trip.sickCrew.toString();

        //check if there is still avaible crew
        var hideUpArrow:boolean = false;
        if (this.trip.healtyCrew == 0) hideUpArrow = true;

        //lets update all the used crew
        for (var i=0; i<6; i++) {
            this.crewButtons[i].updateText(this.trip.usedCrew[i]);
            this.crewButtons[i].hideUpArrow(hideUpArrow);
        }

    }

    public createCrewButtons() {

        //lets show the avaible crew
        this.textHealtyCrew = this.scene.add.bitmapText(120, 822, 'Pfont', this.trip.healtyCrew.toString(), 60);
        this.textHealtyCrew.setOrigin(0);

        this.textSickCrew = this.scene.add.bitmapText(640, 822, 'Pfont', this.trip.sickCrew.toString(), 60);
        this.textSickCrew.setOrigin(0);

        //lets create all the options for the crew
        this.crewButtons[enumTask.sails] = new tripButton(this.scene, 5, 896, enumTask.sails);
        this.crewButtons[enumTask.rows] = new tripButton(this.scene, 244, 896, enumTask.rows);
        this.crewButtons[enumTask.leadership] = new tripButton(this.scene, 481, 896, enumTask.leadership);
        this.crewButtons[enumTask.maintenance] = new tripButton(this.scene, 5, 1073, enumTask.maintenance);
        this.crewButtons[enumTask.clean] = new tripButton(this.scene, 244, 1073, enumTask.clean);
        this.crewButtons[enumTask.fish] = new tripButton(this.scene, 481, 1073, enumTask.fish);

        //lets check if they click a button
        this.scene.events.on('clickUp',this.buttonClick, this);

        //lets update the values
        this.updateCrewText();

    }

    private buttonClick(task:enumTask, upDown:enumUpDown) {

        //update the logic of the game
        this.trip.updateCrew(task, upDown);

    }


}