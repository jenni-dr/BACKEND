import { AlbumDatabase } from "../data/AlbumDatabase"
import { InvalidInputError } from "../errors/InvalidInputError"
import { Album, AlbumInputDTO } from "../model/Album"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class AlbumBusiness {
    
    constructor(
        private albumDatabase: AlbumDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async createAlbum(input:AlbumInputDTO) {
        let message ='sucess'
        try{ 
            if (!input.name) {
                throw new InvalidInputError("Invalid input ")
            }
            const tokenData= this.authenticator.getTokenData(input.token)
            if(!tokenData){
                message="Unauthorized"
            }
            
            const id = this.idGenerator.generate()
           await this.albumDatabase.createAlbum(
               Album.toAlbumModel({
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
      
    async getAlbumAll(input :string) :Promise<string> {
            if(!input){
                throw new InvalidInputError("Invalid input to selectAllMusic")
            }
             return this.albumDatabase.selectAllAlbum()
    }
}