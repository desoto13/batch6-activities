//Instruction Part
var homebtn = document.getElementById("homebtn");

homebtn.addEventListener("click",function(){
    location.replace("index.html")
})

var refresh = document.getElementById("refresh");

refresh.addEventListener("click", function(){
    location.reload();
})

//Speech Recognition
var message = document.querySelector('#message');

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var grammar = '#JSGF V1.0;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;

recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var command = event.results[last][0].transcript;
    message.textContent = `You said: ${command}`;
    speak.style.display = "none";
    message.style.display = "block";
    setTimeout(function(){
        spokenAnswer(command);
        speak_button.classList.remove("redbg");
        message.style.display = "none";
        speak.style.display="flex";
    }, 3000); 
    }

var speak_button = document.getElementById('speakbtn');
var speak = document.querySelector(".speak-container");
var play = document.getElementById("play");

recognition.onspeechend = function() {
    recognition.stop();
    setTimeout(function(){
        speak_button.classList.remove("redbg");
        speak.style.display="flex";
    },3000)
    // status_display.style.display = "none";
    }

recognition.onerror = function(event) {
    message.textContent = 'Error occurred in recognition: ' + event.error;
    }        

speak_button.addEventListener('click', function(){
    recognition.start();
    speak_button.classList.add("redbg");
});

//Array of Objects of shapes
var circle = {container: document.getElementById("circle"), shape: "circle"};
var square = {container: document.getElementById("square"), shape: "square"};
var triangle = {container: document.getElementById("triangle"), shape: "triangle"};
var oval = {container: document.getElementById("oval"), shape: "oval"};
var rectangle = {container: document.getElementById("rectangle"), shape: "rectangle"};
var star = {container: document.getElementById("star"), shape: "star"};
var heart = {container: document.getElementById("heart"), shape: "heart"};
var diamond = {container: document.getElementById("diamond"), shape: "diamond"};

var shapes = [circle, square, triangle, oval, rectangle, star, heart, diamond];
var smoke = document.getElementById("smoke");

//Array of Objects of colors
var colors = [{color:"red", code:"#ff0000ff"},{color:"orange", code:"#ff9900ff"},{color:"yellow", code: "#ffff00ff"},{color:"green", code:"#6aa84fff"}
,{color:"blue", code:"#0073cfff"},{color:"indigo",code:"#4b0082ff"},{color:"violet",code:"#9400d3ff"},{color:"brown",code:"#964b00ff"}];

//COLOR
var r = document.getElementById("r");
var o = document.getElementById("o");
var y = document.getElementById("y");
var g = document.getElementById("g");
var b = document.getElementById("b");
var bg_music = new Audio("assets/bg.mp4");
bg_music.volume = 0.2;
if (typeof bg_music.loop == 'boolean')
{
    bg_music.loop = true;
}
else
{
    bg_music.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

play.addEventListener("click", function(){
    shapes.forEach(shape => shape.container.classList.remove("hidden"));
    speak.classList.remove("hidden");
    smoke.classList.remove("hidden");
    play.style.display = "none";
    speak.style.display = "flex";
    r.style.color = "#ff0000ff";
    o.style.color = "#ff9900ff";
    y.style.color = "#ffff00ff";
    g.style.color = "#6aa84fff";
    b.style.color = "#0073cfff";
    bg_music.play();
})

function spokenAnswer(answer){
    let substring = answer.split(" ");
    let two_words = `${substring[0]} ${substring[1]}`;

    let shape_chosen = shapes.find(shape_obj => two_words.includes(shape_obj.shape));
    let color_chosen = colors.find(color_obj => two_words.includes(color_obj.color));

    if(shape_chosen === undefined || color_chosen === undefined){
        return console.log("command not recognized");
    }

    shape_chosen.container.style.backgroundColor = color_chosen.code;
}