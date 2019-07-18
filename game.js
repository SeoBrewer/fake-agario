var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = 300;
canvas.style.top = "200px";
canvas.style.position = "absolute";

var c = canvas.getContext('2d');

c.rect(100, 100, 20, 20)
c.stroke()