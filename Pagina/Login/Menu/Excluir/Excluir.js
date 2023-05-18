
      
        import { initializeApp } from
        "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
       import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
       import { getAuth, signInWithEmailAndPassword} 
        from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js'
        import firebaseConfig from "../../21aqmq5v.e5a.js";
        import { getStorage,ref as sRef , uploadBytesResumable, getDownloadURL }
        from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js"
 
        import {getDatabase,ref,get,set , child,update,remove}
        from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"

       // Initialize Firebase
       const app = initializeApp(firebaseConfig);
       const analytics = getAnalytics(app);

       

       const dados_escritos= getDatabase();
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
                    alert("Não Encontrou dados")
                }
            })
            .catch((error)=>{
                alert("Falha ao buscar, erro:"+ error);
            })
        }

    function loop_Busca(){
        console.log("ENTROU")
        var img_delete
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
                
                 img_delete = data_Base.Capo[arr[i]].Imagem_nome;
                 console.log(img_delete)
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
                
            }
        }
    

    }


function deletando(){
    remove(ref(dados_escritos,"Pecas_Salvas/"+ tipo.value +"/"+  id_salvamento))
        .then(()=>{
            alert("Excluido com sucesso")

        })

        .catch((error)=>{
            alert("Falha ao salvar, erro:"+error);
        })

        
            const desertRef = sRef(storage, `/Pecas_Salvas/${delt}`)
            console.log(desertRef)
                 // Delete the file
            deleteObject(desertRef)
            .then(() => {
            // File deleted successfully
            }).catch((error) => {
            alert(error)
            });

            document.getElementById("Imagem_pc").src = "";
            document.getElementById("namebox").value = "";
            document.getElementById("extlab").innerHTML = "";
            document.getElementById("nome_pecas").value = "";
            document.getElementById("codigo_pecas").value = "";
            document.getElementById("url_ml").value = "";
            document.getElementById("marca").value = "";
            document.getElementById("tipo_pecas").value = "";
}



var btn_upload = document.getElementById('Excluir');
btn_upload. addEventListener('click',deletando);

var btn_Busc = document.getElementById("btn_busc");
btn_Busc.addEventListener('click',loop_Busca)





})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
});