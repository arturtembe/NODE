import { Request,Response } from "express";
import { createdHabilidadeCase } from "../../services/habilidade/create.habilidade.services";
import { FielsValidation } from "../../../validation/fields.validation";
import { editedHabilidadeCase } from "../../services/habilidade/edit.habilidade.services";
import { HabilidadeReleaseModel, viewHabilidadeDTO } from "../../models/habilidade/view.habilidade.models";
import { editedHabilidadeDTO } from "../../models/habilidade/edit.habilidade.models";

export class EditedHabilidadeController{

    async handle(req:Request,res:Response){
        
        const {destaque}=req.body;

        const id:string = req.params.id;

        const habilidadeCase=new editedHabilidadeCase();

        if(await habilidadeCase.verifyID(id)){
            await habilidadeCase.execute(id,destaque=='true'?true:false);
            
            return res.status(201).json({status: 201, result:{}});
            return;
        }

        return res.status(401).json({status: 401, result:{}});
        
    }

    async handleEdit(req:Request,res:Response){

        const id:string = req.params.id;

        const habilidadeCase=new editedHabilidadeCase();

        const result= await habilidadeCase.verifyID(id);

        // HEAD: TITLE 
        let head = {
            title: `${result?.tecnologia} - Administrador`,
            description: `
                Sou um desenvolvedor apaixonado 
                pelo que eu faco. Por isso estou sempre querendo 
                aprender algo novo que me ajude a ser 
                um desenvolvedor cada vez melhor.
            `,
            keywords: `
                HTML;CSS;JAVASCRIPT;
                TYPESCRIPT;REACT;NEXT;NODE;PHP;VUE;ANGULAR;LARAVEL;MYSQL;
                MONGODB;SQLITE;FIREBASE;GITHUB
            `
        }

        // CSS TAG HEADER
        let query = { 
            habilidade: result,
            head 
        }

        return res.render("admin/habilidade/edit", query);
    }
}