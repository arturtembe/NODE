import { Request,Response } from "express";
import { GetProjectoReleaseDateCase } from "../../services/projecto/view.projecto.services";

export class GetProjectoReleaseDateController{

    async handleAll(req:Request,res:Response){

        const projectoRealese = new GetProjectoReleaseDateCase();

        const result = await projectoRealese.execute();
        

        // HEAD: TITLE 
        let head = {
            title: `Projecto - Administrador`,
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
            projecto:result,
            head 
        }

        //return res.status(200).json(result);
        return res.render("admin/projecto/view", query);
    }

}