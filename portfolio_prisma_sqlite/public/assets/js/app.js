import addFormulario from "./components/addForm.js";

document.getElementById("addform").addEventListener("submit", async(e)=>{
    e.preventDefault();

    const tecnologia = document.getElementById('tecnologia').value;
    
    await addFormulario(tecnologia);

});

// EDIT
