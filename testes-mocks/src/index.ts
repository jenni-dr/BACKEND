import { validateCharacter } from "./validateCharacter";
import { ValidateEmptyPropertiesOutput } from "./validateEmprtyProperties";



const fakeValidator = jest.fn((input: any): ValidateEmptyPropertiesOutput =>{
    return {isValid: true, errors: []}
});

validateCharacter(
    {
        name: "Scorpion",
        life: 1500,
        defense: 200,
        strength: 600,
      
    }, fakeValidator);