import passport from "passport";
import * as passportStrategy from "passport-local";
import { JWTAuthentic } from "../authentic/jwt.authentic";
import { Express, Request, Response, NextFunction } from "express";
import { senhaUserDTO, senhaValidUser } from "../modules/helpers/user/senha.user.helper";

export function initPassport(app: Express) {
    //const usersDB = new User();
    //usersDB.initUsers();    
    app.use(passport.initialize());
    app.use(passport.authenticate('session'));

    passport.use(new passportStrategy.Strategy(
        { 
            usernameField:'email',
            passwordField:'senha',
        }, 
        async (email, senha, done) => {
            try {
                
                if (!email) { done(null, false) }
                
                const user = senhaValidUser;
                if (await new JWTAuthentic().bcryptCompare(senha,user.hash)) 
                {
                    done(null, user);
                } else {
                    done(null, false);
                }

            } catch (e) {
                done(e, false);
            }
        })
    );

    passport.serializeUser((req: Request, user: any, done:any) => {
        done(null, user);
    });

    passport.deserializeUser(async(user: senhaUserDTO, done) => {
        const u = senhaValidUser;
        done(null, u);
    });

}

export function isAuthenticated(req: Request,
    res: Response, next: NextFunction): Response | void {
    //req.user
    //req.loginUser = `Artur Jaime Tembe`;
    if(req.isAuthenticated())
        {
            console.log(req.session);
            
            return next();
        }
    else
        res.redirect("/login"); 
}