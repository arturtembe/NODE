import { Request,Response } from "express";
import { GetProjectoReleaseDateCase } from "../../services/projecto/view.projecto.services";
import { HabilidadeReleaseModel, viewHabilidadeDTO } from "../../models/habilidade/view.habilidade.models";
import { GetHabilidadeReleaseDateCase } from "../../services/habilidade/view.habilidade.services";

export class GetIndex_Home_Controller{

    async viewIndexHome(req:Request,res:Response){
        
        // HABILIDADE
        const getHabilidadeReleaseDateCase=new GetHabilidadeReleaseDateCase();

        const result=await getHabilidadeReleaseDateCase.executeDestaque();

        const resultHabilidade:viewHabilidadeDTO[] = [] 
        result.forEach(el=>{
            let habilidade = new HabilidadeReleaseModel();
            habilidade.setID(el.id)
            habilidade.setSlug(el.slug)
            habilidade.setTecnologia(el.tecnologia)

            resultHabilidade.push(habilidade.getAll())
        });

        // PROJECTO
        const projectoRealese = new GetProjectoReleaseDateCase();

        const resultProjecto = await projectoRealese.executeLimiteDestaque();

        // HEAD: TITLE 
        let head = {
            title: `Artur Jaime Tembe - My Portfolio`,
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
            inicio: "active-link",
            habilidade: "",
            projecto: "",
            contacto: ""
        }
        const query = { 
            habilidade: resultHabilidade,
            projecto: resultProjecto,
            header,
            head 
        }

        //res.status(201).json(result)
        return res.render("index", query);
    }

}