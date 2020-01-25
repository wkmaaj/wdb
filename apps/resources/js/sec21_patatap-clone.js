var circles = new Array();
var radius = 70;
var useX = true;

// - create a paper.js Path (obj) to draw a line
var path = new Path();

var keyData = {
	a: {
		sound: new Howl({
			src: ['./resources/mp3/bubbles.mp3']
		})
	},
	s: {
		sound: new Howl({
			src: ['resources/mp3/clay.mp3']
		})
	},
	d: {
		sound: new Howl({
			src: ['resources/mp3/confetti.mp3']
		})
	},
	f: {
		sound: new Howl({
			src: ['resources/mp3/corona.mp3']
		})
	},
	g: {
		sound: new Howl({
			src: ['resources/mp3/flash-2.mp3']
		})
	},
	h: {
		sound: new Howl({
			src: ['resources/mp3/flash-3.mp3']
		})
	},
	j: {
		sound: new Howl({
			src: ['resources/mp3/glimmer.mp3']
		})
	},
	k: {
		sound: new Howl({
			src: ['resources/mp3/moon.mp3']
		})
	},
	l: {
		sound: new Howl({
			src: ['resources/mp3/pinwheel.mp3']
		})
	},
	q: {
		sound: new Howl({
			src: ['resources/mp3/zig-zag.mp3']
		})
	},
	w: {
		sound: new Howl({
			src: ['resources/mp3/wipe.mp3']
		})
	},
	e: {
		sound: new Howl({
			src: ['resources/mp3/veil.mp3']
		})
	},
	r: {
		sound: new Howl({
			src: ['resources/mp3/ufo.mp3']
		})
	},
	t: {
		sound: new Howl({
			src: ['resources/mp3/timer.mp3']
		})
	},
	y: {
		sound: new Howl({
			src: ['resources/mp3/suspension.mp3']
		})
	},
	u: {
		sound: new Howl({
			src: ['resources/mp3/strike.mp3']
		})
	},
	i: {
		sound: new Howl({
			src: ['resources/mp3/squiggle.mp3']
		})
	},
	o: {
		sound: new Howl({
			src: ['resources/mp3/splits.mp3']
		})
	},
	p: {
		sound: new Howl({
			src: ['resources/mp3/prism-1.mp3']
		})
	},
	z: {
		sound: new Howl({
			src: ['resources/mp3/prism-2.mp3']
		})
	},
	x: {
		sound: new Howl({
			src: ['resources/mp3/prism-3.mp3']
		})
	},
	c: {
		sound: new Howl({
			src: ['resources/mp3/piston-3.mp3']
		})
	},
	v: {
		sound: new Howl({
			src: ['resources/mp3/piston-2.mp3']
		})
	},
	b: {
		sound: new Howl({
			src: ['resources/mp3/piston-1.mp3']
		})
	},
	n: {
		sound: new Howl({
			src: ['resources/mp3/dotted-spiral.mp3']
		})
	},
	m: {
		sound: new Howl({
			src: ['resources/mp3/flash-1.mp3']
		})
	}
};

function onKeyDown(event) {
	var r = Math.floor((Math.random() * 255));
	var g = Math.floor((Math.random() * 255));
	var b = Math.floor((Math.random() * 255));

	var maxPnt = new Point(view.size.width, view.size.height);
	var rndPnt = Point.random();
	var pnt = maxPnt * rndPnt;

	var circle = new Path.Circle(pnt, radius);
	circle.fillColor = "rgb(" + r + ", " + g + ", " + b + ")";
	circles.push(circle);

	keyData[event.key].sound.play();
};

function onFrame(event) {
	if(circles.length !== 0) {
		for(var i=0; i<circles.length; i++) {
			circles[i].fillColor.hue += 1;
			circles[i].scale(0.9);
			if(circles[i].area < 1) {
				console.log("   -----   -----   ");
				console.log("before: " + circles);
				circles[i].remove();
				circles.splice(i, 1);
				console.log(circles);
			}
		}
	}
};