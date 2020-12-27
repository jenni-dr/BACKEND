import { MusicDatabase } from "../data/MusicDatabase"
import { CustomError } from "../errors/CustomError"
import { InvalidInputError } from "../errors/InvalidInputError"
import { Music, MusicInputDTO } from "../model/Music"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class MusicBusiness {
    
    constructor(
        private musicDatabase: MusicDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async createMusic(input:MusicInputDTO) {
        let message ='sucess'
        try{ 
            if (
              !input.title || 
              !input.author ||
              !input.date|| 
              !input.file|| 
              !input.genre|| 
              !input.album
             
            ) {
                throw new InvalidInputError("Invalid input to signUp")
            }
            const tokenData= this.authenticator.getTokenData(input.token)
            if(!tokenData){
                message="Unauthorized"
            }
            
            const id = this.idGenerator.generate()
            const newMusic : Music = new Music(
                id,
                input.title,
                input.author,
                input.date = new Date(),
                input.file,
                input.genre,
                input.album,
                tokenData.id
           )
           await this.musicDatabase.createMusic(newMusic)
           return message
    
             }catch(error){
                let message = error.sqlMessage || error.message
                return message
            }
        }
           
    async getMusicAll(input :string) :Promise<string> {
        if(!input){
            throw new InvalidInputError("Invalid input to selectAllMusic")
        }
         return this.musicDatabase.selectAllMusic()
    }
    
    public async getMusicById(id: string ) {
        const user = await this.musicDatabase.getMusicById(id);
        if (!user) {
          throw new CustomError(401,"Music not found");
        }
        return{
            id:user.getId(),
            title: user.getTitle(),
            author: user.getAuthor(),
            date: user.getDate(),
            genre:user.getGenre(),
            file:user.getFile(),
            album:user.getAlbum(),
            
        }
    }

    public async deleteMusicById(id: string ) { 
        let message ='Delete with sucess'
        const user = await this.musicDatabase.deleteMusic(id);
        if (user) {
          throw new CustomError(400,"Music not found");
        }
        return {
        message
        }
        
    }
}
