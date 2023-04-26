var closeEscolher =0;
addEventListener("click", (event) => {
  let eventoReceber = event.target
  
let receber = document.getElementById("dropbtn_cat")


    if( eventoReceber === receber){
    }else{

      if(closeEscolher == 1){
        closeOption();
        
      }
      }
  closeEscolher=1;
});


function closeOption(){
  document.getElementById("myDropdown").classList.remove("show");
  closeEscolher=0;
}


function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
  closeEscolher =0;
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



function catFunction() {
  document.getElementById("catDropdown").classList.toggle("showcat");
  document.getElementById("dropart").classList.toggle("desc");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {

  if (!event.target.matches('.dropbtn_cat')) {
      var dropdowns = document.getElementsByClassName("part");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];

        if (openDropdown.classList.contains('desc')  ) {
          openDropdown.classList.remove('desc');
        }
      }
    }

  if (!event.target.matches('.dropbtn_cat')) {
    var dropdowns = document.getElementsByClassName("dropdown-content-two");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];

      if (openDropdown.classList.contains('showcat')  ) {
        openDropdown.classList.remove('showcat');
      }
    }
  }
}


