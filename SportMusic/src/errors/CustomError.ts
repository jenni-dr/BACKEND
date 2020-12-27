export abstract class BaseError extends Error {
    constructor(message: string, public code: number) {
      super(message);
    }
  }
  
  export class CustomError extends Error {
    constructor(
       public statusCode: number,
       message: string
    ) {
       super(message);
    }
 }
 