import { prisma } from "../../../prisma/client";

export class deletedProjectoCase{

    async execute(id:string){
        
        await prisma.projecto.update({
            where: { id },
            data:{
                projecto_habilidade:{
                    deleteMany:{
                        projectoId: id
                    }
                },
                projecto_image:{
                    deleteMany:{
                        projectoId: id
                    }
                }
            }
        });

        
        await prisma.projecto.deleteMany({
            where: { id }
        });
        
    }
    async verifyID(id:string):Promise<any>{
        //Verificar se o projecto ja existem
        
        return await prisma.projecto.findUnique({
                where:{id}
        });

    }
}