import { CharacterEmployeeInput, validateCharacter } from "../src/validateCharacter";


describe("Testando a função validateCharacter", () => {

    test("deve retorn um positivo", () => {
       

      const validatorMock = jest.fn(() => {
         return { isValid: true }
        });
        try {
            const myObj: CharacterEmployeeInput = {
                name: "Scorpion",
                life: 1500,
                defense: 1000,
                strength: 800,
            };

            const performAttack = validateCharacter(myObj, validatorMock as any);

        } catch (err) {
            expect(err.message).toEqual("Missing Properties");
        }
    })



    test("deve retorn um false", () => {
        expect.assertions(1);

const validatorMock = jest.fn((input: any): any => {
    return { isValid: false }
        });

        try {
            const myObj: CharacterEmployeeInput = {
                
                name: "Scorpion",
                life: 1500,
                defense: 0,
                strength: 600,
            };

            const performAttack = validateCharacter(myObj, validatorMock as any);

        } catch (err) {
            expect(err.message).toEqual("Missing Properties");
        }
    })

    // test("Should perform attack", () => {
    //     expect.assertions(2);
    //     const validatorMock = jest.fn((input:any):any  => {
    //       return {isValid:true};
    //     });
    
    //     const attacker:CharacterEmployeeInput = {
    //       name: "Scorpion",
    //       life: 1500,
    //       defense: 200,
    //       strength: 600,
    //     };
    
    //     const defender: CharacterEmployeeInput = {
    //       name: "Kitana",
    //       life: 1500,
    //       defense: 400,
    //       strength: 800,
    //     };
    
    //     const performAttack= validateCharacter(attacker, defender, validatorMock as any);
    //     expect(performAttack).toBe(150);
    //     expect(defender.life).toEqual(1300);
    //     expect(validatorMock).toHaveBeenCalled();
    //     expect(validatorMock).toHaveBeenCalledTimes(2);
    //     expect(validatorMock).toHaveReturnedTimes(2);
    //   });



// test("Should return invalid character error", () => {
//     expect.assertions(4);
//     const validatorMock = jest.fn((input:any) :any => {
//       return {isValid:false};
//     });

//     const attacker:CharacterEmployeeInput = {
//       name: "Scorpion",
//       life: 1500,
//       defense: 200,
//       strength: 600,
//     };

//     const defender:CharacterEmployeeInput= {
//       name: "Kitana",
//       life: 1500,
//       defense: 400,
//       strength: 800,
//     };

//     try {
//      const performAttack = validateCharacter(attacker, defender, validatorMock as any);
//     } catch (err) {
//       expect(err.message).toBe("Invalid character");
//       expect(validatorMock).toHaveBeenCalled();
//       expect(validatorMock).toHaveBeenCalledTimes(1);
//       expect(validatorMock).toHaveReturnedTimes(1);
//     }
//   });

})



