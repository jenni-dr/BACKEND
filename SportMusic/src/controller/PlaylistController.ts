import { Request, Response } from "express"
import { PlaylistBusiness } from "../business/PlaylistBusiness"
import { BaseDatabase } from "../data/BaseDatabase"
import { PlaylistDatabase } from "../data/PlaylistDatabase"
import { PlaylistInputDTO } from "../model/Playlist"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"


export class PlaylistController {
    async createPlaylist(req: Request, res: Response) {
        let message= "Success!"
        try {
            const input: PlaylistInputDTO = {
                title: req.body.title,
                subtitle:req.body.subtitle,
                image:req.body.image,
               token:req.headers.authorization !
               
            }
            const playlistBusiness = new PlaylistBusiness(
                new PlaylistDatabase,
                new IdGenerator,
                new Authenticator
            )
            await playlistBusiness.createPlaylist(input )
            
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

    async  getPlaylistAll(req: Request,res: Response):Promise<any> {
        try{ 
            const playlistBusiness = new PlaylistBusiness(
            new PlaylistDatabase,
            new IdGenerator,
            new Authenticator
        )
        
        
        const playlist = await playlistBusiness.getPlaylistAll(req.headers.authorization as string)
    
       res.status(200).send(playlist)
        } catch (err) {
            res.status(err.customErrorCode || 400).send({
                message: err.message
            })
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }
}
