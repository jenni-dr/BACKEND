import { PlaylistDatabase } from "../data/PlaylistDatabase"
import { InvalidInputError } from "../errors/InvalidInputError"
import { Playlist, PlaylistInputDTO } from "../model/Playlist"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"



export class PlaylistBusiness {
    
    constructor(
        private playlistDatabase: PlaylistDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async createPlaylist(input:PlaylistInputDTO) {
        let message ='sucess'
        try{ 
            if (
              !input.title || 
              !input.subtitle ||
              !input.image
              
             
            ) {
                throw new InvalidInputError("Invalid input ")
            }
            const tokenData= this.authenticator.getTokenData(input.token)
            if(!tokenData){
                message="Unauthorized"
            }
            
            const id = this.idGenerator.generate()
           await this.playlistDatabase.createPlaylist(
               Playlist.toPlaylistModel({
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

    async getPlaylistAll(input:string) :Promise<string> {
        if(!input){
            throw new InvalidInputError("Invalid input to selectAllPlaylist")
        }
         return this.playlistDatabase.selectAllPlaylist()
    }
}