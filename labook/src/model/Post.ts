export enum POST_TYPES {
    NORMAL = "NORMAL",
    EVENT = "EVENT",
 }
 
 export interface CreatePostInput  {
    photo: string,
    description: string,
    type: string,
    token:string
    
 }
 export class Post {
   constructor(
      private id: string,
      private photo: string,
      private description: string,
      private type: string,
      private created_at: Date = new Date(),
      private author_id: string,
     

   ){ }

   public getId = ():string => this.id
   public getPhoto = () :string => this.photo
   public getDescription = ():string => this.description
   public getType = ():string => this.type
   public getCreatedAt= (): Date => this.created_at
   public getAuthorId = () :string=> this.author_id
   

   public setPost(newPost: string){
      this.photo = newPost
      return this
   }

   public setType(type:POST_TYPES){
      this.type = type
      return this
   }

   static toPostModel(object: any){
      return new Post(object.id, object.image, object.description, object.creation_date, object.type, object.user_id);
  }

  static postTypeToString(value:string){
   switch(value){
      case "Event":
         return POST_TYPES.EVENT
      default:
          return POST_TYPES.NORMAL
  }
}
}

   // if(type.toLowerCase()=== POST_TYPES.NORMAL){
   //    this.type =POST_TYPES.NORMAL;
   // }else if(type.toLowerCase()=== POST_TYPES.EVENT){
   //    this.type = POST_TYPES.EVENT;
   // }else{
   //    throw new Error ("Post type is not valid")
   // }

   
   
 export type CreatePostOutput = {
   token: string
}

export interface CreatePostById {
  id:string
}



export interface GetFeedInputDTO{
   friend1: string
}

export interface GetFeedByTypeInputDTO{
   type: POST_TYPES;
}