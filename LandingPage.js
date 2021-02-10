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

// Plays Video
document.getElementById('video').play()


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

