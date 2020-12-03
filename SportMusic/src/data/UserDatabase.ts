import  {BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";


export class UserDatabase extends BaseDatabase {

    private static TABLE_NAME :string = "SPORTMUSIC_USER";
  
    public async signup(user: User){
      try {
        await this.getConnection()
          .insert({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            nickname:user. getNickName(),
            password: user.getPassword(),
            
          })
          .into(this.tableNames.users)
      } catch (error) {
        throw new Error(error.sqlMessage || error.message)
      }
    }
    public async getUserByEmail(email: string): Promise<User> {
        const result = await this.getConnection()
          .select("*")
          .from(UserDatabase.TABLE_NAME)
          .where({ email });
          return User.toUserModel(result[0]);
    }
}