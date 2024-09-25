
const docDelete = [...document.getElementsByClassName("btn-delete")]


docDelete.forEach(el => {
    
    el.addEventListener("click", async(e)=>{
        e.preventDefault();
    
        const id = e.target.getAttribute('data-id');
        
        await deleteFormulario(id);

    });

});

// DELETE

async function deleteFormulario(id) {
    
    await fetch(`/admin/habilidade/delete/${id}`)
    .then(res=>res.json())
    .then(res=>{

        if(res.status == 201){
            //alert("Removido com sucesso!");
            document.getElementById(id).remove()
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
