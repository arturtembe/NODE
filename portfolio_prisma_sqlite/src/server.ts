import express,{NextFunction, Request,Response} from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

// Handlebars
import { engine } from 'express-handlebars';

// FIREBASE
import config from './modules/config/firebase/firebase.config';

// Routers
import routers from './routers/index.router';
import { AppError } from "./errors/appErrors";

// Passport
import session from "express-session";
import passport from "passport";
import { initPassport } from "./middleware/passport.strategyc";

const app=express();

app.use(express.json());

app.use(session({
    secret: "gsdy#$$%@&^()*fsdfgs487WQAx()27375X!~+_=*",
    resave: true,
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000
    },  // 1 day
    saveUninitialized: true,
}));
initPassport(app);

//Body Parser
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use((req: Request, res: Response,next: NextFunction) =>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Authorization, Conent-Type, Accept");

    next();
});

app.use("/public", express.static(path.join(process.cwd(),"public")));
app.use("/js", express.static(path.join(process.cwd(),"public/assets/js")));
app.use("/css", express.static(path.join(process.cwd(),"public/assets/css")));
app.use("/img", express.static(path.join(process.cwd(),"public/assets/img")));
app.use("/svg", express.static(path.join(process.cwd(),"public/assets/svg")));
app.use("/upload", express.static(path.join(process.cwd(),"public/uploads")));

// Config Handlebars
app.engine('handlebars',engine({defaultLayout:'main'}))
//app.engine('handlebars',engine({handlebars:allowInsecurePrototypeAccess(handlebars)}));
app.set('view engine','handlebars');

//routes
app.use(routers);

app.get("/doc",(req:Request,res:Response)=>{
    throw new AppError("Error TH",500);
});

// Swagger

// Middleware AppError
app.use((err:Error,request:Request,response:Response,next: NextFunction)=>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status:"error",
            message:err.message
        })
    }

    //Erro interno status 500
    return response.status(500).json({
        status:"error",
        message:`Internal server error - ${err.message}`
    });
});


const port:number|string = config.port;

app.listen(port,
    ()=>{console.log(`Server is live @ ${config.hostUrl}`)}
)

