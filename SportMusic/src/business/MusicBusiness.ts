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
              !input.album 
              ) {
                  throw new InvalidInputError("Invalid input to signUp")
                }
                const id = this.idGenerator.generate()
                await this.musicDatabase.createMusic(
                    Music.toMusicModel({
                        ...input,
                         id,
                    })
                )
                const accessToken = this.authenticator.generateToken({ 
                    id
                })
                return accessToken 
        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

     async getMusicAll(input :string) :Promise<string> {
         if(!input){
             throw new InvalidInputError("Invalid input to selectAllMusic")
         }
         return this.musicDatabase.selectAllMusic()
     }
}
