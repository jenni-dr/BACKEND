import PostDatabase from "../data/PostDatabase";
import { CreatePostById, CreatePostInput,GetFeedByTypeInputDTO,GetFeedInputDTO,Post } from "../model/Post";
import authenticator, { AuthenticationData } from "../services/authenticator";
import idGenerator from "../services/idGenerator";
import moment from "moment";
import { CustomError } from "../errors/CustomError";


class PostBusiness {
    public async createPost(input: CreatePostInput):Promise<string> {
        let message= "Success!"
       try {
        if (
             !input.photo ||
             !input.description || 
             !input.type 
             ) {
         throw new CustomError(406,'"photo", "description"and "type",  must be provided')
        }
        
        const tokenData: AuthenticationData = authenticator. getTokenData(input.token)
        
        if(!tokenData){
            message="Unauthorized"
        }
        const createdATMoment = moment().format("YYYY-MM-DD")
        const id: string =idGenerator. generateId()
        const newPost : Post = new Post(
            id,
            input.photo,
            input.description,
            input.type,
            new Date(createdATMoment),
            tokenData.id
       )
       await PostDatabase.createPost(newPost)
       return message

         }catch(error){
            let message = error.sqlMessage || error.message
            return message
        }
    }

    public async getPostById(input:CreatePostById ): Promise<any>{
        let message="sucess"
         try{
             if(
                 !input.id
                 ){
                     message=""
                 }
                 const id = input.id
                 const token:string =authenticator. generateToken({id}) as string
                 const tokenData: AuthenticationData = authenticator. getTokenData(token)
                 if(
                     !tokenData
                 ){
                     message
                 }
         } catch(error){
            let message = error.sqlMessage || error.message
            return message
        }
    }

    public async getFriendsFeed(input: GetFeedInputDTO): Promise<Post[]>{

       
        return await PostDatabase.getFriendsFeed(input.friend1);

    }

    public async getFeedByType(input: GetFeedByTypeInputDTO): Promise<Post[]>{

       
        return await PostDatabase.getFeedByType(input.type);
    }
}

export default new PostBusiness()