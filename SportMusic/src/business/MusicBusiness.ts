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
        try{ 
            if (
              !input.title || 
              !input.author ||
              !input.date|| 
              !input.file|| 
              !input.genre|| 
              !input.album||
              !input.user_id 
            ) {
                throw new InvalidInputError("Invalid input to signUp")
            }
            const id = this.idGenerator.generate()
            await this.musicDatabase.createMusic(
                Music.toMusic({
                ...input,
                id:id,
                date:new Date 
                  
                
            })
            )
            const accessToken = this.authenticator.generateToken({ 
                id
            })
            return accessToken 
        }catch (error){
            throw new CustomError(error.statusCode, error.message)
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
            user_id:user.getUserId()
        }
    }
}
