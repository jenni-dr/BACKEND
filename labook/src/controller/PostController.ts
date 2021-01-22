import {Request, Response} from 'express'
import PostBusiness from '../business/PostBusiness'
import BaseDatabase from '../data/BaseDatabase'
import PostDatabase from '../data/PostDatabase'
import { CreatePostInput, GetFeedByTypeInputDTO, GetFeedInputDTO, Post} from '../model/Post'
import authenticator, { AuthenticationData } from '../services/authenticator'


class PostController {
    public async createPost(
        req:Request,
        res:Response
    ){
        try{
           
            const input:CreatePostInput ={
                photo:req.body.photo,
                description:req.body.description,
                type:req.body.type,
                token:req.headers.authorization !

            }
            if(!input){
                throw new Error('"Photo", "description",and "type"must be fill')
            }
            const message = await PostBusiness.createPost(input)
            res.status(200).send({
                message
            })
        }catch (error) {
            res.status(400).send({
               message: error.message || error.sqlMessage
            })
    }
}

// public async getPostById(
//     req: Request,
//       res: Response
//    ) {
//     try {
       
//         const result = await PostDatabase.getPostById(req.params.id)
  
//         if (!result) {
//            throw new Error("Usuario não encontrado")
//         }
  
//         res.status(200).send({
//             id: result.id,
//             photo: result.photo,
//             description: result.description,
//             type: result.type, 
//             created_at: result.created_at,
//             author_id: result.author_id,
            
//          })
        

//     } catch (error) {
//         res.status(400).send({
//            message: error.message || error.sqlMessage
//         })
//      }
//   }


  public async getFriendsFeed(req: Request, res:Response){

    try {

        const token = req.headers.authorization!;
        const tokenData:AuthenticationData = authenticator.getTokenData(token)

        const input: GetFeedInputDTO = {
            friend1: tokenData.id
        }

        
        const feed = await PostBusiness.getFriendsFeed(input);

        res.status(200).send(feed);
        
    } catch (error) {
        res.status(400).send({error: error.message});
    }

    await BaseDatabase.destroyConnection();
}

public async getFeedByType(req:Request, res: Response){

    try {
        const token = req.headers.authorization!;
        const tokenData:AuthenticationData = authenticator.getTokenData(token)

       

        const input: GetFeedByTypeInputDTO= {
            type: Post.postTypeToString(req.query.type as string)
        }


        
        const feed = await PostBusiness.getFeedByType(input);

        res.status(200).send(feed);
        
    } catch (error) {
        res.status(400).send({error: error.message});
    }

    await BaseDatabase.destroyConnection();
}

}
export default new PostController()
