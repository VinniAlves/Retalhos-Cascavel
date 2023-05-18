
      
        import { initializeApp } from
        "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
       import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
       
       import { getAuth, signInWithEmailAndPassword} 
       from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js'

       import { getStorage,ref as sRef , uploadBytesResumable, getDownloadURL }
       from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js"

       import {getDatabase,ref,get,set , child,update,remove}
       from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"

       import firebaseConfig from "../../21aqmq5v.e5a.js";
     

     
       // Initialize Firebase
       const app = initializeApp(firebaseConfig);
       const analytics = getAnalytics(app);

       

       const dados_escritos = getDatabase();
       //Salva uma nova id de cadastro no bd
       const auth = getAuth(app);

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

       //=================================================
       var Salvar_id   =1;
       
      
       

       

   
      

   
/*===========Atualizar dados======================*/
   
 var btn_Busc = document.getElementById("btn_busc");
 var cod_busc = document.getElementById("cod_busc");


var verifica_link_url_img;
var varif=1;
var recebe_tipo
function loop_Atualizar(){
   var validador_de_IFS =0;
    //CAPO
    var capo_loop = Object.keys(data_Base.Capo).length
    
    for(var i=0;i< capo_loop;i++){
       
        var arr = Object.keys(data_Base.Capo)
        
        
        if(data_Base.Capo[arr[i]].Codigo_pecas == cod_busc.value){
            
            id_salvamento = data_Base.Capo[arr[i]].Id;
            nome_peca.value = data_Base.Capo[arr[i]].Nome_Pecas;
            codigo_peca.value = data_Base.Capo[arr[i]].Codigo_pecas;
            link_ml.value = data_Base.Capo[arr[i]].Link_ML;
            marca.value = data_Base.Capo[arr[i]].Marca;
            tipo.value = data_Base.Capo[arr[i]].Tipo_Pecas;
            campo_img.src = data_Base.Capo[arr[i]].ImgURL;

            var nome_img = data_Base.Capo[arr[i]].Imagem_nome;
            var nomearray = nome_img.split(".");
            namebox.value = nomearray[0];
            extlab.innerHTML = "."+nomearray[1];
            
            
            verifica_link_url_img = campo_img.src;
            
            recebe_tipo= tipo.value;
            validador_de_IFS++
        }
    }

    //PORTA
    var porta_loop = Object.keys(data_Base.Porta).length

    for(var i=0;i< porta_loop;i++){
        var arr = Object.keys(data_Base.Porta)
        if(data_Base.Porta[arr[i]].Codigo_pecas == cod_busc.value){

            id_salvamento = data_Base.Porta[arr[i]].Id;
            nome_peca.value = data_Base.Porta[arr[i]].Nome_Pecas;
            codigo_peca.value = data_Base.Porta[arr[i]].Codigo_pecas;
            link_ml.value = data_Base.Porta[arr[i]].Link_ML;
            marca.value = data_Base.Porta[arr[i]].Marca;
            tipo.value = data_Base.Porta[arr[i]].Tipo_Pecas;
            campo_img.src = data_Base.Porta[arr[i]].ImgURL;

            var nome_img = data_Base.Porta[arr[i]].Imagem_nome;
            var nomearray = nome_img.split(".");
            namebox.value = nomearray[0];
            extlab.innerHTML = "."+nomearray[1];
            recebe_tipo= tipo.value;
            verifica_link_url_img = campo_img.src;
            validador_de_IFS++
        }
    }

    //LATERAL
    var lateral_loop = Object.keys(data_Base.Lateral).length

    for(var i=0;i< lateral_loop;i++){
        var arr = Object.keys(data_Base.Lateral)
        if(data_Base.Lateral[arr[i]].Codigo_pecas == cod_busc.value){

            id_salvamento = data_Base.Lateral[arr[i]].Id;
            nome_peca.value = data_Base.Lateral[arr[i]].Nome_Pecas;
            codigo_peca.value = data_Base.Lateral[arr[i]].Codigo_pecas;
            link_ml.value = data_Base.Lateral[arr[i]].Link_ML;
            marca.value = data_Base.Lateral[arr[i]].Marca;
            tipo.value = data_Base.Lateral[arr[i]].Tipo_Pecas;
            campo_img.src = data_Base.Lateral[arr[i]].ImgURL;

            var nome_img = data_Base.Lateral[arr[i]].Imagem_nome;
            var nomearray = nome_img.split(".");
            namebox.value = nomearray[0];
            extlab.innerHTML = "."+nomearray[1];
            recebe_tipo= tipo.value;
            validador_de_IFS++
            verifica_link_url_img = campo_img.src;

        }
    }

    //PAINEL TRASEIRO
    var painel_tra_loop = Object.keys(data_Base.Painel_Traseiro).length

    for(var i=0;i<painel_tra_loop;i++){
        var arr = Object.keys(data_Base.Painel_Traseiro)
        if(data_Base.Painel_Traseiro[arr[i]].Codigo_pecas == cod_busc.value){

            id_salvamento = data_Base.Painel_Traseiro[arr[i]].Id;
            nome_peca.value = data_Base.Painel_Traseiro[arr[i]].Nome_Pecas;
            codigo_peca.value = data_Base.Painel_Traseiro[arr[i]].Codigo_pecas;
            link_ml.value = data_Base.Painel_Traseiro[arr[i]].Link_ML;
            marca.value = data_Base.Painel_Traseiro[arr[i]].Marca;
            tipo.value = data_Base.Painel_Traseiro[arr[i]].Tipo_Pecas;
            campo_img.src = data_Base.Painel_Traseiro[arr[i]].ImgURL;

            var nome_img = data_Base.Painel_Traseiro[arr[i]].Imagem_nome;
            var nomearray = nome_img.split(".");
            namebox.value = nomearray[0];
            extlab.innerHTML = "."+nomearray[1];
            recebe_tipo= tipo.value;
            validador_de_IFS++
            verifica_link_url_img = campo_img.src;
        }
    }

    //PAINEL DIANTEIRO
    var painel_dian_loop = Object.keys(data_Base.Painel_Dianteiro).length

    for(var i=0;i< painel_dian_loop;i++){
        var arr = Object.keys(data_Base.Painel_Dianteiro)
        if(data_Base.Painel_Dianteiro[arr[i]].Codigo_pecas == cod_busc.value){

            id_salvamento = data_Base.Painel_Dianteiro[arr[i]].Id;
            nome_peca.value = data_Base.Painel_Dianteiro[arr[i]].Nome_Pecas;
            codigo_peca.value = data_Base.Painel_Dianteiro[arr[i]].Codigo_pecas;
            link_ml.value = data_Base.Painel_Dianteiro[arr[i]].Link_ML;
            marca.value = data_Base.Painel_Dianteiro[arr[i]].Marca;
            tipo.value = data_Base.Painel_Dianteiro[arr[i]].Tipo_Pecas;
            campo_img.src = data_Base.Painel_Dianteiro[arr[i]].ImgURL;

            var nome_img = data_Base.Painel_Dianteiro[arr[i]].Imagem_nome;
            var nomearray = nome_img.split(".");
            namebox.value = nomearray[0];
            extlab.innerHTML = "."+nomearray[1];
            recebe_tipo= tipo.value;
            validador_de_IFS++
            verifica_link_url_img = campo_img.src;
        }
    }

    //PARACHOQUE
    var parachoque_loop = Object.keys(data_Base.Parachoque).length

    for(var i=0;i< parachoque_loop;i++){
        var arr = Object.keys(data_Base.Parachoque)
        if(data_Base.Parachoque[arr[i]].Codigo_pecas == cod_busc.value){

            id_salvamento = data_Base.Parachoque[arr[i]].Id;
            nome_peca.value = data_Base.Parachoque[arr[i]].Nome_Pecas;
            codigo_peca.value = data_Base.Parachoque[arr[i]].Codigo_pecas;
            link_ml.value = data_Base.Parachoque[arr[i]].Link_ML;
            marca.value = data_Base.Parachoque[arr[i]].Marca;
            tipo.value = data_Base.Parachoque[arr[i]].Tipo_Pecas;
            campo_img.src = data_Base.Parachoque[arr[i]].ImgURL;

            var nome_img = data_Base.Parachoque[arr[i]].Imagem_nome;
            var nomearray = nome_img.split(".");
            namebox.value = nomearray[0];
            extlab.innerHTML = "."+nomearray[1];
            recebe_tipo= tipo.value;
            validador_de_IFS++
            verifica_link_url_img = campo_img.src;
            
        }
    }

    //PARALAMA
    var paralama_loop = Object.keys(data_Base.Paralama).length

    for(var i=0;i< paralama_loop;i++){
        var arr = Object.keys(data_Base.Paralama)
        if(data_Base.Paralama[arr[i]].Codigo_pecas == cod_busc.value){

            id_salvamento = data_Base.Paralama[arr[i]].Id;
            nome_peca.value = data_Base.Paralama[arr[i]].Nome_Pecas;
            codigo_peca.value = data_Base.Paralama[arr[i]].Codigo_pecas;
            link_ml.value = data_Base.Paralama[arr[i]].Link_ML;
            marca.value = data_Base.Paralama[arr[i]].Marca;
            tipo.value = data_Base.Paralama[arr[i]].Tipo_Pecas;
            campo_img.src = data_Base.Paralama[arr[i]].ImgURL;

            var nome_img = data_Base.Paralama[arr[i]].Imagem_nome;
            var nomearray = nome_img.split(".");
            namebox.value = nomearray[0];
            extlab.innerHTML = "."+nomearray[1];
            data_Base.Paralama[arr[i]]
            recebe_tipo= tipo.value;
            validador_de_IFS++
            verifica_link_url_img = campo_img.src;
        }
    }

    //TAMPA TRASEIRA
    var tam_trasei_loop= Object.keys(data_Base.Tampa_Traseira).length

    for(var i=0;i<tam_trasei_loop;i++){
        var arr = Object.keys(data_Base.Tampa_Traseira)
        if(data_Base.Tampa_Traseira[arr[i]].Codigo_pecas == cod_busc.value){

            id_salvamento = data_Base.Tampa_Traseira[arr[i]].Id;
            nome_peca.value = data_Base.Tampa_Traseira[arr[i]].Nome_Pecas;
            codigo_peca.value = data_Base.Tampa_Traseira[arr[i]].Codigo_pecas;
            link_ml.value = data_Base.Tampa_Traseira[arr[i]].Link_ML;
            marca.value = data_Base.Tampa_Traseira[arr[i]].Marca;
            tipo.value = data_Base.Tampa_Traseira[arr[i]].Tipo_Pecas;
            campo_img.src = data_Base.Tampa_Traseira[arr[i]].ImgURL;

            var nome_img = data_Base.Tampa_Traseira[arr[i]].Imagem_nome;
            var nomearray = nome_img.split(".");
            namebox.value = nomearray[0];
            extlab.innerHTML = "."+nomearray[1];
            recebe_tipo= tipo.value;
            validador_de_IFS++
            verifica_link_url_img = campo_img.src;
            
        }
    }
    
    if(validador_de_IFS == 0){
        alert("Nenhum dado encontrado")
    }




    
   
}

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





function salvamento_upload(){
    
    if(recebe_tipo == tipo.value){

        update(ref(dados_escritos, "Pecas_Salvas/"+ tipo.value+"/"+id_salvamento),{
            Nome_Pecas: nome_peca.value,
            Codigo_pecas: codigo_peca.value,
            Link_ML: link_ml.value,
            Marca: marca.value,
            Tipo_Pecas: tipo.value,
            Imagem_nome: (namebox.value + extlab.innerHTML),
            ImgURL: campo_img.src
            
})
alert("Peça Registrada com Sucesso!!")
    }else{
        


        remove(ref(dados_escritos,"Pecas_Salvas/"+ recebe_tipo +"/"+  id_salvamento))
        .then(()=>{
            //alert("EXCLUIDO")
            readicionar();
        })

        .catch((error)=>{
            alert("Falha ao salvar, erro:"+error);
        })


        
        function readicionar(){
                if(verifica_link_url_img == campo_img.src){
                    var name = namebox.value;
                    var ext = extlab.innerHTML;
        
                    const dbref = ref(dados_escritos);
        
                
                    set(ref(dados_escritos, "Pecas_Salvas/"+ tipo.value + "/" +  id_salvamento),{
                        Id: id_salvamento,
                        Nome_Pecas: nome_peca.value,
                        Codigo_pecas: codigo_peca.value,
                        Link_ML: link_ml.value,
                        Marca: marca.value,
                        Tipo_Pecas: tipo.value,
                        Imagem_nome: (name+ext),
                        ImgURL: campo_img.src
                
                    })
        
                    .then(()=>{
                        alert("Peça Registrada com Sucesso!!")
                    })
                    .catch((error)=>{
                        alert("Falhar ao salvar, erro:"+error);
                    })
                }else{
                    UploadProcess()


                }

                

        function Inserir_dados(URL){
    
                var name = namebox.value;
                var ext = extlab.innerHTML;
    
                const dbref = ref(dados_escritos);
    
            
                set(ref(dados_escritos, "Pecas_Salvas/"+ tipo.value + "/" +  id_salvamento),{
                    Id: id_salvamento,
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
    
    
           
        }
        
    }

   
    Iniciar_Busc_dados()

}

var btn_upload = document.getElementById('Atualizar');
btn_upload. addEventListener('click',salvamento_upload);

btn_Busc.addEventListener('click',loop_Atualizar);


})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
});