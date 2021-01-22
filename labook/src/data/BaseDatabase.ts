import knex from 'knex';
import dotenv from "dotenv"

dotenv.config()

export default class BaseDatabase{
   protected static connection = knex({
   client: 'mysql',
   connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: 3306
   }
})

public static async destroyConnection(): Promise<void>{
   if(BaseDatabase.connection){
       await BaseDatabase.connection.destroy();
       BaseDatabase.connection ()
   }
}

protected convertIntToBoolean(value: number): boolean{
   return value === 1;
}

protected convertBooleanToInt(value: boolean): number{
   return value? 1: 0;
}
}
