var synth = window.speechSynthesis;
synth.cancel();

var story_content = document.getElementById("content");
story_content.value = "I think that I shall never see\
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

var voices = [];
var arr_voices = [];

function ChooseVoices(){
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = ChooseVoices;
    }
    voices = synth.getVoices();
    arr_voices = voices.filter(voice => voice.lang === "en-US" || voice.lang === "en-GB");
}

ChooseVoices();

function Speak() {
    synth.cancel();
    if(story_content.value !== ""){
        //Get speak text
        const read_story = new SpeechSynthesisUtterance(story_content.value);

        //Hide the tell story button and display the stop story button
        tell_story.style.display = "none";
        stop_story.style.display = "block";

        //Speak end
        read_story.onend = function(){
            tell_story.style.display = "block";
            stop_story.style.display = "none";
        }

        //Speak error
        read_story.error = function(){
            console.error('Something went wrong');
        }

        //Random english voice selector
        arr_voices.sort(() => Math.random() - 0.5);
        read_story.voice = arr_voices[0];
        console.log(arr_voices[0])

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
    tell_story.style.display = "block";
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