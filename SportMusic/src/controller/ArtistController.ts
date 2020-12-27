import { Request, Response } from "express"
import { ArtistBusiness } from "../business/ArtistBusiness"
import { ArtistDatabase } from "../data/ArtistDatabase"
import { BaseDatabase } from "../data/BaseDatabase"
import { ArtistInputDTO } from "../model/Artist"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class ArtistController {
    async createArtist(req: Request, res: Response) {
        let message= "Success!"
        try {
            const input: ArtistInputDTO = {
                name: req.body.name,
                token:req.headers.authorization !
               
            }
            const artistBusiness = new ArtistBusiness(
                new ArtistDatabase,
                new IdGenerator,
                new Authenticator
            )
            await artistBusiness.createArtist(input )
            
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

    async  getArtistAll(req: Request,res: Response):Promise<any> {
        try{ 
            const artistBusiness = new ArtistBusiness(
            new ArtistDatabase,
            new IdGenerator,
            new Authenticator
        )
        
        
        const artist = await artistBusiness.getArtistAll(req.headers.authorization as string)
    
       res.status(200).send(artist)
        } catch (err) {
            res.status(err.customErrorCode || 400).send({
                message: err.message
            })
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }
}
