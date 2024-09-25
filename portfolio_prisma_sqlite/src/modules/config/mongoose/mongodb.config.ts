
import { Request, Response } from "express";
import mongoose from "mongoose";
import { AppError } from "../../../errors/appErrors";
import MongoDBEndpointHelper  from "../../helpers/mongodb.endpoint.helpers";

//const endpoint = `mongodb://localhost:27017/my_next_agenda`;

const connectDB = async(endpoint:string)=>{
    return await mongoose.connect(endpoint);
}

const connectRouter = async(req:Request,res:Response)=>{
    
    await mongoose.connect(MongoDBEndpointHelper.agenda).then(()=> {
            //console.log('Connected to mongodb');
            return res.status(200).send('Connected to mongodb');
        }).catch(error=>{
            //console.log('ERROR: '+error);
            throw new AppError("Nao foi possivel connectar ao mongodb",422);
        });
}

export {connectDB, connectRouter}; 