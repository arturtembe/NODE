import { Habilidade } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { createdHabilidadeDTO } from "../../models/habilidade/create.habilidade.models";
import { AppError } from "../../../errors/appErrors";

export class createdHabilidadeCase{
    async execute({tecnologia,slug, destaque}:createdHabilidadeDTO):Promise<Habilidade|null>{
        //Verificar se o usuario ja existem
        
        const useAllreadyExits = await prisma.habilidade.findUnique({
                where:{tecnologia}
        });

        if(useAllreadyExits){
            //ERROR
            throw new AppError("Habilidade already exists!");
        }

        
        //Criar o usuario
        const habilidade = await prisma.habilidade.create({
            data:{tecnologia,slug, destaque}
        });

        return habilidade;
        
        
    }
}