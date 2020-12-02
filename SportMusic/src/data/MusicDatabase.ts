import  {BaseDatabase } from "./BaseDatabase";
import { Music } from "../model/Music";


export class MusicDatabase extends BaseDatabase {

    private static TABLE_NAME :string = "SPORTMUSIC_MUSIC";
  
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
}