
var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

//settings
var backgroundColor = "#000000";

//space for global variables. You may need some :)
var angle = document.getElementById("angle").value;
var width = document.getElementById("length").value;
var recursion = document.getElementById("recursion").value;

//implement your drawing here.
function draw(){
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("JavaScript Pythagoras Tree", 0, 15); 
    ctx.font = "10px Arial";
    ctx.fillText("Depth: " + recursion, 0, 40); 
    ctx.fillText("Angle: " + angle, 0, 30); 
    ctx.fillText("Size: " + width, 0, 50); 
    ctx.translate((canvas.width / 2) - width / 2, canvas.height - 100);
    drawTree(recursion, width, angle);
}

function drawTree(j, width, angle){
    
    if(j <= 0){
        return;
    }

    if(document.getElementById("colors").value == 1){
        var gradient = ctx.createLinearGradient(0, 0, 800, 800);
        gradient.addColorStop("0", rainbow(recursion,j));
        gradient.addColorStop("1", rainbow(recursion,j));
        ctx.strokeStyle = gradient;
    }else{
        ctx.strokeStyle = "#FFFFFF";
    }

    ctx.beginPath();
    ctx.rect(0, 0, width, -width);
    ctx.stroke();
    
    var alpha = angle;
    var beta = 90 - angle;
    var w1 = Math.cos(alpha * (Math.PI / 180)) * width;
    var w2 = Math.cos(beta * (Math.PI / 180)) * width;
    var h = Math.sin(beta * (Math.PI / 180)) * w2;
    var x = Math.sqrt(Math.pow(w1,2)-Math.pow(h,2));
    var b = (Math.asin(h/w2) / Math.PI) * 180;

    ctx.save();
    ctx.translate(0,-width);
    ctx.rotate(-angle * (Math.PI / 180));
    drawTree(j - 1, w1, angle);
    ctx.restore();

    ctx.save();
    ctx.translate(x,-width -h);
    ctx.rotate(b * (Math.PI / 180));
    drawTree(j - 1, w2, angle);
    ctx.restore();
    
}

//calculate, sort, or do whatever you want here
function update(){
    angle = document.getElementById("angle").value;
    width = document.getElementById("length").value;
    recursion = document.getElementById("recursion").value;
}

//clear the canvas
function clear(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//if the user changes the size of the window we have do recalculate
function resizeCanvas(){
    canvas.width = window.innerWidth - 20;
    //let us keep this sixteen by nine
    canvas.height = ((window.innerWidth) / 16) * 9;
}

//let us call the function once at the start to get the user's canvas size
resizeCanvas();

window.addEventListener('resize', resizeCanvas);

//this block will call the function clear, update, and draw all the time
function loop() {
    clear();
    update();
    draw();
    window.requestAnimationFrame(loop)
}
window.requestAnimationFrame(loop)
