import  {BaseDatabase } from "./BaseDatabase";
import { Music } from "../model/Music";
import { NotFoundError } from "../errors/NotFoundError";


export class MusicDatabase extends BaseDatabase {

    private static TABLE_NAME :string = "SPORTMUSIC_MUSICS";
     
    public async createMusic(music: Music){
      try {
        await this.getConnection()
          .insert({
            id: music.getId(),
            title: music.getTitle(),
            author: music.getAuthor(),
            date:music.getDate(),
            file: music.getFile(),
            genre:music.getGenre(),
            album:music.getGenre(),
            user_id:music.getUserId(),
            
          })
          .into(this.tableNames.musics)
      } catch (error) {
        throw new Error(error.sqlMessage || error.message)
      }
    }
    
    public async  selectAllMusic():Promise<any> {
      const result: Music[] = await this.getConnection()
       .select("*")
       .from (MusicDatabase.TABLE_NAME)
       return result 
    }
    public async getMusicById(input: string): Promise<Music> {
      const music = await this.getConnection()
      .select("*")
      .from(MusicDatabase.TABLE_NAME)
      .where({ id: input })
      .orWhere({ title: input })
      if(!music[0]) {
        throw new NotFoundError(`Unable to found Music with input ${input}`)
      } 
      return Music.toMusic(music[0])! 
    }
}