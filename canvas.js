	// hit the walls
	if (this.x + this.radius + this.dx > innerWidth || this.x - this.radius < 0)
		this.dx *= -1;

	// hit the floor
	if (this.y + this.radius + this.dy > canvas.height) {
		this.dy *= -this.friction;
		this.dx *= this.friction;
	}
	else {
		this.dy += gravity;
	}

	// add velocity to position and draw
	this.x += this.dx;
	this.y += this.dy;
	this.draw();
}

Circle.prototype.reset = function() {
	this.radius = Math.random() * 50 + 20;
	this.x = Math.random() * (canvas.width - 2 * this.radius) + this.radius;
	this.y = Math.random() * -Math.random() * 120 - 50;
	this.dx = (Math.random() * 10) - 5;
	this.dy = (Math.random() * 10) - 5;
	let r = Math.floor(Math.random() * 255);
	let g = Math.floor(Math.random() * 255);
	let b = Math.floor(Math.random() * 255);
 	this.color = "#" + r.toString(16) + b.toString(16) + g.toString(16);
}

Circle.prototype.energy = function() {
	return .5 * this.radius * this.dy * this.dy + this.radius * gravity * (canvas.height - this.y - this.radius);
}

var circles = [];
function setup() {
	for (let i = 0; i < 50; i++) {
		circle = new Circle(0, 0, 0, 0, 0, 'red');
		circle.reset();
		circles.push(circle)
	}
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < circles.length; i++) {
		circles[i].update();
		if (circles[i].energy() < 1)
			circles[i].reset(); 
	}
}

setup();
animate();