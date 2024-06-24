import { Request,Response } from "express";
import { deletedProjectoCase } from "../../services/projecto/delete.projecto.services";

export class DeletedProjectoController{

    async handle(req:Request,res:Response){
        
        const id:string = req.params.id;

        const projectoCase=new deletedProjectoCase();

        if(await projectoCase.verifyID(id))
        {
            await projectoCase.execute(id);
            
            return res.status(201).json({status: 201, result:{}});
            return;
        }
        
        return res.status(401).json({status: 401, result:{}});
        
    }

}