
document.getElementById("editform").addEventListener("submit", async(e)=>{
    e.preventDefault();

    const tecnologia = document.getElementById('tecnologia').value;
    const id = document.getElementById('idForm').value;
    const destaque = document.getElementById('destaque').value;
    
    await editFormulario(id,tecnologia,destaque);

});


async function editFormulario(id,tecnologia,destaque) {
    
    const formData = new FormData();
    formData.append("tecnologia", tecnologia);
    formData.append("destaque", destaque);

    await fetch(`/admin/habilidade/edit/${id}`, {
        method: "post",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "*/*"
        },
        body: new URLSearchParams(formData)
    }).then(res=>res.json())
    .then(res=>{

        if(res.status == 201){
            alert("Actualizado com sucesso!");

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