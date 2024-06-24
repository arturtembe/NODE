import { NextFunction, Request,Response } from "express";
import { JWTAuthentic } from "../../../authentic/jwt.authentic";
import { senhaValidUser } from "../../helpers/user/senha.user.helper";

export class UserController{

    async handle(req:Request,res:Response){
        //const { senha }=req.body;

        return res.status(201).json({status: 201, result: {}});
    }

    async validLogin(req:Request,res:Response, next:NextFunction){
        const { senha }=req.body;

        if(await new JWTAuthentic().bcryptCompare(senha,
            senhaValidUser.hash
        )){
            next();
            return;
        }

        return res.status(401).json({status: 401, message: `Senha Invalida!`});
    }

    async handleLogin(req:Request,res:Response){

        // HEAD: TITLE 
        let head = {
            title: `Acessar - Administrador`,
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

        return res.render("admin/user/login", query);
    }
}