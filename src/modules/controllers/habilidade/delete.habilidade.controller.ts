import { Request,Response } from "express";
import { deletedHabilidadeCase } from "../../services/habilidade/delete.habilidade.services";

export class DeletedHabilidadeController{

    async handle(req:Request,res:Response){
        
        const id:string = req.params.id;

        const habilidadeCase=new deletedHabilidadeCase();

        const result= await habilidadeCase.execute(id);

        return res.status(201).json({status: 201, result});
        
    }

}