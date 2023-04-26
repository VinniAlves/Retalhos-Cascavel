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

function importPushSelect(){
  var capo_escolha = document.getElementById("Capo_select");
  capo_escolha.addEventListener('click',localStoreEvent());

  var porta_escolha = document.getElementById("Portas_select");
  porta_escolha.addEventListener('click',localStoreEvent());

  var Ttraseira_escolha = document.getElementById("Tampa_Traseira_select");
  Ttraseira_escolha.addEventListener('click',localStoreEvent());

  var paralamas_escolha = document.getElementById("Paralamas_select");
  paralamas_escolha.addEventListener('click',localStoreEvent());

  var parachoque_escolha = document.getElementById("Parachoque_select");
  parachoque_escolha.addEventListener('click',localStoreEvent());

  var lateral_escolha = document.getElementById("Lateral_select");
  lateral_escolha.addEventListener('click',localStoreEvent());

  var Pdianteiro_escolha = document.getElementById("Painel_Dianteiro_select");
  Pdianteiro_escolha.addEventListener('click',localStoreEvent());

  var Ptraseiro_escolha = document.getElementById("Painel_Traseiro_select");
  Ptraseiro_escolha.addEventListener('click',localStoreEvent());

    
}
function localStoreEvent(){

  var getEventSelect = event.target;
  localStorage.setItem('EventSmartphone',getEventSelect.id);
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
