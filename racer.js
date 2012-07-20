
function Car () {
	this.img = new Image();   // Create new img element
	this.img.onload = function(){
	  // execute drawImage statements here
	};
	this.img.src = 'car.png'; // Set source path	
}
Car.prototype = {
	x: 10,
	y: 10,
	code: 'player',
	acceleration: 1.2,
	rotationStep: 6,
	rotation: 115,
	speed: 10,
	speedDecay: 0.96,
	maxSpeed: 7,
	backSpeed: 1.1,


	isMoving: function (speed) {
		return !(this.speed > -0.4 && this.speed < 0.4);
	}
};

var canvas  = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	ctxW    = canvas.width,
	ctxH    = canvas.height,
	player  = new Car()
;


function radiansFromDegrees (degrees) {
	return degrees * (Math.PI/180);
}

var TO_RADIANS = Math.PI/180;
function drawRotatedImage(image, x, y, angle) {
 
	// save the current co-ordinate system
	// before we screw with it
	context.save();
 
	// move to the middle of where we want to draw our image
	context.translate(x, y);
 
	// rotate around that point, converting our
	// angle from degrees to radians
	context.rotate(angle * TO_RADIANS);
 
	// draw it up and to the left by half the width
	// and height of the image
	context.drawImage(image, -(image.width/2), -(image.height/2));
 
	// and restore the co-ords to how they were when we began
	context.restore();
}
function speedXY (rotation, speed) {
	return {
		x: Math.sin(radiansFromDegrees(rotation)) * speed,
		y: Math.cos(radiansFromDegrees(rotation)) * speed * -1,
	};
}
function frame () {
	step(player);
	draw(player);
	window.requestAnimationFrame(frame);
}
function draw (car) {
	context.clearRect(0,0,ctxW,ctxH);
	drawRotatedImage(car.img, car.x, car.y, car.rotation);
}
function step (car) {
	if (car.code === 'player'){

		// constantly decrease speed
		if (!car.isMoving()){
			car.speed = 0;
		} else {
			car.speed *= car.speedDecay;
		}
		// keys movements
		if (Keys[Key.UP] && car.speed < car.maxSpeed){
			if (car.speed < 0){
				car.speed *= car.speedDecay;
			} else if (car.speed === 0){
				car.speed = 0.4;
			} else {
				car.speed *= car.acceleration;
			}
		}
		if (Keys[Key.DOWN] && Math.abs(car.speed) < car.maxSpeed){
			if (car.speed > 0){
				car.speed *= car.speedDecay;
			} else if (car.speed === 0){
				car.speed = -0.4;
			} else {
				car.speed *= car.backSpeed;
			}
		}
		if (Keys[Key.LEFT] && car.isMoving()){
			car.rotation -= car.rotationStep * (car.speed/car.maxSpeed);
		}
		if (Keys[Key.RIGHT] && car.isMoving()){
			car.rotation += car.rotationStep * (car.speed/car.maxSpeed);
		}

		var speedAxis = speedXY(car.rotation, car.speed);
		car.x += speedAxis.x;
		car.y += speedAxis.y;
	}
}

// Keyboard Variables
var Key = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};
var Keys = {
	38: false,
	40: false,
	37: false,
	39: false
};

// Keyboard event listeners
$(window).keydown(function(e){
	if (Keys[e.keyCode] !== 'undefined'){
		Keys[e.keyCode] = true;
		e.preventDefault();
	}
});
$(window).keyup(function(e){
	if (Keys[e.keyCode] !== 'undefined'){
		Keys[e.keyCode] = false;
		e.preventDefault();
	}
});

/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */
if ( !window.requestAnimationFrame ) {

    window.requestAnimationFrame = ( function() {

        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
            window.setTimeout( callback, 1000 / 60 );
        };

    }());

}

frame();


