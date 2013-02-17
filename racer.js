/*global Car,TO_RADIANS,drawRotatedImage */

var canvas   = document.getElementById('canvas'),
	context  = canvas.getContext('2d'),
	ctxW     = canvas.width,
	ctxH     = canvas.height,
	player   = new Car(),
	track    = new Image(),
	trackHit = new Image(),

	elPX     = document.getElementById('px'),
	elPY     = document.getElementById('py')
;

track.src = "track.png";
trackHit.src = "track-hit.png";

// Keyboard Variables
var key = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

var keys = {
	38: false,
	40: false,
	37: false,
	39: false
};


function speedXY (rotation, speed) {
	return {
		x: Math.sin(rotation * TO_RADIANS) * speed,
		y: Math.cos(rotation * TO_RADIANS) * speed * -1,
	};
}

var x=10,y=10;
function draw (car) {
	context.clearRect(0,0,ctxW,ctxH);
	context.drawImage(track, 0, 0);
	drawRotatedImage(car.img, car.x, car.y, car.rotation);
	drawPoint(car.collisions.top.getXY());
	drawPoint(car.collisions.right.getXY());
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
		if (keys[key.UP])  { car.accelerate(); }
		if (keys[key.DOWN]){ car.decelerate(); }
		if (keys[key.LEFT]){ car.steerLeft(); }
		if (keys[key.RIGHT]){car.steerRight(); }

		var speedAxis = speedXY(car.rotation, car.speed);
		car.x += speedAxis.x;
		car.y += speedAxis.y;

		// info
		elPX.innerHTML = Math.floor(car.x);
		elPY.innerHTML = Math.floor(car.y);
	}
}

// Keyboard event listeners
$(window).keydown(function(e){
	if (keys[e.keyCode] !== 'undefined'){
		keys[e.keyCode] = true;
		// e.preventDefault();
	}
});
$(window).keyup(function(e){
	if (keys[e.keyCode] !== 'undefined'){
		keys[e.keyCode] = false;
		// e.preventDefault();
	}
});

function frame () {
	step(player);
	draw(player);
	window.requestAnimationFrame(frame);
}

frame();


