export interface CreateUserInput {
   name: string,
   email: string,
   password: string,
  
}

export class User {
   constructor(
      private id: string,
      private name: string,
      private email: string,
      private password: string,

   ){ }

   public getId = (): string => this.id
   public getName = (): string => this.name
   public getEmail = (): string => this.email
   public getPassword = (): string => this.password

   public setName(newName: string){
      this.name = newName
      return this
   }
}

   export type CreateUserOutput = {
      token: string
   }

export interface CreateUserOutputInterface {
   token: string
}

export function numberToBoolean(value: number): boolean {
   if (value !== 0) {
      return true
   }
   return false;
}


export interface getUserIdInput{
   id:string
}
 
export interface AddFriend {
   id:string,
   token: string
}

export interface InputFriend{
   friend1:string,
   friend2:string,
}

