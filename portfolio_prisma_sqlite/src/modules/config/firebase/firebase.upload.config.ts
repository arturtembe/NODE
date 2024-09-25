import { NextFunction, Request, Response } from 'express';
import firebase from '../../config/firebase/firebase.connect';
import { getStorage, 
        ref as sRef, 
        uploadBytesResumable, 
        getDownloadURL } from "firebase/storage";
//import { readFileSync } from 'fs';
import { FielsValidation } from '../../../validation/fields.validation';
import { connectDB } from '../mongoose/mongodb.config';
import { imagesProductoSchema } from '../../services/mongodb/shopee/images.produto.shopee.services';
import MongoDBEndpointHelper from '../../helpers/mongodb.endpoint.helpers';

const storage = getStorage(firebase);

//let reader = new FileReader();

export const uploadFileStorage = async (req: Request, res: Response,
    next: NextFunction) => {
    
    //const ImgName = `${GetFileName(`${req.file?.originalname}`)}.${GetFileExt(`${req.file?.originalname}`)}`
    const ImgName = `${new FielsValidation().getDateNameNew()}.${GetFileExt(`${req.file?.originalname}`)}`

    var ImgToUpload = req.file;

    const metaData = {
        contentType: ImgToUpload?.mimetype,
        name: ImgToUpload?.originalname
    }

    const bffer:any = ImgToUpload?.buffer;

    const storageRef = sRef(storage, "Images/" + ImgName);

    const UploadTask = uploadBytesResumable(storageRef, bffer, metaData);

    UploadTask.on('state_changed', (snapshot)=>{
        
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        //console.log(`Upload ${progress}%`);
        
        //upprogress.innerHTML = `Upload ${progress}%`;
    },(error)=>{
        //alert("Error: Image not upload");
        //console.log(`Error: ${error}`);
        res.status(400).json({
            "status": 400,
            "message": `Image not upload`,
            "error": error
        });
    },()=>{
        getDownloadURL(UploadTask.snapshot.ref)
        .then(downloadURL=>{
            //console.log(downloadURL);
            //SaveURLtoFirestore(downloadURL);
            req.user = {
                nome: ImgName,
                url: downloadURL
            };
            next();
            //res.status(200).send(UploadTask.snapshot.ref);
        }).catch(error=>{
            //console.log("ERROR DOWNLOAD-URL: "+error);
            //res.status(422).send(`ERROR DOWNLOAD-URL`);
            res.status(422).json({
                "status": 422,
                "message": `ERROR DOWNLOAD-URL`,
                "error": error
            });
        });

    })
    
    //next();
    
    //res.status(200).send(GetFileExt(`${req.file?.originalname}`));
};

export const uploadFileStorageShopee = async (req: Request, res: Response,
    next: NextFunction) => {
    
        const files:any = req.files;

        for(const file of files){
            
            //const ImgName = `${GetFileName(`${req.file?.originalname}`)}.${GetFileExt(`${req.file?.originalname}`)}`
            const ImgName = `${new FielsValidation().getDateNameNew()}${GetFileExt(`${file?.originalname}`)}`

            var ImgToUpload = file;

            const metaData = {
                contentType: ImgToUpload?.mimetype,
                name: ImgToUpload?.originalname
            }

            const bffer:any = ImgToUpload?.buffer;

            const storageRef = sRef(storage, "Images/Shopee/" + ImgName);

            const UploadTask = uploadBytesResumable(storageRef, bffer, metaData);

            UploadTask.on('state_changed', (snapshot)=>{
                
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                //console.log(`Upload ${progress}%`);
                
                //upprogress.innerHTML = `Upload ${progress}%`;
            },(error)=>{
                //alert("Error: Image not upload");
                //console.log(`Error: ${error}`);
                res.status(400).json({
                    "status": 400,
                    "message": `Image not upload`,
                    "error": error
                });
            },()=>{
                getDownloadURL(UploadTask.snapshot.ref)
                .then(async(downloadURL)=>{
                    //console.log(downloadURL);
                    //SaveURLtoFirestore(downloadURL);
                    
                    //next();

                    const data = [{
                        nome: ImgName,
                        url: downloadURL,
                        producto: req.params.id
                    }];
            
                    await connectDB(MongoDBEndpointHelper.shopee);
            
                    await imagesProductoSchema.insertMany(data).then(async()=>{
                        
                        //let image = new ImageProductoShopeeMongoDbModel(el[0]).info()
                        
                    }).catch(error=>{
                        res.status(401).json({
                            "status":401,
                            "message": `Houve um erro ao registrar Images!`,
                            "error": error
                        });
                    });

                }).catch(error=>{
                    //console.log("ERROR DOWNLOAD-URL: "+error);
                    //res.status(422).send(`ERROR DOWNLOAD-URL`);
                    res.status(422).json({
                        "status": 422,
                        "message": `ERROR DOWNLOAD-URL`,
                        "error": error
                    });
                });

            })

    }

    res.status(200).json({
        "status":200,
        "product": {}
    });

};

function GetFileExt(filename:string){
    var temp = filename.split('.');
    var ext = temp.slice((temp.length-1),(temp.length))[0];
    
    return '.'+ext;
}

function GetFileName(filename:string){
    var temp = filename.split('.');
    var fname = temp.slice(0,-1).join('.');
    
    return fname;
}


