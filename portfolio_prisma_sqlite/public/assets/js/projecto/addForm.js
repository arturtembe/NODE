
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
document.getElementById('files').addEventListener("change", async(e)=>{
    let files = [];
    files = e.target.files;
});
*/


// ===================== FORM ==============

document.getElementById("addform").addEventListener("submit", async(e)=>{
    e.preventDefault();

    if(tecnologiaArray.length==0){
        alert(`Por favor deve selecionar pelo menos uma tecnologia`);
        return;
    }

    const titulo = document.getElementById('titulo').value;
    const github = document.getElementById('github').value;
    const live = document.getElementById('live').value;
    const estado = document.getElementById('estado').value;
    const destaque = document.getElementById('destaque').value;
    const files = document.getElementById('files').value;
    const images = document.getElementById('images').value;
    
    await addFormulario(titulo,github,live,estado,destaque,
        files, images);

});

async function addFormulario(titulo,github,live,estado,destaque, files, images) {
    
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("github", github);
    formData.append("live", live);
    formData.append("estado", estado);
    formData.append("logotipo", files);
    formData.append("destaque", destaque);
    formData.append("images", images);

    tecnologiaArray.forEach(el=>{
        formData.append("tecnologia[]", el);
    });

    await fetch("/admin/projecto/add", {
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
            //console.log(res);
            location.href = "/admin/projecto";
        }
        else{
            alert("Houve um erro ao registar!");
            console.log(res);
        }
        
    })
    .catch(error=>{
        console.log(`ERROR: ${error}`);
    });

}