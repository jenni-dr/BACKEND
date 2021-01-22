export type Payment = {
    value:number,
    data: Date,
    description:string
}

export type Account = {
    id:number,
    name:string,
    CPF:string,
    dateOfBirth: Date,
    saldo:number,
    extrato:Payment[]
}