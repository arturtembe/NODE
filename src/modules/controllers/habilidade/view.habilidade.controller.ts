import { Request,Response } from "express";
import { GetHabilidadeReleaseDateCase } from "../../services/habilidade/view.habilidade.services";
import { HabilidadeReleaseModel, viewHabilidadeDTO } from "../../models/habilidade/view.habilidade.models";

export class GetHabilidadeReleaseDateController{

    async handleAll(req:Request,res:Response){
        
        const getHabilidadeReleaseDateCase=new GetHabilidadeReleaseDateCase();

        const result=await getHabilidadeReleaseDateCase.execute();

        const resultHabilidade:viewHabilidadeDTO[] = [] 
        result.forEach(el=>{
            let habilidade = new HabilidadeReleaseModel();
            habilidade.setID(el.id)
            habilidade.setSlug(el.slug)
            habilidade.setTecnologia(el.tecnologia)

            resultHabilidade.push(habilidade.getAll())
        });
        
        // HEAD: TITLE 
        let head = {
            title: `Habilidade - Administrador`,
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
            habilidade: resultHabilidade,
            head 
        }

        return res.render("admin/habilidade/view", query);
    }

}