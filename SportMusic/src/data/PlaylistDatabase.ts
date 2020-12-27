import { Playlist } from "../model/Playlist";
import { BaseDatabase } from "./BaseDatabase";



export class PlaylistDatabase extends BaseDatabase {

    private static TABLE_NAME  = "SPORTMUSIC_PLAYLIST";
     
    public async createPlaylist(playlist: Playlist){
      try {
        await this.getConnection()
          .insert({
            id: playlist.getId(),
            title: playlist.getTitle(),
            subtitle: playlist.getSubtitle(),
            image:playlist.getImage()
           })
          .into(this.tableNames.playlists)
      } catch (error) {
        throw new Error(error.sqlMessage || error.message)
      }
    }

    public async updatePlaylist(
      id: string,
      title: string,
      subtitle: string,
      image?: string
   ) {
   
      await this.getConnection()
         .update({
            title, subtitle, image
         })
         .from(PlaylistDatabase.TABLE_NAME)
         .where({ 
            id 
         })
  }
    public async  selectAllPlaylist():Promise<any> {
    const result: Playlist[] = await this.getConnection()
     .select("*")
     .from (PlaylistDatabase.TABLE_NAME)
     return result 
  }
}  