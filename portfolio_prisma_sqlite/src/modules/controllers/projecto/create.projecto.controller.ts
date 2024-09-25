import { Request,Response } from "express";
import { FielsValidation } from "../../../validation/fields.validation";
import { createdProjectoCase } from "../../services/projecto/create.projecto.services";
import { HabilidadeReleaseModel, viewHabilidadeDTO } from "../../models/habilidade/view.habilidade.models";
import { GetHabilidadeReleaseDateCase } from "../../services/habilidade/view.habilidade.services";
import { createdProjectoDTO } from "../../models/projecto/create.projecto.models";
import { createdProjectoHabilidadeCase } from "../../services/projecto_habilidade/create.projecto_habilidade.services";
import { ProjectoHabilidade } from "@prisma/client";

export class CreatedProjectoController{

    async handle(req:Request,res:Response){
        const {titulo, github, 
            live, estado,
            tecnologia, destaque, 
            images, logotipo}=req.body;

        const slug:string = new FielsValidation().validSlug(titulo)

        let data:createdProjectoDTO = { 
            titulo, slug, github, 
            live, estado,logotipo,
            destaque: destaque=='true'?true:false, 
            desc: '',
            images
        }

        const projectoCase=new createdProjectoCase();

        const projecto = await projectoCase.execute(data);

        tecnologia.forEach(async(el:string)=>{
            
            await new createdProjectoHabilidadeCase().execute({
                habilidadeId: el,
                projectoId: projecto?.id
            })

        });

        return res.status(201).json({status: 201, 
            projecto});
    }

    async handleAdd(req:Request,res:Response){
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
            habilidade: resultHabilidade,
            head 
        }

        return res.render("admin/projecto/add", query);
    }
}