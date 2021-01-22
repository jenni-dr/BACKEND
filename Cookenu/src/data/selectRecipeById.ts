import { connection } from "../index"
import { Recipe} from "../types/types";

export default async function selectRecipeById(
    id: string
): Promise<Recipe> {
    const result = await connection('cookenu_recipes')
        .select('*')
        .where({ id })

    return result[0]
}