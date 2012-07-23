
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

function rotatePoint (coords, angle, distance) {
	return {
		x: Math.sin(angle * TO_RADIANS) * distance + coords.x,
		y: Math.cos(angle * TO_RADIANS) * distance * -1 + coords.y,
	};
}

function drawPoint (xy) {
	context.fillRect(xy.x,xy.y,1,1);
}

function distance (from, to) {
	var a = from.x > to.x ? from.x - to.x : to.x - from.x,
		b = from.y > to.y ? from.y - to.y : to.y - from.y
		;
	return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}

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

