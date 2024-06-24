
document.getElementById("addform")
.addEventListener("submit", async(e)=>{
    e.preventDefault();

    const senha = document.getElementById('senha').value;
    
    await addFormulario(senha);

});

// EDIT


async function addFormulario(senha) {
    
    const formData = new FormData();
    formData.append("email", `turazdev@gmail.com`);
    formData.append("senha", senha);

    await fetch("/admin/user/login", {
        method: "post",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "*/*"
        },
        body: new URLSearchParams(formData)
    }).then(res=>res.json())
    .then(res=>{

        //console.log(res);
        if(res.status == 201){
            location.href = "/admin/projecto";
        }
        else if(res.status == 401){
            alert(res.message);
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