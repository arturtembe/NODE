import { Request,Response } from "express";
import { createdHabilidadeCase } from "../../services/habilidade/create.habilidade.services";
import { FielsValidation } from "../../../validation/fields.validation";

export class CreatedHabilidadeController{

    async handle(req:Request,res:Response){
        const {tecnologia, destaque}=req.body;

        const slug:string = new FielsValidation().validSlug(tecnologia);
        
        const habilidadeCase=new createdHabilidadeCase();

        const result= await habilidadeCase.execute({tecnologia,slug, destaque: destaque=='true'?true:false});

        return res.status(201).json({status: 201, result});
        
        //res.status(201).json({status:201, destaque: destaque=='true'?true:false})
    }

    async handleAdd(req:Request,res:Response){

        // HEAD: TITLE 
        let head = {
            title: `Adicionar - Administrador`,
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
            head 
        }

        return res.render("admin/habilidade/add", query);
    }
}