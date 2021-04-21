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
    speak_button.style.display = "none";
    message.innerText = `You said,\n\n "${command}"`;
    setTimeout(function(){
        spokenAnswer(command);
    }, 3000); 
    }

// var status_display = document.getElementById("status");
var speak_button = document.querySelector('.speak-container');
var play_now =  document.getElementById("play");
var speak_img = document.getElementById("speakbtn");

recognition.onspeechend = function() {
    recognition.stop();
    setTimeout(function(){
        speak_img.classList.remove("redbg");
        speak_button.addEventListener('click', recording);
    }, 3000);
    };

recognition.onerror = function(event) {
    message.textContent = 'Error occurred in recognition: ' + event.error;
    }    
    
play_now.addEventListener("click", function(){
    play_now.style.display = "none";
    speak_button.style.display = "flex";
    populateAnimals();
})

speak_button.addEventListener('click', recording);

function recording(){
    recognition.start();
    speak_img.classList.add("redbg");
    speak_button.removeEventListener('click', recording);
}

//Populate the pictures of animals
var arr_animals = [];
var animal_pics = document.getElementById("animalpics");

async function populateAnimals() {
    const response_bird = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('http://shibe.online/api/birds?count=1&urls=true&httpsUrls=true')}`);
    const obj_bird = await response_bird.json();

    const bird = {pic_url:JSON.parse(obj_bird.contents)[0], animal:"bird", trivia:"This animal’s feather weighs more than its skeleton.\n\nWhat is this feathered animal?"};
    const crocodile = {pic_url:"https://www.stockland.com.au/~/media/shopping-centre/common/everyday-ideas/kids/crocodile/0518_stocklandnational_crocodiles_900x6753.ashx", animal:"crocodile", trivia: "This is a reptile.\nMost live in fresh water rivers and lakes but some live in salt water.\n\nCan you identify this animal?"};
    const elephant = {pic_url:"https://akamaividz2.zee5.com/image/upload/w_1170,h_658,c_scale,f_auto,q_auto/resources/0-0-newsauto_6ebkm2tjg3u0/list/unnamed_1517768988.jpg", animal:"elephant", trivia: "This is the world’s largest land animal.\n\nDo you know what this huge mammal is?"};
    const fish = {pic_url:"https://api.time.com/wp-content/uploads/2019/11/fish-with-human-face-tik-tok-video.jpg?quality=85&w=1024&h=512&crop=1", animal:"fish", trivia: "They can live in high mountain streams, rivers, lakes, and all the way down to the bottom of the ocean.\n\nWhat are these cold-blooded animals?"};
    const horse = {pic_url:"https://seaofmaryam.files.wordpress.com/2021/01/b9e3984b-56de-448a-96e1-227f49e6ba9a-49017-000010a274d980ec_file.jpg?w=3865", animal:"horse", trivia: "“Equine” is another word for this animal; that’s why people involved with them are called “equestrians.”\n\nDo you know what this beautiful animal is?"};
    const monkey = {pic_url:"https://media.giphy.com/media/JrTCZg7iCvlwwPMnZX/giphy.gif", animal:"monkey", trivia: "This is a highly intelligent animal. Some of them live on the ground while others live in trees.\n\nWhat is this clever animal?"}
    const panda = {pic_url:"https://media.giphy.com/media/bMSMRrBm9vLfa/giphy.gif", animal:"panda", trivia:"They spend a lot of their day eating, around 10-16 hours mainly feeding on bamboo.\n\nDo you know this cute animal?"};
    const shark = {pic_url:"https://media.giphy.com/media/5wFxuxzDacm4aEUJNY/giphy.gif", animal:"shark", trivia:"This animal never ever runs out of teeth. It has between 5 to 15 rows of teeth arranged in layers.\n\nWhat is this toothy animal?"};
    const tiger = {pic_url:"https://media.giphy.com/media/3o6Zt9fiqF4N4VrFok/giphy.gif", animal:"tiger", trivia: "This animal is a carnivore, which means it only eats meat.\n\nCan you identify this striped animal?"};
    const zebra = {pic_url:"https://media.giphy.com/media/frMawWBxD6OUuJXSSY/giphy.gif", animal:"zebra", trivia:"This is a black animal with white stripes. A group of this animal is called a “dazzle.”\n\nWhat is this cool-looking animal?"}
    const end = {pic_url:"assets/done.png", animal:"end", trivia:"end"};

    arr_animals = [bird, crocodile, elephant, fish, horse, monkey, panda, shark, tiger, zebra, end];
    animal_pics.src = arr_animals[0].pic_url;
    message.innerText = arr_animals[0].trivia;
}

var arr_correct = ["You got it!\n\nCan you guess the next one?", "You’re right!\nWOW! You’re awesome.\n\nI wonder what the next one is.",
                    "That’s correct!\nYou’re doing great!\n\nLet’s see the next animal."]

var end_btns = document.getElementById("end-containers");

//processing the words spoken
function spokenAnswer(answer) {
    let current_animal = arr_animals.find(url => url.pic_url === animal_pics.src);
    let index_current_animal = arr_animals.findIndex(url => url.pic_url === animal_pics.src);
    let correct_ans = arr_correct.sort(() => Math.random() - 0.5);
    
    if(current_animal === undefined){
        message.innerText = "Uh-oh! That’s incorrect.\n\nDon’t worry, you can always try again."
        setTimeout(function(){
            message.innerText = arr_animals[index_current_animal].trivia;
            speak_button.style.display = "flex";
        }, 3000);
    }
    else if(current_animal.animal === answer && index_current_animal !== arr_animals.length-2){
        message.innerText = correct_ans[0];
        setTimeout(function(){
            animal_pics.src = arr_animals[index_current_animal + 1].pic_url;
            message.innerText = arr_animals[index_current_animal + 1].trivia;
            speak_button.style.display = "flex";
        }, 3000);
    }
    else if(current_animal.animal === answer && index_current_animal === arr_animals.length-2){
        animal_pics.src = arr_animals[index_current_animal + 1].pic_url;
        message.innerText = "VERY GOOD!\nYou got all 10 animals!\n\nDo you wanna play again?";
        end_btns.style.display = "flex";
    }
    else{
        message.innerText = "Uh-oh! That’s incorrect.\n\nDon’t worry, you can always try again.";
        setTimeout(function(){
            message.innerText = arr_animals[index_current_animal].trivia;
            speak_button.style.display = "flex";
        }, 3000);
    }
}

document.getElementById("again").addEventListener("click", function(){
    location.reload();
})

document.getElementById("homepage").addEventListener("click", function(){
    location.replace("index.html");
})

