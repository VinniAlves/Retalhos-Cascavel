
import { initializeApp } from
"https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from 
"https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";

import firebaseConfig from "../JS/21aqmq5v.e5a.js"

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

import { getStorage,ref as sRef , uploadBytesResumable, getDownloadURL }
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js"

import {getDatabase,ref,get,set , child,update,remove,onValue}
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"

import { getAuth, signInWithEmailAndPassword} 
from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js'


const auth = getAuth(app);

const dados_escritos= getDatabase();

var Salvar_id =1;
var Amarzenador_id;
/*======================================= */

    var receber_num;

function btn_solic(){   


    var receber;
    receber = event.target.className;
    
    receber_num = receber;
    
            var recebimento = document.getElementById(receber);
            
            if(receber  == recebimento.id){
                
            var desabilita = document.getElementById('Display_Catalogo');
            desabilita.style.display="none";

            var desabilita_catalogo = document.getElementById('Catalogo_Tipos');
        desabilita_catalogo.style.display = "none";

            var habilita = document.getElementById(receber);
            habilita.style.display="block";
            window.scrollTo(0, 0);
            }

}

function voltar(){
    for(var i=0; i < Amarzenador_id; i++){
        
        var desabilita= document.getElementById(receber_num)
        desabilita.style.display = "none";

        
        var habilita_catalogo = document.getElementById('Catalogo_Tipos');
        habilita_catalogo.style.display = "block";

        var habilita = document.getElementById('Display_Catalogo')
       
        habilita.style.display= "block";
        window.scrollTo(0, 0);
         
        
    }   
}   
/*========================================================= */
if(firebaseConfig){
    window.onload = SetLocalPrimerioAcesso();
}
    var ReceberHorarioSalvo;
    function SetLocalPrimerioAcesso(){
       if(localStorage.getItem('PrimeiroAcesso')===null){
        let ReceberHorarioAtual = new Date();
        localStorage.setItem('PrimeiroAcesso', ReceberHorarioAtual)
        localStorage.setItem('DataBase','');
            Iniciar_Busc_dados()
       }else{

       ReceberHorarioSalvo = localStorage.getItem('PrimeiroAcesso');
            DatePushRequisitionTime();
       }
             
    }

    function DatePushRequisitionTime(){
        var HorarioAtual = new Date();
      

        // Testador =======================
      // HorarioAtual.setHours(HorarioAtual.getHours()+3)
        //==================================

        var ReceberHorarioSalvoConvertido = new Date (ReceberHorarioSalvo);
        var CountDiferenca = new Date(HorarioAtual - ReceberHorarioSalvoConvertido);
        var CountResult = CountDiferenca.getUTCHours();

        if(CountResult >= 3){
            localStorage.setItem('PrimeiroAcesso',HorarioAtual)
            Iniciar_Busc_dados()
        }else{
          eventAcionador();
        }
    
    }

/*========================================================= */


var data_Base;
var incializador_catalogo;
function Iniciar_Busc_dados(){
    const dbref = ref(dados_escritos);
    get(child(dbref,"Pecas_Salvas/"))
    .then( (snaphot)=>{
        if(snaphot.exists()){
         data_Base = snaphot.val()
         localStorage.setItem("DataBase",JSON.stringify(data_Base));
         for_loop();      
        }
        else{
            alert("Dados não Encontrados")
        }
    })
    .catch((error)=>{
        alert("Falha ao buscar, erro:"+ error);
    })

}


/*========================================================= */


var capo_escolha = document.getElementById("Catalogo_Capo_Options");
capo_escolha.addEventListener('click',for_loop);

var porta_escolha = document.getElementById("Catalogo_Porta_Options");
porta_escolha.addEventListener('click',for_loop);

var Ttraseira_escolha = document.getElementById("Catalogo_Tampa_Traseira_Options");
Ttraseira_escolha.addEventListener('click',for_loop);

var paralamas_escolha = document.getElementById("Catalogo_Paralamas_Options");
paralamas_escolha.addEventListener('click',for_loop);

var parachoque_escolha = document.getElementById("Catalogo_Parachoque_Options");
parachoque_escolha.addEventListener('click',for_loop);

var lateral_escolha = document.getElementById("Catalogo_Laterais_Options");
lateral_escolha.addEventListener('click',for_loop);

var Pdianteiro_escolha = document.getElementById("Catalogo_Painel_Dianteiro_Options");
Pdianteiro_escolha.addEventListener('click',for_loop);

var Ptraseiro_escolha = document.getElementById("Catalogo_Painel_Traseiro_Options");
Ptraseiro_escolha.addEventListener('click',for_loop);

var Voltar_escolha = document.getElementById("Voltar_Catalogo");
Voltar_escolha.addEventListener('click',for_loop);



function eventAcionador(){
let element;

if (localStorage.getItem('EventSmartphone')!==null){
var SmartSelect = localStorage.getItem('EventSmartphone');
    if(SmartSelect =="Capo_select"){
        element= document.getElementById("Catalogo_Capo_Options");
    }else if(SmartSelect =="Portas_select"){
        element= document.getElementById("Catalogo_Porta_Options");
    }else if(SmartSelect =="Tampa_Traseira_select"){
        element= document.getElementById("Catalogo_Tampa_Traseira_Options");
    }else if(SmartSelect == "Paralamas_select"){
        element =document.getElementById("Catalogo_Paralamas_Options");
    }else if(SmartSelect == "Parachoque_select"){
        element= document.getElementById("Catalogo_Parachoque_Options");
    }else if(SmartSelect == "Lateral_select"){
        element= document.getElementById("Catalogo_Laterais_Options");
    }else if(SmartSelect == "Painel_Dianteiro_select"){
        element= document.getElementById("Catalogo_Painel_Dianteiro_Options");
    }else if(SmartSelect == "Painel_Traseiro_select"){
        element= document.getElementById("Catalogo_Painel_Traseiro_Options");
    }

    localStorage.removeItem('EventSmartphone');
}else{
    element = document.getElementById("Voltar_Catalogo");
}

const event = new Event('click');
element.addEventListener('click',for_loop);
element.dispatchEvent(event);
}
 

var capo_escolha = document.getElementById("Capo_select");
capo_escolha.addEventListener('click',for_loop);

var capo_escolha = document.getElementById("Porta_select");
capo_escolha.addEventListener('click',for_loop);

var capo_escolha = document.getElementById("Tampa_Traseira_select");
capo_escolha.addEventListener('click',for_loop);

var capo_escolha = document.getElementById("Paralamas_select");
capo_escolha.addEventListener('click',for_loop);

var capo_escolha = document.getElementById("Parachoque_select");
capo_escolha.addEventListener('click',for_loop);

var capo_escolha = document.getElementById("Lateral_select");
capo_escolha.addEventListener('click',for_loop);

var capo_escolha = document.getElementById("Painel_Dianteiro_select");
capo_escolha.addEventListener('click',for_loop);

var capo_escolha = document.getElementById("Painel_Traseiro_select");
capo_escolha.addEventListener('click',for_loop);







/* =========Criar o catalogo========== */


var Container_Display_Catalogo 

/* =======Função de Retorno===========*/
var estado_valor =0;
function for_loop(){

    var RecebimentoDados = localStorage.getItem('DataBase');
    data_Base = JSON.parse(RecebimentoDados);

    const dbref = ref(dados_escritos);

    var NomePecas = document.getElementById("nome_pecas");
    var CodigoPecas = document.getElementById("codigo_pecas");
    var ImgPecas = document.getElementById("img_primario_catalogo");

    var Menu_NomePecas = document.getElementById("Nome_Pecas_Menu");
    var Menu_TipoPecas = document.getElementById("Tipo_Pecas_Menu");
    var Menu_CodigoPecas = document.getElementById("Menu_Codigo_Pecas");
    var Menu_MarcaPecas = document.getElementById("Menu_Marca_Pecas");
    var Menu_ML = document.getElementById("Menu_Ml_Button");
    var Menu_a = document.getElementById("a_ml");
    var Menu_ImgPecas = document.getElementById("Menu_Img");
    

    if(estado_valor == 0 ){
    var todos_escolha ="All";
    estado_valor =1;
    }else {
        todos_escolha="";
    }
  var escolha= event.target;
    
//=================================


    var remover_element = document.getElementById("Container_Catalogo"); 
    

    if(typeof Container_Display_Catalogo == 'undefined'){
        
    }else{ 
        remover_element.parentNode.removeChild(remover_element);
    }

    
    Container_Display_Catalogo = document.createElement("div");
    Container_Display_Catalogo.id="Container_Catalogo";
    Display_Catalogo.appendChild(Container_Display_Catalogo);
    
   var id_recebimento_armazenamento = 0;


       //CAPO
   // if(escolha.value == "Capo" || escolha.value == "All"){
        if(escolha.value == "Capo_select" || escolha.id == "Capo_select"  || escolha.id == "All" || escolha.value == "All" || todos_escolha == "All"){
        if(escolha.value == "Capo_select" || escolha.id == "Capo_select" ){
            var remover_element = document.getElementById("Container_Catalogo"); 
            remover_element.parentNode.removeChild(remover_element);


            Container_Display_Catalogo = document.createElement("div");
            Container_Display_Catalogo.id="Container_Catalogo";
            Display_Catalogo.appendChild(Container_Display_Catalogo);

            id_recebimento_armazenamento = 1;
        }

            


        var capo_loop = Object.keys(data_Base.Capo).length
        var arr = Object.keys(data_Base.Capo)
        
        for(var i = 0; i< capo_loop;i++){

        let catalogo_primario = document.createElement("div")
        
        catalogo_primario.id= "Card_Catalogo-"+ data_Base.Capo[arr[i]].Id;
        catalogo_primario.className = "Container_Card";
        catalogo_primario.style=`
        display: inline-block;
        position: relative;
        border: 1px solid rgb(255,0,0);
        height:350px;
        width: 300px;

        margin-left: 50px;
        margin-top:30px;

        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        text-align: center;
        `
       // Display_Catalogo.appendChild(catalogo_primario)
        Container_Display_Catalogo.appendChild(catalogo_primario)

        let div_id_salvamento_catalogo = document.createElement("div");
        div_id_salvamento_catalogo.id= "Btn_Id_Selc_"+data_Base.Capo[arr[i]].Id;
        div_id_salvamento_catalogo.textContent= data_Base.Capo[arr[i]].Id;
        div_id_salvamento_catalogo.style=`display:none;`;
        catalogo_primario.appendChild(div_id_salvamento_catalogo);

        let catalogo_primario_div_img = document.createElement("div")
        catalogo_primario_div_img.className = "Border";
        catalogo_primario_div_img.id="Border_id"
        catalogo_primario_div_img.style=`
        position: absolute;
        height: 200px;
        width: 200px;
        border: 1px solid black;
        left: 55px;
        top:16px;
        `
        catalogo_primario.appendChild(catalogo_primario_div_img)
        

        let catalogo_primario_img =  document.createElement("img")
        catalogo_primario_img.id = "img_primario_catalogo";
        catalogo_primario_img.className = "img_primario_catalogo";
       // catalogo_primario_img.width="200";
        catalogo_primario_img.style=`
        display: inline-block;
        position: relative;
        top:0px;
        text-align: center;
        max-width: 200px;
            max-height: 200px;
            width: auto;
            height: auto;
        `
        catalogo_primario_div_img.appendChild(catalogo_primario_img);

        let text_catalogo_nome = document.createElement("label")
        text_catalogo_nome.id = "nome_pecas";
        text_catalogo_nome.className="nome_pecas";
        text_catalogo_nome.style=`
        position: absolute;
        text-align: center;
        top:230px;
        left: 35px;
        `
        catalogo_primario.appendChild(text_catalogo_nome)

        let text_catalogo_codigo = document.createElement("label")
        text_catalogo_codigo.id = "codigo_pecas";
        text_catalogo_codigo.className="codigo_pecas";
        text_catalogo_codigo.style=`
        position: relative;
        text-align: center;
        top:270px;
        left:-77px;
        `
        catalogo_primario.appendChild(text_catalogo_codigo)
        
        let button_catalogo = document.createElement('button')
        button_catalogo.id="btn_solicitar";
        button_catalogo.className= data_Base.Capo[arr[i]].Id;
        button_catalogo.textContent="Solicite um Orçamento";
        button_catalogo.onclick = function(){
            btn_solic(event)
        }
        button_catalogo.style=`
        position: relative;
        border: 1px;
        background-color: rgb(190,69,69); 
        height: 35px;   
        width: 100%;
        top:288px;

        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 0.9em;
        line-height: 27px;
        color:white;
        cursor: pointer;
        `
        catalogo_primario.appendChild(button_catalogo)
    

    /* ======== Segunda menu interno =========== */


        let menu_container = document.createElement('div');
        menu_container.id = data_Base.Capo[arr[i]].Id
        menu_container.className= "Menu_Container";
        menu_container.style=`
        display: none;
        position: relative;
        top:215px;
        width: 800px;
        height: 500px;
        text-align: center;
        margin: 0 auto;

        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        text-align: center;
        `
        Display_Menu.appendChild(menu_container);
        //Container_Display_Catalogo.appendChild(menu_container);

        let div_id_salvamento_menu = document.createElement("div");
        div_id_salvamento_menu.id= "btn_id_";
        //div_id_salvamento_menu.textContent = Salvar_id;
        div_id_salvamento_menu.style=`display:none;`
        menu_container.appendChild(div_id_salvamento_menu);

        let menu_border = document.createElement('div');
        menu_border.className = "Menu_Border";
        menu_border.style=`
        
        height: 250px;
        width: 350px;
        left: 140px;
        border: 1px solid black;
        top:150px;
        `
        menu_container.appendChild(menu_border);

        //TESTES ===============================
        let Container_text = document.createElement('div');
        Container_text.className="Container_Text";
        menu_container.appendChild(Container_text);

        //TESTES ===============================

        let menu_img = document.createElement('img');
        menu_img.id = "Menu_Img";
        menu_img.className = "Menu_Img";
        //menu_img.width="200";
        menu_img.style=`
        position: relative;
        top:0px;
        text-align: center;
        max-width: 350px;
        max-height: 250px;
        width: auto;
        height: auto;
        `
        menu_img.src="Retalhos_Cascavel_PNG-1.png";
        menu_border.appendChild(menu_img);
        
        let menu_nome_pecas = document.createElement('label');
        menu_nome_pecas.id= "Nome_Pecas_Menu";
        menu_nome_pecas.className = "Nome_Pecas_Menu";
        menu_nome_pecas.style=`
        position: absolute;
        top:150px;
        left: 515px;
        `
        
        menu_container.appendChild(menu_nome_pecas);
       // Container_text.appendChild(menu_nome_pecas);

        let menu_tipo_pecas = document.createElement('label');
        menu_tipo_pecas.id="Tipo_Pecas_Menu";
        menu_tipo_pecas.className="Tipo_Pecas_Menu";
        menu_tipo_pecas.style=`
        position: absolute;
        top:190px;
        left: 515px;
        `;
        
        menu_container.appendChild(menu_tipo_pecas);
      // Container_text.appendChild(menu_tipo_pecas);

        let menu_codigo_pecas = document.createElement('labal');
        menu_codigo_pecas.id="Menu_Codigo_Pecas";
        menu_codigo_pecas.className="Menu_Codigo_Pecas";
        menu_codigo_pecas.style=`
        position: absolute;
        top:230px;
        left: 515px;
        `
        menu_container.appendChild(menu_codigo_pecas);
        //Container_text.appendChild(menu_codigo_pecas);

        let menu_marca_pecas = document.createElement('label');
        menu_marca_pecas.id="Menu_Marca_Pecas";
        menu_marca_pecas.className="Menu_Marca_Pecas";
        menu_marca_pecas.style=`
        position: absolute;
        top:270px;
        left: 515px;
        `
        
        menu_container.appendChild(menu_marca_pecas);
        //Container_text.appendChild(menu_marca_pecas);

        let a_btn_ml = document.createElement("a");
        a_btn_ml.id="a_ml";
        menu_container.appendChild(a_btn_ml);

        let menu_ml_button = document.createElement('button');
        menu_ml_button.id="Menu_Ml_Button";
        menu_ml_button.className="Menu_Ml_Button";
        menu_ml_button.textContent="Mercado Livre"
        menu_ml_button.style=`
        position: absolute;
        top:324px;
        left: 510px;

        border: 0px;
        background-color: rgb(255,231,0);
        height: 35px;
        border-radius: 10px;

        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        cursor: pointer;
        `
        a_btn_ml.appendChild(menu_ml_button);

        let menu_voltar = document.createElement('button');
        menu_voltar.id="Menu_Voltar";
        menu_voltar.className="Menu_Voltar";
        menu_voltar.textContent="Voltar Catalogo";
        menu_voltar.onclick = function(){
            voltar()
        }
        menu_voltar.style=`
        position: absolute;
        top:390px;
        left: 510px;

        border: 0px;
        background-color: rgb(190,69,69);
        height: 35px;
        border-radius: 10px;
        color:white;

        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        cursor: pointer;
        `
        menu_container.appendChild(menu_voltar);

            
                NomePecas = data_Base.Capo[arr[i]].Nome_Pecas 
                text_catalogo_nome.textContent = NomePecas;

                CodigoPecas = data_Base.Capo[arr[i]].Codigo_pecas;
                text_catalogo_codigo.textContent = CodigoPecas;

                ImgPecas = data_Base.Capo[arr[i]].ImgURL
                catalogo_primario_img.src = ImgPecas;

                // MENU
                Menu_NomePecas = data_Base.Capo[arr[i]].Nome_Pecas;
                menu_nome_pecas.textContent = Menu_NomePecas;

                Menu_TipoPecas = data_Base.Capo[arr[i]].Tipo_Pecas;
                menu_tipo_pecas.textContent = Menu_TipoPecas;

                Menu_CodigoPecas = data_Base.Capo[arr[i]].Codigo_pecas;
                menu_codigo_pecas.textContent = Menu_CodigoPecas;

                Menu_MarcaPecas = data_Base.Capo[arr[i]].Marca;
                menu_marca_pecas.textContent = Menu_MarcaPecas;

                Menu_a = data_Base.Capo[arr[i]].Link_ML;
                a_btn_ml.href = Menu_a;

                Menu_ImgPecas   = data_Base.Capo[arr[i]].ImgURL;
                menu_img.src = Menu_ImgPecas;
            
            
        }
       
    }


       //PORTA      
    //if(escolha.value == "Porta" || escolha.value == "All"){
        if(escolha.value == "Porta_select" || escolha.id == "Porta_select"|| escolha.id == "All" || escolha.value == "All" || todos_escolha == "All"){   
        if(escolha.value == "Porta_select" || escolha.id == "Porta_select"){
            var remover_element = document.getElementById("Container_Catalogo"); 
            remover_element.parentNode.removeChild(remover_element);


            Container_Display_Catalogo = document.createElement("div");
            Container_Display_Catalogo.id="Container_Catalogo";
            Display_Catalogo.appendChild(Container_Display_Catalogo);
            id_recebimento_armazenamento = 2;
        }


       var porta_loop = Object.keys(data_Base.Porta).length
       var arr = Object.keys(data_Base.Porta)
   
       for(var i=0;i< porta_loop;i++){
           
           
   
            let catalogo_primario = document.createElement("div")
    
            catalogo_primario.id= "Card_Catalogo-"+ data_Base.Porta[arr[i]].Id;
            catalogo_primario.className = "Container_Card";
            catalogo_primario.style=`
            display: inline-block;
            position: relative;
            border: 1px solid rgb(255,0,0);
            height:350px;
            width: 300px;
            top:0px;
            margin-left: 50px;
            margin-top:30px;
        
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 400px;
            font-size: 1em;
            line-height: 27px;
            text-align: center;
            `
           // Display_Catalogo.appendChild(catalogo_primario)
           Container_Display_Catalogo.appendChild(catalogo_primario)
            let div_id_salvamento_catalogo = document.createElement("div");
            div_id_salvamento_catalogo.id= "Btn_Id_Selc_"+data_Base.Porta[arr[i]].Id;
            div_id_salvamento_catalogo.textContent= data_Base.Porta[arr[i]].Id;
            div_id_salvamento_catalogo.style=`display:none;`;
            catalogo_primario.appendChild(div_id_salvamento_catalogo);
        
            let catalogo_primario_div_img = document.createElement("div")
            catalogo_primario_div_img.className = "Border";
            catalogo_primario_div_img.id="Border_id"
            catalogo_primario_div_img.style=`
            position: absolute;
            height: 200px;
            width: 200px;
            border: 1px solid black;
            left: 55px;
            top:16px;
            `
            catalogo_primario.appendChild(catalogo_primario_div_img)
            
            //max-width: 350px;
            //max-height: 262px;
            let catalogo_primario_img =  document.createElement("img")
            catalogo_primario_img.id = "img_primario_catalogo";
            catalogo_primario_img.className = "img_primario_catalogo";
            //catalogo_primario_img.width="200";
            catalogo_primario_img.style=`
            display: inline-block;
            position: relative;
            top:0px;
            text-align: center;
           
            max-width: 200px;
            max-height: 200px;
            width: auto;
            height: auto;
            `
            catalogo_primario_div_img.appendChild(catalogo_primario_img);
        
            let text_catalogo_nome = document.createElement("label")
            text_catalogo_nome.id = "nome_pecas";
            text_catalogo_nome.className="nome_pecas";
            text_catalogo_nome.style=`
            position: absolute;
            text-align: center;
            top:230px;
            left: 35px;
            `
            catalogo_primario.appendChild(text_catalogo_nome)
        
            let text_catalogo_codigo = document.createElement("label")
            text_catalogo_codigo.id = "codigo_pecas";
            text_catalogo_codigo.className="codigo_pecas";
            text_catalogo_codigo.style=`
            position: relative;
            text-align: center;
            top:270px;
            left:-77px;
            `
            catalogo_primario.appendChild(text_catalogo_codigo)
            
            let button_catalogo = document.createElement('button')
            button_catalogo.id="btn_solicitar";
            button_catalogo.className= data_Base.Porta[arr[i]].Id;
            button_catalogo.textContent="Solicite um Orçamento";
            button_catalogo.onclick = function(){
                btn_solic(event)
            }
            button_catalogo.style=`
            position: relative;
            border: 1px;
            background-color: rgb(190,69,69); 
            height: 35px;   
            width: 100%;
            top:288px;
        
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 400px;
            font-size: 0.9em;
            line-height: 27px;
            color:white;
            cursor: pointer;
            `
            catalogo_primario.appendChild(button_catalogo)
           
        
        /* ======== Segunda menu interno =========== */
        
        
            let menu_container = document.createElement('div');
            menu_container.id = data_Base.Porta[arr[i]].Id//"Menu_Container_"+ Salvar_id;
            menu_container.className= "Menu_Container";
            menu_container.style=`
            display: none;
            position: relative;
            top:215px;
            width: 800px;
            height: 500px;
            text-align: center;
            margin: 0 auto;
        
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 400px;
            font-size: 1em;
            line-height: 27px;
            text-align: center;
            `
            Display_Menu.appendChild(menu_container);
        
            let div_id_salvamento_menu = document.createElement("div");
            div_id_salvamento_menu.id= "btn_id_";
            //div_id_salvamento_menu.textContent = Salvar_id;
            div_id_salvamento_menu.style=`display:none;`
            menu_container.appendChild(div_id_salvamento_menu);
        
            let menu_border = document.createElement('div');
            menu_border.className = "Menu_Border";
            menu_border.style=`
            
            height: 250px;
            width: 350px;
            left: 140px;
            border: 1px solid black;
            top:150px;
            `
            menu_container.appendChild(menu_border);
        
            let menu_img = document.createElement('img');
            menu_img.id = "Menu_Img";
            menu_img.className = "Menu_Img";
           // menu_img.width="200";
            menu_img.style=`
            position: relative;
            top:0px;
            text-align: center;
            max-width: 350px;
            max-height: 250px;
            width: auto;
            height: auto;
            `
            menu_img.src="Retalhos_Cascavel_PNG-1.png";
            menu_border.appendChild(menu_img);
            
            let menu_nome_pecas = document.createElement('label');
            menu_nome_pecas.id= "Nome_Pecas_Menu";
            menu_nome_pecas.className = "Nome_Pecas_Menu";
            menu_nome_pecas.style=`
            position: absolute;
            top:150px;
            left: 515px;
            `
            //menu_nome_pecas.textContent="Paralamas";
            menu_container.appendChild(menu_nome_pecas);
        
            let menu_tipo_pecas = document.createElement('label');
            menu_tipo_pecas.id="Tipo_Pecas_Menu";
             menu_tipo_pecas.className="Tipo_Pecas_Menu";
            menu_tipo_pecas.style=`
            position: absolute;
            top:190px;
            left: 515px;
            `;
            //menu_tipo_pecas.textContent="Lateral Esquerda"
            menu_container.appendChild(menu_tipo_pecas);
        
            let menu_codigo_pecas = document.createElement('labal');
            menu_codigo_pecas.id="Menu_Codigo_Pecas";
            menu_codigo_pecas.className="Menu_Codigo_Pecas";
            menu_codigo_pecas.style=`
            position: absolute;
            top:230px;
            left: 515px;
            `
            //menu_codigo_pecas.textContent="888888"
            menu_container.appendChild(menu_codigo_pecas);
        
            let menu_marca_pecas = document.createElement('label');
            menu_marca_pecas.id="Menu_Marca_Pecas";
            menu_marca_pecas.className="Menu_Marca_Pecas";
            menu_marca_pecas.style=`
            position: absolute;
            top:270px;
            left: 515px;
            `
            //menu_marca_pecas.textContent="Volvo-mercedes"
            menu_container.appendChild(menu_marca_pecas);
        
            let a_btn_ml = document.createElement("a");
            a_btn_ml.id="a_ml";
            menu_container.appendChild(a_btn_ml);
        
            let menu_ml_button = document.createElement('button');
            menu_ml_button.id="Menu_Ml_Button";
            menu_ml_button.className="Menu_Ml_Button";
            menu_ml_button.textContent="Mercado Livre"
            menu_ml_button.style=`
            position: absolute;
            top:324px;
            left: 510px;
        
            border: 0px;
            background-color: rgb(255,231,0);
            height: 35px;
            border-radius: 10px;
        
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 400px;
            font-size: 1em;
            line-height: 27px;
            cursor: pointer;
            `
            a_btn_ml.appendChild(menu_ml_button);
        
            let menu_voltar = document.createElement('button');
            menu_voltar.id="Menu_Voltar";
            menu_voltar.className="Menu_Voltar";
            menu_voltar.textContent="Voltar Catalogo";
            menu_voltar.onclick = function(){
                voltar()
            }
            menu_voltar.style=`
            position: absolute;
            top:390px;
            left: 510px;
        
            border: 0px;
            background-color: rgb(190,69,69);
            height: 35px;
            border-radius: 10px;
            color:white;
        
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 400px;
            font-size: 1em;
            line-height: 27px;
            cursor: pointer;
            `
            menu_container.appendChild(menu_voltar);
        
                
                    NomePecas = data_Base.Porta[arr[i]].Nome_Pecas 
                    text_catalogo_nome.textContent = NomePecas;
        
                    CodigoPecas = data_Base.Porta[arr[i]].Codigo_pecas;
                    text_catalogo_codigo.textContent = CodigoPecas;
        
                    ImgPecas = data_Base.Porta[arr[i]].ImgURL
                    catalogo_primario_img.src = ImgPecas;
        
                    // MENU
                    Menu_NomePecas = data_Base.Porta[arr[i]].Nome_Pecas;
                    menu_nome_pecas.textContent = Menu_NomePecas;
        
                    Menu_TipoPecas = data_Base.Porta[arr[i]].Tipo_Pecas;
                    menu_tipo_pecas.textContent = Menu_TipoPecas;
        
                    Menu_CodigoPecas = data_Base.Porta[arr[i]].Codigo_pecas;
                    menu_codigo_pecas.textContent = Menu_CodigoPecas;
        
                    Menu_MarcaPecas = data_Base.Porta[arr[i]].Marca;
                    menu_marca_pecas.textContent = Menu_MarcaPecas;
        
                    Menu_a = data_Base.Porta[arr[i]].Link_ML;
                    a_btn_ml.href = Menu_a;
        
                    Menu_ImgPecas   = data_Base.Porta[arr[i]].ImgURL;
                    menu_img.src = Menu_ImgPecas;
           
       }
    }
   
       //LATERAL
    //if(escolha.value == "Lateral" ||escolha.value == "All" ){
        if(escolha.value == "Lateral_select" ||escolha.id == "Lateral_select" ||escolha.id == "All" || escolha.value == "All" || todos_escolha == "All"){
        if(escolha.value == "TLateral_select" ||escolha.id == "Lateral_select"){
            var remover_element = document.getElementById("Container_Catalogo"); 
            remover_element.parentNode.removeChild(remover_element);


            Container_Display_Catalogo = document.createElement("div");
            Container_Display_Catalogo.id="Container_Catalogo";
            Display_Catalogo.appendChild(Container_Display_Catalogo);
            id_recebimento_armazenamento = 3;
        }

       var lateral_loop = Object.keys(data_Base.Lateral).length
       var arr = Object.keys(data_Base.Lateral)
       for(var i=0;i< lateral_loop;i++){

        let catalogo_primario = document.createElement("div")
    
        catalogo_primario.id= "Card_Catalogo-"+ data_Base.Lateral[arr[i]].Id;
        catalogo_primario.className = "Container_Card";
        catalogo_primario.style=`
        display: inline-block;
        position: relative;
        border: 1px solid rgb(255,0,0);
        height:350px;
        width: 300px;
        top:0px;
        margin-left: 50px;
        margin-top:30px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        text-align: center;
        `
        //Display_Catalogo.appendChild(catalogo_primario)
        Container_Display_Catalogo.appendChild(catalogo_primario)
        let div_id_salvamento_catalogo = document.createElement("div");
        div_id_salvamento_catalogo.id= "Btn_Id_Selc_"+data_Base.Lateral[arr[i]].Id;
        div_id_salvamento_catalogo.textContent= data_Base.Lateral[arr[i]].Id;
        div_id_salvamento_catalogo.style=`display:none;`;
        catalogo_primario.appendChild(div_id_salvamento_catalogo);
    
        let catalogo_primario_div_img = document.createElement("div")
        catalogo_primario_div_img.className = "Border";
        catalogo_primario_div_img.id="Border_id"
        catalogo_primario_div_img.style=`
        position: absolute;
        height: 200px;
        width: 200px;
        border: 1px solid black;
        left: 55px;
        top:16px;
        `
        catalogo_primario.appendChild(catalogo_primario_div_img)
        
    
        let catalogo_primario_img =  document.createElement("img")
        catalogo_primario_img.id = "img_primario_catalogo";
        catalogo_primario_img.className = "img_primario_catalogo";
        //catalogo_primario_img.width="200";
        catalogo_primario_img.style=`
        display: inline-block;
        position: relative;
        top:0px;
        text-align: center;
        max-width: 200px;
            max-height: 200px;
            width: auto;
            height: auto;
        `
        catalogo_primario_div_img.appendChild(catalogo_primario_img);
    
        let text_catalogo_nome = document.createElement("label")
        text_catalogo_nome.id = "nome_pecas";
        text_catalogo_nome.className="nome_pecas";
        text_catalogo_nome.style=`
        position: absolute;
        text-align: center;
        top:230px;
        left: 35px;
        `
        catalogo_primario.appendChild(text_catalogo_nome)
    
        let text_catalogo_codigo = document.createElement("label")
        text_catalogo_codigo.id = "codigo_pecas";
        text_catalogo_codigo.className="codigo_pecas";
        text_catalogo_codigo.style=`
        position: relative;
        text-align: center;
        top:270px;
        left:-77px;
        `
        catalogo_primario.appendChild(text_catalogo_codigo)
        
        let button_catalogo = document.createElement('button')
        button_catalogo.id="btn_solicitar";
        button_catalogo.className= data_Base.Lateral[arr[i]].Id;
        button_catalogo.textContent="Solicite um Orçamento";
        button_catalogo.onclick = function(){
            btn_solic(event)
        }
        button_catalogo.style=`
        position: relative;
        border: 1px;
        background-color: rgb(190,69,69); 
        height: 35px;   
        width: 100%;
        top:288px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 0.9em;
        line-height: 27px;
        color:white;
        cursor: pointer;
        `
        catalogo_primario.appendChild(button_catalogo)
       
    
    /* ======== Segunda menu interno =========== */
    
    
        let menu_container = document.createElement('div');
        menu_container.id = data_Base.Lateral[arr[i]].Id//"Menu_Container_"+ Salvar_id;
        menu_container.className= "Menu_Container";
        menu_container.style=`
        display: none;
        position: relative;
        top:215px;
        width: 800px;
        height: 500px;
        text-align: center;
        margin: 0 auto;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        text-align: center;
        `
        Display_Menu.appendChild(menu_container);
    
        let div_id_salvamento_menu = document.createElement("div");
        div_id_salvamento_menu.id= "btn_id_";
        //div_id_salvamento_menu.textContent = Salvar_id;
        div_id_salvamento_menu.style=`display:none;`
        menu_container.appendChild(div_id_salvamento_menu);
    
        let menu_border = document.createElement('div');
        menu_border.className = "Menu_Border";
        menu_border.style=`
        
        height: 250px;
        width: 350px;
        left: 140px;
        border: 1px solid black;
        top:150px;
        `
        menu_container.appendChild(menu_border);
    
        let menu_img = document.createElement('img');
        menu_img.id = "Menu_Img";
        menu_img.className = "Menu_Img";
       // menu_img.width="200";
        menu_img.style=`
        position: relative;
        top:0px;
        text-align: center;
        max-width: 350px;
        max-height: 250px;
        width: auto;
        height: auto;
        `
        menu_img.src="Retalhos_Cascavel_PNG-1.png";
        menu_border.appendChild(menu_img);
        
        let menu_nome_pecas = document.createElement('label');
        menu_nome_pecas.id= "Nome_Pecas_Menu";
        menu_nome_pecas.className = "Nome_Pecas_Menu";
        menu_nome_pecas.style=`
        position: absolute;
        top:150px;
        left: 515px;
        `
        //menu_nome_pecas.textContent="Paralamas";
        menu_container.appendChild(menu_nome_pecas);
    
        let menu_tipo_pecas = document.createElement('label');
        menu_tipo_pecas.id="Tipo_Pecas_Menu";
         menu_tipo_pecas.className="Tipo_Pecas_Menu";
        menu_tipo_pecas.style=`
        position: absolute;
        top:190px;
        left: 515px;
        `;
        //menu_tipo_pecas.textContent="Lateral Esquerda"
        menu_container.appendChild(menu_tipo_pecas);
    
        let menu_codigo_pecas = document.createElement('labal');
        menu_codigo_pecas.id="Menu_Codigo_Pecas";
        menu_codigo_pecas.className="Menu_Codigo_Pecas";
        menu_codigo_pecas.style=`
        position: absolute;
        top:230px;
        left: 515px;
        `
        //menu_codigo_pecas.textContent="888888"
        menu_container.appendChild(menu_codigo_pecas);
    
        let menu_marca_pecas = document.createElement('label');
        menu_marca_pecas.id="Menu_Marca_Pecas";
        menu_marca_pecas.className="Menu_Marca_Pecas";
        menu_marca_pecas.style=`
        position: absolute;
        top:270px;
        left: 515px;
        `
        //menu_marca_pecas.textContent="Volvo-mercedes"
        menu_container.appendChild(menu_marca_pecas);
    
        let a_btn_ml = document.createElement("a");
        a_btn_ml.id="a_ml";
        menu_container.appendChild(a_btn_ml);
    
        let menu_ml_button = document.createElement('button');
        menu_ml_button.id="Menu_Ml_Button";
        menu_ml_button.className="Menu_Ml_Button";
        menu_ml_button.textContent="Mercado Livre"
        menu_ml_button.style=`
        position: absolute;
        top:324px;
        left: 510px;
    
        border: 0px;
        background-color: rgb(255,231,0);
        height: 35px;
        border-radius: 10px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        cursor: pointer;
        `
        a_btn_ml.appendChild(menu_ml_button);
    
        let menu_voltar = document.createElement('button');
        menu_voltar.id="Menu_Voltar";
        menu_voltar.className="Menu_Voltar";
        menu_voltar.textContent="Voltar Catalogo";
        menu_voltar.onclick = function(){
            voltar()
        }
        menu_voltar.style=`
        position: absolute;
        top:390px;
        left: 510px;
    
        border: 0px;
        background-color: rgb(190,69,69);
        height: 35px;
        border-radius: 10px;
        color:white;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        cursor: pointer;
        `
        menu_container.appendChild(menu_voltar);
    
            
                NomePecas = data_Base.Lateral[arr[i]].Nome_Pecas 
                text_catalogo_nome.textContent = NomePecas;
    
                CodigoPecas = data_Base.Lateral[arr[i]].Codigo_pecas;
                text_catalogo_codigo.textContent = CodigoPecas;
    
                ImgPecas = data_Base.Lateral[arr[i]].ImgURL
                catalogo_primario_img.src = ImgPecas;
    
                // MENU
                Menu_NomePecas = data_Base.Lateral[arr[i]].Nome_Pecas;
                menu_nome_pecas.textContent = Menu_NomePecas;
    
                Menu_TipoPecas = data_Base.Lateral[arr[i]].Tipo_Pecas;
                menu_tipo_pecas.textContent = Menu_TipoPecas;
    
                Menu_CodigoPecas = data_Base.Lateral[arr[i]].Codigo_pecas;
                menu_codigo_pecas.textContent = Menu_CodigoPecas;
    
                Menu_MarcaPecas = data_Base.Lateral[arr[i]].Marca;
                menu_marca_pecas.textContent = Menu_MarcaPecas;
    
                Menu_a = data_Base.Lateral[arr[i]].Link_ML;
                a_btn_ml.href = Menu_a;
    
                Menu_ImgPecas   = data_Base.Lateral[arr[i]].ImgURL;
                menu_img.src = Menu_ImgPecas; 
   
           
       }
    }
   
       //PAINEL TRASEIRO
   // if(escolha.value == "Painel_Traseiro" || escolha.value == "All"){
        if(escolha.value == "Painel_Traseiro_select" || escolha.id == "Painel_Traseiro_select"|| escolha.id == "All" || escolha.value == "All" || todos_escolha == "All"){  
        if(escolha.value == "Painel_Traseiro_select" || escolha.id == "Painel_Traseiro_select"){
            var remover_element = document.getElementById("Container_Catalogo"); 
            remover_element.parentNode.removeChild(remover_element);


            Container_Display_Catalogo = document.createElement("div");
            Container_Display_Catalogo.id="Container_Catalogo";
            Display_Catalogo.appendChild(Container_Display_Catalogo);
            id_recebimento_armazenamento = 4;
        }

       var painel_tra_loop = Object.keys(data_Base.Painel_Traseiro).length
       var arr = Object.keys(data_Base.Painel_Traseiro)
       for(var i=0;i<painel_tra_loop;i++){
        let catalogo_primario = document.createElement("div")
    
        catalogo_primario.id= "Card_Catalogo-"+ data_Base.Painel_Traseiro[arr[i]].Id;
        catalogo_primario.className = "Container_Card";
        catalogo_primario.style=`
        display: inline-block;
        position: relative;
        border: 1px solid rgb(255,0,0);
        height:350px;
        width: 300px;
        top:0px;
        margin-left: 50px;
        margin-top:30px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        text-align: center;
        `
        //Display_Catalogo.appendChild(catalogo_primario)
        Container_Display_Catalogo.appendChild(catalogo_primario)
        let div_id_salvamento_catalogo = document.createElement("div");
        div_id_salvamento_catalogo.id= "Btn_Id_Selc_"+data_Base.Painel_Traseiro[arr[i]].Id;
        div_id_salvamento_catalogo.textContent= data_Base.Painel_Traseiro[arr[i]].Id;
        div_id_salvamento_catalogo.style=`display:none;`;
        catalogo_primario.appendChild(div_id_salvamento_catalogo);
    
        let catalogo_primario_div_img = document.createElement("div")
        catalogo_primario_div_img.className = "Border";
        catalogo_primario_div_img.id="Border_id"
        catalogo_primario_div_img.style=`
        position: absolute;
        height: 200px;
        width: 200px;
        border: 1px solid black;
        left: 55px;
        top:16px;
        `
        catalogo_primario.appendChild(catalogo_primario_div_img)
        
    
        let catalogo_primario_img =  document.createElement("img")
        catalogo_primario_img.id = "img_primario_catalogo";
        catalogo_primario_img.className = "img_primario_catalogo";
        catalogo_primario_img.width="200";
        catalogo_primario_img.style=`
        display: inline-block;
        position: relative;
        top:0px;
        text-align: center;
        max-width: 200px;
            max-height: 200px;
            width: auto;
            height: auto;
        `
        catalogo_primario_div_img.appendChild(catalogo_primario_img);
    
        let text_catalogo_nome = document.createElement("label")
        text_catalogo_nome.id = "nome_pecas";
        text_catalogo_nome.className="nome_pecas";
        text_catalogo_nome.style=`
        position: absolute;
        text-align: center;
        top:230px;
        left: 35px;
        `
        catalogo_primario.appendChild(text_catalogo_nome)
    
        let text_catalogo_codigo = document.createElement("label")
        text_catalogo_codigo.id = "codigo_pecas";
        text_catalogo_codigo.className="codigo_pecas";
        text_catalogo_codigo.style=`
        position: relative;
        text-align: center;
        top:270px;
        left:-77px;
        `
        catalogo_primario.appendChild(text_catalogo_codigo)
        
        let button_catalogo = document.createElement('button')
        button_catalogo.id="btn_solicitar";
        button_catalogo.className= data_Base.Painel_Traseiro[arr[i]].Id;
        button_catalogo.textContent="Solicite um Orçamento";
        button_catalogo.onclick = function(){
            btn_solic(event)
        }
        button_catalogo.style=`
        position: relative;
        border: 1px;
        background-color: rgb(190,69,69); 
        height: 35px;   
        width: 100%;
        top:288px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 0.9em;
        line-height: 27px;
        color:white;
        cursor: pointer;
        `
        catalogo_primario.appendChild(button_catalogo)
       
    
    /* ======== Segunda menu interno =========== */
    
    
        let menu_container = document.createElement('div');
        menu_container.id = data_Base.Painel_Traseiro[arr[i]].Id//"Menu_Container_"+ Salvar_id;
        menu_container.className= "Menu_Container";
        menu_container.style=`
        display: none;
        position: relative;
        top:215px;
        width: 800px;
        height: 500px;
        text-align: center;
        margin: 0 auto;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        text-align: center;
        `
        Display_Menu.appendChild(menu_container);
    
        let div_id_salvamento_menu = document.createElement("div");
        div_id_salvamento_menu.id= "btn_id_";
        //div_id_salvamento_menu.textContent = Salvar_id;
        div_id_salvamento_menu.style=`display:none;`
        menu_container.appendChild(div_id_salvamento_menu);
    
        let menu_border = document.createElement('div');
        menu_border.className = "Menu_Border";
        menu_border.style=`
        
        height: 250px;
        width: 350px;
        left: 140px;
        border: 1px solid black;
        top:150px;
        `
        menu_container.appendChild(menu_border);
    
        let menu_img = document.createElement('img');
        menu_img.id = "Menu_Img";
        menu_img.className = "Menu_Img";
       // menu_img.width="200";
        menu_img.style=`
        position: relative;
        top:0px;
        text-align: center;
        max-width: 350px;
        max-height: 250px;
        width: auto;
        height: auto;
        `
        menu_img.src="Retalhos_Cascavel_PNG-1.png";
        menu_border.appendChild(menu_img);
        
        let menu_nome_pecas = document.createElement('label');
        menu_nome_pecas.id= "Nome_Pecas_Menu";
        menu_nome_pecas.className = "Nome_Pecas_Menu";
        menu_nome_pecas.style=`
        position: absolute;
        top:150px;
        left: 515px;
        `
        //menu_nome_pecas.textContent="Paralamas";
        menu_container.appendChild(menu_nome_pecas);
    
        let menu_tipo_pecas = document.createElement('label');
        menu_tipo_pecas.id="Tipo_Pecas_Menu";
         menu_tipo_pecas.className="Tipo_Pecas_Menu";
        menu_tipo_pecas.style=`
        position: absolute;
        top:190px;
        left: 515px;
        `;
        //menu_tipo_pecas.textContent="Lateral Esquerda"
        menu_container.appendChild(menu_tipo_pecas);
    
        let menu_codigo_pecas = document.createElement('labal');
        menu_codigo_pecas.id="Menu_Codigo_Pecas";
        menu_codigo_pecas.className="Menu_Codigo_Pecas";
        menu_codigo_pecas.style=`
        position: absolute;
        top:230px;
        left: 515px;
        `
        //menu_codigo_pecas.textContent="888888"
        menu_container.appendChild(menu_codigo_pecas);
    
        let menu_marca_pecas = document.createElement('label');
        menu_marca_pecas.id="Menu_Marca_Pecas";
        menu_marca_pecas.className="Menu_Marca_Pecas";
        menu_marca_pecas.style=`
        position: absolute;
        top:270px;
        left: 515px;
        `
        //menu_marca_pecas.textContent="Volvo-mercedes"
        menu_container.appendChild(menu_marca_pecas);
    
        let a_btn_ml = document.createElement("a");
        a_btn_ml.id="a_ml";
        menu_container.appendChild(a_btn_ml);
    
        let menu_ml_button = document.createElement('button');
        menu_ml_button.id="Menu_Ml_Button";
        menu_ml_button.className="Menu_Ml_Button";
        menu_ml_button.textContent="Mercado Livre"
        menu_ml_button.style=`
        position: absolute;
        top:324px;
        left: 510px;
    
        border: 0px;
        background-color: rgb(255,231,0);
        height: 35px;
        border-radius: 10px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        cursor: pointer;
        `
        a_btn_ml.appendChild(menu_ml_button);
    
        let menu_voltar = document.createElement('button');
        menu_voltar.id="Menu_Voltar";
        menu_voltar.className="Menu_Voltar";
        menu_voltar.textContent="Voltar Catalogo";
        menu_voltar.onclick = function(){
            voltar()
        }
        menu_voltar.style=`
        position: absolute;
        top:390px;
        left: 510px;
    
        border: 0px;
        background-color: rgb(190,69,69);
        height: 35px;
        border-radius: 10px;
        color:white;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        cursor: pointer;
        `
        menu_container.appendChild(menu_voltar);
    
            
                NomePecas = data_Base.Painel_Traseiro[arr[i]].Nome_Pecas 
                text_catalogo_nome.textContent = NomePecas;
    
                CodigoPecas = data_Base.Painel_Traseiro[arr[i]].Codigo_pecas;
                text_catalogo_codigo.textContent = CodigoPecas;
    
                ImgPecas = data_Base.Painel_Traseiro[arr[i]].ImgURL
                catalogo_primario_img.src = ImgPecas;
    
                // MENU
                Menu_NomePecas = data_Base.Painel_Traseiro[arr[i]].Nome_Pecas;
                menu_nome_pecas.textContent = Menu_NomePecas;
    
                Menu_TipoPecas = data_Base.Painel_Traseiro[arr[i]].Tipo_Pecas;
                menu_tipo_pecas.textContent = Menu_TipoPecas;
    
                Menu_CodigoPecas = data_Base.Painel_Traseiro[arr[i]].Codigo_pecas;
                menu_codigo_pecas.textContent = Menu_CodigoPecas;
    
                Menu_MarcaPecas = data_Base.Painel_Traseiro[arr[i]].Marca;
                menu_marca_pecas.textContent = Menu_MarcaPecas;
    
                Menu_a = data_Base.Painel_Traseiro[arr[i]].Link_ML;
                a_btn_ml.href = Menu_a;
    
                Menu_ImgPecas   = data_Base.Painel_Traseiro[arr[i]].ImgURL;
                menu_img.src = Menu_ImgPecas; 
           
       }
    }

       //PAINEL DIANTEIRO
    //if(escolha.value == "Painel_Dianteiro" || escolha.value == "All"){
    if(escolha.value == "Painel_Dianteiro_select" ||escolha.id == "Painel_Dianteiro_select"|| escolha.id == "All" || escolha.value == "All" || todos_escolha == "All"){
        if(escolha.value == "Painel_Dianteiro_select" ||escolha.id == "Painel_Dianteiro_select"){
            var remover_element = document.getElementById("Container_Catalogo"); 
            remover_element.parentNode.removeChild(remover_element);


            Container_Display_Catalogo = document.createElement("div");
            Container_Display_Catalogo.id="Container_Catalogo";
            Display_Catalogo.appendChild(Container_Display_Catalogo);
            id_recebimento_armazenamento = 5;
        }

       var painel_dian_loop = Object.keys(data_Base.Painel_Dianteiro).length
       var arr = Object.keys(data_Base.Painel_Dianteiro)
       for(var i=0;i< painel_dian_loop;i++){
        let catalogo_primario = document.createElement("div")
    
        catalogo_primario.id= "Card_Catalogo-"+ data_Base.Painel_Dianteiro[arr[i]].Id;
        catalogo_primario.className = "Container_Card";
        catalogo_primario.style=`
        display: inline-block;
        position: relative;
        border: 1px solid rgb(255,0,0);
        height:350px;
        width: 300px;
        top:0px;
        margin-left: 50px;
        margin-top:30px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        text-align: center;
        `
        //Display_Catalogo.appendChild(catalogo_primario)
        Container_Display_Catalogo.appendChild(catalogo_primario)
        let div_id_salvamento_catalogo = document.createElement("div");
        div_id_salvamento_catalogo.id= "Btn_Id_Selc_"+data_Base.Painel_Dianteiro[arr[i]].Id;
        div_id_salvamento_catalogo.textContent= data_Base.Painel_Dianteiro[arr[i]].Id;
        div_id_salvamento_catalogo.style=`display:none;`;
        catalogo_primario.appendChild(div_id_salvamento_catalogo);
    
        let catalogo_primario_div_img = document.createElement("div")
        catalogo_primario_div_img.className = "Border";
        catalogo_primario_div_img.id="Border_id"
        catalogo_primario_div_img.style=`
        position: absolute;
        height: 200px;
        width: 200px;
        border: 1px solid black;
        left: 55px;
        top:16px;
        `
        catalogo_primario.appendChild(catalogo_primario_div_img)
        
    
        let catalogo_primario_img =  document.createElement("img")
        catalogo_primario_img.id = "img_primario_catalogo";
        catalogo_primario_img.className = "img_primario_catalogo";
        //catalogo_primario_img.width="200";
        catalogo_primario_img.style=`
        display: inline-block;
        position: relative;
        top:0px;
        text-align: center;
        max-width: 200px;
            max-height: 200px;
            width: auto;
            height: auto;
        `
        catalogo_primario_div_img.appendChild(catalogo_primario_img);
    
        let text_catalogo_nome = document.createElement("label")
        text_catalogo_nome.id = "nome_pecas";
        text_catalogo_nome.className="nome_pecas";
        text_catalogo_nome.style=`
        position: absolute;
        text-align: center;
        top:230px;
        left: 35px;
        `
        catalogo_primario.appendChild(text_catalogo_nome)
    
        let text_catalogo_codigo = document.createElement("label")
        text_catalogo_codigo.id = "codigo_pecas";
        text_catalogo_codigo.className="codigo_pecas";
        text_catalogo_codigo.style=`
        position: relative;
        text-align: center;
        top:270px;
        left:-77px;
        `
        catalogo_primario.appendChild(text_catalogo_codigo)
        
        let button_catalogo = document.createElement('button')
        button_catalogo.id="btn_solicitar";
        button_catalogo.className= data_Base.Painel_Dianteiro[arr[i]].Id;
        button_catalogo.textContent="Solicite um Orçamento";
        button_catalogo.onclick = function(){
            btn_solic(event)
        }
        button_catalogo.style=`
        position: relative;
        border: 1px;
        background-color: rgb(190,69,69); 
        height: 35px;   
        width: 100%;
        top:288px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 0.9em;
        line-height: 27px;
        color:white;
        cursor: pointer;
        `
        catalogo_primario.appendChild(button_catalogo)
       
    
    /* ======== Segunda menu interno =========== */
    
    
        let menu_container = document.createElement('div');
        menu_container.id = data_Base.Painel_Dianteiro[arr[i]].Id//"Menu_Container_"+ Salvar_id;
        menu_container.className= "Menu_Container";
        menu_container.style=`
        display: none;
        position: relative;
        top:215px;
        width: 800px;
        height: 500px;
        text-align: center;
        margin: 0 auto;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        text-align: center;
        `
        Display_Menu.appendChild(menu_container);
    
        let div_id_salvamento_menu = document.createElement("div");
        div_id_salvamento_menu.id= "btn_id_";
        //div_id_salvamento_menu.textContent = Salvar_id;
        div_id_salvamento_menu.style=`display:none;`
        menu_container.appendChild(div_id_salvamento_menu);
    
        let menu_border = document.createElement('div');
        menu_border.className = "Menu_Border";
        menu_border.style=`
        
        height: 250px;
        width: 350px;
        left: 140px;
        border: 1px solid black;
        top:150px;
        `
        menu_container.appendChild(menu_border);
    
        let menu_img = document.createElement('img');
        menu_img.id = "Menu_Img";
        menu_img.className = "Menu_Img";
        //menu_img.width="200";
        menu_img.style=`
        position: relative;
        top:0px;
        text-align: center;
        max-width: 350px;
        max-height: 250px;
        width: auto;
        height: auto;
        `
        menu_img.src="Retalhos_Cascavel_PNG-1.png";
        menu_border.appendChild(menu_img);
        
        let menu_nome_pecas = document.createElement('label');
        menu_nome_pecas.id= "Nome_Pecas_Menu";
        menu_nome_pecas.className = "Nome_Pecas_Menu";
        menu_nome_pecas.style=`
        position: absolute;
        top:150px;
        left: 515px;
        `
        //menu_nome_pecas.textContent="Paralamas";
        menu_container.appendChild(menu_nome_pecas);
    
        let menu_tipo_pecas = document.createElement('label');
        menu_tipo_pecas.id="Tipo_Pecas_Menu";
         menu_tipo_pecas.className="Tipo_Pecas_Menu";
        menu_tipo_pecas.style=`
        position: absolute;
        top:190px;
        left: 515px;
        `;
        //menu_tipo_pecas.textContent="Lateral Esquerda"
        menu_container.appendChild(menu_tipo_pecas);
    
        let menu_codigo_pecas = document.createElement('labal');
        menu_codigo_pecas.id="Menu_Codigo_Pecas";
        menu_codigo_pecas.className="Menu_Codigo_Pecas";
        menu_codigo_pecas.style=`
        position: absolute;
        top:230px;
        left: 515px;
        `
        //menu_codigo_pecas.textContent="888888"
        menu_container.appendChild(menu_codigo_pecas);
    
        let menu_marca_pecas = document.createElement('label');
        menu_marca_pecas.id="Menu_Marca_Pecas";
        menu_marca_pecas.className="Menu_Marca_Pecas";
        menu_marca_pecas.style=`
        position: absolute;
        top:270px;
        left: 515px;
        `
        //menu_marca_pecas.textContent="Volvo-mercedes"
        menu_container.appendChild(menu_marca_pecas);
    
        let a_btn_ml = document.createElement("a");
        a_btn_ml.id="a_ml";
        menu_container.appendChild(a_btn_ml);
    
        let menu_ml_button = document.createElement('button');
        menu_ml_button.id="Menu_Ml_Button";
        menu_ml_button.className="Menu_Ml_Button";
        menu_ml_button.textContent="Mercado Livre"
        menu_ml_button.style=`
        position: absolute;
        top:324px;
        left: 510px;
    
        border: 0px;
        background-color: rgb(255,231,0);
        height: 35px;
        border-radius: 10px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        cursor: pointer;
        `
        a_btn_ml.appendChild(menu_ml_button);
    
        let menu_voltar = document.createElement('button');
        menu_voltar.id="Menu_Voltar";
        menu_voltar.className="Menu_Voltar";
        menu_voltar.textContent="Voltar Catalogo";
        menu_voltar.onclick = function(){
            voltar()
        }
        menu_voltar.style=`
        position: absolute;
        top:390px;
        left: 510px;
    
        border: 0px;
        background-color: rgb(190,69,69);
        height: 35px;
        border-radius: 10px;
        color:white;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        cursor: pointer;
        `
        menu_container.appendChild(menu_voltar);
    
            
                NomePecas = data_Base.Painel_Dianteiro[arr[i]].Nome_Pecas 
                text_catalogo_nome.textContent = NomePecas;
    
                CodigoPecas = data_Base.Painel_Dianteiro[arr[i]].Codigo_pecas;
                text_catalogo_codigo.textContent = CodigoPecas;
    
                ImgPecas = data_Base.Painel_Dianteiro[arr[i]].ImgURL
                catalogo_primario_img.src = ImgPecas;
    
                // MENU
                Menu_NomePecas = data_Base.Painel_Dianteiro[arr[i]].Nome_Pecas;
                menu_nome_pecas.textContent = Menu_NomePecas;
    
                Menu_TipoPecas = data_Base.Painel_Dianteiro[arr[i]].Tipo_Pecas;
                menu_tipo_pecas.textContent = Menu_TipoPecas;
    
                Menu_CodigoPecas = data_Base.Painel_Dianteiro[arr[i]].Codigo_pecas;
                menu_codigo_pecas.textContent = Menu_CodigoPecas;
    
                Menu_MarcaPecas = data_Base.Painel_Dianteiro[arr[i]].Marca;
                menu_marca_pecas.textContent = Menu_MarcaPecas;
    
                Menu_a = data_Base.Painel_Dianteiro[arr[i]].Link_ML;
                a_btn_ml.href = Menu_a;
    
                Menu_ImgPecas   = data_Base.Painel_Dianteiro[arr[i]].ImgURL;
                menu_img.src = Menu_ImgPecas; 
       }
    }
   
       //PARACHOQUE
    //if(escolha.value == "Parachoque" || escolha.value == "All"){
    if(escolha.value == "Parachoque_select" ||escolha.id == "Parachoque_select" || escolha.id == "All" || escolha.value == "All" || todos_escolha == "All"){
        if(escolha.value == "Parachoque_select"|| escolha.id == "Parachoque_select"){
            var remover_element = document.getElementById("Container_Catalogo"); 
            remover_element.parentNode.removeChild(remover_element);


            Container_Display_Catalogo = document.createElement("div");
            Container_Display_Catalogo.id="Container_Catalogo";
            Display_Catalogo.appendChild(Container_Display_Catalogo);
            id_recebimento_armazenamento = 6;
        }

       var parachoque_loop = Object.keys(data_Base.Parachoque).length
       var arr = Object.keys(data_Base.Parachoque)
       for(var i=0;i< parachoque_loop;i++){
        let catalogo_primario = document.createElement("div")
    
        catalogo_primario.id= "Card_Catalogo-"+ data_Base.Parachoque[arr[i]].Id;
        catalogo_primario.className = "Container_Card";
        catalogo_primario.style=`
        display: inline-block;
        position: relative;
        border: 1px solid rgb(255,0,0);
        height:350px;
        width: 300px;
        top:0px;
        margin-left: 50px;
        margin-top:30px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        text-align: center;
        `
        //Display_Catalogo.appendChild(catalogo_primario)
        Container_Display_Catalogo.appendChild(catalogo_primario)
        let div_id_salvamento_catalogo = document.createElement("div");
        div_id_salvamento_catalogo.id= "Btn_Id_Selc_"+data_Base.Parachoque[arr[i]].Id;
        div_id_salvamento_catalogo.textContent= data_Base.Parachoque[arr[i]].Id;
        div_id_salvamento_catalogo.style=`display:none;`;
        catalogo_primario.appendChild(div_id_salvamento_catalogo);
    
        let catalogo_primario_div_img = document.createElement("div")
        catalogo_primario_div_img.className = "Border";
        catalogo_primario_div_img.id="Border_id"
        catalogo_primario_div_img.style=`
        position: absolute;
        height: 200px;
        width: 200px;
        border: 1px solid black;
        left: 55px;
        top:16px;
        `
        catalogo_primario.appendChild(catalogo_primario_div_img)
        
    
        let catalogo_primario_img =  document.createElement("img")
        catalogo_primario_img.id = "img_primario_catalogo";
        catalogo_primario_img.className = "img_primario_catalogo";
        //catalogo_primario_img.width="200";
        catalogo_primario_img.style=`
        display: inline-block;
        position: relative;
        top:0px;
        text-align: center;
        max-width: 200px;
            max-height: 200px;
            width: auto;
            height: auto;
        `
        catalogo_primario_div_img.appendChild(catalogo_primario_img);
    
        let text_catalogo_nome = document.createElement("label")
        text_catalogo_nome.id = "nome_pecas";
        text_catalogo_nome.className="nome_pecas";
        text_catalogo_nome.style=`
        position: absolute;
        text-align: center;
        top:230px;
        left: 35px;
        `
        catalogo_primario.appendChild(text_catalogo_nome)
    
        let text_catalogo_codigo = document.createElement("label")
        text_catalogo_codigo.id = "codigo_pecas";
        text_catalogo_codigo.className="codigo_pecas";
        text_catalogo_codigo.style=`
        display: inline-block;
        position: relative;
        text-align: center;
        top:270px;
        left:-77px;
        `
        catalogo_primario.appendChild(text_catalogo_codigo)
        
        let button_catalogo = document.createElement('button')
        button_catalogo.id="btn_solicitar";
        button_catalogo.className= data_Base.Parachoque[arr[i]].Id;
        button_catalogo.textContent="Solicite um Orçamento";
        button_catalogo.onclick = function(){
            btn_solic(event)
        }
        button_catalogo.style=`
        position: relative;
        border: 1px;
        background-color: rgb(190,69,69); 
        height: 35px;   
        width: 100%;
        top:288px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 0.9em;
        line-height: 27px;
        color:white;
        cursor: pointer;
        `
        catalogo_primario.appendChild(button_catalogo)
       
    
    /* ======== Segunda menu interno =========== */
    
    
        let menu_container = document.createElement('div');
        menu_container.id = data_Base.Parachoque[arr[i]].Id//"Menu_Container_"+ Salvar_id;
        menu_container.className= "Menu_Container";
        menu_container.style=`
        display: none;
        position: relative;
        top:215px;
        width: 800px;
        height: 500px;
        text-align: center;
        margin: 0 auto;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        text-align: center;
        `
        Display_Menu.appendChild(menu_container);
    
        let div_id_salvamento_menu = document.createElement("div");
        div_id_salvamento_menu.id= "btn_id_";
        //div_id_salvamento_menu.textContent = Salvar_id;
        div_id_salvamento_menu.style=`display:none;`
        menu_container.appendChild(div_id_salvamento_menu);
    
        let menu_border = document.createElement('div');
        menu_border.className = "Menu_Border";
        menu_border.style=`
        
        height: 250px;
        width: 350px;
        left: 140px;
        border: 1px solid black;
        top:150px;
        `
        menu_container.appendChild(menu_border);
    
        let menu_img = document.createElement('img');
        menu_img.id = "Menu_Img";
        menu_img.className = "Menu_Img";
        //menu_img.width="200";
        menu_img.style=`
        position: relative;
        top:0px;
        text-align: center;
        max-width: 350px;
        max-height: 250px;
        width: auto;
        height: auto;
        `
        menu_img.src="Retalhos_Cascavel_PNG-1.png";
        menu_border.appendChild(menu_img);
        
        let menu_nome_pecas = document.createElement('label');
        menu_nome_pecas.id= "Nome_Pecas_Menu";
        menu_nome_pecas.className = "Nome_Pecas_Menu";
        menu_nome_pecas.style=`
        position: absolute;
        top:150px;
        left: 515px;
        `
        //menu_nome_pecas.textContent="Paralamas";
        menu_container.appendChild(menu_nome_pecas);
    
        let menu_tipo_pecas = document.createElement('label');
        menu_tipo_pecas.id="Tipo_Pecas_Menu";
         menu_tipo_pecas.className="Tipo_Pecas_Menu";
        menu_tipo_pecas.style=`
        position: absolute;
        top:190px;
        left: 515px;
        `;
        //menu_tipo_pecas.textContent="Lateral Esquerda"
        menu_container.appendChild(menu_tipo_pecas);
    
        let menu_codigo_pecas = document.createElement('labal');
        menu_codigo_pecas.id="Menu_Codigo_Pecas";
        menu_codigo_pecas.className="Menu_Codigo_Pecas";
        menu_codigo_pecas.style=`
        position: absolute;
        top:230px;
        left: 515px;
        `
        //menu_codigo_pecas.textContent="888888"
        menu_container.appendChild(menu_codigo_pecas);
    
        let menu_marca_pecas = document.createElement('label');
        menu_marca_pecas.id="Menu_Marca_Pecas";
        menu_marca_pecas.className="Menu_Marca_Pecas";
        menu_marca_pecas.style=`
        position: absolute;
        top:270px;
        left: 515px;
        `
        //menu_marca_pecas.textContent="Volvo-mercedes"
        menu_container.appendChild(menu_marca_pecas);
    
        let a_btn_ml = document.createElement("a");
        a_btn_ml.id="a_ml";
        menu_container.appendChild(a_btn_ml);
    
        let menu_ml_button = document.createElement('button');
        menu_ml_button.id="Menu_Ml_Button";
        menu_ml_button.className="Menu_Ml_Button";
        menu_ml_button.textContent="Mercado Livre"
        menu_ml_button.style=`
        position: absolute;
        top:324px;
        left: 510px;
    
        border: 0px;
        background-color: rgb(255,231,0);
        height: 35px;
        border-radius: 10px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        cursor: pointer;
        `
        a_btn_ml.appendChild(menu_ml_button);
    
        let menu_voltar = document.createElement('button');
        menu_voltar.id="Menu_Voltar";
        menu_voltar.className="Menu_Voltar";
        menu_voltar.textContent="Voltar Catalogo";
        menu_voltar.onclick = function(){
            voltar()
        }
        menu_voltar.style=`
        position: absolute;
        top:390px;
        left: 510px;
    
        border: 0px;
        background-color: rgb(190,69,69);
        height: 35px;
        border-radius: 10px;
        color:white;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        cursor: pointer;
        `
        menu_container.appendChild(menu_voltar);
    
            
                NomePecas = data_Base.Parachoque[arr[i]].Nome_Pecas 
                text_catalogo_nome.textContent = NomePecas;
    
                CodigoPecas = data_Base.Parachoque[arr[i]].Codigo_pecas;
                text_catalogo_codigo.textContent = CodigoPecas;
    
                ImgPecas = data_Base.Parachoque[arr[i]].ImgURL
                catalogo_primario_img.src = ImgPecas;
    
                // MENU
                Menu_NomePecas = data_Base.Parachoque[arr[i]].Nome_Pecas;
                menu_nome_pecas.textContent = Menu_NomePecas;
    
                Menu_TipoPecas = data_Base.Parachoque[arr[i]].Tipo_Pecas;
                menu_tipo_pecas.textContent = Menu_TipoPecas;
    
                Menu_CodigoPecas = data_Base.Parachoque[arr[i]].Codigo_pecas;
                menu_codigo_pecas.textContent = Menu_CodigoPecas;
    
                Menu_MarcaPecas = data_Base.Parachoque[arr[i]].Marca;
                menu_marca_pecas.textContent = Menu_MarcaPecas;
    
                Menu_a = data_Base.Parachoque[arr[i]].Link_ML;
                a_btn_ml.href = Menu_a;
    
                Menu_ImgPecas   = data_Base.Parachoque[arr[i]].ImgURL;
                menu_img.src = Menu_ImgPecas; 
          
       }
    }

       //PARALAMA
   //if(escolha.value == "Paralama" || escolha.value == "All"){
    if(escolha.value == "Paralama_select" || escolha.id == "Paralama_select"|| escolha.id == "All" || escolha.value == "All" || todos_escolha == "All"){
        if(escolha.value == "Paralama_select" || escolha.id == "Paralama_select"){
            var remover_element = document.getElementById("Container_Catalogo"); 
            remover_element.parentNode.removeChild(remover_element);


            Container_Display_Catalogo = document.createElement("div");
            Container_Display_Catalogo.id="Container_Catalogo";
            Display_Catalogo.appendChild(Container_Display_Catalogo);
            id_recebimento_armazenamento = 7;
        }

       var paralama_loop = Object.keys(data_Base.Paralama).length
       var arr = Object.keys(data_Base.Paralama)
       for(var i=0;i< paralama_loop;i++){
        let catalogo_primario = document.createElement("div")
    
        catalogo_primario.id= "Card_Catalogo-"+ data_Base.Paralama[arr[i]].Id;
        catalogo_primario.className = "Container_Card";
        catalogo_primario.style=`
        display: inline-block;
        position: relative;
        border: 1px solid rgb(255,0,0);
        height:350px;
        width: 300px;
        top:0px;
        margin-left: 50px;
        margin-top:30px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        text-align: center;
        `
       // Display_Catalogo.appendChild(catalogo_primario)
       Container_Display_Catalogo.appendChild(catalogo_primario)
        let div_id_salvamento_catalogo = document.createElement("div");
        div_id_salvamento_catalogo.id= "Btn_Id_Selc_"+data_Base.Paralama[arr[i]].Id;
        div_id_salvamento_catalogo.textContent= data_Base.Paralama[arr[i]].Id;
        div_id_salvamento_catalogo.style=`display:none;`;
        catalogo_primario.appendChild(div_id_salvamento_catalogo);
    
        let catalogo_primario_div_img = document.createElement("div")
        catalogo_primario_div_img.className = "Border";
        catalogo_primario_div_img.id="Border_id"
        catalogo_primario_div_img.style=`
        position: absolute;
        height: 200px;
        width: 200px;
        border: 1px solid black;
        left: 55px;
        top:16px;
        `
        catalogo_primario.appendChild(catalogo_primario_div_img)
        
    
        let catalogo_primario_img =  document.createElement("img")
        catalogo_primario_img.id = "img_primario_catalogo";
        catalogo_primario_img.className = "img_primario_catalogo";
       // catalogo_primario_img.width="200";
        catalogo_primario_img.style=`
        display: inline-block;
        position: relative;
        top:0px;
        text-align: center;
        max-width: 200px;
            max-height: 200px;
            width: auto;
            height: auto;
        `
        catalogo_primario_div_img.appendChild(catalogo_primario_img);
    
        let text_catalogo_nome = document.createElement("label")
        text_catalogo_nome.id = "nome_pecas";
        text_catalogo_nome.className="nome_pecas";
        text_catalogo_nome.style=`
        position: absolute;
        text-align: center;
        top:230px;
        left: 35px;
        `
        catalogo_primario.appendChild(text_catalogo_nome)
    
        let text_catalogo_codigo = document.createElement("label")
        text_catalogo_codigo.id = "codigo_pecas";
        text_catalogo_codigo.className="codigo_pecas";
        text_catalogo_codigo.style=`
        position: relative;
        text-align: center;
        top:270px;
        left:-77px;
        `
        catalogo_primario.appendChild(text_catalogo_codigo)
        
        let button_catalogo = document.createElement('button')
        button_catalogo.id="btn_solicitar";
        button_catalogo.className= data_Base.Paralama[arr[i]].Id;
        button_catalogo.textContent="Solicite um Orçamento";
        button_catalogo.onclick = function(){
            btn_solic(event)
        }
        button_catalogo.style=`
        position: relative;
        border: 1px;
        background-color: rgb(190,69,69); 
        height: 35px;   
        width: 100%;
        top:288px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 0.9em;
        line-height: 27px;
        color:white;
        cursor: pointer;
        `
        catalogo_primario.appendChild(button_catalogo)
       
    
    /* ======== Segunda menu interno =========== */
    
    
        let menu_container = document.createElement('div');
        menu_container.id = data_Base.Paralama[arr[i]].Id//"Menu_Container_"+ Salvar_id;
        menu_container.className= "Menu_Container";
        menu_container.style=`
        display: none;
        position: relative;
        top:215px;
        width: 800px;
        height: 500px;
        text-align: center;
        margin: 0 auto;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        text-align: center;
        `
        Display_Menu.appendChild(menu_container);
    
        let div_id_salvamento_menu = document.createElement("div");
        div_id_salvamento_menu.id= "btn_id_";
        //div_id_salvamento_menu.textContent = Salvar_id;
        div_id_salvamento_menu.style=`display:none;`
        menu_container.appendChild(div_id_salvamento_menu);
    
        let menu_border = document.createElement('div');
        menu_border.className = "Menu_Border";
        menu_border.style=`
       
        height: 250px;
        width: 350px;
        left: 140px;
        border: 1px solid black;
        top:150px;
        `
        menu_container.appendChild(menu_border);
    
        let menu_img = document.createElement('img');
        menu_img.id = "Menu_Img";
        menu_img.className = "Menu_Img";
        //menu_img.width="200";
        menu_img.style=`
        position: relative;
        top:0px;
        text-align: center;
        max-width: 350px;
        max-height: 250px;
        width: auto;
        height: auto;
        `
        menu_img.src="Retalhos_Cascavel_PNG-1.png";
        menu_border.appendChild(menu_img);
        
        let menu_nome_pecas = document.createElement('label');
        menu_nome_pecas.id= "Nome_Pecas_Menu";
        menu_nome_pecas.className = "Nome_Pecas_Menu";
        menu_nome_pecas.style=`
        position: absolute;
        top:150px;
        left: 515px;
        `
        //menu_nome_pecas.textContent="Paralamas";
        menu_container.appendChild(menu_nome_pecas);
    
        let menu_tipo_pecas = document.createElement('label');
        menu_tipo_pecas.id="Tipo_Pecas_Menu";
         menu_tipo_pecas.className="Tipo_Pecas_Menu";
        menu_tipo_pecas.style=`
        position: absolute;
        top:190px;
        left: 515px;
        `;
        //menu_tipo_pecas.textContent="Lateral Esquerda"
        menu_container.appendChild(menu_tipo_pecas);
    
        let menu_codigo_pecas = document.createElement('labal');
        menu_codigo_pecas.id="Menu_Codigo_Pecas";
        menu_codigo_pecas.className="Menu_Codigo_Pecas";
        menu_codigo_pecas.style=`
        position: absolute;
        top:230px;
        left: 515px;
        `
        //menu_codigo_pecas.textContent="888888"
        menu_container.appendChild(menu_codigo_pecas);
    
        let menu_marca_pecas = document.createElement('label');
        menu_marca_pecas.id="Menu_Marca_Pecas";
        menu_marca_pecas.className="Menu_Marca_Pecas";
        menu_marca_pecas.style=`
        position: absolute;
        top:270px;
        left: 515px;
        `
        //menu_marca_pecas.textContent="Volvo-mercedes"
        menu_container.appendChild(menu_marca_pecas);
    
        let a_btn_ml = document.createElement("a");
        a_btn_ml.id="a_ml";
        menu_container.appendChild(a_btn_ml);
    
        let menu_ml_button = document.createElement('button');
        menu_ml_button.id="Menu_Ml_Button";
        menu_ml_button.className="Menu_Ml_Button";
        menu_ml_button.textContent="Mercado Livre"
        menu_ml_button.style=`
        position: absolute;
        top:324px;
        left: 510px;
    
        border: 0px;
        background-color: rgb(255,231,0);
        height: 35px;
        border-radius: 10px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        cursor: pointer;
        `
        a_btn_ml.appendChild(menu_ml_button);
    
        let menu_voltar = document.createElement('button');
        menu_voltar.id="Menu_Voltar";
        menu_voltar.className="Menu_Voltar";
        menu_voltar.textContent="Voltar Catalogo";
        menu_voltar.onclick = function(){
            voltar()
        }
        menu_voltar.style=`
        position: absolute;
        top:390px;
        left: 510px;
    
        border: 0px;
        background-color: rgb(190,69,69);
        height: 35px;
        border-radius: 10px;
        color:white;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        cursor: pointer;
        `
        menu_container.appendChild(menu_voltar);
    
            
                NomePecas = data_Base.Paralama[arr[i]].Nome_Pecas 
                text_catalogo_nome.textContent = NomePecas;
    
                CodigoPecas = data_Base.Paralama[arr[i]].Codigo_pecas;
                text_catalogo_codigo.textContent = CodigoPecas;
    
                ImgPecas = data_Base.Paralama[arr[i]].ImgURL
                catalogo_primario_img.src = ImgPecas;
    
                // MENU
                Menu_NomePecas = data_Base.Paralama[arr[i]].Nome_Pecas;
                menu_nome_pecas.textContent = Menu_NomePecas;
    
                Menu_TipoPecas = data_Base.Paralama[arr[i]].Tipo_Pecas;
                menu_tipo_pecas.textContent = Menu_TipoPecas;
    
                Menu_CodigoPecas = data_Base.Paralama[arr[i]].Codigo_pecas;
                menu_codigo_pecas.textContent = Menu_CodigoPecas;
    
                Menu_MarcaPecas = data_Base.Paralama[arr[i]].Marca;
                menu_marca_pecas.textContent = Menu_MarcaPecas;
    
                Menu_a = data_Base.Paralama[arr[i]].Link_ML;
                a_btn_ml.href = Menu_a;
    
                Menu_ImgPecas   = data_Base.Paralama[arr[i]].ImgURL;
                menu_img.src = Menu_ImgPecas; 
          
       }
    }

       //TAMPA TRASEIRA
    //if(escolha.value == "Tampa_Traseira" || escolha.value == "All"){
    if(escolha.value == "Tampa_Traseira_select"|| escolha.id == "Tampa_Traseira_select"|| escolha.id == "All" || escolha.value == "All" || todos_escolha == "All"){
        if(escolha.value == "Tampa_Traseira_select"|| escolha.id == "Tampa_Traseira_select"){
            var remover_element = document.getElementById("Container_Catalogo"); 
            remover_element.parentNode.removeChild(remover_element);


            Container_Display_Catalogo = document.createElement("div");
            Container_Display_Catalogo.id="Container_Catalogo";
            Display_Catalogo.appendChild(Container_Display_Catalogo);
            id_recebimento_armazenamento = 8;
        }

       var tam_trasei_loop= Object.keys(data_Base.Tampa_Traseira).length
       var arr = Object.keys(data_Base.Tampa_Traseira)
       for(var i=0;i<tam_trasei_loop;i++){
        let catalogo_primario = document.createElement("div")
    
        catalogo_primario.id= "Card_Catalogo-"+ data_Base.Tampa_Traseira[arr[i]].Id;
        catalogo_primario.className = "Container_Card";
        catalogo_primario.style=`
        display: inline-block;
        position: relative;
        border: 1px solid rgb(255,0,0);
        height:350px;
        width: 300px;
        top:0px;
        margin-left: 50px;
        margin-top:30px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        text-align: center;
        `
        //Display_Catalogo.appendChild(catalogo_primario)
        Container_Display_Catalogo.appendChild(catalogo_primario)

        let div_id_salvamento_catalogo = document.createElement("div");
        div_id_salvamento_catalogo.id= "Btn_Id_Selc_"+data_Base.Tampa_Traseira[arr[i]].Id;
        div_id_salvamento_catalogo.textContent= data_Base.Tampa_Traseira[arr[i]].Id;
        div_id_salvamento_catalogo.style=`display:none;`;
        catalogo_primario.appendChild(div_id_salvamento_catalogo);
    
        let catalogo_primario_div_img = document.createElement("div")
        catalogo_primario_div_img.className = "Border";
        catalogo_primario_div_img.id="Border_id"
        catalogo_primario_div_img.style=`
        position: absolute;
        height: 200px;
        width: 200px;
        border: 1px solid black;
        left: 55px;
        top:16px;
        `
        catalogo_primario.appendChild(catalogo_primario_div_img)
        
    
        let catalogo_primario_img =  document.createElement("img")
        catalogo_primario_img.id = "img_primario_catalogo";
        catalogo_primario_img.className = "img_primario_catalogo";
       // catalogo_primario_img.width="200";
        catalogo_primario_img.style=`
        display: inline-block;
        position: relative;
        top:0px;
        text-align: center;
        max-width: 200px;
            max-height: 200px;
            width: auto;
            height: auto;
        `
        catalogo_primario_div_img.appendChild(catalogo_primario_img);
    
        let text_catalogo_nome = document.createElement("label")
        text_catalogo_nome.id = "nome_pecas";
        text_catalogo_nome.className="nome_pecas";
        text_catalogo_nome.style=`
        position: absolute;
        text-align: center;
        top:230px;
        left: 35px;
        `
        catalogo_primario.appendChild(text_catalogo_nome)
    
        let text_catalogo_codigo = document.createElement("label")
        text_catalogo_codigo.id = "codigo_pecas";
        text_catalogo_codigo.className="codigo_pecas";
        text_catalogo_codigo.style=`
        position: relative;
        text-align: center;
        top:270px;
        left:-77px;
        `
        catalogo_primario.appendChild(text_catalogo_codigo)
        
        let button_catalogo = document.createElement('button')
        button_catalogo.id="btn_solicitar";
        button_catalogo.className= data_Base.Tampa_Traseira[arr[i]].Id;
        button_catalogo.textContent="Solicite um Orçamento";
        button_catalogo.onclick = function(){
            btn_solic(event)
        }
        button_catalogo.style=`
        position: relative;
        border: 1px;
        background-color: rgb(190,69,69); 
        height: 35px;   
        width: 100%;
        top:288px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 0.9em;
        line-height: 27px;
        color:white;
        cursor: pointer;
        `
        catalogo_primario.appendChild(button_catalogo)
       
    
    /* ======== Segunda menu interno =========== */
    
    
        let menu_container = document.createElement('div');
        menu_container.id = data_Base.Tampa_Traseira[arr[i]].Id//"Menu_Container_"+ Salvar_id;
        menu_container.className= "Menu_Container";
        menu_container.style=`
        display: none;
        position: relative;
        top:215px;
        width: 800px;
        height: 500px;
        text-align: center;
        margin: 0 auto;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        text-align: center;
        `
        Display_Menu.appendChild(menu_container);
    
        let div_id_salvamento_menu = document.createElement("div");
        div_id_salvamento_menu.id= "btn_id_";
        //div_id_salvamento_menu.textContent = Salvar_id;
        div_id_salvamento_menu.style=`display:none;`
        menu_container.appendChild(div_id_salvamento_menu);
    
        let menu_border = document.createElement('div');
        menu_border.className = "Menu_Border";
        menu_border.style=`
        
        height: 250px;
        width: 350px;
        left: 140px;
        border: 1px solid black;
        top:150px;
        `
        menu_container.appendChild(menu_border);
    
        let menu_img = document.createElement('img');
        menu_img.id = "Menu_Img";
        menu_img.className = "Menu_Img";
        //menu_img.width="200";
        menu_img.style=`
        position: relative;
        top:0px;
        text-align: center;
        max-width: 350px;
        max-height: 250px;
        width: auto;
        height: auto;
        `
        menu_img.src="Retalhos_Cascavel_PNG-1.png";
        menu_border.appendChild(menu_img);
        
        let menu_nome_pecas = document.createElement('label');
        menu_nome_pecas.id= "Nome_Pecas_Menu";
        menu_nome_pecas.className = "Nome_Pecas_Menu";
        menu_nome_pecas.style=`
        position: absolute;
        top:150px;
        left: 515px;
        `
        //menu_nome_pecas.textContent="Paralamas";
        menu_container.appendChild(menu_nome_pecas);
    
        let menu_tipo_pecas = document.createElement('label');
        menu_tipo_pecas.id="Tipo_Pecas_Menu";
         menu_tipo_pecas.className="Tipo_Pecas_Menu";
        menu_tipo_pecas.style=`
        position: absolute;
        top:190px;
        left: 515px;
        `;
        //menu_tipo_pecas.textContent="Lateral Esquerda"
        menu_container.appendChild(menu_tipo_pecas);
    
        let menu_codigo_pecas = document.createElement('labal');
        menu_codigo_pecas.id="Menu_Codigo_Pecas";
        menu_codigo_pecas.className="Menu_Codigo_Pecas";
        menu_codigo_pecas.style=`
        position: absolute;
        top:230px;
        left: 515px;
        `
        //menu_codigo_pecas.textContent="888888"
        menu_container.appendChild(menu_codigo_pecas);
    
        let menu_marca_pecas = document.createElement('label');
        menu_marca_pecas.id="Menu_Marca_Pecas";
        menu_marca_pecas.className="Menu_Marca_Pecas";
        menu_marca_pecas.style=`
        position: absolute;
        top:270px;
        left: 515px;
        `
        //menu_marca_pecas.textContent="Volvo-mercedes"
        menu_container.appendChild(menu_marca_pecas);
    
        let a_btn_ml = document.createElement("a");
        a_btn_ml.id="a_ml";
        menu_container.appendChild(a_btn_ml);
    
        let menu_ml_button = document.createElement('button');
        menu_ml_button.id="Menu_Ml_Button";
        menu_ml_button.className="Menu_Ml_Button";
        menu_ml_button.textContent="Mercado Livre"
        menu_ml_button.style=`
        position: absolute;
        top:324px;
        left: 510px;
    
        border: 0px;
        background-color: rgb(255,231,0);
        height: 35px;
        border-radius: 10px;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        cursor: pointer;
        `
        a_btn_ml.appendChild(menu_ml_button);
    
        let menu_voltar = document.createElement('button');
        menu_voltar.id="Menu_Voltar";
        menu_voltar.className="Menu_Voltar";
        menu_voltar.textContent="Voltar Catalogo";
        menu_voltar.onclick = function(){
            voltar()
        }
        menu_voltar.style=`
        position: absolute;
        top:390px;
        left: 510px;
    
        border: 0px;
        background-color: rgb(190,69,69);
        height: 35px;
        border-radius: 10px;
        color:white;
    
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400px;
        font-size: 1em;
        line-height: 27px;
        cursor: pointer;
        `
        menu_container.appendChild(menu_voltar);
    
            
                NomePecas = data_Base.Tampa_Traseira[arr[i]].Nome_Pecas 
                text_catalogo_nome.textContent = NomePecas;
    
                CodigoPecas = data_Base.Tampa_Traseira[arr[i]].Codigo_pecas;
                text_catalogo_codigo.textContent = CodigoPecas;
    
                ImgPecas = data_Base.Tampa_Traseira[arr[i]].ImgURL
                catalogo_primario_img.src = ImgPecas;
    
                // MENU
                Menu_NomePecas = data_Base.Tampa_Traseira[arr[i]].Nome_Pecas;
                menu_nome_pecas.textContent = Menu_NomePecas;
    
                Menu_TipoPecas = data_Base.Tampa_Traseira[arr[i]].Tipo_Pecas;
                menu_tipo_pecas.textContent = Menu_TipoPecas;
    
                Menu_CodigoPecas = data_Base.Tampa_Traseira[arr[i]].Codigo_pecas;
                menu_codigo_pecas.textContent = Menu_CodigoPecas;
    
                Menu_MarcaPecas = data_Base.Tampa_Traseira[arr[i]].Marca;
                menu_marca_pecas.textContent = Menu_MarcaPecas;
    
                Menu_a = data_Base.Tampa_Traseira[arr[i]].Link_ML;
                a_btn_ml.href = Menu_a;
    
                Menu_ImgPecas   = data_Base.Tampa_Traseira[arr[i]].ImgURL;
                menu_img.src = Menu_ImgPecas; 
          
       }
    }

    todos_escolha= "";
    estado_valor = 1;
if(id_recebimento_armazenamento == 0){ // Geral
    Amarzenador_id = tam_trasei_loop + parachoque_loop +paralama_loop +
    painel_dian_loop + painel_tra_loop + lateral_loop + porta_loop + capo_loop;

}else if (id_recebimento_armazenamento == 1){ //Capo
    Amarzenador_id =  capo_loop;
}else if (id_recebimento_armazenamento == 2){ //Porta
    Amarzenador_id = porta_loop;
}else if (id_recebimento_armazenamento == 3){ //Lateral
    Amarzenador_id = lateral_loop;
}else if (id_recebimento_armazenamento == 4){ //Painel_Traseiro
    Amarzenador_id = painel_tra_loop; 
}else if (id_recebimento_armazenamento == 5){ //Painel_Dianteiro
    Amarzenador_id = painel_dian_loop;
}else if (id_recebimento_armazenamento == 6){ //Parachoque
    Amarzenador_id =  parachoque_loop;
}else if (id_recebimento_armazenamento == 7){ //Paralamas
    Amarzenador_id = paralama_loop;
}else if (id_recebimento_armazenamento == 8){ //Tampa_Traseira
    Amarzenador_id = tam_trasei_loop
}


}
//================================================================


