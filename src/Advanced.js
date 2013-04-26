function Advanced(hero, stage) {

    Beginner.prototype = new Level();

    this.levelName = "A";

    var me = this;

    this.stage = stage;
    var canvas = this.stage.canvas;

    this.hero = hero;

    this.numberOfEnemies = 0;

    this.drone = new droneBoss(); this.numberOfEnemies++;

    this.enemy = this.drone;

    //this.drone2 = new Boss(); this.numberOfEnemies++;

    //this.drone3 = new Boss(); this.numberOfEnemies++;

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

            this.checkHealth = function(){
            this.controllHealth(this.drone, this.droneBar);
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

    this.removeEnemies = function () {
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


    this.listOfEnemies = [

            this.drone,
            this.drone2,
            this.drone3

    ];


    this.enemyNumber = 1;

    this.currentEnemy = function () {
        //alert(this.enemyNumber);

        if (this.enemyNumber <= this.numberOfEnemies) {
            this.enemy = this.listOfEnemies[this.enemyNumber - 1];
            this.enemyNumber++;
        }

        if (this.enemyNumber > this.numberOfEnemies) {
            this.enemyNumber = 1;
        }

    }

    this.allEnemiesDead = false;
    this.enemyDeaths = 0;

    this.handleDeaths = function () {
        this.enemyDeaths++
        this.enemy.health = 150;
        this.enemy.death();
        //alert(this.enemyDeaths);
        if (this.enemyDeaths >= this.numberOfEnemies)
            this.allEnemiesDead = true;

    }



    this.enemySequence = [

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

    this.play = function () {

        if (this.enemySequence) {
            this.playEnemy();
        }

        if (this.hero.attacking) {
            if ((this.hero.Sequence.x >= this.enemy.Sequence.x - 50 && this.hero.Sequence.x <= this.enemy.Sequence.x + 50)) {
                //alert(this.enemy.health);
                this.enemy.health -= 3;
            }
        }
        if (this.enemy.attacking) {
            if ((this.hero.Sequence.x >= this.enemy.Sequence.x - 50 && this.hero.Sequence.x <= this.enemy.Sequence.x + 50)) {
                //alert(this.drone.enemyHealth());
                this.hero.health -= 3;
            }
        }
    }

}