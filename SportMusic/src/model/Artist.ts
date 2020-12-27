export class Artist{
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
    static toArtistModel(artist: any): Artist {
        return new Artist(artist.id, artist.name);
      }


} 

export interface ArtistInputDTO{
    name: string,
    token:string,
    
}