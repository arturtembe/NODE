import { Projecto } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/appErrors";
import { createdProjectoDTO } from "../../models/projecto/create.projecto.models";

export class createdProjectoCase{

    async execute(data:createdProjectoDTO):Promise<Projecto>{
        //Verificar se o usuario ja existem
        
        const projectoAllreadyExits = await prisma.projecto.findUnique({
                where:{slug:data.slug}
        });

        let data_slug = data.slug;

        if(projectoAllreadyExits){
            data_slug = `${data.slug}-${new Date().getDay()}${new Date().getMonth()}${new Date().getFullYear()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${new Date().getMilliseconds()}`
        }

        //Criar o usuario
        const projecto = await prisma.projecto.create({
            data: data
        });

        return projecto;
        
    }
}