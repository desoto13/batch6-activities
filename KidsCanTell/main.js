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
    message.textContent = 'Voice Input: ' + command + '.';
    }

recognition.onspeechend = function() {
    recognition.stop();
    };

recognition.onerror = function(event) {
    message.textContent = 'Error occurred in recognition: ' + event.error;
    }        

document.querySelector('#btnGiveCommand').addEventListener('click', function(){
    recognition.start();
});

async function getDog() {
    const response = await fetch("https://cors-anywhere.herokuapp.com/http://shibe.online/api/cats?count=3&urls=true&httpsUrls=true");
    const picture = await response.json();
    console.log(picture);
}

getDog();