
Character.DIR_LEFT = 1;
Character.DIR_RIGHT = 2;

//Charecter Superclass for Hero and Boss class.
function Character() {

	this.Direction = Character.DIR_RIGHT;

	this.Sequence = null;

	this.onload = null;

    //for testing purposes
    /*
	this.moveLeft = function (isStart) {
		alert("Move left " + isStart ? "BEGIN" : "END");
	}

	this.moveRight = function (isStart) {
		alert("Move right " + isStart ? "BEGIN" : "END");
	}

	this.jump = function (isStart) {
		alert("Jump " + isStart ? "BEGIN" : "END");
	}

	this.duck = function (isStart) {
		alert("Duck " + isStart ? "BEGIN" : "END");
	}

	this.firstAttack = function (isStart) {
		alert("1st Attack " + isStart ? "BEGIN" : "END");
	}

	this.secondAttack = function (isStart) {
		alert("2nd Attack " + isStart ? "BEGIN" : "END");
	}

	this.firstDefense = function (isStart) {
		alert("1st Defense " + isStart ? "BEGIN" : "END");
	}

	this.secondDefense = function (isStart) {
		alert("2nd Defense " + isStart ? "BEGIN" : "END");
	}
    */
}
