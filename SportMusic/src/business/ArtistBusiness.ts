import { InvalidInputError } from "../errors/InvalidInputError"
import { Artist, ArtistInputDTO } from "../model/Artist"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"
import { ArtistDatabase } from "../data/ArtistDatabase"

export class ArtistBusiness {
    
    constructor(
        private artistDatabase: ArtistDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async createArtist(input:ArtistInputDTO) {
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
           await this.artistDatabase.createArtist(
               Artist.toArtistModel({
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

    async getArtistAll(input :string) :Promise<string> {
        if(!input){
            throw new InvalidInputError("Invalid input to selectAllMusic")
        }
         return this.artistDatabase.selectAllArtist()
    }
}
