import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";

export async function login(req: Request, res: Response){
    try {
        const {email, password} = req.body

        if(!email || !password){
            res.status(422).send("Preencha todos os campos")
        }

        const userDatabase = new UserDatabase()
        const user: any = await userDatabase.findUserByEmail(email)

        if (!user){
            res.status(409).send("Usuário não cadastrado!")
        }

        const hashManager = new HashManager()
        const passwordIsCorrect = await hashManager.compare(password, user.getPassword())

        if(!passwordIsCorrect){
            res.status(401).send("E-mail ou senha incorretos")
        }

        const authenticator = new Authenticator()
        const token = authenticator.generateToken({id: user.getId()})

        res.status(201).send({message: "Usuário logado com sucesso", access_token: token})
    } catch (error: any) {
        res.status(400).send(error.message || error.sqlMessage)
    }
}