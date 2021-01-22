import { Post, POST_TYPES } from "../model/Post";
import BaseDatabase from "./BaseDatabase";


class PostDatabase extends BaseDatabase{

    private static tableName: string = "labook_posts" 
    public geTableName =():string => PostDatabase.tableName

    public async getPostById(
        id:string
       
    ):Promise<any>{
        const result = await BaseDatabase.connection(PostDatabase.tableName)
        .select("*")
        .where({ id })
        
        return result[0]
    }
    
    public async createPost(
        post:Post
    ){
        try{
            await BaseDatabase. connection.insert({
                id:post.getId(),
                photo: post.getPhoto(),
                description: post.getDescription(),
                type: post.getType(),
                created_at: post.getCreatedAt(),
                author_id: post.getAuthorId()
            })
            .into(PostDatabase.tableName)
        }catch (error) {
            throw new Error("Erro de banco de dados: " + error.sqlMessage);
         }
    }

    public async getFriendsFeed(friend1: string): Promise<Post[]>{

        try {
            const postArray: Post[] = [];

            const result = await BaseDatabase.connection
            (`
            SELECT p.* FROM ${PostDatabase.tableName} p
            JOIN Lbk_Friends f
            ON p.user_id = f.id_responder
            WHERE f.id_requester = "${friend1}"
            ORDER BY p.creation_date DESC;
            `)

            for(let post of result[0]) {
                postArray.push(Post.toPostModel(post));
            }

            return postArray;
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);   
        }

    }

    public async getFeedByType(type: POST_TYPES): Promise<Post[]>{

        try {
            const postArray: Post[] = [];

            const result = await BaseDatabase.connection
            (`
            SELECT p.* FROM ${PostDatabase.tableName}p
            WHERE type = "${type}"
            ORDER BY p.creation_date DESC;
            `)

            for(let post of result[0]) {
                postArray.push(Post.toPostModel(post));
            }

            return postArray;
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);   
        }

    }



   
}
export default new PostDatabase() 
