import { Artist } from "../model/Artist";
import { BaseDatabase } from "./BaseDatabase";

export class ArtistDatabase extends BaseDatabase {

    private static TABLE_NAME :string = "SPORTMUSIC_Artist";
  
    public async createArtist(artist:Artist):Promise<void>{
      try {
        await this.getConnection()
          .insert({
            id: artist.getId(),
            name: artist.getName(),
           
            
          })
          .into(this.tableNames.artists)
      } catch (error) {
        throw new Error(error.sqlMessage || error.message)
      }
    }

    public async  selectAllArtist():Promise<any> {
      const result: Artist[] = await this.getConnection()
       .select("*")
       .from (ArtistDatabase.TABLE_NAME)
       return result 
    }
}