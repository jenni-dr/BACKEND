export class Music{
    constructor(
    private id: string,
    private title: string,
    private author: string,
    private date: Date,
    private file: string,
    private genre:GENRE[],
    private album:string,
    private user_id: string,
    ) {}

    public getId(): string {
        return this.id
    }
    public getTitle(): string {
        return this.title
    }
    public getAuthor(): string {
        return this.author
    }
    public getDate(): Date {
        return this.date
    }
    public getFile(): string {
        return this.file
    } 
    public getGenre(): string[] {
        return this.genre
    }
    public getAlbum(): string {
        return this.album
    }
    public getUserId = () :string=> this.user_id

    public setId(id: string){
        this.id = id;
    }
    public setTitle(title: string){
        this.title = title;
    }
    public setAuthor(author: string){
        this.author = author;
    }
    public setDate(date: Date){
        this.date = date;
    }
    public setFile(file: string){
        this.file = file;
    }
    public setGenre(genre: GENRE[]){
        this.genre = genre;
    }
    public setAlbum(album: string){
        this.album = album;
    }
    public setUserId(user_id: string){
        this.user_id = user_id;
    }

    static toMusic(music: any): Music {
        return new Music(music.id, music.title, music.author,new Date(music.date), music.file,music.genre,music.album , music.user_id);
      }

    }

export enum GENRE {
    AXÉ='AXÉ',
    BLUES = 'BLUES',
    COUNTRY = 'COUNTRY',
    FORRÓ = 'FORRÓ',
    ELETRÔNICA = 'ELETRÔNICA',
    GOSPEL = 'GOSPEL',
    JAZZ = 'JAZZ',
    MPB = 'MPB',
    PAGODE ='PAGODE',
    POP ='POP',
    KPOP = 'KPOP',
    ROCK ='ROCK',
    SERTANEJO ='SERTANEJO',
    FUNK = 'FUNK',
}
    

export interface MusicInputDTO{
    title: string,
    author: string,
    date:Date,
    file: string,
    genre: GENRE[],
    album: string,
    user_id:string
    }