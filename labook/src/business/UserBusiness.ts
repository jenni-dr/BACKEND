import userDatabase from "../data/UserDatabase";
import { CreateUserInput, User, CreateUserOutput,AddFriend, InputFriend  } from "../model/User";
import { CustomError } from "../errors/CustomError";
import authenticator, { AuthenticationData } from "../services/authenticator";
import hashManager from "../services/hashManager";
import idGenerator from "../services/idGenerator";
import UserDatabase from "../data/UserDatabase";

class UserBusiness {
   public async signup(input: CreateUserInput): Promise<string> {
      try {
         if (
            !input.name ||
            !input.email ||
            !input.password 
            
         ) {
           throw new CustomError(406,'Preencha os campos "name", "email" e "password"')
         }

         const id: string =idGenerator.generateId()

         const cypherPassword = await hashManager.hash(input.password);

         const newUser: User = new User(
            id,
            input.name,
            input.email,
            cypherPassword,
            
         )

         await userDatabase.signup(newUser)

         let output: CreateUserOutput;

         const token = authenticator.generateToken({
            id,
         
         });

         return token;

      } catch (error) {

         if (error.sqlMessage.includes("Duplicate entry")) {
            throw new CustomError(409, "Este usuário já existe!");
         }

         throw new CustomError(400, error.sqlMessage || error.message);
      }

   }


   public async addFriendById(
      input:AddFriend
   ):Promise<string>{
      try{
         if(!input.id){
            throw new CustomError(406,"'id' must be provided")
         }
         const tokenData:AuthenticationData = authenticator.getTokenData(input.token)
         const friend1:string = tokenData.id !
         const friend2 = input.id

         const friends = await UserDatabase.addFriendById(
            friend1,
            friend2
         )
         return friends
      }catch (error){
         throw new CustomError(400, error.message)
      }
   }


   public async unfriend(input: InputFriend){

      //const userDatabase = new UserDatabase();
      const isFriend = await UserDatabase.checkFriendship(input.friend1, input.friend2);
      if(isFriend){
          await UserDatabase.unfriend(input.friend1, input.friend2);
      }else{
          throw new Error("Friendship doesn't exist");
      }
  }
}

export default new UserBusiness()