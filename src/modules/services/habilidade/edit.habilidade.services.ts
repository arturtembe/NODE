import { Habilidade } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { createdHabilidadeDTO } from "../../models/habilidade/create.habilidade.models";
import { AppError } from "../../../errors/appErrors";

export class editedHabilidadeCase{

    async execute(id:string,destaque:boolean){
        
        //Verificar se o usuario ja existem
        
        const idExits = await prisma.habilidade.findMany({
                where:{id}
        });

        if(idExits){

            await prisma.habilidade.update({
                where:{id},
                data:{destaque}
            });
        }

    }

    async verifyID(id:string):Promise<Habilidade|null>{
        //Verificar se o usuario ja existem
        
        const useAllreadyExits = await prisma.habilidade.findUnique({
                where:{id}
        });

        return useAllreadyExits;
        
        
    }
}