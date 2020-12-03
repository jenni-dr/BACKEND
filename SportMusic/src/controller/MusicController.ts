import { Request, Response } from "express"
import { MusicBusiness } from "../business/MusicBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { MusicDatabase } from "../data/MusicDatabase";
import { Music, MusicInputDTO } from "../model/Music";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class MusicController {
    async createMusic(req: Request, res: Response) {
        let message= "Success!"
        try {
            const input: MusicInputDTO = {
                title: req.body.title,
                author: req.body.author,
                date: req.body.date,
                file:req.body.file,
                genre:req.body.genre,
                album:req.body.album,
                user_id:req.body.user_id
            }
            const musicBusiness = new MusicBusiness(
                new MusicDatabase,
                new IdGenerator,
                new Authenticator
            )
            await musicBusiness.createMusic(input )
            
            res.status(200).send({
                message
            })

        }catch(err) {
            res.status(err.customErrorCode || 400)
            .send({
                message: err.message
            })
        }finally {
            await BaseDatabase.destroyConnection()
        }
    }

     async  getAllMusic(req: Request,res: Response):Promise<any> {
        try{ 
            const musicBusiness = new MusicBusiness(
            new MusicDatabase,
            new IdGenerator,
            new Authenticator
        )
        const input = ( req.headers.authorization as string) 
        
        const music = await musicBusiness.getMusicAll(input)
    
       res.status(200).send(music)
        } catch (err) {
            res.status(err.customErrorCode || 400).send({
                message: err.message
            })
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }

    public async getMusicById(req:Request,res:Response) {
        try{
            const musicBusiness = new MusicBusiness(
                new MusicDatabase,
                new IdGenerator,
                new Authenticator
            )
            
            const result = await musicBusiness.getMusicById(req.params.id)
            if (!result) {
                throw new Error("Music not found")
            }
            
            res.status(200).send({
                id: result.id,
                title:result.title,
                author:result.author,
                date:result.date,
                file:result.file,
                genre:result.genre,
                album:result.album,
                user_id:result.user_id
            })
        } catch (error) {
            res.status(400).send({
                message: error.message || error.sqlMessage
            })
        }
    }
}
    