import { UserInputDTO, LoginInputDTO, User } from "../model/User"
import { UserDatabase } from "../data/UserDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { HashManager } from "../services/HashManager"
import { Authenticator } from "../services/Authenticator"
import { InvalidInputError } from "../errors/InvalidInputError"



export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    async signUp(input:UserInputDTO): Promise<string> { 

        if (!input.name || !input.email ||!input.nickname|| !input.password ) {
            throw new InvalidInputError("Invalid input to signUp")
        }

        if (input.email.indexOf("@") === -1) {
            throw new InvalidInputError("Invalid email format")
        }

        if (input.password.length < 6) {
            throw new InvalidInputError("Password should have more than 6 digits")
        }

        const id = this.idGenerator.generate()

        const hashPassword = await this.hashManager.hash(input.password)
        await this.userDatabase.signUp(
            User.toUserModel({
                ...input,
                id:id,
                password: hashPassword
            })
        )

        const accessToken = this.authenticator.generateToken({ 
            id:id,
           })

        return accessToken
    }

    async authUserByEmail(user: LoginInputDTO) { 

        if (!user.email || !user.password )
        throw new InvalidInputError("Invalid input to login")


        if (user.email.indexOf("@") === -1) {
            throw new InvalidInputError("Invalid email format")
        }

        const userFromDB = await this.userDatabase.getUserByEmail(user.email)
        const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword())

        if (!hashCompare) {
            throw new InvalidInputError("Invalid password")
        }

        const accessToken = this.authenticator.generateToken({ 
            id: userFromDB.getId() })

        return accessToken
    }
}