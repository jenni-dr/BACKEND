import { Request, Response } from "express"
import selectUserByEmail from "../data/selectUserByEmail"
import { generateToken } from "../services/authenticator"
import { compare } from "../services/hashManager"
import { User } from "../types/types"

export default async function login(
   req: Request,
   res: Response
): Promise<void> {
   try {
      const { email, password } = req.body

      let message = "Usuário logado!"

      if (!email || !password) {
         res.statusCode = 406
         message = ("'email' e 'senha' são obrigatórios")
         throw new Error(message)
      }

      const user: User = await selectUserByEmail(email)

      if (!user) {
         res.statusCode = 404
         message = "Usuário não encontrado ou senha incorreta"
         throw new Error(message)
      }

      const passwordIsCorrect: boolean = await compare(password, user.password)

      if (!passwordIsCorrect) {
         res.statusCode = 404
         message = "Usuário não encontrado ou senha incorreta"
         throw new Error(message)
      }

      const token: string = generateToken({
         id: user.id
        })

      res.send({
         message,
         token
      })

   } catch (error) {
      let { message } = error

      if(message === "Cannot read property 'id' of undefined"){
         message = "Usuário não encontrado ou senha incorreta"
         res.statusCode = 404
      }
      
      if(message === "Field 'name' doesn't have a default value"){
         message = "Insira um nome para seu usuário"
         res.statusCode = 406
      }
      res.send({message})
   }
}