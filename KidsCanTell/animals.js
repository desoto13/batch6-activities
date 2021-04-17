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
    setTimeout(function(){
    speak_button.style.display = "block";
    status_display.style.display = "none";
    }, 3000);
    };

recognition.onerror = function(event) {
    message.textContent = 'Error occurred in recognition: ' + event.error;
    }        

speak_button.addEventListener('click', function(){
    recognition.start();
    speak_button.style.display = "none";
    status_display.innerText = "Speaking . . ."
    status_display.style.display = "block";
});

var arr_animals = [];
var animal_pics = document.getElementById("animalpics");

async function populateAnimals() {
    // const response_bird = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('http://shibe.online/api/birds?count=1&urls=true&httpsUrls=true')}`);
    // const response_cat = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('http://shibe.online/api/cats?count=1&urls=true&httpsUrls=true')}`);
    // const response_dog = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true')}`);

    // const obj_bird = await response_bird.json();
    // const obj_cat = await response_cat.json();
    // const obj_dog = await response_dog.json();

    const ant = {pic_url:"https://assets.weforum.org/article/image/iG2OW598YFc8CbNvjmHcMhYGzm4JwRAvPV7eUyUmT04.jpg", animal:"ant"};
    // const bird = {pic_url:JSON.parse(obj_bird.contents)[0], animal:"bird"};
    // const cat = {pic_url:JSON.parse(obj_cat.contents)[0], animal:"cat"};
    // const dog = {pic_url:JSON.parse(obj_dog.contents)[0], animal:"dog"};
    const elephant = {pic_url:"https://c402277.ssl.cf1.rackcdn.com/photos/14206/images/hero_small/WW187785.jpg?1576774644", animal:"elephant"};
    const fish = {pic_url:"https://i.gifer.com/RH88.gif", animal:"fish"};
    const horse = {pic_url:"https://i.gifer.com/XnXK.gif", animal:"horse"};
    const panda = {pic_url:"https://i.gifer.com/zq2.gif", animal:"panda"};
    const shark = {pic_url:"https://i.gifer.com/4qHp.gif", animal:"shark"};
    const tiger = {pic_url:"https://i.gifer.com/Z8Dq.gif", animal:"tiger"};

    arr_animals = [ant, elephant, fish, horse, panda, shark, tiger];
    animal_pics.src = arr_animals[0].pic_url;
    
}

populateAnimals();

var checker = document.getElementById("checker");
var endbtns = document.querySelector(".endbtns");
var title = document.getElementById("title");

function spokenAnswer(answer) {
    let current_animal = arr_animals.find(url => url.pic_url === animal_pics.src);
    let index_current_animal = arr_animals.findIndex(url => url.pic_url === animal_pics.src);
    status_display.innerText = "Processing . . ."
    
    if(current_animal.animal === answer && index_current_animal !== arr_animals.length-1){
        checker.innerText = "Correct! Please wait while we load the next animal";
        setTimeout(function(){
            checker.innerText = "";
            message.textContent = "You said:"
            animal_pics.src = arr_animals[index_current_animal + 1].pic_url;
        }, 3000);
    }
    else if(current_animal.animal === answer && index_current_animal === arr_animals.length-1){
        checker.innerText = "Correct! Please wait";
        setTimeout(function(){
            checker.innerText = "";
            message.textContent = "You said:"
            animal_pics.style.display="none";
            endbtns.style.display = "flex";
            speak_button.style.display = "none";
            title.innerText = "Congratulations! You finished the activity!"
        }, 3100);
    }
    else{
        checker.innerText = "Please Try Again";
    }
}

document.getElementById("again").addEventListener("click", function(){
    location.reload();
})

document.getElementById("homepage").addEventListener("click", function(){
    location.replace("index.html");
})

