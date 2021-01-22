export class Genre{
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
    static toGenreModel(genre: any): Genre {
        return new Genre(genre.id, genre.name);
      }
} 

export interface GenreInputDTO{
    name: string,
    token:string,
}