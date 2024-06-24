
const tecnologia = [...document.getElementsByClassName("btn-add-tecn")]

let tecnologiaArray = [];

tecnologia.forEach(el=>{

    el.addEventListener("click", (e)=>{

        let id = e.target.getAttribute("data-id");
        
        if(e.target.classList.contains("btn-add-tecn-selected")){
            e.target.classList.remove("btn-add-tecn-selected");
            
            tecnoFilter(id)
        
            return;
        }

        tecnologiaArray.push(id)

        e.target.classList.add("btn-add-tecn-selected");
    });

});

function tecnoFilter(id){

    tecnologiaArray.forEach((el,i)=>{
        
        if(id === el){
            tecnologiaArray.splice(i, 1);
            //console.log(el);
        }
    });

}

// ================ IMAGE =================
/*
document.getElementById('files')
.addEventListener("change", async(e)=>{
    let files = [];
    files = e.target.files;
    document.getElementById("imgEditForm").src = URL.createObjectURL(e.target.files[0]);
});
*/

// ===================== FORM ==============

document.getElementById("editform").addEventListener("submit", async(e)=>{
    e.preventDefault();

    if(tecnologiaArray.length==0){
        //alert(`Por favor deve selecionar pelo menos uma tecnologia`);
        //return;
    }

    const titulo = document.getElementById('titulo').value;
    const github = document.getElementById('github').value;
    const live = document.getElementById('live').value;
    const estado = document.getElementById('estado').value;
    const id = document.getElementById('idForm').value;
    const destaque = document.getElementById('destaque').value;
    const files = document.getElementById('files').value;
    const images = document.getElementById('images').value;
    
    // DATA
    let data = await editFormularioData(id,titulo,github,live,estado,destaque,files,images);

    if(data.status == 201){
        
        // TECNOLOGIA
        let tecnologiaData = await editFormularioTecnologia(id);

        if(tecnologiaData.status == 201){
            alert("Actualizado com sucesso!");
            //console.log(data);
            location.href = "/admin/projecto";
        }
        else{
            alert("Houve um erro ao actualizar Tecnologia!");
            console.log(tecnologiaData);
        }
        
    }
    else{
        alert("Houve um erro ao actualizar Data!");
        console.log(data);
    }
    
});

// DATA
async function editFormularioData(id,titulo,github,live,estado, destaque,files,images) {
    
    let endpoint = `/admin/projecto/edit/data/${id}`;
    
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("github", github);
    formData.append("live", live);
    formData.append("estado", estado);
    formData.append("destaque", destaque);
    formData.append("logotipo", files);
    formData.append("images", images);
    
    return await fetch(endpoint, {
        method: "post",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "*/*"
        },
        body: new URLSearchParams(formData)
    }).then(res=>res.json())
    .then(res=>{
        return res;
    })
    .catch(error=>{
        console.log(`ERROR: ${error}`);
    });

}

// IMAGE
async function editFormularioImage(id) {
    
    let data;

    const formImage = new FormData();
    formImage.append("files", files[0]);
    
    return await fetch(`/admin/projecto/edit/upload/${id}`, {
        method: "post",
        headers:{
            "Accept": "*/*"
        },
        body: formImage
    }).then(res=>res.json())
    .then(res=>{
        return res;
    })
    .catch(error=>{
        console.log(`ERROR: ${error}`);
    });

}

// DATA
async function editFormularioTecnologia(id) {
    
    let data;

    const formTecnologia = new FormData();
    let tecnSelect = [...document.getElementsByClassName("btn-add-tecn-selected")];

    tecnSelect.forEach(el=>{
        formTecnologia.append("tecnologia[]", el.getAttribute("data-id"));
    })
    
    return await fetch(`/admin/projecto/edit/tecnologia/${id}`, {
        method: "post",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "*/*"
        },
        body: new URLSearchParams(formTecnologia)
    }).then(res=>res.json())
    .then(res=>{
        return res;
    })
    .catch(error=>{
        console.log(`ERROR: ${error}`);
    });

}
