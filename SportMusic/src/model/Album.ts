export class Album{
    constructor(
    private id: string,
    private name: string,
    
    ) {}
    
    public getId(): string {
        return this.id
    }
    public getName():string{
        return this.name
    }

    public setId(id: string){
        this.id = id;
    }
    
    public setName(name: string){
        this.name = name;
    }
    static toAlbumModel(album: any): Album {
        return new Album(album.id, album.name);
      }
} 

export interface AlbumInputDTO{
    name: string,
    token:string,
}