import { Projecto } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/appErrors";
import { dataEditedProjectoDTO } from "../../models/projecto/edit.projecto.models";
import { createdProjectoDTO } from "../../models/projecto/create.projecto.models";

export class editedProjectoCase{

    async executeData(id:string,data:createdProjectoDTO):Promise<Projecto|null>{
        
        //Verificar se o usuario ja existem
        
        const idExits = await prisma.projecto.findMany({
                where:{id}
        });

        if(idExits){
            
            //Verificar se o usuario ja existem
            
            const projectoAllreadyExits = await prisma.projecto.findUnique({
                where:{slug:data.slug}
            });

            let data_slug = data.slug;

            if(projectoAllreadyExits){
                data_slug = `${data.slug}-${new Date().getDay()}${new Date().getMonth()}${new Date().getFullYear()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${new Date().getMilliseconds()}`
            }

            //Actualizar o usuario
            const projecto = await prisma.projecto.update({
                where:{id},
                data: data
            });

            return projecto;

        }

        return null;
        
    }

    async executeImage(id:string,logotipo:string):Promise<Projecto>{
        
        //Verificar se o usuario ja existem
        
        const idExits = await prisma.projecto.findMany({
                where:{id}
        });

        if(!idExits){
            //ERROR
            throw new AppError("Habilidade its not exists!");
        }

        //Criar o usuario
        const projecto = await prisma.projecto.update({
            where:{id},
            data:{logotipo}
        });

        return projecto;
        
    }
    
    async verifyID(id:string):Promise<any>{
        //Verificar se o usuario ja existem
        
        const useAllreadyExits = await prisma.projecto.findUnique({
                where:{id},
                include:{
                    projecto_habilidade:{
                        select:{
                            habilidade:{
                                select:{
                                    id: true,
                                    tecnologia: true,
                                    slug: true
                                }
                            }
                        }
                    }
                }
        });

        if(!useAllreadyExits){
            //ERROR
            throw new AppError("Habilidade not exists!");
        }

        /*
        let project_habilidade:viewProjecto_HabilidadeDTO = {
            id:useAllreadyExits.id,
            github: useAllreadyExits.github,
            estado: useAllreadyExits.estado,
            live: useAllreadyExits.live,
            logotipo: useAllreadyExits.logotipo,
            slug: useAllreadyExits.slug,
            titulo: useAllreadyExits.titulo,
            projecto_habilidade: useAllreadyExits.projecto_habilidade
        };
*/

        return useAllreadyExits;
        
    }
}