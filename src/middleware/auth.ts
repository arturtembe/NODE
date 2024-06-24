import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appErrors";
import { JWTAuthentic } from "../authentic/jwt.authentic";

export async function ensureAuthenticated(
    request: Request, response: Response,
    next: NextFunction
) {

    const authHeader = `${request.headers.authorization}`;

    //console.log(authHeader);
    
    //const hed = request.headers["authorization"];
    let auth = (authHeader!="" && authHeader?.length>6 && authHeader!=null && authHeader!=undefined) ? true: false;

    if(auth){
        try{
            let token = authHeader.split(" ")[1];
            //let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGE1ZmUwNTdkYmE0OTM1NTEzYTdlMSIsIm5hbWVVc2VyIjoiQXJ0dXIiLCJlbWFpbCI6ImFydHVyQGdtYWlsLmNvbSIsImRhdGEiOiIyMDI0LTA1LTE5VDIwOjIzOjE1LjgxNFoiLCJpYXQiOjE3MTYxNzkyNTV9.zXnFi0JajiQ4Lld1Vd_J69dvEXRiS3ORs31MnxXwOrY`;
            let jwt = new JWTAuthentic().jwtTokenVerify(token);
            
            request.user = jwt;
            return next();
        }
        catch(error){
            console.log(auth);
            
            response.status(400).json({"status":400,"message": "Token Invalido","error": error});
            return;
        }
    }
    
    response.status(401).json({"status":401,"message": "Permissao negado!"});

    //next();
}

export async function authenticatedJWT(
    request: Request, response: Response,
    next: NextFunction
) {

    const authHeader = `${request.headers.authorization}`;

    //console.log(authHeader);
    
    //const hed = request.headers["authorization"];
    let auth = (authHeader!="" && authHeader?.length>6 && authHeader!=null && authHeader!=undefined) ? true: false;

    if(auth){
        try{
            let token = authHeader.split(" ")[1];
            //let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGE1ZmUwNTdkYmE0OTM1NTEzYTdlMSIsIm5hbWVVc2VyIjoiQXJ0dXIiLCJlbWFpbCI6ImFydHVyQGdtYWlsLmNvbSIsImRhdGEiOiIyMDI0LTA1LTE5VDIwOjIzOjE1LjgxNFoiLCJpYXQiOjE3MTYxNzkyNTV9.zXnFi0JajiQ4Lld1Vd_J69dvEXRiS3ORs31MnxXwOrY`;
            let jwt = new JWTAuthentic().jwtTokenVerify(token);
            
            response.status(200).json({
                "status":200,
                "info": jwt
            });
            return;
        }
        catch(error){
            response.status(400).json({"status":400,"message": "Token Invalido","error": error});
            return;
        }
    }
    
    response.status(401).json({"status":401,"message": "Permissao negado!"});

    //next();
}

export function authenticatedHeader(authorization:string):any {
    let data = {};
    try{
        const authHeader = authorization;

        let auth = (authHeader!="" && authHeader?.length>6 && authHeader!=null && authHeader!=undefined) ? true: false;

        if(auth){
            data = new JWTAuthentic().jwtTokenVerify(authHeader.split(" ")[1])    
        }
        
    }
    catch(e){
        
    }
    
    return data;
}