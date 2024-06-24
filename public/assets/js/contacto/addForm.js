
// ===================== FORM ==============

// =================== RESET ===========
document.getElementById("contactForm").addEventListener("reset", async(e)=>{
    e.preventDefault();

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("conteudo").value = "";
    let msg = document.getElementById("msg");

    if(msg.classList.contains("error")){
        msg.classList.remove("error");
    }

    if(msg != "" || msg != null || typeof msg != undefined){
        msg.innerHTML = "";
    }

    if(msg.classList.contains("sucesso")){
        msg.classList.remove("sucesso");    
    }

    document.getElementById("reset").classList.add("active");

});

// =================== SUBMIT =========

document.getElementById("contactForm").addEventListener("submit", async(e)=>{
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let conteudo = document.getElementById("conteudo").value;
    let msg = document.getElementById("msg");

    if(msg.classList.contains("sucesso")){
        msg.classList.remove("sucesso");
    }

    if(!msg.classList.contains("error")){
        //msg.classList.remove("error");    
        msg.classList.add("error");    
    }

    if(nome == "" || nome == null || typeof nome == undefined){
        msg.innerHTML = "O campo de nome nao pode ser enviada vazia!";
        return;
    }
    if(email == "" || email == null || typeof email == undefined){
        msg.innerHTML = "O campo de email nao pode ser enviada vazia!";
        return;
    }
    if(conteudo == "" || conteudo == null || typeof conteudo == undefined){
        msg.innerHTML = "O campo de conteudo nao pode ser enviada vazia!";
        return;
    }

    await addFormulario(nome,email,conteudo);

});

async function addFormulario(nome,email,conteudo) {
    
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("conteudo", conteudo);

    await fetch("/contacto/send", {
        method: "post",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "*/*"
        },
        body: new URLSearchParams(formData)
    }).then(res=>res.json())
    .then(res=>{

        if(res.status == 201){
            
            if(msg.classList.contains("error")){
                msg.classList.remove("error");
            }
            if(!msg.classList.contains("sucesso")){
                msg.classList.add("sucesso");
            }
            
            msg.innerHTML = "Enviada com sucesso!";
            document.getElementById("reset").classList.remove("active");
            
            //console.log(res);
        }
        else{
            if(msg.classList.contains("sucesso")){
                msg.classList.remove("sucesso");
            }
            if(!msg.classList.contains("error")){
                msg.classList.add("error");
            }
            
            msg.innerHTML = "Houve um erro ao enviar!";
            document.getElementById("reset").classList.remove("active");
            
            //console.log(res);
        }
        
    })
    .catch(error=>{

        if(msg.classList.contains("sucesso")){
            msg.classList.remove("sucesso");
        }
        if(!msg.classList.contains("error")){
            msg.classList.add("error");
        }
        
        msg.innerHTML = "Houve um erro interno!";
        document.getElementById("reset").classList.remove("active");

        //console.log(`ERROR: ${error}`);
    });

}