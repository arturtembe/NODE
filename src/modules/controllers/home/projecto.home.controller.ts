import { Request,Response } from "express";
import { GetProjectoReleaseDateCase } from "../../services/projecto/view.projecto.services";

export class GetProjecto_Home_Controller{

    async viewProjectoHome(req:Request,res:Response){
        
        const getProjectoReleaseDateCase=new GetProjectoReleaseDateCase();

        const result=await getProjectoReleaseDateCase.execute();

        // HEAD: TITLE 
        let head = {
            title: `Projecto - My Portfolio`,
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
            habilidade: "",
            projecto: "active-link",
            contacto: ""
        }
        let query = { 
            projecto: result,
            header,
            head 
        }

        return res.render("projecto", query);
    }

}