/**
 * A hit map class for dynamically
 * checking whether an x/y coordinate
 * with an appropriate hit image
 *
 * @param {Image} img The hit map image
 */
function HitMap(img){
	var self = this;
	this.img = img;

	// only do the drawing once the
	// image has downloaded
	if (img.complete){
		this.draw();
	} else {
		img.onload = function(){
			self.draw();
		};
	}
}
HitMap.prototype = {
	draw: function(){
		// first create the canvas
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.img.width;
		this.canvas.height = this.img.height;
		this.context = this.canvas.getContext('2d');
		// draw the image on it
		this.context.drawImage(this.img, 0, 0);
	},
	isHit: function(x, y){
        if (this.context){
            // get the pixel RGBA values
            var pixel = this.context.getImageData(x, y, 1, 1);
            if (pixel){
                // we consider a hit if the Red
                // value is 0
                return pixel.data[0] === 0;
            } else {
                return false;
            }
        } else {
            return false;
        }
	}
};

function CollisionPoint (car, rotation, distance) {
	this.car = car;
	this.rotation = rotation;
	this.distance = distance || this.distance;
}
CollisionPoint.prototype = {
	car: null,
	rotation: 0,
	distance: 20,
	getXY: function(){
		return rotatePoint(
					this.car.getCenter(),
					this.car.rotation + this.rotation,
					this.distance
				);
	},
    isHit: function(hitMap){
        var xy = this.getXY();
        return hitMap.isHit(xy.x, xy.y);
    }
};

function CollisionRadius () {
}
CollisionRadius.prototype = {
	x: 0,
	y: 0,
	radius: 10,
	check: function(coords){
	}
};
