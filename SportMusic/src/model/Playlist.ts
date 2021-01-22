export class Playlist{
    constructor(
    private id: string,
    private title: string,
    private subtitle: string,
    private image:string,
    ) {}
    
    public getId(): string {
    return this.id
    }
    public getTitle():string{
        return this.title
    }
    
    public getSubtitle():string{
        return this.subtitle;
    }
    
    public getImage():string{
        return this.image;
    }
    
   
    public setId(id: string){
        this.id = id;
    }
    
    public setTitle(title: string){
        this.title = title;
    }
    
    public setSubtitle(subtitle: string){
        this.subtitle = subtitle;
    }
    
    public setImage(image: string){
        this.image = image;
    }
    
    

    static toPlaylistModel(playlist: any): Playlist{
        return new Playlist(playlist.id, playlist.title, playlist.subtitle,playlist.image);
      }


} 

export interface PlaylistInputDTO{
    title: string,
    subtitle: string,
    image:string,
    token:string,
}

