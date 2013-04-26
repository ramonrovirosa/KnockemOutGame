//Boss subclass of Charecter, actually Drone though.
function Boss() {
    //Boss inherits from Charecter.
	Boss.prototype = new Character();

    //necessary to call events.
	var me = this;

    //Checks if bitmapsequence animation is playing.
	this.onAnimation = false;

    //boolean: checks if charecter is attacking or not. 
	var attacking = false;

    //Loads image.
	this.initialize = function () {
		this.img = new Image();
		this.img.onload = this.handleImageLoad;
		this.img.src = "./img/dronesprites.png";
	}
    //handles the sprite for the image loading.
	this.handleImageLoad = function (e) {

		var frameData = {
			idleRight: [0, 0],
			walkRight: [16, 23, "walkRight"],
			attackRight: [32, 41],
			death: [48, 63, "deathIdle"],
            deathIdle: [63,63]
        
		};

        //creates a new instance of a spritesheet;
		var spriteSheet = new SpriteSheet(me.img, 195, 100, frameData);
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

		// Charecter central poistioning: Set to Middle / Bottom
		me.Sequence.regX = spriteSheet.frameWidth / 2;
		me.Sequence.regY = spriteSheet.frameHeight;
		me.Sequence.gotoAndStop("idleRight");

        //detects when animaiton finishes
        me.Sequence.callback = function () {
		    me.onAnimation = false;
		}

	    //if not loaded, load image.
		if (me.onload)
			me.onload();
	}

	this.refresh = null;
	this.refreshback = null;
	//alert("h");
	//if (this.Sequence.x == 1020) { Enemy_Move_left = false; Enemy_Move_Right = true; }
	//if (this.Sequence.x == 20){ Enemy_Move_Right = true; Enemy_Move_left = false; }

    //move the drone Left, and eventually take him back to his idle position
	this.moveLeft = function (isStart) {
        //if bitmapsequence is started then continue
	    if (isStart) {
	        //checks if first time bitmapsequence has been started, then starts sequence
	        if (!this.isStarted) {

	            //plays Boss.walkleft bitmap sequence
	            this.onAnimation = true;
	            this.Sequence.gotoAndPlay("walkRight");

                //move charecter to the left of the canvas..
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
	        this.Sequence.gotoAndPlay("idleRight");
	    }

	}

	//function to move hero right, and eventually take him back to his idle position
	this.moveRight = function (isStart) {
	    if (isStart) {
	        //checks if first time bitmapsequence has been started, then starts sequence
	        if (!this.isStarted) {
	            
	            this.isStarted = true;

	            //plays Boss.wallkright bitmap sequence
	            this.onAnimation = true;
	            this.Sequence.gotoAndPlay("walkRight");

	            //move charecter to the right of the canvas..
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
	        this.Sequence.gotoAndPlay("idleRight");
	    }

	}


	//make the drone jump, and eventually take him back to his idle position
	this.jump = function (isStart) {
        //allow drone to jump.
	}
    //Ducks to the ground.
	this.duck = function (isStart) {
	    //checks if first time bitmapsequence has been started, then starts sequence
		if (isStart) {
			this.isStarted = false;
			this.refresh = function () {
				if (!this.isStarted) {
				    this.onAnimation = true;
                    //plays duckright
					this.Sequence.gotoAndPlay("duckRight");
					this.isStarted = true;
				}

			}
		}
		else  // stopping
		{
		    this.refresh = null;
		    this.onAnimation = true;
            //stops duckRight and plays idleRight
			this.Sequence.gotoAndStop("idleRight");
		}

	}

	//make the drone attack, and eventually take him back to his idle position
	this.firstAttack = function (isStart) {
		if (isStart) {
		    //checks if first time bitmapsequence has been started, then starts sequence
		    if (!this.isStarted) {

		        this.isStarted = true;
		        //plays Boss bitmap sequence
		        this.onAnimation = true;
		        this.attacking = true;
		        this.Sequence.gotoAndPlay("attackRight");
		        
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

    //other attack sequence of drone
	this.secondAttack = function (isStart) {

	}

    //defense sequence of drone
	this.firstDefense = function (isStart) {

	}

    //other defense sequence of drone.
	this.secondDefense = function (isStart) {

	}

    //Checking if Drone is dead
	this.dead = false;
	this.death = function () {
	    this.dead = true;
	    this.Sequence.gotoAndPlay("death");
	    //this.Sequence.y += 100;
	}

    //drone begins with 100 health points.
	this.health = 100;

	//this.enemyHealth = function () {
	//    health--;
	//    return health;
	//}

    //calls the Boss.initialize() function and loads the sprite
	this.initialize();

	
}
