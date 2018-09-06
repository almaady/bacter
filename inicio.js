// Ref canvas & context
const canvas = document.getElementById('inicio');
const ctx = canvas.getContext('2d');
// Set canvas width & height
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Variables
const colour = "#462446";
const maxParticles = 1000;
const rads = [0.25, 0.5, 0.75, 1, 1.25];
const particles = [];
let cx;
let cy;
// Tracking mouse position
canvas.addEventListener('mousemove', (e) => {
	cx = e.clientX;
	cy = e.clientY;
}, false);
// Particle class
class Particle {
	constructor(x, y, radius) {
		this.x = x;
		this.y = y;
		this.radius = radius;
	}
	move(cx, cy) {
		// Move particles
		this.x += Math.sin(this.y / 10) * Math.cos(this.y / 10);
		this.y += Math.sin(this.x / 10) * Math.cos(this.x / 10);

		if (this.x - cx > 0) {
			this.x += 0.5;
		}
		if (this.y - cy > 0) {
			this.y += 0.5;
		}
		if (this.x - cx < 0) {
			this.x -= 0.5;
		}
		if (this.x - cx < 0) {
			this.y -= 0.5;
		}

		if (this.x < 0 || this.x > width) {
			this.x = cx;
		}
		if (this.y < 0 || this.y > height) {
			this.y = cy;
		}

	}
	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = colour;
		ctx.fill();
	}
}
// Create particles & push to array
for (let i = 0; i < maxParticles; i++) {
	let p = new Particle(
		Math.floor(Math.random() * width),
		Math.floor(Math.random() * height),
		rads[Math.floor(Math.random() * rads.length)]
	);
	particles.push(p);
}
// Animation loop
function loop() {
	// Clear canvas
	ctx.clearRect(0, 0, width, height);
	// Draw & move particles
	for (let particle of particles) {
		particle.draw(ctx);
		particle.move(cx, cy);
	}
	// Animation frame
	requestAnimationFrame(loop);
}
// First call to loop
loop();

// Resize canvas - responsive
window.addEventListener('resize', resize);
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}


