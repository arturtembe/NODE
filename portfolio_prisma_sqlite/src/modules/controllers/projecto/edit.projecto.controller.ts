import { Request,Response } from "express";
import { FielsValidation } from "../../../validation/fields.validation";
import { editedProjectoCase } from "../../services/projecto/edit.projecto.services";
import { createdProjectoDTO } from "../../models/projecto/create.projecto.models";
import { createdProjectoHabilidadeCase } from "../../services/projecto_habilidade/create.projecto_habilidade.services";
import { deletedProjectoHabilidadeCase } from "../../services/projecto_habilidade/delete.projecto_habilidade.services";
import { HabilidadeReleaseModel, viewHabilidadeDTO } from "../../models/habilidade/view.habilidade.models";
import { GetHabilidadeReleaseDateCase } from "../../services/habilidade/view.habilidade.services";
import { ProjectoReleaseModel } from "../../models/projecto/view.projecto.models";
import { dataEditedProjectoDTO } from "../../models/projecto/edit.projecto.models";

export class EditedProjectoController{

    async edit_data(req:Request,res:Response){
        
        const { titulo, github, live, 
            estado, destaque, logotipo, images } = req.body;

        const slug:string = new FielsValidation().validSlug(titulo)

        let data:createdProjectoDTO = { 
            titulo, slug, github, 
            live, estado,
            destaque: destaque=='true'?true:false, 
            desc: '',
            logotipo,
            images
        }

        const id:string = req.params.id;

        const projectoCase=new editedProjectoCase();

        const projecto = await projectoCase.executeData(id,data);

        /*
        if(tecnologia.length>0){
            
            await new deletedProjectoHabilidadeCase().execute({
                projectoId: id
            });

            tecnologia.forEach(async(el:string)=>{
                
                await new createdProjectoHabilidadeCase().execute({
                    habilidadeId: el,
                    projectoId: id
                })

            })
            

        }*/

        return res.status(201).json({status: 201, result:projecto});
        
    }

    async edit_Image(req:Request,res:Response){
        
        let user:any = req.user;
        const logotipo:string = user;

        const id:string = req.params.id;

        const projectoCase=new editedProjectoCase();

        const projecto = await projectoCase.executeImage(id,logotipo);

        return res.status(201).json({status: 201, result:projecto});
        
    }

    async edit_tecnologia(req:Request,res:Response){
        
        const { tecnologia } = req.body;

        const id:string = req.params.id;

        if(tecnologia.length>0){
            
            await new deletedProjectoHabilidadeCase().executeProjecto(id);

            tecnologia.forEach(async(el:string)=>{
                
                await new createdProjectoHabilidadeCase().execute({
                    habilidadeId: el,
                    projectoId: id
                })

            });
            
        }

        return res.status(201).json({status: 201, result:{}});
        
    }

    async handleEdit(req:Request,res:Response){


        // PROJECT ID

        const id:string = req.params.id;

        const projectoCase = new editedProjectoCase();

        const projectoID = await projectoCase.verifyID(id);

        const projecto = new ProjectoReleaseModel(projectoID);

        // HABILIDADE
        const getHabilidadeReleaseDateCase=new GetHabilidadeReleaseDateCase();

        const result=await getHabilidadeReleaseDateCase.execute();

        const resultHabilidade:viewHabilidadeDTO[] = [] 
        
        result.forEach(el=>{
            let habilidade = new HabilidadeReleaseModel();
            habilidade.setID(el.id)
            habilidade.setSlug(el.slug)
            habilidade.setTecnologia(el.tecnologia);
            habilidade.setActive(projecto.getTecnologia())

            resultHabilidade.push(habilidade.getAllEDIT())
        }); 

        // HEAD: TITLE 
        let head = {
            title: `${projectoID.titulo} - Administrador`,
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
            projecto:projecto.getAll(),
            habilidade:resultHabilidade,
            head 
        }

        //return res.status(200).json({ projecto:projecto.getAll(),habilidade:resultHabilidade })
        return res.render("admin/projecto/edit", query);
    }
}