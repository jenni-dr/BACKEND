
import { Request, Response } from "express";
import insertRecipe from "../data/insertRecipe";
import { generateId } from "../services/idGenerator";
import {  AuthenticationData, getTokenData } from "../services/authenticator";
import convertFormat from "../services/convertFormat";

export default async function createRecipe(
    req: Request,
    res: Response
    )  {
        const token= req.headers.authorization as string
        const auth: AuthenticationData = getTokenData(token);
        const {title, description,createdAT,user_id} = req.body;
        let message = "Recipe created"
        try {
        
       if(
           !req.body.title ||
           !req.body.description 
       ){
           res.statusCode = 406
           throw new Error("'title'e 'descrption' são obrigatório")

       } 
        const id: string = generateId()  
        const createdATs = new Date(convertFormat(createdAT)).getTime()
         await insertRecipe( 
            id,
            title,
            description,
            new Date (createdATs) ,
            auth.id
        )
        
        res.status(200).send({
           message,
           title,
           description,
           
        })
    } catch (error) {
        res.status(400).send({
            message: error.message || error.sqlMessage,
            auth: req.headers.auth
        })
    }
}