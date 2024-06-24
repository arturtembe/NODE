import { Contacto } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { createdContactoDTO } from "../../models/contacto/create.contacto.models";

export class createdContactoCase{

    async execute({nome,email,message}:createdContactoDTO):Promise<Contacto>{
        
        //Criar o usuario
        const contacto = await prisma.contacto.create({
            data: {nome,email,message}
        });

        return contacto;
        
    }
}