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
        for (var i=0; i<5; i++) {
            this.crewButtons[i].updateText(this.trip.usedCrew[i]);
            this.crewButtons[i].hideUpArrow(hideUpArrow);
        }

    }

    public createCrewButtons() {

        //lets show the avaible crew
        this.textHealtyCrew = this.scene.add.bitmapText(87, 720-30, 'Pfont', this.trip.healtyCrew.toString(), 80);
        this.textHealtyCrew.setOrigin(0.5);

        this.textSickCrew = this.scene.add.bitmapText(190, 777-25, 'Pfont', this.trip.sickCrew.toString(), 60);
        this.textSickCrew.setOrigin(0.5);

        //lets create all the options for the crew
        this.crewButtons[enumTask.maintenance] = new tripButton(this.scene, 251, 968, enumTask.maintenance, true);
        this.crewButtons[enumTask.clean] = new tripButton(this.scene, 251, 1159, enumTask.clean, true);

        this.crewButtons[enumTask.leadership] = new tripButton(this.scene, 468, 968, enumTask.leadership, true);
        this.crewButtons[enumTask.fish] = new tripButton(this.scene, 468, 1159, enumTask.fish, true);

        this.crewButtons[enumTask.navigation] = new tripButton(this.scene, 360, 784, enumTask.navigation, false);

        //lets check if they click a button
        this.scene.events.on('clickUp',this.buttonClick, this);

        this.scene.events.on('dragCrew', this.dragCrew,this);
        this.scene.events.on('dragCrewEnd', this.dragCrewEnd,this);


        //lets update the values
        this.updateCrewText();

    }

    private dragCrew(data:{x:number, y:number}) {

        var mouseRect = new Phaser.Geom.Rectangle(this.scene.input.x, this.scene.input.y, 2, 2);

        this.crewButtons.forEach(b => {
            var buttonRect = b.sDrag.getBounds()

            if (Phaser.Geom.Intersects.RectangleToRectangle(buttonRect, mouseRect)) {
                //console.log(b)
            }
        });

    }

    private dragCrewEnd(button:tripButton) {

        var mouseRect = new Phaser.Geom.Rectangle(this.scene.input.x, this.scene.input.y, 2, 2);

        var avaibleCircle = new Phaser.Geom.Circle(88, 724, 170/2);

        //lets check if it drop it in avaible crew
        if (Phaser.Geom.Intersects.CircleToRectangle(avaibleCircle, mouseRect)) {

                this.trip.updateCrew(button.task, enumUpDown.down); //remove a crew from the origin

        }

        //lets check if it move the crew
        this.crewButtons.forEach(b => {
            var buttonRect = b.sDrag.getBounds()

            if (Phaser.Geom.Intersects.RectangleToRectangle(buttonRect, mouseRect)) {

                if (button.task != b.task) {
                    this.trip.updateCrew(button.task, enumUpDown.down); //remove a crew from the origin
                }
                
                this.trip.updateCrew(b.task, enumUpDown.up); //increment where i drop the crew


            }
        });

    }



    private buttonClick(task:enumTask, upDown:enumUpDown) {

        //update the logic of the game
        this.trip.updateCrew(task, upDown);

    }


}