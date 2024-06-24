import { Habilidade } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/appErrors";

export class deletedHabilidadeCase{

    async execute(id:string):Promise<Habilidade>{
        
        //Verificar se o usuario ja existem
        
        const idExits = await prisma.habilidade.findMany({
                where:{id}
        });

        if(!idExits){
            //ERROR
            throw new AppError("Habilidade its not exists!");
        }
        
        //Criar o usuario
        const habilidade = await prisma.habilidade.delete({
            where:{id}
        });

        return habilidade;
        
    }
}