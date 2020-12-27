import { Album } from "../model/Album";
import { BaseDatabase } from "./BaseDatabase";

export class AlbumDatabase extends BaseDatabase {

    private static TABLE_NAME :string = "SPORTMUSIC_Album";
  
    public async createAlbum(album: Album):Promise<void>{
      try {
        await this.getConnection()
          .insert({
            id: album.getId(),
            name: album.getName(),
           
            
          })
          .into(this.tableNames.albums)
      } catch (error) {
        throw new Error(error.sqlMessage || error.message)
      }
    }

    public async  selectAllAlbum():Promise<any> {
      const result: Album[] = await this.getConnection()
       .select("*")
       .from (AlbumDatabase.TABLE_NAME)
       return result 
    }
}