import { Request, Response } from "express"
import { GenreBusiness } from "../business/GenreBusiness"
import { BaseDatabase } from "../data/BaseDatabase"
import { GenreDatabase } from "../data/GenreDatabase"
import { GenreInputDTO } from "../model/Genre"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class GenreController {
    async createGenre(req: Request, res: Response) {
        let message= "Success!"
        try {
            const input: GenreInputDTO = {
                name: req.body.name,
                token:req.headers.authorization !
               
            }
            const genreBusiness = new GenreBusiness(
                new GenreDatabase,
                new IdGenerator,
                new Authenticator
            )
            await genreBusiness.createGenre(input )
            
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

    async  getGenreAll(req: Request,res: Response):Promise<any> {
        try{ 
            const genreBusiness = new GenreBusiness(
            new GenreDatabase,
            new IdGenerator,
            new Authenticator
        )
        
        
        const genre = await genreBusiness.getGenreAll(req.headers.authorization as string)
    
       res.status(200).send(genre)
        } catch (err) {
            res.status(err.customErrorCode || 400).send({
                message: err.message
            })
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }
}
