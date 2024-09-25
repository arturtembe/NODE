import { Habilidade } from "@prisma/client";
import { prisma } from "../../../prisma/client";

export class GetHabilidadeReleaseDateCase{
    
    async execute():Promise<Habilidade[]>{
        const habilidade = await prisma.habilidade.findMany({
            orderBy:{updated_at:"asc"}
        });

        return habilidade;
    }

    async executeDestaque():Promise<Habilidade[]>{
        const habilidade = await prisma.habilidade.findMany({
            orderBy:{updated_at:"asc"},
            where: { destaque: true }
        });

        return habilidade;
    }

}