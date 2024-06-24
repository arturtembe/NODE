import { Request,Response } from "express";
import { FielsValidation } from "../../../validation/fields.validation";
import { createdProjectoCase } from "../../services/projecto/create.projecto.services";
import { createdProjectoDTO } from "../../models/projecto/create.projecto.models";
import { createdProjectoHabilidadeCase } from "../../services/projecto_habilidade/create.projecto_habilidade.services";
import { createdContactoDTO } from "../../models/contacto/create.contacto.models";
import { createdContactoCase } from "../../services/contacto/create.contacto.services";

export class CreatedContactoController{

    async handle(req:Request,res:Response){
        const {nome,email,conteudo}=req.body;

        let data:createdContactoDTO = {nome,email,message:conteudo}

        const contactoCase=new createdContactoCase();

        const contacto = await contactoCase.execute(data);

        return res.status(201).json({status: 201, contacto});
        
    }

}