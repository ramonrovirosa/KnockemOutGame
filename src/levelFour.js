//Beginner Class that inherits from superclass level.
function levelFour(hero, stage) {
    //creates an instance of a new Level called beginner.
    levelFour.prototype = new Level();

    //used to identify which level class is being called.
    //mostly usefull for controller class.
    this.levelName = "F";

    var me = this;

    //Creates an instance of the stage and creates a canvas.
    this.stage = stage;
    var canvas = this.stage.canvas;

    //creates an instance of hero.
    this.hero = hero;
    
    //counts the number of enemies.
    this.numberOfEnemies = 0;
    
    //creates an instance of drone.
    this.drone = new guyBoss(); this.numberOfEnemies++;

    //This sets which drone is the current enemy.
    this.enemy = this.drone;

    //this.drone2 = new Boss(); this.numberOfEnemies++;

    //this.drone3 = new Boss(); this.numberOfEnemies++;

    //load however many enemies you want on the level.
    this.loadEnemies = function () {

        //creates a Boss object adds it to the stage, updates stage
        //this.drone = new Boss();
        this.drone.onload = function () {
            me.drone.Sequence.x = canvas.width * 0.80;
            me.drone.Sequence.y = canvas.height - 5;
            me.stage.addChild(me.drone.Sequence);
            //me.stage.removeChild(me.drone.Sequence);
            me.stage.update();

        }

        //this.drone2 = new Boss();
        /*this.drone2.onload = function () {
            me.drone2.Sequence.x = canvas.width * 0.40;
            me.drone2.Sequence.y = canvas.height - 5;
            me.stage.addChild(me.drone2.Sequence);
            me.stage.update();

        }*/

        /*this.drone3.onload = function () {
            me.drone3.Sequence.x = canvas.width * 0.60;
            me.drone3.Sequence.y = canvas.height - 5;
            me.stage.addChild(me.drone3.Sequence);
            me.stage.update();

        }*/

    }

    //removes the enemies from the stage.
    this.removeEnemies = function(){
        me.stage.removeChild(me.drone.Sequence);    
        //me.stage.removeChild(me.drone2.Sequence);
        //me.stage.removeChild(me.drone3.Sequence);
    }


    /*this.droneBar = new HealthBar();
    this.droneBar.onload = function () {
        me.droneBar.Sequence.x = canvas.width - 70;
        me.droneBar.Sequence.y = 30;
        me.stage.addChild(me.droneBar.Sequence);
        me.stage.update();
    }*/

    //an array list of all the enemies. 
    this.listOfEnemies = [

            this.drone,
            this.drone2,
            this.drone3

        ];

    //checks what current enemy you are on. Begins with first.
    this.enemyNumber = 1;

    this.currentEnemy = function () {
        //alert(this.enemyNumber);

        //Cycles through the enemies in the array.
        if (this.enemyNumber <= this.numberOfEnemies)
        {
            this.enemy = this.listOfEnemies[this.enemyNumber - 1];
            this.enemyNumber++;
        }
        //restarts cycling.
        if (this.enemyNumber > this.numberOfEnemies) {
            this.enemyNumber = 1;
        }

    }
    //Checks to see if all enemies ahve died.
    this.allEnemiesDead = false;
    //counts number of dead enemies. 
    this.enemyDeaths = 0;

    //function called by controller for when enemies die.
    this.handleDeaths = function () {
        this.enemyDeaths++
        this.enemy.health = 150;
        this.enemy.death();
        //alert(this.enemyDeaths);
        if (this.enemyDeaths >= this.numberOfEnemies)
            this.allEnemiesDead = true;

    }


    //Automated movement Sequence to be played by enemy.
    this.enemySequence = [

            //move to the left and attack
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(false); },
            function () { me.enemy.moveLeft(false); },
            function () { me.enemy.moveLeft(false); },
	        function () { me.enemy.firstAttack(true); },
            function () { me.enemy.firstAttack(true); },
            function () { me.enemy.firstAttack(true); },
	        function () { me.enemy.firstAttack(false); },
            function () { me.enemy.firstAttack(false); },
            function () { me.enemy.firstAttack(false); },

            //move to the right and attack
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(false); },
            function () { me.enemy.moveRight(false); },
            function () { me.enemy.moveRight(false); },
	        function () { me.enemy.firstAttack(true); },
            function () { me.enemy.firstAttack(true); },
            function () { me.enemy.firstAttack(true); },
	        function () { me.enemy.firstAttack(false); },
            function () { me.enemy.firstAttack(false); },
            function () { me.enemy.firstAttack(false); },

            //move back to the left.
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(true); },
            function () { me.enemy.moveLeft(false); },
            function () { me.enemy.moveLeft(false); },
            function () { me.enemy.moveLeft(false); },
	        function () { me.enemy.firstAttack(true); },
            function () { me.enemy.firstAttack(true); },
            function () { me.enemy.firstAttack(true); },
	        function () { me.enemy.firstAttack(false); },
            function () { me.enemy.firstAttack(false); },
            function () { me.enemy.firstAttack(false); },

            //move back to the Right.
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(true); },
            function () { me.enemy.moveRight(false); },
            function () { me.enemy.moveRight(false); },
            function () { me.enemy.moveRight(false); },
	        function () { me.enemy.firstAttack(true); },
            function () { me.enemy.firstAttack(true); },
            function () { me.enemy.firstAttack(true); },
	        function () { me.enemy.firstAttack(false); },
            function () { me.enemy.firstAttack(false); },
            function () { me.enemy.firstAttack(false); }

            


    ];


    this.sequenceIndex = 0;

    //Plays enemy sequence, or death sequence if enemy dies. 
    this.playEnemy = function () {
        if (!this.enemy.onAnimation && this.enemy.Sequence && !this.enemy.dead) {
            var step = this.enemySequence[this.sequenceIndex++];
            //if (this.enemy.death) { step = this.enemy.death;}
            step(); 
            if (this.sequenceIndex >= this.enemySequence.length) { this.sequenceIndex = 0; }
        }
        if (!this.enemy.onAnimation && this.enemy.Sequence && this.enemy.dead) {
            var step = this.enemy.death();
            this.enemy.Sequence.y += 50;
            
        }
    }

    //Function called by controller tick function, and calls playEnemy();
    this.play = function () {

        if (this.enemySequence) {
            this.playEnemy();
        }

        //If the hero is attacking the enemy and he is close enough, lower enemy health.
        if (this.hero.attacking) {
            if ((this.hero.Sequence.x >= this.enemy.Sequence.x - 50 && this.hero.Sequence.x <= this.enemy.Sequence.x + 50)) {
                //alert(this.enemy.health);
                this.enemy.health -= 10;
                }
        }
        //if the enemy is attacking the hero and he is close enough, lower the enemies health. 
        if (this.enemy.attacking) {
            if ((this.hero.Sequence.x >= this.enemy.Sequence.x - 50 && this.hero.Sequence.x <= this.enemy.Sequence.x + 50)) {
                //alert(this.drone.enemyHealth());
                this.hero.health -= 3;
            }
        }
    }

}