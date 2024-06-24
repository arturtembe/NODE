
const editArray = [...document.getElementsByClassName("arraw-btn-edit")];
const deleteArray = [...document.getElementsByClassName("arraw-btn-delete")];

// ===================== EDIT ==============

editArray.forEach(el=>{

    el.addEventListener("click", (e)=>{

        let href = e.target.getAttribute("data-href");
        
        location.href = href;
    });

});

// ===================== DELETE ==============

deleteArray.forEach(el=>{

    el.addEventListener("click", async(e)=>{

        let id = e.target.getAttribute("data-id");
        
        await fetch(`/admin/projecto/delete/${id}`)
        .then(res=>res.json())
        .then(res=>{
            
            if(res.status == 201){
                document.getElementById(id).remove();
            }
            else{
                alert("Houve um erro ao remover");
                console.log(res);
            }
        })
        .catch(error=>{
            console.log(`ERROR: ${error}`);
        });
        
    });

});