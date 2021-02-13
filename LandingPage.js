// Sticky Navbar
window.onscroll = function() {myFunction()};
var navbar = document.getElementById("navheader");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

//Disable Right Click on Video
document.querySelector("video").addEventListener("contextmenu", (event) => {
  event.preventDefault();
});


// Toggle Mute Button
var vid = document.getElementById("video");
var offsound = document.getElementById("mute");
var onsound = document.getElementById("unmute"); 

function enableMute() {
  
    if (vid.muted == true) {
      vid.muted = false;
      offsound.classList.toggle("hidden")
      onsound.classList.toggle("block")
    } 
    else {
      vid.muted = true;
      offsound.classList.toggle("hidden")
      onsound.classList.toggle("block")
    } 
  
}





// Appear onscroll animation

  // const appear = querySelectorAll('.animate');
  // const appearOptions = {};
  // const appearOnScroll = new IntersectionObserver (function(entries,appearOnScroll) {
  //   entries.forEach(entry => {
  //     if (!entry.isIntersecting) {
  //       return;
  //     } else {
  //       entry.target.classList.add("show");
  //       appearOnScroll.unobserve(entry.target);
  //     }
  //     })
  // }, appearOptions)

  // appear.forEach(appearitem => {
  //   appearOnScroll.observe(appearitem);
  // })


// Pics and Text Slideshow on first page
// var picIndex = 0;
// var textIndex = 0;
// showSlides();
// showTexts();

// function showSlides() {
//     var i;
//     var pics = document.getElementsByClassName("firm");
//     for (i = 0; i < pics.length; i++) {
//     pics[i].style.display = "none";
//   }
    
//   picIndex++;
//   if (picIndex > pics.length) {picIndex = 1}    
//   pics[picIndex-1].style.display = "block";  
//   setTimeout(showSlides, 5000);
// }

// function showTexts() {
//     var i;
//     var texts = document.getElementsByClassName("titletext");
//     for (i = 0; i < texts.length; i++) {
//         texts[i].style.display = "none";    
//     }
//     textIndex++;
//     if (textIndex > texts.length) {textIndex = 1}
//     texts[textIndex-1].style.display = "block";
//     setTimeout(showTexts, 5000);
// }

