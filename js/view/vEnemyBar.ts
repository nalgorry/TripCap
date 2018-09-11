class vEnemyBar {

    private containter:Phaser.GameObjects.Container;
    private bar:Phaser.GameObjects.Graphics;
    private barBack:Phaser.GameObjects.Graphics;

    private maxValue:number;
    private value:number;

    private barWidth:number = 76;
    private barColor:number;

    constructor (public scene:Phaser.Scene, 
        x:number, 
        y:number, 
        color:number, 
        enemyContainer:Phaser.GameObjects.Container,
        maxValue:number,
        value:number) {

        this.maxValue = maxValue;
        this.value = value;
        this.barColor = color;

        this.containter = this.scene.add.container(x, y);
        enemyContainer.add(this.containter);

        this.barBack = this.scene.add.graphics();
        this.barBack.fillStyle(0x9d9d9d);
        this.barBack.fillRect(0 , 0, this.barWidth, 18);
        this.barBack.fillPath();

        this.containter.add(this.barBack);

        this.bar = this.scene.add.graphics();

        this.bar.fillStyle(color);
        this.bar.fillRect(0 , 0, this.barWidth, 18);
        this.bar.fillPath();

        this.containter.add(this.bar);

        this.updateBar(this.value);

    }

    public updateBar(newValue) {
        this.bar.clear();

        this.value = newValue;

        this.bar.fillStyle(this.barColor);
        this.bar.fillRect(0 , 0, this.barWidth * this.value / this.maxValue, 18);
        this.bar.fillPath();

    }


}