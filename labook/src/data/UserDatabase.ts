import { CustomError } from "../errors/CustomError";
import { User } from "../model/User";
import BaseDatabase from "./BaseDatabase";

class UserDatabase extends BaseDatabase {


   private static tableName: string = "labook_users"
   private static tableFriends: string ="labook_friends"

   public getTableName = (): string => UserDatabase.tableName

   public async signup(
      user: User
   ) {

      try {

         await BaseDatabase.connection.insert({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
           
         }).into(UserDatabase.tableName)
      } catch (error) {
         throw new Error("Erro de banco de dados: " + error.sqlMessage);
      }
   }

   public async getUserByEmail(
      email: string
   ): Promise<User> {
      try {
         const result = await BaseDatabase.connection(UserDatabase.tableName)
            .select("*")
            .where({ email })

         return new User(
            result[0].id,
            result[0].name,
            result[0].email,
            result[0].password,
           
         )

      } catch (error) {
         throw new Error(error.slqMessage || error.message)
      }
   }

   public async getUserById(
      id:string
   ):Promise<any> {
      try{
         const input:any = await BaseDatabase.connection
             .select("*")
             .where({id})
             .from(UserDatabase.tableName)
             
             if(!input){
                throw new CustomError(400," Invalid Credentials")
             }
      }catch(error){ 
      throw new Error("Database error:, + error.slqMessage")
   }
}

public async addFriendById(
   friend1:string,
   friend2:string
): Promise<any>{
   await BaseDatabase.connection.insert({
         "friend1":friend1,
         "friend2":friend2
      })
      .into(UserDatabase .tableFriends)
   }


   public async unfriend(
      friend1: string, 
      friend2: string
      ): Promise<void> {

      try {
          await BaseDatabase.connection.insert(`
          DELETE FROM ${UserDatabase.tableFriends}
          WHERE
          (id_requester = "${friend1}" AND id_responder = "${friend2}")
          OR
          (id_requester = "${friend2}" AND id_responder = "${friend1}");
          `);

      } catch (error) {
          throw new Error(error.sqlMessage || error.message);
      }
  }  

  public async checkFriendship(
     friend1: string, 
     friend2: string
   ): Promise<boolean>{
   try {
      const result = await BaseDatabase.connection(`
       SELECT * FROM ${UserDatabase.tableFriends}
       WHERE
       (id_requester = "${friend1}" AND id_responder = "${friend2}")
       OR
       (id_requester = "${friend2}" AND id_responder = "${friend1}");
       `);

       if(result[0][0]){
           return true;
       }

       return false;

   } catch (error) {
       throw new Error(error.sqlMessage || error.message);
   }   
}
  

  
}
export default new UserDatabase()