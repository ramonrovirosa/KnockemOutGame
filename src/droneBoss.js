//droneBoss subclass of Charecter, Is the main enemy boss.
function droneBoss() {
    //Inherits from charecter.
	droneBoss.prototype = new Character();

    //necessary to call events.
	var me = this;
    //Checks if bitmapsequence animation is playing.
	this.onAnimation = false;
    //Is charecter attacking. Boolean.
	var attacking = false;

    //Loads image.
	this.initialize = function () {
		this.img = new Image();
		this.img.onload = this.handleImageLoad;
		this.img.src = "./img/dronebossspritesheet.png";
	}
    //handles the sprite for the image loading.
	this.handleImageLoad = function (e) {

		var frameData = {
			death: [0, 34, "death"],
			blastAttack: [35, 55, "blastAttack"],
			idle: [70, 81, "idle"],
			rainAttack: [105, 123, "rainAttack"],
			walk: [140, 157, "walk"]
        
        };

	    //creates a new instance of a spritesheet;
		var spriteSheet = new SpriteSheet(me.img, 250, 200, frameData);
		/*
			spriteSheet = SpriteSheetUtils.flip(spriteSheet,
			{
				punchLeft: ["punchRight", true, false, "punchLeft"],
				wkLeft: ["wkRight", true, false, "wkLeft"],
				idleLeft: ["idleRight", true, false, "idleLeft"],
				idleDuckLeft: ["idleDuck", true, false, "idleDuckLeft"],
				jumpLeft: ["jumpRight", true, false, "jumpLeft"]
			});
		*/

        //create a new bitmap sequence
		me.Sequence = new BitmapSequence(spriteSheet);

		// Set to Middle / Bottom
		me.Sequence.regX = spriteSheet.frameWidth / 2;
		me.Sequence.regY = spriteSheet.frameHeight;
		me.Sequence.gotoAndStop("walk");

        //detects when animaiton finishes
        me.Sequence.callback = function () {
		    me.onAnimation = false;
		}

		if (me.onload)
			me.onload();
	}

	this.refresh = null;
	this.refreshback = null;
	//alert("h");
	//if (this.Sequence.x == 1020) { Enemy_Move_left = false; Enemy_Move_Right = true; }
	//if (this.Sequence.x == 20){ Enemy_Move_Right = true; Enemy_Move_left = false; }

    //move the droneBoss Left, and eventually take him back to his idle position
	this.moveLeft = function (isStart) {

	    if (isStart) {
	        //checks if first time bitmapsequence has been started, then starts sequence
	        if (!this.isStarted) {

	            //plays Hero bitmap sequence
	            this.onAnimation = true;
	            this.Sequence.gotoAndPlay("walk");

	            this.refresh = function () {
	                this.Sequence.x -= 15;
	            }
	            this.isStarted = true;
	        }
	    }
	    else  // stopping
	    {
	        this.isStarted = false;
	        this.refresh = null;
	        //this.refreshback = null;
	        this.onAnimation = true;
	        this.Sequence.gotoAndPlay("idle");
	    }

	}

	//function to move hero right, and eventually take him back to his idle position
	this.moveRight = function (isStart) {
	    if (isStart) {
	        //checks if first time bitmapsequence has been started, then starts sequence
	        if (!this.isStarted) {
	            
	            this.isStarted = true;

	            //plays Hero bitmap sequence
	            this.onAnimation = true;
	            this.Sequence.gotoAndPlay("walk");

	            this.refresh = function () {
	                this.Sequence.x += 15;
	            }
	            
	        }
	    }
	    else  // stopping
	    {
	        this.isStarted = false;
	        this.refresh = null;
	        //this.refreshback = null;
	        this.onAnimation = true;
	        this.Sequence.gotoAndPlay("idle");
	    }

	}


	//make the droneBoss jump, and eventually take him back to his idle position
	this.jump = function (isStart) {

	}

	this.duck = function (isStart) {

		if (isStart) {
			this.isStarted = false;
			this.refresh = function () {
				if (!this.isStarted) {
				    this.onAnimation = true;
				    this.Sequence.gotoAndPlay("rainAttack");
					this.isStarted = true;
				}

			}
		}
		else  // stopping
		{
		    this.refresh = null;
		    this.onAnimation = true;
		    this.Sequence.gotoAndStop("rainAttack");
		}

	}

	//make the droneBoss attack, and eventually take him back to his idle position
	this.firstAttack = function (isStart) {
		if (isStart) {
		    //checks if first time bitmapsequence has been started, then starts sequence
		    if (!this.isStarted) {

		        this.isStarted = true;
		        //plays Hero bitmap sequence
		        this.onAnimation = true;
		        this.attacking = true;
		        this.Sequence.gotoAndPlay("rainAttack");
		        
		    }
		}
		else  // stopping
		{
		    this.isStarted = false;
		    this.refresh = null;
		    //this.refreshback = null;
		    this.onAnimation = true;
		    this.attacking = false;
		    //this.Sequence.gotoAndPlay("attackRight");
		}


	}

    //other attack sequence of droneBoss
	this.secondAttack = function (isStart) {

	}

    //defense sequence of droneBoss
	this.firstDefense = function (isStart) {

	}

    //other defense sequence of droneBoss.
	this.secondDefense = function (isStart) {

	}

	this.death = function () {
	    this.Sequence.gotoAndPlay("death");
	}
    //Gives the droneBoss an initial Health of 100
	this.health = 100;

	//this.enemyHealth = function () {
	//    health--;
	//    return health;
	//}

    //calls the Boss.initialize() function and loads the sprite
	this.initialize();

	
}
