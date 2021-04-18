//Instruction Part
var refresh = document.getElementById("refresh");

refresh.addEventListener("click", function(){
    location.reload();
})

var homebtn = document.getElementById("homebtn");

homebtn.addEventListener("click",function(){
    location.replace("index.html")
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
    spokenAnswer(command);
    }

var status_display = document.getElementById("status");
var speak_button = document.getElementById('speakbtn');

recognition.onspeechend = function() {
    recognition.stop();
    speak_button.style.display = "block";
    status_display.style.display = "none";
    }

recognition.onerror = function(event) {
    message.textContent = 'Error occurred in recognition: ' + event.error;
    }        

speak_button.addEventListener('click', function(){
    recognition.start();
    speak_button.style.display = "none";
    status_display.style.display = "block";
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

//Array of Objects of colors
var colors = [{color:"red"},{color:"orange"},{color:"yellow"},{color:"green"},{color:"blue"},
                {color:"indigo"},{color:"violet"},{color:"brown"},{color:"white"}];


function spokenAnswer(answer){
    let substring = answer.split(" ");
    let two_words = `${substring[0]} ${substring[1]}`;

    let shape_chosen = shapes.filter(shape_obj => two_words.includes(shape_obj.shape));
    let color_chosen = colors.filter(color_obj => two_words.includes(color_obj.color));

    shape_chosen[0].container.style.backgroundColor = color_chosen[0].color;
}