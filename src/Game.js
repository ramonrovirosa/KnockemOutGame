

//Game class, with parameters of the canvas object created in the index.html file.
function Game(canvas) {

	var me = this;

	var KEYCODE_SPACE = 32;
	var KEYCODE_UP = 38;
	var KEYCODE_DOWN = 40;
	var KEYCODE_LEFT = 37;
	var KEYCODE_RIGHT = 39;
	var KEYCODE_W = 87;
	var KEYCODE_A = 65;
	var KEYCODE_D = 68;
	var KEYCODE_X = 88;

	
    //Creates stage and new Text object, adds splashscreen to the stage
	this.initialize = function (_canvas) {
        //creates an instance of the canvas and sets it to the stage.
		this.canvas = _canvas;
		this.stage = new Stage(_canvas);

		/*this.gameTxt = new Text("Are You Ready For The Adventure of Your Life? \n \n Click if You Dare", "36px Arial", "#FFF");
		this.gameTxt.textAlign = "center";
		this.gameTxt.x = this.canvas.width / 2;
		this.gameTxt.y = this.canvas.height / 3;

		this.stage.addChild(this.gameTxt);*/
		this.stage.update();
	}

    //once the user clicks on the splash screen, this function loads the background & calls setBgImage below
	this.start = function () {

		/*this.stage.removeChild(this.gameTxt);*/
		this.stage.update();

		this.bgImage = new Image();
		this.bgImage.onload = this.setBgImage;
		this.bgImage.src = "./img/testbackground.png";
	}

    //Creates an instance of the Controller Class and adds the Background Image to the stage.
	this.setBgImage = function (event) {

		me.logo = new Bitmap(me.bgImage);

		me.stage.addChild(me.logo);
		me.logo.x = 0;
		me.logo.y = 0;

		me.stage.update();

		me.controller = new Controller(me.stage);


	    //Very Important---Creates an event handler to handle when the user 
		//presses a key and releases a key.
		document.onkeydown = me.handleKeyDown;
		document.onkeyup = me.handleKeyUp;


	    //document.onclick = me.handleEnemyMovement;
		//alert(Ticker.getFPS());
	}


	//allow for WASD and arrow control scheme
    //function handles when a key is pressed down.
	this.handleKeyDown = function (e) {
		//cross browser issues exist
		if (!e){ var e = window.event; }
		switch (e.keyCode) {
		    //controller.command parameters: 1. which charecter: if 1 then first charecter (hero object), 2 if drone, etc.. 
		    //                               2. what type of action is being performed. 
	        //                               3. if isStart is true or false(If key is pressed down or up. In case of keyDown, keydown is true.)

            //Handle hero keydown events
			case KEYCODE_LEFT: me.controller.command(1, Controller.Action_Left, true); break;  
			case KEYCODE_RIGHT: me.controller.command(1, Controller.Action_Right, true); break;
			case KEYCODE_UP: me.controller.command(1, Controller.Action_Up, true); break;
			case KEYCODE_DOWN: me.controller.command(1, Controller.Action_Down, true); break;
		    case KEYCODE_SPACE: me.controller.command(1, Controller.Action_Attack1, true); break;
		    case KEYCODE_X: me.controller.command(1, Controller.Action_Attack2, true); break;

            //handle drones keydown events
			case KEYCODE_A: me.controller.command(2, Controller.Action_Left, true); break;
			case KEYCODE_D: me.controller.command(2, Controller.Action_Right, true); break;
			case KEYCODE_W: me.controller.command(2, Controller.Action_Down, true); break;
		}
	}

	//function handles when a key is unpressed.
	this.handleKeyUp = function (e) {
		//cross browser issues exist
		if (!e){ var e = window.event; }
		switch (e.keyCode) {
		    //Handle hero keyup events
			case KEYCODE_LEFT: me.controller.command(1, Controller.Action_Left, false); break;
			case KEYCODE_RIGHT: me.controller.command(1, Controller.Action_Right, false); break;
			case KEYCODE_UP: me.controller.command(1, Controller.Action_Up, false); break;
		    case KEYCODE_DOWN: me.controller.command(1, Controller.Action_Down, false); break;
		    case KEYCODE_SPACE: me.controller.command(1, Controller.Action_Attack1, false); break;
		    case KEYCODE_X: me.controller.command(1, Controller.Action_Attack2, false); break;

		    //Handle drone keyup events in cae you want to move the drones.
			case KEYCODE_A: me.controller.command(2, Controller.Action_Left, false); break;
			case KEYCODE_D: me.controller.command(2, Controller.Action_Right, false); break;
			case KEYCODE_W: me.controller.command(2, Controller.Action_Down, false); break;
		}
	}

    //Calls Game.initialze(), called from index.html file.
	this.initialize(canvas);

};
