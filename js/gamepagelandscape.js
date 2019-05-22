
var slideIndex = 1;
showDivs(slideIndex);


function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
    if(slideIndex === 1) {
        console.log('soccer');
        localStorage.setItem('userSport', 'Soccer')
    }
    if(slideIndex === 2) {
        console.log('tennis');
        localStorage.setItem('userSport', 'Tennis');
    }
    if(slideIndex === 3) {
        console.log('basketball');
        localStorage.setItem('userSport', 'Basketball');
    }
    
    console.log(localStorage.getItem('userSport'));
}




