export class CustomError extends Error {
    public statusCode: number
 
    constructor(
       statusCode: number,
       msg: string
    ) {
       super(msg)
       this.statusCode = statusCode
    }
 }