
document.getElementById("addform")
.addEventListener("submit", async(e)=>{
    e.preventDefault();

    const tecnologia = document.getElementById('tecnologia').value;
    const destaque = document.getElementById('destaque').value;
    
    await addFormulario(tecnologia,destaque);

});

// EDIT


async function addFormulario(tecnologia, destaque) {
    
    const formData = new FormData();
    formData.append("tecnologia", tecnologia);
    formData.append("destaque", destaque);

    await fetch("/admin/habilidade/add", {
        method: "post",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "*/*"
        },
        body: new URLSearchParams(formData)
    }).then(res=>res.json())
    .then(res=>{

        if(res.status == 201){
            alert("Registado com sucesso!");

            location.href = "/admin/habilidade";
        }
        else{
            console.log(res);
            alert("Houve um erro ao registar!");
        }
        
    })
    .catch(error=>{
        console.log(`ERROR: ${error}`);
    });

}