var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', function() {
    mouse.x = event.x;
    mouse.y = event.y;
});

/* Game Controllers:
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);


controller = {
    left: false,
    right: false,
    up: false,
    down: false,

    keyListener:function(event) {
        var key_state = (event.type == "keydown")?true:false;

        switch(event.keyCode) {
            case 37: //left key
                controller.left = key_state;
            break;
            case 38: //up key
                controller.up = key_state;
            break;
            case 39: //right key
                controller.right = key_state;
            break;
            case 40: //down key
                controller.down = key_state;
            break;
        }
    }
};
*/



var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 50;
var minRadius = 10
var numberOfCircles = 200;
var speed = 3;
var circleArray = [];

var colorArray = [
    '#253B59',
    '#BF5B04',
    '#F2E0D5',
    '#BF3604',
    '#D98484'
];

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

function Circle(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[(Math.floor(Math.random() * colorArray.length))];
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        c.fillStyle = this.color
        c.fill();   
        c.stroke();
    };

    this.update = function() {
        if (this.x + this.radius > canvas.width || this.x - this.radius <= 0 ) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius <= 0 ) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy

         /* Interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {            
        if (this.radius < maxRadius) {
        this.radius += 1;
        };                    
        }else if (this.radius > this.minRadius){
            this.radius -= 1;            
        };
*/
        this.draw();
    };
};


var wall;
function init() {
    
    circleArray = [];
    radius = 10;
    wall = new Circle(800, 450, radius, 0, 0);
    
    for (let index = 0; index < numberOfCircles; index++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var dx = (Math.random() - 0.5) * speed;
        var dy = (Math.random() - 0.5) * speed;
        let radius = (Math.random() * 10) + minRadius;    
        circleArray.push(new Circle(x, y, radius, dx, dy));
    };
};







function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    wall.update();
    for (let index = 0; index < circleArray.length; index++) {        
        circleArray[index].update();
        this.circle = circleArray[index]
            if (getDistance(this.circle.x, this.circle.y, wall.x, wall.y) < this.circle.radius + wall.radius) {
                wall.radius += this.circle.radius * 0.2;
                circleArray.splice(index, 1);
            }
    }

    
};
init();
animate();