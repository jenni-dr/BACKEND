import { Request, Response } from "express";
import userBusiness, { UserBusiness } from "../business/UserBusiness";

export class UserController {

   constructor(
      private userBusiness: UserBusiness
   ) { }

   public async signup(req: Request, res: Response) {
      try {
         const { name, role, email, password } = req.body
         const result = await userBusiness.signup(
            name,
            email,
            password,
            role
         );
         res.status(200).send(result);
      } catch (error) {
         const { statusCode, message } = error
         res.status(statusCode || 400).send({ message });
      }
   }

   public async login(req: Request, res: Response) {
      try {
         const { email, password } = req.body
         const result = await userBusiness.login(email, password);
         res.status(200).send(result);
      } catch (error) {
         const { statusCode, message } = error
         res.status(statusCode || 400).send({ message });
      }
   }

   public async getUserById(req:Request,res:Response) {
      try{
         const result = await  userBusiness.getUserById(req.params.id)
         if (!result) {
                       throw new Error("Usuario não encontrado")
                    }
              
                    res.status(200).send({
                        id: result.id,
                        name:result.name,
                        email:result.email,
                        role:result.role

                     })
                    
            
                } catch (error) {
                    res.status(400).send({
                       message: error.message || error.sqlMessage
                    })
      }
     }
}

export default new UserController(userBusiness)