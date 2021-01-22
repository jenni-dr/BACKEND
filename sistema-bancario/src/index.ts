import express, {Express,Request,Response} from "express"
import cors from "cors"
import{accounts} from './accounts'

const app:Express = express()
app.use(express.json())
app.use(cors())

app.post("/users/create",(req:Request, res:Response)=> {
    try{
        const {id,name ,CPF ,dateOfBirthAsString} = req.body

        const [day,month,year] = dateOfBirthAsString.split("/")

        const dateOfBirth:Date = new Date(`${year}-${month}-${day}`)

        const ageInMilisseconds: number = Date.now() - dateOfBirth.getTime()
        const ageInYears: number = ageInMilisseconds /1000/60/60/24/365

        if(ageInYears < 18){
            res.statusCode = 406
            throw new Error("Idade deve ser maior que 18 anos")
        }
        accounts.push({
            id,
            name,
            CPF,
            dateOfBirth,
            saldo:0,
            extrato:[]
        })
        res.status(200).send("Conta criada com sucesso !")
    }catch(error){
        console.log(error)
        res.send(error.message)

    }
})

app.get("/users/all",(req:Request, res:Response) => {
    try{
        if(!accounts.length){
            res.statusCode = 404
            throw new Error("Nemhuma conta Encontrada")
        }
        res.status(200).send(accounts)
    }catch (error){
        res.send(error.message)
    }
})
 
app.get("/users/query/", (req: Request, res: Response): void =>{
    console.log(req.query.name)
    const name = req.query.name
    const cpf = req.query.cpf
   try{
       const user = accounts.filter((u) => u.name === name && u.CPF.replace("", "")=== cpf)
        if(!user){
            throw new Error()
        }
      res.status(200).send(user);

    }catch{
        res.status(400).send({
            message: "Error searching for users"
        });
    }
});

app.put("/users/:id/balance",(req:Request,res:Response): void =>{
    let errorCode: number = 400
    try{
        if(!req.headers.authorization){
            errorCode = 401
            throw new Error ("Authorization invalid")
        }
        const {name,CPF , extrato}= req.body;
        const userIndex: number = accounts.findIndex(
            (u) => u.id === Number(req.params.id)
        )
        let valueToAdd = accounts[userIndex].extrato
        if(userIndex === -1){
            throw new Error()
        }
        accounts[userIndex].name = name;
        accounts[userIndex].CPF = CPF;
        accounts[userIndex].extrato = valueToAdd;
        res.status(200).send({message: "User updated successfully"});

    }catch(error){
        res.status(400).send({
            message: "Error inserting users"
        });
    }
})

app.listen(3003, () =>{
    console.log("Servidor rodando na porta 3003")
})