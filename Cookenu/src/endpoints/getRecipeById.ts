import { Request, Response } from "express";
import selectRecipeById from "../data/selectRecipeById";


export default async function getUserById(
   req: Request,
   res: Response
) {
   try {
      const recipe = await selectRecipeById(req.params.id)

      if (!recipe) {
         throw new Error("Receita não encontrada")
      }

      res.status(200).send({
         id: recipe.id,
         title: recipe.title,
         description:recipe.description,
         createdAt:recipe.createdAT,
      })

   } catch (error) {
      res.status(400).send({
         message: error.message || error.sqlMessage,
         auth: req.headers.auth
      })
   }
}