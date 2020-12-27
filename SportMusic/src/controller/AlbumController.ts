import { Request, Response } from "express"
import { AlbumBusiness } from "../business/AlbumBusiness"
import { AlbumDatabase } from "../data/AlbumDatabase"
import { BaseDatabase } from "../data/BaseDatabase"
import { AlbumInputDTO } from "../model/Album"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class AlbumController {
    async createAlbum(req: Request, res: Response) {
        let message= "Success!"
        try {
            const input: AlbumInputDTO = {
                name: req.body.name,
                token:req.headers.authorization !
               
            }
            const albumBusiness = new AlbumBusiness(
                new AlbumDatabase,
                new IdGenerator,
                new Authenticator
            )
            await albumBusiness.createAlbum(input )
            
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

    async  getAlbumAll(req: Request,res: Response):Promise<any> {
        try{ 
            const albumBusiness = new AlbumBusiness(
            new AlbumDatabase,
            new IdGenerator,
            new Authenticator
        )
        
        
        const album = await albumBusiness.getAlbumAll(req.headers.authorization as string)
    
       res.status(200).send(album)
        } catch (err) {
            res.status(err.customErrorCode || 400).send({
                message: err.message
            })
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }
}
