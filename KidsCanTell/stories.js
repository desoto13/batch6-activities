var synth = window.speechSynthesis;
synth.cancel();

var story_content = document.getElementById("content");
story_content.value = "I think that I shall never see,\
\nA poem lovely as a tree.\
\nA tree whose hungry mouth is prest\
\nAgainst the earth's sweet flowing breast;\
\nA tree that looks at God all day,\
\nAnd lifts her leafy arms to pray;\
\nA tree that may in Summer wear\
\nA nest of robins in her hair;\
\nUpon whose bosom snow has lain;\
\nWho intimately lives with rain.\
\nPoems are made by fools like me,\
\nBut only God can make a tree."


var tell_story = document.getElementById("tell-story");
var stop_story = document.getElementById("stop");
var voiceSelect = document.getElementById("voice-select");
var speedSelect = document.getElementById("rate");
var dashBoard = document.querySelector(".char-container")

var voices = [];
var arr_voices = [];

function ChooseVoices(){
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = ChooseVoices;
    }

    voices = synth.getVoices();
    arr_voices = voices.filter(voice => voice.lang === "en-US" || voice.lang === "en-GB");

    if(arr_voices.length !== 0){
        arr_voices.forEach(voice => {
            const option = document.createElement('option');
        // Fill option with voice and language
        option.textContent = voice.name;
        voiceSelect.appendChild(option);
        })
    }
}

ChooseVoices();

function Speak() {
    synth.cancel();
    if(story_content.value !== ""){
        //Get speak text
        const read_story = new SpeechSynthesisUtterance(story_content.value);

        //Hide the tell story button and display the stop story button
        dashBoard.style.display = "none";
        stop_story.style.display = "block";

        //Speak end
        read_story.onend = function(){
            dashBoard.style.display = "flex";
            stop_story.style.display = "none";
        }

        //Speak error
        read_story.error = function(){
            console.error('Something went wrong');
        }

        //Choosing the voice
        const selectedVoice = arr_voices.find(voice => voice.name === voiceSelect.value)
        read_story.voice = selectedVoice;

        //Choosing the speed
        read_story.rate = speedSelect.value;

        //Speak
        synth.speak(read_story);
        let resumeInfinity = function() {
            synth.pause();
            synth.resume();
            timeoutResumeInfinity = setTimeout(resumeInfinity, 10000);
        }
        resumeInfinity();
    }
}

tell_story.addEventListener("click", function(e){
    e.preventDefault();
    Speak();
    story_content.blur();
});

stop_story.addEventListener("click", function(){
    dashBoard.style.display = "flex";
    stop_story.style.display = "none";
    synth.cancel();
})

var refresh = document.getElementById("refresh");

refresh.addEventListener("click", function(){
    location.reload();
})

var homebtn = document.getElementById("homebtn");

homebtn.addEventListener("click",function(){
    location.replace("index.html")
})

var speedLabel = document.getElementById("speed-value")

speedSelect.addEventListener("input", function(){
    speedLabel.innerText = speedSelect.value;
})