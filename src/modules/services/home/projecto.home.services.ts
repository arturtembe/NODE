import { Habilidade, Projecto } from "@prisma/client";
import { prisma } from "../../../prisma/client";

export class GetProjecto_HOME_ReleaseDateCase{
    
    async execute():Promise<Projecto[]>{
        const projecto = await prisma.projecto.findMany({
            orderBy:{updated_at:"desc"},
            include:{
                projecto_habilidade:{
                    select:{
                        habilidade:{
                            select:{
                                id: true,
                                tecnologia:true
                            }
                        }
                    }
                }
            }
        });

        return projecto;
    }
    // skip: 4, Pagina
    // take: 1, Limite
    async executeLimite():Promise<Projecto[]>{
        const projecto = await prisma.projecto.findMany({
            skip: 0,
            take: 4,
            orderBy:{updated_at:"desc"},
            include:{
                projecto_habilidade:{
                    select:{
                        habilidade:{
                            select:{
                                id: true,
                                tecnologia:true
                            }
                        }
                    }
                }
            }
        });

        return projecto;
    }

}