var stories = document.getElementById("stories");
var animals = document.getElementById("animals");
var shapes = document.getElementById("shapes");
var e4 = new Audio("assets/e4.mp3");
var f4 = new Audio("assets/f4.mp3");
var g4 = new Audio("assets/g4.mp3");

stories.addEventListener("mouseenter", function(){
    e4.play();
})

animals.addEventListener("mouseenter", function(){
    f4.play();
})

shapes.addEventListener("mouseenter", function(){
    g4.play();
})

stories.addEventListener("click", function(){
   location.replace("stories.html");
})

animals.addEventListener("click", function(){
    location.replace("animals.html")
})

shapes.addEventListener("click", function(){
    location.replace("shapes.html")
})