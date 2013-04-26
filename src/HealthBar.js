
//Health Barr at top of right screen
function HealthBar() {

    var me = this;

    //Load image
    this.initialize = function () {
        this.img = new Image();
        this.img.onload = this.handleImageLoad;
        this.img.src = "./img/healthbarspritesheet.png";
    }


    //handles the sprite for the image loading.
    this.handleImageLoad = function (e) {

        var frameData = {

            //movementRight
            HealthOneHundred: [0, "HealthOneHundred"],
            HealthNinety: [1, "HealthNinety"],
            HealthEighty: [2, "HealthEighty"],
            HealthSeventy: [3, "HealthSeventy"],
            HealthSixty: [4, "HealthSixty"],
            HealthFifty: [5, "HealthFifty"],
            HealthForty: [6, "HealthForty"],
            HealthThirty: [7, "HealthThirty"],
            HealthTwenty: [8, "HealthTwenty"],
            HealthTen: [9, "HealthTen"],
            HealthZero:[10, "HealthZero"]

        };


        var spriteSheet = new SpriteSheet(me.img, 130, 30, frameData);

        //create a new bitmap sequence
        me.Sequence = new BitmapSequence(spriteSheet);

        // Set to Middle / Bottom
        me.Sequence.regX = spriteSheet.frameWidth / 2;
        me.Sequence.regY = spriteSheet.frameHeight;
        me.Sequence.gotoAndStop("HealthOneHundred");

        if (me.onload)
            me.onload();
    }

    this.healthOneHundred = function () {
        this.Sequence.gotoAndStop("HealthOneHundred");
    }

    this.healthNinety = function () {
        this.Sequence.gotoAndStop("HealthNinety");
    }

    this.healthEighty = function () {
        this.Sequence.gotoAndStop("HealthEighty");
    }

    this.healthSeventy = function () {
        this.Sequence.gotoAndStop("HealthSeventy");
    }

    this.healthSixty = function () {
        this.Sequence.gotoAndStop("HealthSixty");
    }

    this.healthFifty = function () {
        this.Sequence.gotoAndStop("HealthFifty");
    }

    this.healthForty = function () {
        this.Sequence.gotoAndStop("HealthForty");
    }

    this.healthThirty = function () {
        this.Sequence.gotoAndStop("HealthThirty");
    }

    this.healthTwenty = function () {
        this.Sequence.gotoAndStop("HealthTwenty");
    }

    this.healthTen = function () {
        this.Sequence.gotoAndStop("HealthTen");
    }

    this.healthZero = function () {
        this.Sequence.gotoAndStop("HealthZero");
    }

    this.initialize();
}