var cTripData = (function () {
    function cTripData(data) {
        this.eventsPosible = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.id = data.id;
        this.tripDistance = data.tripDistance;
        this.tripTip = data.tripTip;
        this.tripGold = data.tripGold;
        this.arrow1 = data.arrow1;
        this.arrow2 = data.arrow2;
    }
    return cTripData;
}());
