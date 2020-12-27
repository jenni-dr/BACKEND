import { InvalidInputError } from "../errors/InvalidInputError"
import {Genre, GenreInputDTO } from "../model/Genre"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"
import { GenreDatabase } from "../data/GenreDatabase"

export class GenreBusiness {
    
    constructor(
        private genreDatabase: GenreDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async createGenre(input:GenreInputDTO) {
        let message ='sucess'
        try{ 
            if (!input.name  ) {
                throw new InvalidInputError("Invalid input ")
            }
            const tokenData= this.authenticator.getTokenData(input.token)
            if(!tokenData){
                message="Unauthorized"
            }
            
            const id = this.idGenerator.generate()
           await this.genreDatabase.createGenre(
               Genre.toGenreModel({
                   ...input,
                   id,
                   tokenData

               })
           )
           return message
    
             }catch(error){
                let message = error.sqlMessage || error.message
                return message
            }
    }

    async getGenreAll(input :string) :Promise<string> {
        if(!input){
            throw new InvalidInputError("Invalid input to selectAllGenre")
        }
         return this.genreDatabase.selectAllGenre()
    }
}