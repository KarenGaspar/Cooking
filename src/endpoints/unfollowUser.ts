import { Request, Response } from "express";
import { FollowerDatabase } from "../data/FollowerDatabase";
import { Authenticator } from "../services/Authenticator";

export async function unfollowUser(req: Request, res: Response){
    try {
        const token = req.headers.authorization as string
        const {userToUnfollowId} = req.body
        
        if(!token){
            res.status(422).send("Token inválido ou não passado nos headers")
        }

        if (!userToUnfollowId || userToUnfollowId === ''){
            res.status(422).send("Id inválido ou não informado")
        }

        const authenticator = new Authenticator()
        const tokenData = authenticator.getTokenData(token)

        const followerDatabase = new FollowerDatabase()
        const unfollower = await followerDatabase.unfollowUser(tokenData.id, userToUnfollowId)

        res.status(200).send({message: "Deixou de seguir o usuário com sucesso"})
    } catch (error: any) {
        res.status(400).send(error.message || error.sqlMessage)
        
    }
}