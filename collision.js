
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
