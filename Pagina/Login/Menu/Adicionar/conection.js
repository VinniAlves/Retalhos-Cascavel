
      
        import { initializeApp } from
         "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

        import { getAnalytics } 
        from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
        
        import { getStorage,ref as sRef , uploadBytesResumable, getDownloadURL }
        from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js"

        import {getDatabase,ref,get,set , child,update,remove}
        from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"
        
        import { getAuth, signInWithEmailAndPassword} 
        from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js'

        import firebaseConfig from "../../21aqmq5v.e5a.js";
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);

        
        const auth = getAuth(app);
        const dados_escritos= getDatabase();
        //Salva uma nova id de cadastro no bd
        
        const email = localStorage.getItem("emailImport");
        const senha = localStorage.getItem("senhaImport");
    
        signInWithEmailAndPassword(auth ,email,senha
            )
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

        //===========Pagina Adicionar=============
        var nome_peca = document.getElementById('nome_pecas')
        var codigo_peca = document.getElementById('codigo_pecas')
        var link_ml = document.getElementById('url_ml')
        var marca = document.getElementById('marca')
        var tipo = document.getElementById('tipo_pecas')
        var campo_img = document.getElementById('Imagem_pc')
        var id_salvamento;
        var extlab = document.getElementById('extlab')
        var namebox = document.getElementById('namebox')

        var btn_add = document.getElementById('upload')
        var btn_select = document.getElementById('selecionar')
        
        //===================================================

        //=========== Cadastrar imagens ===============
        var files = [];
        var reader = new FileReader();
        
        var input = document.createElement('input');

        input.type = 'file';
    
        input.onchange = e =>{
            files = e.target.files;
    
        var extention = GetFileExt(files[0]);
        var name = GetFileName(files[0]);
    
            namebox.value= name;
            extlab.innerHTML = extention;
    
    reader.readAsDataURL(files[0]);
        }
    
        reader.onload = function(){
            campo_img.src = reader.result;
        }
        
/*
        btn_select.addEventListener('click',btn_select_func)
        function btn_select_func(){
            input.click();
        }
*/

        btn_select.onclick = function(){
            input.click();
        }


        function GetFileExt(file){
            var temp= file.name.split('.');
            var ext= temp.slice((temp.length-1),(temp.length));
            return '.' + ext[0];
        }
    
        function GetFileName(file){
            var temp = file.name.split('.');
            var fname = temp.slice(0,-1).join('.');
            return fname;
        }
        
        //=================================================
        
        
        var VariavelSalvadoraUltID=1;
        var ControleConsultaID=1;
        var data_Base;
        window.onload = Iniciar_Busc_dados();
        
        

        function Iniciar_Busc_dados(){
            const dbref = ref(dados_escritos);
            get(child(dbref,"Pecas_Salvas/"))
            .then((snaphot)=>{
                if(snaphot.exists()){

                    data_Base = snaphot.val()      
                      
                }
                else{
                    alert("nao achou o dado")
                }
            })
            .catch((error)=>{
                alert("Falha ao buscar, erro:"+ error);
            })
        }

        function buscar_Ultimo_ID(){
            
            //if (data_Base.Capo == "undefined"){ }else{
                var capo_id = Object.keys(data_Base.Capo).at(-1) 
            //}

           // if(typeof data_Base.Porta == "undefined" ){ }else{
                var porta_id = Object.keys(data_Base.Porta).at(-1)
           // }
            
           // if(typeof data_Base.Tampa_Traseira == "undefined" ){ } else{
                var tamTraseira_id = Object.keys(data_Base.Tampa_Traseira).at(-1)
           // }

           // if(typeof data_Base.Paralama =="undefined"){ }else{
                var paralama_id = Object.keys(data_Base.Paralama).at(-1)
          //  }
            
           // if(typeof data_Base.Parachoque == "undefined"){}else{
                var parachoque_id = Object.keys(data_Base.Parachoque).at(-1)
           // }
            
           // if(typeof data_Base.Lateral == "undefined"){ }else{
                var lateral_id = Object.keys(data_Base.Lateral).at(-1)
           // }
            
           // if(typeof data_Base.Painel_Dianteiro == "undefined"){}else{
                var paineldian_id = Object.keys(data_Base.Painel_Dianteiro).at(-1)
           // }
            
           // if(typeof data_Base.Painel_Traseiro == "undefined"){}else{
                var paineltrasei_id = Object.keys(data_Base.Painel_Traseiro).at(-1)
           //}
            
            var Maior_Valor = Math.max(
                capo_id, porta_id, tamTraseira_id,
                paralama_id, parachoque_id, lateral_id,
                paineldian_id, paineltrasei_id
                )

                 VariavelSalvadoraUltID = Maior_Valor + 1;
            
            
                UploadProcess()
        }

        


    function Inserir_dados(URL){

            var name = namebox.value;
            var ext = extlab.innerHTML;

            const dbref = ref(dados_escritos);

        
            set(ref(dados_escritos, "Pecas_Salvas/"+ tipo.value + "/" +  VariavelSalvadoraUltID),{
                Id:  VariavelSalvadoraUltID,
                Nome_Pecas: nome_peca.value,
                Codigo_pecas: codigo_peca.value,
                Link_ML: link_ml.value,
                Marca: marca.value,
                Tipo_Pecas: tipo.value,
                Imagem_nome: (name+ext),
                ImgURL: URL
        
            })

            .then(()=>{
                alert("Peça Registrada com Sucesso!!")
            })
            .catch((error)=>{
                alert("Falhar ao salvar, erro:"+error);
            })

        ControleConsultaID =1;
        
        }

        
      

        //=============Mandar para ao bd==================
        async function UploadProcess(){
            var ImgToUpload = files[0];
    
            var ImgName = namebox.value + extlab.innerHTML;
    
            if(!ValidateName()){
                alert('O nome não pode conter caracteres especiais');
                return;
            }
    
            const metaDate ={
                contentType: ImgToUpload.type
            }
    
            const storage= getStorage();
    
            const storageRef = sRef(storage , "Images/"+ImgName);
    
            const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaDate);
    
            UploadTask.on('state-changed', (snapshot)=>{
                var progess = (snapshot.bytesTrasferred / snapshot.totalBytes) * 100;
               // proglab.innerHTML = "Upload" + progess + "%";
            },
            
            (erros)=>{
                alert("Erro ao salvar imagem!");
            },
            ()=>{
                getDownloadURL(UploadTask.snapshot.ref).then((donwloadURL)=>{
                    Inserir_dados(donwloadURL);
    
                })
    
            }
            );
        }
        
        function ValidateName(){
            var regex = /[\.#$[\]]/
            return !(regex.test(namebox.value));
        }


        btn_add.addEventListener('click',buscar_Ultimo_ID)
       
      // btn_add.addEventListener('click',UploadProcess)
        

       /*======================= */
       

    
/*===========Atualizar dados======================*/
    
  var btn_Busc = document.getElementById("btn_busc");
  var cod_busc = document.getElementById("cod_busc");

  function SalvamendoDaUltimaIDLOOP(){

    const dbref = ref(dados_escritos);

    get(child(dbref ,"Pecas_Salvas/"+ Salvar_id))
        .then((snaphot)=>{

            if(snaphot.exists()){
                    Salvar_id++;
                   
                
                CallBackSalvamentoIDLOOP();
            }else{
               
                VariavelSalvadoraUltID = Salvar_id;
                
                loop_Atualizar();
            }
        
        })
        .catch((error)=>{
            alert("Falhar ao entrar nos dados,:"+error);
        })
        
}

function CallBackSalvamentoIDLOOP(){
    SalvamendoDaUltimaIDLOOP();
}


var varif=1;

function loop_Atualizar(){
    
    if(varif == 1){
        Salvar_id=1;
        varif=0;
    }

    const dbref = ref(dados_escritos);
    
    if(Salvar_id == VariavelSalvadoraUltID){
            alert("stop loop")
            varif=1;
    }
    else{

    
    get(child(dbref,"Pecas_Salvas/"+Salvar_id+"/"+cod_busc.value))
        .then((snaphot)=>{

            if(snaphot.val().Codigo_pecas == cod_busc.value){ 

                if(snaphot.exists()){
                    id_salvamento = snaphot.val().Id;
                    nome_peca.value = snaphot.val().Nome_Pecas;
                    codigo_peca.value = snaphot.val().Codigo_pecas;
                    link_ml.value = snaphot.val().Link_ML;
                    marca.value = snaphot.val().Marca;
                    tipo.value = snaphot.val().Tipo_Pecas;
                    campo_img.src = snaphot.val().ImgURL;

                    var nome_img = snaphot.val().Imagem_nome;
                    var nomearray = nome_img.split(".");
                    namebox.value = nomearray[0];
                    extlab.innerHTML = "."+nomearray[1];
                    //namebox.value=snaphot.val().Imagem_nome;


                    varif=1;

                    
                }else{
                    alert("nada")
                    console.log(Salvar_id)
                    varif=1;
                }
            }
           
        })
        .catch((error)=>{
           //alert("Falha ao salvar, erro:"+error);
            Salvar_id++;
            console.log(Salvar_id)
            callback_loop_Atualizar();
        })
    }
}



function callback_loop_Atualizar(){
loop_Atualizar()
}


function salvamento_upload(){
    update(ref(dados_escritos, "Pecas_Salvas/"+ id_salvamento),{
                Nome_Pecas: nome_peca.value,
                Codigo_pecas: codigo_peca.value,
                Link_ML: link_ml.value,
                Marca: marca.value,
                Tipo_Pecas: tipo.value,
                Imagem_nome: (namebox + extlab),
                ImgURL: campo_img

    })


}

})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
});