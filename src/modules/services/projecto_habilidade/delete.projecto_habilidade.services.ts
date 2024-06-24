import { Projecto, ProjectoHabilidade} from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/appErrors";
import { createdProjectoDTO } from "../../models/projecto/create.projecto.models";
import { createdProjectoHabilidadeDTO } from "../../models/projecto_habilidade/create.projecto_habilidade.models";
import { deletedProjectoHabilidadeDTO } from "../../models/projecto_habilidade/delete.projecto_habilidade.models";

export class deletedProjectoHabilidadeCase{

    async executeProjecto(projectoId:string){
        
        // Verificar
        let project_hab = await prisma.projectoHabilidade.findMany({
            where:{projectoId}
        });

        if(project_hab){

            //Delete
            await prisma.projectoHabilidade.deleteMany({
                where: {projectoId}
            });

        }
    
    }

    async executeHabilidade(habilidadeId:string){
        
        // Verificar
        let project_hab = await prisma.projectoHabilidade.findMany({
            where:{habilidadeId}
        });

        if(project_hab){

            //Delete
            await prisma.projectoHabilidade.deleteMany({
                where: {habilidadeId}
            });

        }
    
    }
}