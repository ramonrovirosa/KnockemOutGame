//Hero Class, a subclass of Charecter, responsible for main charecter.
function Hero() {
    //inherits from charecter
	Hero.prototype = new Character();

    //necessary to call events.
	var me = this;
    
    //Boolean: is the charecter facing right?
    //Boolean: is the charecter attacking?
	var facingRight = true;
	var attacking = false;

    //Load image
	this.initialize = function () {
		this.img = new Image();
		this.img.onload = this.handleImageLoad;
		this.img.src = "./img/hero_spritesheet_complete.png";
	}

	//handles the sprite for the image loading.
	this.handleImageLoad = function (e) {

		var frameData = {

            //movementRight
		    punchRight: [0, 8, "punchRight"],
			kickRight: [12, 15, "idleRight"],
			duckRight: [24, 33, "idleDuck"],
			jumpRight: [36, 42, "idleRight"],
			walkRight: [48, 59, "walkRight"],
			idleRight: [60, 60],
			idleDuck: [13, 13],

            //movementLeft
			punchLeft: [72, 80, "punchLeft"],
			kickLeft: [84, 87, "idleLeft"],
			duckLeft: [24, 32, "idleDuck"],
			jumpLeft: [108, 114, "idleLeft"],
			walkLeft: [120, 133, "walkLeft"],
			//idleLeft: [60, 60],
			idleLeft: [132, 132]


        };

	    //creates a new instance of a spritesheet;
		var spriteSheet = new SpriteSheet(me.img, 195, 100, frameData);
/*
			spriteSheet = SpriteSheetUtils.flip(spriteSheet,
			{
				punchLeft: ["punchRight", true, false, "punchLeft"],
				wkLeft: ["walkRight", true, false, "walkLeft"],
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

        //if not loaded, load image.
		if (me.onload)
			me.onload();
	}

	this.refresh = null;

	//function to move hero left, and eventually take him back to his idle position
	this.moveLeft = function (isStart) {

		if (isStart) {
		    //checks if first time bitmapsequence has been startedr
			if (!this.isStarted) {
				this.Sequence.gotoAndPlay("walkLeft");
				this.facingRight = false;

                //boundary checking, makes sure enemy does not go out of  the canvas.
				this.refresh = function () {
				    if (this.Sequence.x >= 70) {
                        //move charecter left
				        this.Sequence.x -= 20;
                    }
				}

				this.isStarted = true;
			}
		}
		else  // stopping
		{
			this.isStarted = false;
			this.refresh = null;
			this.Sequence.gotoAndStop("idleLeft");
		}

	}

	//function to move hero right, and eventually take him back to his idle position
	this.moveRight = function (isStart) {
		if (isStart) {
            //checks if first time bitmapsequence has been started, then starts sequence
			if (!this.isStarted) {

			    this.isStarted = true;

                //plays Hero bitmap sequence

			    this.Sequence.gotoAndPlay("walkRight");

                //boundary checking, makes sure enemy does not go out of  the canvas.
			    this.facingRight = true;

			    this.refresh = function () {
			        //boundary checking, makes sure enemy does not go out of  the canvas.
			        if (this.Sequence.x <= 950) {
			            this.Sequence.x += 20;
			        }
				}
			}
		}
		else  // stopping
		{
			this.isStarted = false;
			this.refresh = null;
			this.Sequence.gotoAndStop("idleRight");
		}

	}

	//make the hero jump, and eventually take him back to his idle position
	this.jump = function (isStart) {

	    if (isStart) {

	        if (!this.isStarted) {
	            this.isStarted = true;


	            if (this.facingRight)
	                this.Sequence.gotoAndPlay("jumpRight");

	            if (!this.facingRight)
	                this.Sequence.gotoAndPlay("jumpLeft");

	            //charecter will jump up to a certain point/height in the y direction
                //then go back down.
	            this.counter = 6;
	            this.refresh = function () {
	                if (this.counter-- > 0) {
	                    this.Sequence.y -= 20;
	                }
	                else
	                    this.Sequence.y = 638;
	            }
	        }
	    }
	    else  // stopping
	    {
	        this.isStarted = false;
	        this.refresh = null;
	        this.Sequence.y = 638;
	        //this.Sequence.gotoAndStop("idleRight");
	    }

	}
    
    //make the hero duck
	this.duck = function (isStart) {
	    if (isStart) {
	        //checks if first time bitmapsequence has been started, then starts sequence
	        if (!this.isStarted) {

	            this.isStarted = true;
                //checks if user is facing right.
	            if (this.facingRight)
	                this.Sequence.gotoAndPlay("idleDuck");
                //if facing left.
	            if (!this.facingRight)
	                this.Sequence.gotoAndPlay("idleDuckLeft");

	            this.refresh = function () {
	                //this.Sequence.x += 20;
	            }
	        }
	    }
	    else  // stopping
	    {
	        this.isStarted = false;
	        this.refresh = null;
	        if (facingRight) { this.Sequence.gotoAndStop("idleRight"); }
	        if (!facingRight) { this.Sequence.gotoAndStop("idleLeft"); }
	    }


	}

    //hero attack sequence-punch
	this.firstAttack = function (isStart) {
        if (isStart) {
	        //checks if first time bitmapsequence has been started, then starts sequence
	        if (!this.isStarted) {

	            this.isStarted = true;
                //punch to the right.
	            if (this.facingRight)
	                this.Sequence.gotoAndPlay("punchRight");
                //punch to the left.
	            if (!this.facingRight)
	                this.Sequence.gotoAndPlay("punchLeft");

                //attacking so lowere enemies health.
	            this.attacking = true;
	            this.refresh = function () {
	                //this.Sequence.x += 20;
	            }
	        }
	    }
	    else  // stopping
        {
            //attack sequence over, no more need to refresh.
	        this.isStarted = false;
	        this.refresh = null;
            //if facing right stop right, if faxcing left, stop left.
	        if (facingRight) { this.Sequence.gotoAndStop("idleRight"); }
	        if (!facingRight) { this.Sequence.gotoAndStop("idleLeft"); }
	        this.attacking = false;
	    }

	}
    //hero attack sequence kick
	this.secondAttack = function (isStart) {
	    if (isStart) {
	        //checks if first time bitmapsequence has been started, then starts sequence
	        if (!this.isStarted) {

	            this.isStarted = true;
                //kicking to the right
	            if (this.facingRight)
	                this.Sequence.gotoAndPlay("kickRight");
                //kicking to the left.
	            if (!this.facingRight)
	                this.Sequence.gotoAndPlay("kickLeft");

	            this.attacking = true;
	            this.refresh = function () {
	                //this.Sequence.x += 20;
	            }
	        }
	    }
	    else  // stopping
	    {
            //attack sequence over, no more need to refresh.
	        this.isStarted = false;
	        this.refresh = null;
            //if facing right stop right, if faxcing left, stop left.
	        if(facingRight){this.Sequence.gotoAndStop("idleRight");}
	        if(!facingRight){this.Sequence.gotoAndStop("idleLeft");}
	        this.attacking = false;
	    }
	}

    //defense sequence
	this.firstDefense = function (isStart) {

	}
    //other defense sequence
	this.secondDefense = function (isStart) {

	}
    //Hero is dead. Go and play duck sequence.
	this.death = function () {
	    this.duck();
	}
    //Hero begins with 100 health points.
	this.health = 100;

	//calls the Hero.initialize() function and loads the sprite
	this.initialize();
}
