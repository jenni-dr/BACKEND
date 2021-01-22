export type User = {
    id: string,
    name: string,
    email: string,
    password: string,
 }
 
 export type Recipe = {
     id: string,
     title:string,
     description:string,
     createdAT: Date,
     user_id:string
 }