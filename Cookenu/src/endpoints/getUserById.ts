import { Request, Response } from "express";
import selectUserById from "../data/selectUserById";

export default async function getUserById(
   req: Request,
   res: Response
) {
   try {
      const user = await selectUserById(req.params.id)

      if (!user) {
         throw new Error("Usuário não encontrado")
      }

      res.status(200).send({
         id: user.id,
         name: user.name,
         email:user.email
      })

   } catch (error) {
      res.status(400).send({
         message: error.message || error.sqlMessage,
         auth: req.headers.auth
      })
   }
}