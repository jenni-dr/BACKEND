import { connection } from "../index";
import { Recipe} from "../types/types";

export default async function insertRecipe(
    id:string,
    title:string,
    description:string,
    createdAT:Date,
    user_id:string
){ 
    
    await connection.insert({
        id,
        title,
        description,
        createdAT,
        user_id
       
    }).into('cookenu_recipes')
}