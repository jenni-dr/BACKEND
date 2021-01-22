import { connection } from "../index";
import { User } from "../types/types";

export default async function insertUser(
    user:User
) { 
    const {id, name, email, password} = user
    await connection.insert({
        id,
        name,
        email,
        password
       
    }).into('cookenu_user')
}