
Controller.Action_Left = 1;
Controller.Action_Right = 2;
Controller.Action_Up = 3;
Controller.Action_Down = 4;
Controller.Action_Attack1 = 5;
Controller.Action_Attack2 = 6;
Controller.Action_Defense1 = 7;
Controller.Action_Defense2 = 8;


//Controller class, with parameter stage, an object initialized in the Game class.
function Controller(stage) {

    this.stage = stage;

    var canvas = this.stage.canvas;

    //var Enemy_Move_left = false;
    //var Enemy_Move_Right = true;

    var me = this;

    //creates a Hero object, adds it to the stage, updates stage
    this.hero = new Hero();
    this.hero.onload = function () {
        me.hero.Sequence.x = canvas.width * 0.20;
        me.hero.Sequence.y = canvas.height - 5;
        me.stage.addChild(me.hero.Sequence);
        me.stage.update();
    }

    this.heroBar = new HealthBar();
    this.heroBar.onload = function () {
        me.heroBar.Sequence.x = 70;
        me.heroBar.Sequence.y = 30;
        me.stage.addChild(me.heroBar.Sequence);
        me.stage.update();
    }

    /*this.droneBar = new HealthBar();
    this.droneBar.onload = function () {
        me.dronebar.Sequence.x = 70;
        me.droneBar.Sequence.y = 30;
        me.stage.addChild(me.droneBar.Sequence);
        me.stage.update();
    }*/
   
    this.level = new Beginner(this.hero, me.stage);

    this.setDrone = function () {
        this.drone = this.level.enemy;
    }

    //this.currentLevel = function () {
    //    this.level = this.level;
    //}

    this.drone = this.level.enemy;

    this.loadLevelElements = function () {
        switch (this.level.levelName) {
            case "B": this.level.loadEnemies(); break;
            case "I": this.level.loadEnemies(); break;
            case "A": this.level.loadEnemies(); break;
            case "F": this.level.loadEnemies(); break;
            case "V": this.level.loadEnemies(); break;
            case "S": this.level.loadEnemies(); break;
        }

    }

    this.removeLevelElements = function () {
        switch (this.level.levelName) {
            case "B": this.level.removeEnemies(); break;
            case "I": this.level.removeEnemies(); break;
            case "A": this.level.removeEnemies(); break;
            case "F": this.level.loadEnemies(); break;
            case "V": this.level.loadEnemies(); break;
            case "S": this.level.loadEnemies(); break;
        }

    }


    
    //this.droneBar = this.level.droneBar;

    

    //charecter is punching right
    //var attacking = false;
    //Generalizes actions to determine what charecter subclass Hero or Boss objects will do
    this.command = function (input, action, isStart) {

        // Player selection
        var player = (input == 1) ? this.hero : this.drone;

        switch (action) {
            //player either hero or drone...takes you to hero or drone class
            case Controller.Action_Left: player.moveLeft(isStart); break;
            case Controller.Action_Right: player.moveRight(isStart); break;
            case Controller.Action_Up: player.jump(isStart); break;
            case Controller.Action_Down: player.duck(isStart); break;
            case Controller.Action_Attack1: player.firstAttack(isStart); break;
            case Controller.Action_Attack2: player.secondAttack(isStart); break;
            case Controller.Action_Defense1: player.firstDefense(isStart); break;
            case Controller.Action_Defense2: player.secondDefense(isStart); break;
        }
    }

     
    //tick depends on Ticker.addListener() and refreshes the canvas.
    this.tick = function () {
        //alert(me.drone.Sequence.x);
        //var speedControl = Ticker.getTicks() % 2;

        //if (speedControl == 0) {

        if (this.level.play) {

            this.level.play();

            this.level.currentEnemy();
            this.setDrone();

            //this.currentLevel();

            this.controllHealth(this.hero, this.heroBar);
            //if (this.level.levelName == "A") { this.level.controllHealth(this.level.drone, this.droneBar);}

            //if hero is dead
            if (this.hero.health <= 0) {
                //alert('Play again');
                this.resetLevel();
            }
            //if drone is dead
            else if (this.drone.health <= 0) {
                //alert('New level');
                this.level.handleDeaths();
                //alert(this.level.enemyDeaths);
                //this.deadEnemies++
                if (this.level.allEnemiesDead) {
                    this.advanceLevel();
                }
            }
        }

        if (this.hero.refresh) {
            this.hero.refresh();
        }

        if (this.drone.refresh) {
            this.drone.refresh();
        }

        //}

        this.stage.update();
    }

    this.resetLevel = function () {
        this.hero.health = 100;
        this.drone.health = 100;
        this.removeLevelElements();

        switch (this.level.levelName) {
            case "B": this.level = new Beginner(this.hero, me.stage); this.loadLevelElements(); break;
            case "I": this.level = new Intermediate(this.hero, me.stage); this.loadLevelElements(); break;
            case "A": this.level = new Advanced(this.hero, me.stage); this.loadLevelElements(); break;
            case "F": this.level = new levelFour(this.hero, me.stage); this.loadLevelElements(); break;
            case "V": this.level = new levelFive(this.hero, me.stage); this.loadLevelElements(); break;
            case "S": this.level = new levelSix(this.hero, me.stage); this.loadLevelElements(); break;
        }
        alert('Reset Level: ' + this.level.levelName);
    }

    this.advanceLevel = function () {
        this.hero.health = 100;
        this.drone.health = 100;
        this.removeLevelElements();

        switch (this.level.levelName) {
            case "B": this.level = new Intermediate(this.hero, me.stage); this.loadLevelElements(); break;
            case "I": this.level = new Advanced(this.hero, me.stage); this.loadLevelElements(); break;
            case "A": this.level = new levelFour(this.hero, me.stage); this.loadLevelElements(); break;
            case "F": this.level = new levelFive(this.hero, me.stage); this.loadLevelElements(); break;
            case "V": this.level = new levelSix(this.hero, me.stage); this.loadLevelElements(); break;
            case "S": this.level = new levelSix(this.hero, me.stage); this.loadLevelElements(); break;
        }
        this.hero.firstAttack(!isStart);
        alert('New Level: ' + this.level.levelName);
    }

    this.controllHealth = function (player, playerBar) {
        if (player.health <= 100 &&player.health >= 90) { playerBar.healthOneHundred(); }
        if (player.health < 90 && player.health >= 80) { playerBar.healthNinety(); }
        if (player.health < 80 && player.health >= 70) { playerBar.healthEighty(); }
        if (player.health < 70 && player.health >= 60) { playerBar.healthSeventy(); }
        if (player.health < 60 && player.health >= 50) { playerBar.healthSixty(); }
        if (player.health < 50 && player.health >= 40) { playerBar.healthFifty(); }
        if (player.health < 40 && player.health >= 30) { playerBar.healthForty(); }
        if (player.health < 30 && player.health >= 20) { playerBar.healthThirty(); }
        if (player.health < 20 && player.health >= 10) { playerBar.healthTwenty(); }
        if (player.health < 10 && player.health > 0) { playerBar.healthTen(); }
        if (player.health <= 0) { playerBar.healthZero(); player.death(); } // not playing death sequence for drone
    }


    /*this.handleEnemyMovement = function (e) {
	    if (!e){ var e = window.event; }
	    if (Enemy_Move_left) {
	        me.controller.command(2, Controller.Action_Left, true);
	    }

	    if (Enemy_Move_Right) {
	        me.controller.command(2, Controller.Action_Right, true);

	    }
	}*/


    Ticker.setFPS(Ticker.getFPS() / 3);
    Ticker.addListener(this);
    //document.onclick = this.handleEnemyMovement;
    this.loadLevelElements();

}
