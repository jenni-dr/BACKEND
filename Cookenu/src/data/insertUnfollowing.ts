import { connection } from "../index";


export default async function insertUnfollowing(
    userToFollowId:string,
    userToUnfollowId:string
){ 
    
    await connection.insert({
        userToFollowId,
        userToUnfollowId
       
    }).into('cookenu_follow')
}