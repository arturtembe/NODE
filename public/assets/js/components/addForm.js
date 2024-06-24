
export default async function addFormulario(tecnologia) {
    
    const formData = new FormData();
    formData.append("tecnologia", tecnologia);

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