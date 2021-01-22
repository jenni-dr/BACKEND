import { connection } from "../index";


export default async function insertFollowing(
    userToFollowId:string,
    userToUnfollowId:string
){ 
    
    await connection.insert({
        userToFollowId,
        userToUnfollowId
       
    }).into('cookenu_follow')
}