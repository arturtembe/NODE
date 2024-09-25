import { Projecto, ProjectoHabilidade} from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/appErrors";
import { createdProjectoDTO } from "../../models/projecto/create.projecto.models";
import { createdProjectoHabilidadeDTO } from "../../models/projecto_habilidade/create.projecto_habilidade.models";

export class createdProjectoHabilidadeCase{

    async execute({habilidadeId,projectoId}:createdProjectoHabilidadeDTO){
        
        //Criar o usuario
        await prisma.projectoHabilidade.create({
            data: {habilidadeId,projectoId}
        });
    
    }
}