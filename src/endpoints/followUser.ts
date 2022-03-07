import { Request, Response } from "express";
import { FollowerDatabase } from "../data/FollowerDatabase";
import { Authenticator } from "../services/Authenticator";

export async function followUser(req: Request, res: Response){
    try {
        const token = req.headers.authorization as string
        const {userToFollowId} = req.body
        
        if(!token){
            res.status(422).send("Token inválido ou não passado nos headers")
        }

        if (!userToFollowId || userToFollowId === ''){
            res.status(422).send("Id inválido ou não informado")
        }
        
        const authenticator = new Authenticator()
        const tokenData = authenticator.getTokenData(token)

        const followerDatabase = new FollowerDatabase()
        const follower = await followerDatabase.followUser(tokenData.id, userToFollowId)

        res.status(200).send({message: "Usuário seguido com sucesso"})
    } catch (error: any) {
        res.status(400).send(error.message || error.sqlMessage)
        
    }
}