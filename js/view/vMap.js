var vMap = /** @class */ (function () {
    function vMap(scene, points) {
        this.scene = scene;
        this.boatPath = [];
        this.tripPorc = 0;
        //list of points that the boat will use to move 
        points = [];
        points.push(new Phaser.Geom.Point(1038, 1390));
        points.push(new Phaser.Geom.Point(1020, 1453));
        points.push(new Phaser.Geom.Point(1033, 1523));
        this.mapGroup = scene.add.container(0, 0);
        var border = scene.add.sprite(0, 0, 'mapMask');
        border.setOrigin(0, 0);
        border.visible = false;
        border.y = 720 / 2 - border.width / 2;
        border.x = 720 / 2 - border.width / 2;
        this.map = scene.add.sprite(0, 0, 'mapaGrande');
        this.map.setOrigin(0, 0);
        //initial position of the map 
        this.map.x = border.x + border.width / 2;
        this.map.y = border.y + border.height / 2;
        //lets add the initial boat position 
        this.map.x -= points[0].x;
        this.map.y -= points[0].y;
        this.mapGroup.add(this.map);
        this.mapGroup.mask = new Phaser.Display.Masks.BitmapMask(scene, border);
        var boat = scene.add.sprite(border.x + border.width / 2, border.y + border.height / 2, 'mapBoat');
        var timer = this.scene.time.addEvent({
            delay: 50,
            callback: this.updateBoat,
            callbackScope: this,
            loop: true,
        });
        this.calculatePoints(points);
        var lastX = this.map.x + points[points.length - 1].x;
        var lastY = this.map.y + points[points.length - 1].y;
        var finish = scene.add.sprite(lastX, lastY, 'mapFinish');
        this.mapGroup.add(finish);
    }
    vMap.prototype.calculatePoints = function (points) {
        var _this = this;
        var distance = 0;
        //lets calculate the total distance to travel in pixels
        var lastPoint;
        var xPoints = [];
        var yPoints = [];
        //to draw the path
        var line = this.scene.add.graphics();
        line.lineStyle(5, 0xd66c50, 1.0);
        line.beginPath();
        line.moveTo(xPoints[0], yPoints[0]);
        this.mapGroup.add(line);
        var curve = new Phaser.Curves.Spline();
        points.forEach(function (e) {
            //lests create the points for the interpolation
            xPoints.push(e.x + _this.map.x);
            yPoints.push(e.y + _this.map.y);
            if (lastPoint) {
                distance += Phaser.Math.Distance.Between(lastPoint.x, lastPoint.y, e.x, e.y);
            }
            else {
                lastPoint = e;
            }
            curve.addPoint(e.x + _this.map.x, e.y + _this.map.y);
            console.log('agrega punto');
        });
        var catmullPath = [];
        //lets uses a catmull interpolation to make the path where the monster move
        var x = 1 / 10000;
        //les create the curve with the interpolation
        for (var i = 0; i <= 1; i += x) {
            var px = Phaser.Math.Interpolation.CatmullRom(xPoints, i);
            var py = Phaser.Math.Interpolation.CatmullRom(yPoints, i);
            catmullPath.push(new Phaser.Geom.Point(px, py));
        }
        var n = 0;
        distance = 0;
        var maxDistance = 0.2;
        //we make an array of the point equidistant to move the boat        
        catmullPath.forEach(function (point) {
            if (distance >= maxDistance) {
                //lets add this point to the array 
                _this.boatPath.push(catmullPath[n]);
                distance = 0;
            }
            else {
                if (n > 0) {
                    distance += Phaser.Math.Distance.Between(catmullPath[n - 1].x, catmullPath[n - 1].y, point.x, point.y);
                }
            }
            if (n % 800 == 0) {
                //draw the line
                //curve.addPoint(point.x, point.y);
            }
            n++;
        });
        curve.draw(line);
    };
    vMap.prototype.updateBoat = function (tripPorc) {
        this.tripPorc = tripPorc;
        if (this.tripPorc <= 1) {
            var arrayPoint = Math.round(tripPorc * this.boatPath.length);
            this.mapGroup.x = this.boatPath[0].x - this.boatPath[arrayPoint].x;
            this.mapGroup.y = this.boatPath[0].y - this.boatPath[arrayPoint].y;
        }
        else {
            this.tripPorc = 0;
        }
    };
    vMap.prototype.addEventMark = function (x, y) {
        //lets mark the event in the traker
        var circle = this.scene.add.graphics();
        circle.fillStyle(0xb1160d, 1);
        circle.fillCircle(x, y, 5);
        circle.fillPath();
    };
    return vMap;
}());
