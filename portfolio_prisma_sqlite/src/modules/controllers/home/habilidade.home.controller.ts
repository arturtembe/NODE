import { Request,Response } from "express";
import { HabilidadeReleaseModel, viewHabilidadeDTO } from "../../models/habilidade/view.habilidade.models";
import { GetHabilidadeReleaseDateCase } from "../../services/habilidade/view.habilidade.services";

export class GetHabilidade_Home_Controller{

    async viewHabilidadeHome(req:Request,res:Response){
        
        // HABILIDADE
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
            title: `Habilidade - My Portfolio`,
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
        let header = {
            inicio: "",
            habilidade: "active-link",
            projecto: "",
            contacto: ""
        }
        let query = { 
            habilidade: resultHabilidade,
            header,
            head 
        }

        return res.render("habilidade", query);
    }

}