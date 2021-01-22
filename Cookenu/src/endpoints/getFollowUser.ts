import { Request, Response } from "express";
import insertFollowing from "../data/insertFollowing";
import { AuthenticationData, getTokenData } from "../services/authenticator";


export default async function getFollowUser(req:Request, res:Response){
    try{
        const{userToFollowId} = req.body;
        const token= req.headers.authorization as string
        const auth: AuthenticationData = getTokenData(token);
        const followerId:string = auth.id

        await insertFollowing(followerId,userToFollowId);

       res.status(200).send({
           message:"Followed successfully"
       })
    }catch (error) {
        res
        .status(400)
        .send({
            message: error.message || error.sqlMessage
        })
    }
}