// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}


// function myform(){
// }
// function Ack(){
  
//   var i = document.getElementsByClassName("onsubmit");
//   i.innerHTML = "Thanks for sharing your great idea and being so awesome !!! I will get back to you"
// }

//  const typed = select('.typed')
//   if (typed) {
//     let typed_strings = typed.getAttribute('data-typed-items')
//     typed_strings = typed_strings.split(',')
//     new Typed('.typed', {
//       strings: typed_strings,
//       loop: true,
//       typeSpeed: 100,
//       backSpeed: 50,
//       backDelay: 2000
//     });
//   }