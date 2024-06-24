import { Request,Response } from "express";

export class GetContacto_Home_Controller{

    async viewContactoHome(req:Request,res:Response){
        
        // HEAD: TITLE 
        let head = {
            title: `Contacto - My Portfolio`,
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
            projecto: "",
            contacto: "active-link"
        }
        let query = { 
            header,
            head 
        }

        return res.render("contacto", query);
    }

}