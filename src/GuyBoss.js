//guyBoss subclass of Charecter, is the human boss.
function guyBoss() {
    //Creates an instance of Charecter, and guyBoss inherits from Charecter as a subclass.
	guyBoss.prototype = new Character();

	var me = this;
    
    //Checks if bitmapsequence animation is playing.
	this.onAnimation = false;

    //boolean: checks if charecter is attacking or not.
	var attacking = false;

    //Loads image.
	this.initialize = function () {
		this.img = new Image();
		this.img.onload = this.handleImageLoad;
		this.img.src = "./img/enemy_sprite.png";
	}
    //handles the sprite for the image loading.
	this.handleImageLoad = function (e) {

		var frameData = {
			idleRight: [0, 0],
			walkRight: [0, 19, "walkRight"],
			attackRight: [20, 29],
			death: [0, 5, "deathIdle"],
            deathIdle: [40,40]
        
		};

	    //creates a new instance of a spritesheet;
		var spriteSheet = new SpriteSheet(me.img, 144, 144, frameData);
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
		me.Sequence.gotoAndStop("idleRight");

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

    //move the guyBoss Left, and eventually take him back to his idle position
	this.moveLeft = function (isStart) {

	    if (isStart) {
	        //checks if first time bitmapsequence has been started, then starts sequence
	        if (!this.isStarted) {

	            //plays guyBoss bitmap sequence
	            this.onAnimation = true;
	            this.Sequence.gotoAndPlay("walkRight");

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

	//function to move guyBoss right, and eventually take him back to his idle position
	this.moveRight = function (isStart) {
	    if (isStart) {
	        //checks if first time bitmapsequence has been started, then starts sequence
	        if (!this.isStarted) {
	            
	            this.isStarted = true;

	            //plays guyBossBar bitmap sequence
	            this.onAnimation = true;
	            this.Sequence.gotoAndPlay("walkRight");

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


	//make the guyBoss jump, and eventually take him back to his idle position
	this.jump = function (isStart) {

	}

    //Charecter Ducks to the ground.
	this.duck = function (isStart) {

		if (isStart) {
			this.isStarted = false;
			this.refresh = function () {
				if (!this.isStarted) {
				    this.onAnimation = true;
					this.Sequence.gotoAndPlay("duckRight");
					this.isStarted = true;
				}

			}
		}
		else  // stopping
		{
		    this.refresh = null;
		    this.onAnimation = true;
			this.Sequence.gotoAndStop("idleRight");
		}

	}

	//make the guyBoss attack, and eventually take him back to his idle position
	this.firstAttack = function (isStart) {
		if (isStart) {
		    //checks if first time bitmapsequence has been started, then starts sequence
		    if (!this.isStarted) {

		        this.isStarted = true;
		        //plays guyBossBar bitmap sequence
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

    //other attack sequence of guyBoss
	this.secondAttack = function (isStart) {

	}

    //defense sequence of guyBoss
	this.firstDefense = function (isStart) {

	}

    //other defense sequence of guyBoss.
	this.secondDefense = function (isStart) {

	}
    //Checking if guyBoss is dead
	this.dead = false;
	this.death = function () {
	    this.dead = true;
	    this.Sequence.gotoAndPlay("death");
	    //this.Sequence.y += 100;
	}

    //guyBoss begins with 100 health points.
	this.health = 100;

	//this.enemyHealth = function () {
	//    health--;
	//    return health;
	//}

    //calls the guyBoss.initialize() function and loads the sprite
	this.initialize();

	
}
