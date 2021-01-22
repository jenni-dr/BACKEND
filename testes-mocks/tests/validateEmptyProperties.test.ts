import { validateCharacter } from "../src/validateCharacter";
import { validateEmptyProperties } from "../src/validateEmprtyProperties";


describe("Testando a validateEmptyProperties", () => {
    test("Should return false for empty name", () => {
        const myObj={ 
          name: "",
          life: 1500,
          strength: 300,
          defense: 500,
        };
        const result = validateEmptyProperties(myObj);
        expect(result.isValid).toBe(false);
      
      });


      test("Should return false for life 0", () => {
        const myObj={ 
          name: "Scopion",
          life: 0,
          strength: 300,
          defense: 500,
        };
        const result = validateEmptyProperties(myObj);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContainEqual({key: "life", value: 0});
      
      });

      test("Should return false for defense 0", () => {
        const myObj={ 
          name: "Scopion",
          life: 0,
          strength: 300,
          defense: 0,
        };
        const result = validateEmptyProperties(myObj);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContainEqual({key: "defense", value: 0});
      
      });

      test("Should return false for strength 0", () => {
        const myObj={ 
          name: "Scopion",
          life: 1500,
          strength: 0,
          defense: 500,
        };
        const result = validateEmptyProperties(myObj);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContainEqual({key: "strength", value: 0});
      
      });

      test("Should return false for life negative", () => {
        const myObj={ 
          name: "Scopion",
          life: -500,
          strength: 0,
          defense: 500,
        };
        const result = validateEmptyProperties(myObj);
        expect(result.isValid).toBe(false);
        //expect(result.errors).toContainEqual({key: "life", value: 0});
      
      });

      test("Should return true for all valid inputs", () => {
        const myObj={ 
          name: "Scorpion",
          life: 1500,
          strength: 300,
          defense: 500,
        };
    
        const result = validateEmptyProperties(myObj);
        expect(result.isValid).toBe(true);
        expect(result.errors.length).toBe(0);
      });
    
    });
