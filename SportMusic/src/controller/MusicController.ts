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
                album:req.body.album
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

        } catch (err) {
            res.status(err.customErrorCode || 400)
            .send({
                message: err.message
            })
        } finally {
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
}
    //         try {
    //             const musicDatabase = new MusicDatabase()
                
               
    //             const music: Music[] = await musicDatabase.selectAllMusic()
          
    //             if(!music.length){
    //                res.statusCode = 404
    //                throw new Error("No music found")
    //             }
          
    //             res.status(200).send(music)
                
    //          } catch (error) {
    //             console.log(error)
    //             res.send(error.message || error.sqlMessage)
    //          }
    //         }
        
            
