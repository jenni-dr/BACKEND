import { Request, Response } from "express";
import selectUserById from "../data/selectUserById";
import { getTokenData } from "../services/authenticator";
import { User } from "../types/types";


export default async function getUserProfile(
    req: Request,
    res: Response
) {
    const token= req.headers.authorization as string
    const auth = getTokenData(token)
    let message = "Profile found!"
    try{
        if(!auth){
            res.statusCode = 400
            message = "Unauthorized"
            throw new Error(message)
        }
        const user: User = await selectUserById(auth.id)
        res.status(200).send({
            message,
            id:user.id,
            name:user.name,
            email:user.email
        })
    }catch (error) {
        res.status(400).send({
           message: error.message || error.sqlMessage,
           auth: req.headers.auth
        })
     }
  }

