
import multer from "multer";

//import crypto from "crypto";

// Configuracao de armazenamento
const storage = multer.diskStorage({
    
    destination: function (req, file, cb){
        cb(null, process.cwd()+"/public/uploads")
    },
    filename: function (req, file, cb){
        // Extracao da extensao do arquivo original
        const extensaoArquivo = file.originalname.split('.')[1];

        //const novoNomeArquivo = crypto.randomBytes(64).toString('hex');
        const novoNomeArquivo = `${new Date().getDay()}${new Date().getMonth()}${new Date().getFullYear()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${new Date().getMilliseconds()}`;

        req.user = `${novoNomeArquivo}.${extensaoArquivo}`; 
        
        // Indica o novo nome do arquivo
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)

    }
    
});

//const uploadMulter = multer({ storage: multer.memoryStorage() }); 
const uploadMulter = multer({ storage }); 

export default uploadMulter;
