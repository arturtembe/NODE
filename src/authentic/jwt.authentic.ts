import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { AppError } from "../errors/appErrors";

export class JWTAuthentic{

    async bcryptHash(password:string){
        
        return await bcrypt.hash(password,10).then((hash)=>{
                return hash;
            }).catch(error=>{
                throw new AppError("Nao foi possivel concluir Hash",422);
            });
    }


    async bcryptCompare(password:string,hash:string){
        return await bcrypt.compare(password,hash);
    }

    getSecretKey(){
        return "my secret key"
    }

    jwtTokenSign(object:any){
        return jwt.sign(object, this.getSecretKey())
    }

    jwtTokenVerify(token:string){
        return jwt.verify(token, this.getSecretKey())
    }

}