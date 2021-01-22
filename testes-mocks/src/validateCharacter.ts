import { ValidateEmptyPropertiesOutput } from "./validateEmprtyProperties";

export interface CharacterEmployeeInput {
    name: string;
    life: number;
    strength: number;
    defense: number;
  }
  export const validateCharacter = (
    input: CharacterEmployeeInput,
    validator: (input: any)=>ValidateEmptyPropertiesOutput
  ) => {
    const validationResult = validator(input);
    
    if (!validationResult.isValid) {
      throw new Error("Missing Properties");
    }
    if (
      !input.name ||
      input.life === undefined || 
      input.strength === undefined ||
      input.defense === undefined
    ) {
      return false;
    }
  
    if (input.life <=0 || input.strength <=0 || input.defense <=0) {
      return false;
    }
  
    return true;

   
  };